import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";

interface EmbeddedChunk {
  id: string;
  content: string;
  source: string;
  section: string;
  embedding: number[];
}

function isEmbeddedChunk(value: unknown): value is EmbeddedChunk {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.content === "string" &&
    typeof item.source === "string" &&
    typeof item.section === "string" &&
    Array.isArray(item.embedding) &&
    item.embedding.length > 0 &&
    item.embedding.every((n) => typeof n === "number" && Number.isFinite(n))
  );
}

async function main() {
  // Load .env.local BEFORE importing the database module.
  dotenv.config({ path: ".env.local" });

  const { supabase } = await import("./database");

  const indexPath = path.join(process.cwd(), "data", "policy_embeddings.json");

  const raw = await fs.readFile(indexPath, "utf8");
  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed) || !parsed.every(isEmbeddedChunk)) {
    throw new Error(
      "The JSON index does not match the expected chunk structure",
    );
  }

  const chunks = parsed as EmbeddedChunk[];

  if (chunks.length === 0) {
    throw new Error("The policy index is empty");
  }

  const dimension = chunks[0].embedding.length;

  if (chunks.some((chunk) => chunk.embedding.length !== dimension)) {
    throw new Error("Inconsistent embedding dimensions");
  }

  if (new Set(chunks.map((chunk) => chunk.id)).size !== chunks.length) {
    throw new Error("Duplicate chunk IDs found in JSON index");
  }

  console.log(`Chunks: ${chunks.length}`);
  console.log(`Vector dimensions: ${dimension}`);

  const rows = chunks.map((chunk) => ({
    id: chunk.id,
    content: chunk.content,
    source: chunk.source,
    section: chunk.section,
    embedding: chunk.embedding,
  }));

  const batchSize = 50;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    const { error } = await supabase
      .from("policy_chunks")
      .upsert(batch, { onConflict: "id" });

    if (error) {
      throw new Error(`Migration failed near row ${i}: ${error.message}`);
    }

    console.log(
      `Migrated ${Math.min(i + batchSize, rows.length)} / ${rows.length}`,
    );
  }

  console.log("Migration completed");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
