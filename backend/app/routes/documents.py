
from fastapi import APIRouter
from ..database import get_vectorstore

router = APIRouter()


@router.get("/documents")
def get_documents():
    try:
        db = get_vectorstore()
        data = db.get()
        metadatas = data["metadatas"] or []

        unique_files = list(
            set(
                [
                    m.get("source")
                    for m in metadatas
                    if m.get("source")
                ]
            )
        )

        return {"documents": unique_files, "count": len(unique_files)}

    except Exception:
        return {"documents": [], "count": 0}
