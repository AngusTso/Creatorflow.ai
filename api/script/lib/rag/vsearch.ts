import policyIndex from "../../data/policy_embeddings.json";
import { createEmbedding } from "./embeddings";

interface EmbeddedChunk {
  id: string;
  content: string;
  source: string;
  section: string;
  embedding: number[];
}

export interface SearchResult {
  id: string;
  content: string;
  source: string;
  section: string;
  score: number;
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, value, index) => sum + value * b[index], 0);

  const magnitudeA = Math.sqrt(
    a.reduce((sum, value) => sum + value * value, 0),
  );

  const magnitudeB = Math.sqrt(
    b.reduce((sum, value) => sum + value * value, 0),
  );

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

function loadIndex(): EmbeddedChunk[] {
  return policyIndex;
}

export async function searchPolicies(
  query: string,
  topK = 3,
): Promise<SearchResult[]> {
  const queryEmbedding = await createEmbedding(query);

  const index = loadIndex();

  const results = index.map((chunk) => ({
    id: chunk.id,
    content: chunk.content,
    source: chunk.source,
    section: chunk.section,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, topK);
}
