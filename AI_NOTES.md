# AI_NOTES.md

## AI Tools Used

During development, I used AI tools (primarily ChatGPT) to:

-   Structure the FastAPI backend
-   Improve modularity and project organization
-   Optimize Railway deployment
-   Debug CORS and deployment issues
-   Improve UI structure and component separation
-   Draft documentation files

All generated code was reviewed, tested, and modified manually to ensure
full understanding.

------------------------------------------------------------------------

## What I Verified Myself

-   Understood how RAG (Retrieval-Augmented Generation) works
-   Verified embedding + retrieval flow
-   Tested vector storage behavior in ChromaDB
-   Debugged deployment logs on Railway
-   Fixed CORS preflight issues
-   Reduced heavy ML dependencies for cloud compatibility
-   Confirmed LLM responses were grounded in retrieved context

------------------------------------------------------------------------

## LLM Provider & Model

**Provider:** Groq\
**Model:** `llama-3.1-8b-instant`

### Why This Model?

-   Fast inference
-   Reliable OpenAI-compatible API
-   Free-tier availability suitable for assessment
-   Good balance between speed and quality

------------------------------------------------------------------------

## Embeddings Choice

Originally considered `sentence-transformers` (Torch-based), but
switched to:

**FastEmbed (ONNX-based)**

### Why?

-   Lightweight
-   No CUDA/GPU dependencies
-   Faster Railway builds
-   Lower memory footprint
-   More suitable for cloud deployment

------------------------------------------------------------------------

## Development Philosophy

AI was used as a productivity tool --- not as blind copy-paste.

All major decisions, debugging steps, deployment adjustments, and
architecture changes were understood and tested manually before
submission.
