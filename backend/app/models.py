
from pydantic import BaseModel
from typing import List


class QueryRequest(BaseModel):
    question: str


class Source(BaseModel):
    source_file: str
    content_snippet: str


class QueryResponse(BaseModel):
    answer: str
    sources: List[Source]
