import { searchPolicies } from "./lib/rag/vsearch";

const queries = [
  "payment terms and payment schedule",
  "number of included revisions and extra revision fees",
  "cancellation and refunds",
  "delivery deadline and delivery requirements",
];

async function main() {
  for (const query of queries) {
    const results = await searchPolicies(query, 2);

    console.log(`\nQuery: ${query}`);
    console.table(
      results.map((result) => ({
        section: result.section,
        source: result.source,
        score: result.score,
      })),
    );
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
