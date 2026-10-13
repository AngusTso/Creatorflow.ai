export interface PolicyChunk {
  id: string;
  content: string;
  source: string;
  section: string;
}

export function chunkDocument(content: string, source: string): PolicyChunk[] {
  const sections = content.split(/^## /m);

  const chunks: PolicyChunk[] = [];

  for (const section of sections) {
    const trimmed = section.trim();

    if (!trimmed) {
      continue;
    }

    const lines = trimmed.split("\n");
    const sectionTitle = lines[0].trim();
    const sectionContent = lines.slice(1).join("\n").trim();

    if (!sectionContent) {
      continue;
    }

    chunks.push({
      id: `${source}:${sectionTitle}`,
      content: sectionContent,
      source,
      section: sectionTitle,
    });

  }

  return chunks;
}
