
import os
import logging
from dotenv import load_dotenv
from typing import List

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

UPLOAD_DIR = "uploaded_docs"
DB_DIR = "chroma_db_storage"

os.makedirs(UPLOAD_DIR, exist_ok=True)

# --------------------
# CORS Configuration
# --------------------

def get_allowed_origins() -> List[str]:
    origins = os.getenv("ALLOWED_ORIGINS", "")
    
    if not origins:
        logger.warning("⚠️ No ALLOWED_ORIGINS set. Defaulting to localhost.")
        return ["http://localhost:3000","https://private-knowledge-qa-red.vercel.app/"]
    
    return [origin.strip() for origin in origins.split(",")]
