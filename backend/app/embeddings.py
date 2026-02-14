# app/embeddings.py

from typing import List
from langchain_core.embeddings import Embeddings
from fastembed import TextEmbedding


class FastEmbedEmbeddings(Embeddings):
    def __init__(self):
        self.model = TextEmbedding(
            model_name="BAAI/bge-small-en-v1.5"
        )

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        embeddings = list(self.model.embed(texts))
        return [e.tolist() for e in embeddings]

    def embed_query(self, text: str) -> List[float]:
        return list(self.model.embed([text]))[0].tolist()
