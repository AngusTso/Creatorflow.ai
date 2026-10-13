import fs from "node:fs/promises";
import path from "node:path";
import { chunkDocument } from "./api/script/lib/rag/chunker";
import { createEmbedding } from "./api/script/lib/rag/embeddings";

const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");
const OUTPUT_DIR = path.join(process.cwd(), "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "policy_embeddings.json");

async function main() {
  const files = await fs.readdir(KNOWLEDGE_DIR);

  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const embeddedChunks = [];

  for (const file of markdownFiles) {
    console.log(`Processing ${file}...`);

    const filePath = path.join(KNOWLEDGE_DIR, file);
    const content = await fs.readFile(filePath, "utf-8");

    const chunks = chunkDocument(content, file);

    console.log(`  Found ${chunks.length} chunks`);

    for (const chunk of chunks) {
      console.log(`  Embedding: ${chunk.section}`);

      const embedding = await createEmbedding(chunk.content);

      embeddedChunks.push({
        ...chunk,
        embedding,
      });
    }
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(embeddedChunks, null, 2),
    "utf-8",
  );

  console.log("");
  console.log(`Done.`);
  console.log(`Embedded ${embeddedChunks.length} chunks.`);
  console.log(`Saved to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error("Indexing failed:", error);
  process.exit(1);
});
