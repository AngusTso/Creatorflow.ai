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

export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) {
    return [];
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  let response: Response;
  const startedAt = Date.now();
  console.info("Policy embedding batch started", { count: texts.length });

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
        input: texts,
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
  const items = (data as { data?: unknown }).data;

  if (!Array.isArray(items) || items.length !== texts.length) {
    throw new Error("Embedding API returned an unexpected number of vectors");
  }

  const embeddings: (number[] | undefined)[] = Array(texts.length).fill(
    undefined,
  );

  for (const [position, item] of items.entries()) {
    if (typeof item !== "object" || item === null) {
      throw new Error("Embedding API returned an invalid embedding");
    }

    const result = item as { index?: unknown; embedding?: unknown };
    const index =
      Number.isInteger(result.index) &&
      (result.index as number) >= 0 &&
      (result.index as number) < texts.length
        ? (result.index as number)
        : position;
    const embedding = result.embedding;

    if (
      embeddings[index] !== undefined ||
      !Array.isArray(embedding) ||
      embedding.length === 0 ||
      !embedding.every(
        (value) => typeof value === "number" && Number.isFinite(value),
      )
    ) {
      throw new Error("Embedding API returned an invalid embedding");
    }

    embeddings[index] = embedding;
  }

  const completeEmbeddings: number[][] = [];

  for (const embedding of embeddings) {
    if (!embedding) {
      throw new Error("Embedding API returned an incomplete embedding batch");
    }

    completeEmbeddings.push(embedding);
  }

  console.info("Policy embedding batch completed", {
    count: texts.length,
    elapsedMs: Date.now() - startedAt,
  });

  return completeEmbeddings;
}

export async function createEmbedding(text: string): Promise<number[]> {
  const [embedding] = await createEmbeddings([text]);

  if (!embedding) {
    throw new Error("Embedding API returned no embedding");
  }

  return embedding;
}
