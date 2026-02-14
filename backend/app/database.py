
from langchain_chroma import Chroma
from .embeddings import LocalHFEmbeddings
from .config import DB_DIR


def get_vectorstore():
    return Chroma(
        collection_name="user_documents",
        embedding_function=LocalHFEmbeddings(),
        persist_directory=DB_DIR
    )
