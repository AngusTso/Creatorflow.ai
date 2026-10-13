import { createEmbedding } from "./embeddings";
import { supabase } from "../../database";

export interface SearchResult {
  id: string;
  content: string;
  source: string;
  section: string;
  score: number;
}

export async function searchPolicies(
  query: string,
  topK = 3,
): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const queryEmbedding = await createEmbedding(query);

  if (
    !Array.isArray(queryEmbedding) ||
    queryEmbedding.length === 0 ||
    !queryEmbedding.every((n) => typeof n === "number" && Number.isFinite(n))
  ) {
    throw new Error("Embedding model returned an invalid vector");
  }

  const { data, error } = await supabase.rpc("match_policy_chunks", {
    query_embedding: queryEmbedding,
    match_count: Math.max(1, Math.min(topK, 10)),
  });

  if (error) {
    console.error("Database policy search failed:", error.message);
    throw new Error("Could not search policy documents");
  }

  if (!data) {
    return [];
  }

  return data.map((row: SearchResult) => ({
    id: row.id,
    content: row.content,
    source: row.source,
    section: row.section,
    score: Number(row.score),
  }));
}
