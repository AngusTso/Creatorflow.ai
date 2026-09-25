export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json();

  console.log(body);

  if (typeof body.script !== "string" || body.script.trim().length === 0) {
    return Response.json(
      { error: "script must be a non-empty string" },
      { status: 400 },
    );
  }

  const script = body.script.trim();

  const wordCount = script.split(/\s+/).length;

  const characterCount = script.length;

  if (!OPENROUTER_API_KEY) {
    return Response.json(
      { error: "OPENROUTER_API_KEY is not configured" },
      { status: 500 },
    );
  }

  const aiResponse = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:frees",
        messages: [
          {
            role: "system",
            content: `
            You analyze voice-acting scripts.

            Analyze the script and return the requested structured fields.

            each field include a short but concise sentence
            
            Do not include any additional information.
            `,
          },
          {
            role: "user",
            content: script,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "script_analysis",
            strict: true,
            schema: {
              type: "object",
              properties: {
                summary: {
                  type: "string",
                },
                tone: { type: "string" },
                emotion: { type: "string" },
                vocalDifficulty: { type: "string" },
                voiceDirection: { type: "string" },
                workloadEstimate: { type: "string" },
              },
            },
            required: [
              "summary",
              "tone",
              "emotion",
              "vocalDifficulty",
              "voiceDirection",
              "workloadEstimate",
            ],
            additionalProperties: false,
          },
        },
      }),
    },
  );

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text();

    console.error("OpenRouter error:", errorText);

    return Response.json({ error: "AI request failed" }, { status: 502 });
  }

  const aiData = await aiResponse.json();

  const content = aiData.choices[0].message.content;

  const analysis = JSON.parse(content);

  return Response.json({
    analysis,
    wordCount,
    characterCount,
  });
}
