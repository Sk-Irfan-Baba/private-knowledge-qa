
import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter

from ..config import UPLOAD_DIR
from ..database import get_vectorstore

router = APIRouter()


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    if not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="Only .txt files supported.")

    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        loader = TextLoader(file_path, encoding="utf-8")
        documents = loader.load()

        splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = splitter.split_documents(documents)

        if not chunks:
            raise HTTPException(status_code=400, detail="File empty or invalid.")

        db = get_vectorstore()

        texts = [chunk.page_content for chunk in chunks]
        metadatas = [{"source": file.filename} for _ in chunks]

        db.add_texts(texts=texts, metadatas=metadatas)

        return {
            "message": f"Successfully indexed {file.filename} ({len(chunks)} chunks)."
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
