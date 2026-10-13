import { searchPolicies } from "./lib/rag/vsearch";

export const config = {
  runtime: "edge",
};

interface ContractDraft {
  title: string;
  summary: string;
  terms: {
    heading: string;
    content: string;
  }[];
  missingInformation: string[];
  disclaimer: string;
}

interface ContractRequest {
  projectDescription: string;
  paymentTerms: string;
  revisionTerms: string;
  cancellationTerms: string;
  deliveryTerms: string;
}

type PolicySearchResult = Awaited<ReturnType<typeof searchPolicies>>[number];

interface ScoredPolicyResult extends PolicySearchResult {
  score: number;
}

function isContractRequest(value: unknown): value is ContractRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const request = value as Record<string, unknown>;

  return (
    typeof request.projectDescription === "string" &&
    request.projectDescription.trim() !== "" &&
    typeof request.paymentTerms === "string" &&
    typeof request.revisionTerms === "string" &&
    typeof request.cancellationTerms === "string" &&
    typeof request.deliveryTerms === "string"
  );
}

function getScore(result: PolicySearchResult): number | undefined {
  // Support either field name while your retrieval code is evolving.
  const item = result as PolicySearchResult & {
    score?: number;
    similarity?: number;
  };

  if (typeof item.score === "number") {
    return item.score;
  }

  if (typeof item.similarity === "number") {
    return item.similarity;
  }

  return undefined;
}

function mergeAndDeduplicate(
  resultsByQuery: PolicySearchResult[][],
): ScoredPolicyResult[] {
  const uniqueResults = new Map<string, ScoredPolicyResult>();

  for (const results of resultsByQuery) {
    for (const result of results) {
      const score = getScore(result);

      if (score === undefined) {
        throw new Error(
          `Missing similarity score for policy chunk: ${result.id}`,
        );
      }

      const candidate: ScoredPolicyResult = {
        ...result,
        score,
      };

      const existing = uniqueResults.get(result.id);

      // If a chunk appears in multiple searches, retain its
      // highest observed similarity score.
      if (!existing || candidate.score > existing.score) {
        uniqueResults.set(result.id, candidate);
      }
    }
  }

  return [...uniqueResults.values()].sort((a, b) => b.score - a.score);
}

function isContractDraft(value: unknown): value is ContractDraft {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const draft = value as Record<string, unknown>;

  return (
    typeof draft.title === "string" &&
    typeof draft.summary === "string" &&
    Array.isArray(draft.terms) &&
    draft.terms.every(
      (term) =>
        typeof term === "object" &&
        term !== null &&
        typeof (term as Record<string, unknown>).heading === "string" &&
        typeof (term as Record<string, unknown>).content === "string",
    ) &&
    Array.isArray(draft.missingInformation) &&
    draft.missingInformation.every((item) => typeof item === "string") &&
    typeof draft.disclaimer === "string"
  );
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isContractRequest(body)) {
    return Response.json(
      {
        error:
          "projectDescription must be non-empty and all contract terms must be strings",
      },
      { status: 400 },
    );
  }

  const contractRequest: ContractRequest = {
    projectDescription: body.projectDescription.trim(),
    paymentTerms: body.paymentTerms.trim(),
    revisionTerms: body.revisionTerms.trim(),
    cancellationTerms: body.cancellationTerms.trim(),
    deliveryTerms: body.deliveryTerms.trim(),
  };
  const { projectDescription } = contractRequest;
  const userProvidedTerms = [
    `Payment terms: ${contractRequest.paymentTerms || "Not provided"}`,
    `Revision terms: ${contractRequest.revisionTerms || "Not provided"}`,
    `Cancellation terms: ${contractRequest.cancellationTerms || "Not provided"}`,
    `Delivery terms: ${contractRequest.deliveryTerms || "Not provided"}`,
  ].join("\n");
  const projectContext = `${projectDescription}\n${userProvidedTerms}`;

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "OPENROUTER_API_KEY is not configured" },
      { status: 500 },
    );
  }

  // Search for each core policy topic independently.
  // Including the project description preserves relevant context
  // while the beginning of each query focuses retrieval by topic.
  const focusedQueries = [
    `Payment terms, payment schedule, deposits, outstanding payments,
     refunds related to payment, and additional fees.
     Project details and user-provided terms: ${projectContext}`,

    `Included revision rounds, extra revision fees, consolidated
     feedback, and changes to the agreed project scope.
     Project details and user-provided terms: ${projectContext}`,

    `Cancellation terms, refunds after cancellation, completed work,
     and non-refundable agreed costs.
     Project details and user-provided terms: ${projectContext}`,

    `Delivery deadlines, agreed delivery dates, required client
     materials, delays, and revised delivery estimates.
     Project details and user-provided terms: ${projectContext}`,
  ];

  let results: ScoredPolicyResult[];

  try {
    const resultsByQuery = await Promise.all(
      focusedQueries.map((query) => searchPolicies(query, 2)),
    );

    // Merge the four ranked lists and remove duplicate chunks.
    results = mergeAndDeduplicate(resultsByQuery);
  } catch (error) {
    console.error("Policy retrieval failed:", error);

    return Response.json({ error: "Policy search failed" }, { status: 502 });
  }

  console.log(
    "Contract policy retrieval:",
    results.map(({ source, section, score }) => ({
      source,
      section,
      score,
    })),
  );

  const context = results
    .map(
      (result) =>
        `Source: ${result.source}\n` +
        `Section: ${result.section}\n` +
        `Policy text:\n${result.content}`,
    )
    .join("\n\n---\n\n");

  let aiResponse: Response;

  try {
    aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: `
You are a professional business-terms assistant.

Generate a draft of business terms based on the user's project
requirements and the supplied platform policy documents.

RULES:

1. Use the retrieved policies as the primary source of truth for
   platform-specific rules.

2. Do not invent platform policies, fees, deposits, refund guarantees,
   deadlines, or other obligations that are not supported by the
   retrieved policy text.

3. Clearly distinguish project details supplied by the user from
   platform policies.

4. Incorporate every non-empty user-provided term into the draft as a
   project-specific agreement, not as a platform policy. If it conflicts
   with retrieved policy, identify the conflict in missingInformation.

5. If a required policy is unavailable in the retrieved context,
   identify that limitation in missingInformation. Do not pretend
   that the policy was retrieved or confirmed.

6. Identify important project details that the user has not supplied,
   such as pricing, payment schedule, delivery date, or agreed scope,
   when those details are relevant.

7. Do not invent answers for missing project details. Use missingInformation
   to identify what the parties should agree on.

8. You may organize the retrieved policy information into readable
   contract terms, but do not change the meaning of a policy.

9. Return a practical draft, not a claim that the document is legally
   enforceable or has been reviewed by a lawyer.

10. This is a business-terms draft, not legal advice.

11. If no relevant policy text is available, be transparent about that
    limitation instead of fabricating platform rules.

RETRIEVED PLATFORM POLICIES:

${context || "No relevant platform policy chunks were retrieved."}
              `.trim(),
          },
          {
            role: "user",
            content: `Project description:\n${projectDescription}\n\nUser-provided terms:\n${userProvidedTerms}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "contract_draft",
            strict: true,
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                summary: {
                  type: "string",
                },
                terms: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      heading: {
                        type: "string",
                      },
                      content: {
                        type: "string",
                      },
                    },
                    required: ["heading", "content"],
                    additionalProperties: false,
                  },
                },
                missingInformation: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                disclaimer: {
                  type: "string",
                },
              },
              required: [
                "title",
                "summary",
                "terms",
                "missingInformation",
                "disclaimer",
              ],
              additionalProperties: false,
            },
          },
        },
      }),
    });
  } catch (error) {
    console.error("OpenRouter request failed:", error);

    return Response.json({ error: "AI request failed" }, { status: 502 });
  }

  if (!aiResponse.ok) {
    // Keep detailed provider errors in server logs, not the public response.
    console.error(
      "OpenRouter returned status:",
      aiResponse.status,
      await aiResponse.text().catch(() => ""),
    );

    return Response.json({ error: "AI request failed" }, { status: 502 });
  }

  let aiData: {
    choices?: {
      message?: {
        content?: unknown;
      };
    }[];
  };

  try {
    aiData = await aiResponse.json();
  } catch (error) {
    console.error("OpenRouter returned invalid JSON:", error);

    return Response.json(
      { error: "AI returned an invalid response" },
      { status: 502 },
    );
  }

  const content = aiData.choices?.[0]?.message?.content;

  if (typeof content !== "string" || content.length === 0) {
    return Response.json(
      { error: "AI returned no valid content" },
      { status: 502 },
    );
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    return Response.json(
      { error: "AI returned invalid JSON" },
      { status: 502 },
    );
  }

  if (!isContractDraft(parsed)) {
    return Response.json(
      { error: "AI returned an invalid contract structure" },
      { status: 502 },
    );
  }

  return Response.json({
    terms: parsed,
    sources: results.map((result) => ({
      source: result.source,
      section: result.section,
      score: result.score,
    })),
  });
}
