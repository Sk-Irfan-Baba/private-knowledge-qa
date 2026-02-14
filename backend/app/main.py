
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import health, upload, query, documents
from .config import get_allowed_origins

app = FastAPI(title="Private Knowledge Q&A API")

# Load CORS from environment
allowed_origins = get_allowed_origins()

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(upload.router)
app.include_router(query.router)
app.include_router(documents.router)


if __name__ == "__main__":
    import os
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000))
    )

