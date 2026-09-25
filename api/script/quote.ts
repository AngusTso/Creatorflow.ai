export const config = {
  runtime: "edge",
};

import { calculateQuote } from "./calculateQuote";

type Currency = "USD" | "HKD" | "JPY";

interface QuoteRequest {
  projectDescription: string;
  currency: Currency;
  hourlyRate?: number;
}

const DEFAULT_RATES: Record<Currency, number> = {
  USD: 50,
  HKD: 450,
  JPY: 5000,
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    return Response.json(
      { error: "OPENROUTER_API_KEY is not configured" },
      { status: 500 },
    );
  }

  let body: QuoteRequest;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body.projectDescription !== "string" ||
    body.projectDescription.trim().length === 0
  ) {
    return Response.json(
      { error: "projectDescription must be a non-empty string" },
      { status: 400 },
    );
  }

  if (
    body.currency !== "USD" &&
    body.currency !== "HKD" &&
    body.currency !== "JPY"
  ) {
    return Response.json(
      { error: "currency must be USD, HKD, or JPY" },
      { status: 400 },
    );
  }

  const currency = body.currency;

  const hourlyRate =
    typeof body.hourlyRate === "number"
      ? body.hourlyRate
      : DEFAULT_RATES[currency];

  if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) {
    return Response.json(
      { error: "hourlyRate must be a positive number" },
      { status: 400 },
    );
  }

  const projectDescription = body.projectDescription.trim();

  const tools = [
    {
      type: "function",
      function: {
        name: "calculateQuote",
        description:
          "Calculate the final project quote from estimated hours and hourly rate.",
        parameters: {
          type: "object",
          properties: {
            hours: {
              type: "number",
              description: "Estimated number of hours required.",
            },
            hourlyRate: {
              type: "number",
              description: "Hourly rate for the project.",
            },
          },
          required: ["hours", "hourlyRate"],
        },
      },
    },
  ];

  //Actual firtstLLM Request section for tools calling

  const aiResponse = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: `You are a project quotation assistant.

            Analyze the user's project description and estimate
            the number of hours required.

            You MUST use the calculateQuote tool to calculate
            the final price.

            Do not perform the price arithmetic yourself.

            The hourly rate supplied to the tool must be:
            ${hourlyRate}

            The currency is:
            ${currency}
            `,
          },
          {
            role: "user",
            content: projectDescription,
          },
        ],
        tools,
        tool_choice: "auto",
      }),
    },
  );

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text();
    console.error("OpenRouter error:", errorText);

    return Response.json({ error: "Ai request failed" }, { status: 502 });
  }

  const aiData = await aiResponse.json();

  const message = aiData.choices?.[0]?.message;

  if (!message) {
    return Response.json(
      { error: "AI returned an invalid response" },
      { status: 502 },
    );
  }

  const toolCall = message.tool_calls?.[0];

  if (!toolCall) {
    return Response.json(
      { error: "AI did not request the quote calculation tool" },
      { status: 502 },
    );
  }

  if (toolCall.function?.name !== "calculateQuote") {
    return Response.json(
      { error: "AI requested an unknown tool" },
      { status: 502 },
    );
  }

  let toolArguments: {
    hours: number;
    hourlyRate: number;
  };

  try {
    toolArguments = JSON.parse(toolCall.function.arguments);
  } catch {
    return Response.json(
      { error: "AI returned invalid tool arguments" },
      { status: 502 },
    );
  }

  if (
    typeof toolArguments.hours !== "number" ||
    !Number.isFinite(toolArguments.hours) ||
    toolArguments.hours <= 0
  ) {
    return Response.json(
      { error: "AI returned an invalid hour estimate" },
      { status: 502 },
    );
  }

  // --------------------------------------------------
  // 8. Execute our deterministic function
  // --------------------------------------------------

  const quote = calculateQuote({
    hours: toolArguments.hours,
    hourlyRate,
  });

  // --------------------------------------------------
  // 9. Second LLM request
  // --------------------------------------------------

  const finalResponse = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",

        messages: [
          {
            role: "system",
            content: `
                You are a project quotation assistant.

                Give the user a concise quote summary.

                Do not change the calculated numbers.
                Do not perform new calculations.
            `,
          },

          {
            role: "user",
            content: projectDescription,
          },

          message,

          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(quote),
          },
        ],
      }),
    },
  );

  if (!finalResponse.ok) {
    return Response.json(
      { error: "AI failed to generate the final quote summary" },
      { status: 502 },
    );
  }

  const finalData = await finalResponse.json();

  const summary =
    finalData.choices?.[0]?.message?.content || "Quote generated successfully.";

  // --------------------------------------------------
  // 10. Return our frontend contract
  // --------------------------------------------------

  return Response.json({
    currency,
    hourlyRate: quote.hourlyRate,
    hours: quote.hours,
    total: quote.total,
    summary,
  });
}
