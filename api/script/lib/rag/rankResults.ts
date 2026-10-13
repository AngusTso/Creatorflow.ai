import type { SearchResult } from "./vsearch";

export interface RankedSearchResult extends SearchResult {
  rrfScore: number;
  matchedQueries: string[];
}

export function rankWithRRF(
  queries: string[],
  resultsByQuery: SearchResult[][],
  k = 60,
): RankedSearchResult[] {
  const merged = new Map<string, RankedSearchResult>();

  for (let i = 0; i < resultsByQuery.length; i++) {
    const results = resultsByQuery[i];
    const query = queries[i];

    for (let rank = 0; rank < results.length; rank++) {
      const result = results[rank];
      const contribution = 1 / (k + rank + 1);

      const existing = merged.get(result.id);

      if (existing) {
        existing.rrfScore += contribution;
        existing.matchedQueries.push(query);
      } else {
        merged.set(result.id, {
          ...result,
          rrfScore: contribution,
          matchedQueries: [query],
        });
      }
    }
  }

  return [...merged.values()].sort((a, b) => b.rrfScore - a.rrfScore);
}
