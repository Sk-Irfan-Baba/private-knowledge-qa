
from typing import List
from sentence_transformers import SentenceTransformer
from langchain_core.embeddings import Embeddings
from .config import logger

try:
    logger.info("Loading embedding model...")
    _model = SentenceTransformer("all-MiniLM-L6-v2")
    logger.info("Embedding model loaded.")
except Exception as e:
    logger.error(f"Failed to load embedding model: {e}")
    _model = None


class LocalHFEmbeddings(Embeddings):

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        if not _model:
            raise ValueError("Model not loaded")
        return _model.encode(texts).tolist()

    def embed_query(self, text: str) -> List[float]:
        if not _model:
            raise ValueError("Model not loaded")
        return _model.encode([text])[0].tolist()
