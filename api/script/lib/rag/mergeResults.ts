import type { SearchResult } from "./vsearch";

export function mergeAndDeduplicate(
  resultsByQuery: SearchResult[][],
): SearchResult[] {
  const uniqueResults = new Map<string, SearchResult>();

  for (const results of resultsByQuery) {
    for (const result of results) {
      const existing = uniqueResults.get(result.id);

      if (!existing || result.score > existing.score) {
        uniqueResults.set(result.id, result);
      }
    }
  }

  return [...uniqueResults.values()].sort((a, b) => b.score - a.score);
}
