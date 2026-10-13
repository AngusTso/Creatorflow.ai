import { searchPolicies } from "./lib/rag/vsearch";

export default async function handler() {
  const results = await searchPolicies(
    "Can the client request more revisions?",
    3,
  );

  console.log(results);

  return Response.json(results);
}

handler().catch(console.error);
