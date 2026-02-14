
import os
from fastapi import APIRouter, HTTPException
from groq import Groq

from ..models import QueryRequest, QueryResponse, Source
from ..database import get_vectorstore
from ..config import GROQ_API_KEY

router = APIRouter()

groq_client = Groq(api_key=GROQ_API_KEY)


@router.post("/query", response_model=QueryResponse)
async def query_documents(request: QueryRequest):

    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    try:
        db = get_vectorstore()

        if not db.get()["ids"]:
            return QueryResponse(answer="No documents uploaded.", sources=[])

        results_with_scores = db.similarity_search_with_score(
            request.question, k=5
        )

        filtered_results = [
            (doc, score)
            for doc, score in results_with_scores
            if score < 1.2
        ]

        if not filtered_results and results_with_scores:
            filtered_results = [results_with_scores[0]]

        results = [doc for doc, _ in filtered_results]

        if not results:
            return QueryResponse(
                answer="I couldn't find relevant info.",
                sources=[]
            )

        context_text = "\n\n".join(
            [
                f"Source ({doc.metadata.get('source')}): {doc.page_content}"
                for doc in results
            ]
        )

        system_prompt = "You are a helpful assistant. Answer ONLY from context."
        user_prompt = f"Context:\n{context_text}\n\nQuestion: {request.question}"

        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            model="llama-3.1-8b-instant",
            max_tokens=300,
            temperature=0.1,
        )

        answer = chat_completion.choices[0].message.content

        sources_list = []

        for doc in results:
            raw_source = doc.metadata.get("source", "unknown")
            clean_source = os.path.basename(raw_source)

            sources_list.append(
                Source(
                    source_file=clean_source,
                    content_snippet=doc.page_content[:150] + "..."
                )
            )

        return QueryResponse(answer=answer, sources=sources_list)

    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
