

from fastapi import APIRouter
from groq import Groq
from ..config import GROQ_API_KEY
from ..database import get_vectorstore

router = APIRouter()

groq_client = Groq(api_key=GROQ_API_KEY)


@router.get("/")
def health_check():
    status = {
        "status": "online",
        "database": "unknown",
        "llm_connection": "unknown"
    }

    try:
        db = get_vectorstore()
        doc_count = len(db.get()['ids'])
        status["database"] = f"connected (documents indexed: {doc_count})"
    except Exception as e:
        status["database"] = f"error: {str(e)}"

    try:
        groq_client.models.list()
        status["llm_connection"] = "connected"
    except Exception as e:
        status["llm_connection"] = f"error: {str(e)}"

    return status
