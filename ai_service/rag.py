from pathlib import Path
from app import create_embedding, ask_llm
import helper_function as h

def load_document():
    docs = []

    knowledge_dir = Path("Knowledge")

    for file_path in knowledge_dir.glob("*.md"):
        text = file_path.read_text(encoding="utf-8")

        docs.append({
            "source": file_path.name,
            "text": text
        })

    return docs

def chunk_document(text):
    chunk = []

    paragraphs = text.split("\n\n")

    for paragraph in paragraphs:
        paragraph = paragraph.strip()

        if paragraph:
            chunk.append(paragraph)
            
    return chunk

def build_index(documents):
    index = []

    for document in documents:
        chunks = chunk_document(document["text"])

        for chunk in chunks:
            embedding = create_embedding(chunk)

            index.append({
                "source": document["source"],
                "text": chunk,
                "embedding": embedding
            })

    return index

def search(query, index, top_k=3):
    query_embedding = create_embedding(query)

    res = []

    for item in index:
        score = h.cosine_similarity(query_embedding, item["embedding"])

        res.append({
            "source": item["source"],
            "text": item["text"],
            "score": score
        })

    res.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    return res[:top_k]

documents = load_document()

index = build_index(documents)

question = "What sample rate should I use for recording?"

results = search(
    question,
    index,
    top_k=3
)

for result in results:
    print("Source:", result["source"])
    print("Score:", result["score"])
    print("Text:", result["text"])
    print("---")

context = "\n\n".join(
        result["text"]
        for result in results
)

answer = ask_llm(
system_prompt="""
You are a creator policy assistant.

Answer the user's question using only the provided knowledge base context.

If the context does not contain enough information to answer,
say that the knowledge base does not provide enough information.
""",
user_prompt=f"""
Knowledge base context:

{context}

Question:

{question}
"""
)

print("\nAnswer:")
print(answer)
