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
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: `
            You analyze voice-acting scripts.

            Return ONLY valid JSON with exactly these fields:

            {
            "summary": "string",
            "tone": "string",
            "emotion": "string",
            "vocalDifficulty": "string",
            "voiceDirection": "string",
            "workloadEstimate": "string"
            }

            Do not include markdown.
            Do not include additional fields.
            `,
          },
          {
            role: "user",
            content: script,
          },
        ],
      }),
    },
  );

  const aiData = await aiResponse.json();

  const content = aiData.choices[0].message.content;

  const analysis = JSON.parse(content);

  return Response.json({
    analysis,
    wordCount,
    characterCount,
  });
}
