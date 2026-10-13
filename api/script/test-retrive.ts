import { searchPolicies } from "./lib/rag/vsearch";
import { rankWithRRF } from "./lib/rag/rankResults";

const queries = [
  "payment terms and payment schedule",
  "number of included revisions and extra revision fees",
  "cancellation and refunds",
  "delivery deadline and delivery requirements",
];

async function main() {
  const resultsByQuery = await Promise.all(
    queries.map((query) => searchPolicies(query, 2)),
  );

  const ranked = rankWithRRF(queries, resultsByQuery);

  console.dir(
    ranked.map((result) => ({
      id: result.id,
      source: result.source,
      section: result.section,
      similarity: result.score,
      rrfScore: result.rrfScore,
      matchedQueries: result.matchedQueries,
    })),
    { depth: null },
  );
}

main().catch(console.error);
