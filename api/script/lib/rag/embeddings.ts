const EMBEDDING_MODEL = "nvidia/nemotron-3-embed-1b:free";
const MIN_EMBEDDING_INTERVAL_MS = 3_100;
const MAX_RATE_LIMIT_RETRIES = 5;
let nextEmbeddingRequestAt = 0;

async function waitForEmbeddingSlot() {
  const waitMs = Math.max(0, nextEmbeddingRequestAt - Date.now());

  if (waitMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  nextEmbeddingRequestAt = Date.now() + MIN_EMBEDDING_INTERVAL_MS;
}

function getRetryDelayMs(retryAfter: string | null, attempt: number): number {
  if (retryAfter) {
    const seconds = Number(retryAfter);

    if (Number.isFinite(seconds)) {
      return Math.max(0, seconds * 1_000);
    }

    const retryAt = Date.parse(retryAfter);

    if (!Number.isNaN(retryAt)) {
      return Math.max(0, retryAt - Date.now());
    }
  }

  return Math.min(60_000, 5_000 * 2 ** attempt);
}

export async function createEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  let response: Response;

  for (let attempt = 0; ; attempt += 1) {
    await waitForEmbeddingSlot();
    response = await fetch("https://openrouter.ai/api/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: EMBEDDING_MODEL,
        input: text,
      }),
    });

    if (response.status !== 429) {
      break;
    }

    const errorText = await response.text();

    if (attempt >= MAX_RATE_LIMIT_RETRIES) {
      console.error("Embedding API rate limit error", errorText);
      throw new Error("Embedding request exceeded rate-limit retries");
    }

    const retryDelayMs = getRetryDelayMs(
      response.headers.get("retry-after"),
      attempt,
    );

    console.warn(
      `Embedding rate limited; retrying in ${Math.ceil(retryDelayMs / 1_000)}s (${attempt + 1}/${MAX_RATE_LIMIT_RETRIES})`,
    );

    await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
  }

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Embedding API error", errorText);

    throw new Error("Embedding request failed");
  }

  const data = await response.json();

  const embedding = data.data?.[0]?.embedding;

  if (!Array.isArray(embedding)) {
    throw new Error("Embedding API returned an invalid embedding");
  }

  return embedding;
}
