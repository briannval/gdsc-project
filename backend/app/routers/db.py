from functools import lru_cache

from fastapi import APIRouter
from pinecone import Pinecone, ServerlessSpec
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

from .. import config

router = APIRouter()
model = SentenceTransformer("all-MiniLM-L6-v2")


@lru_cache
def get_settings():
    return config.Settings()


# Pinecone settings
pc = Pinecone(api_key=get_settings().pinecone_api_key)
index_name = "gdsc-project"
try:
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )
except Exception as e:
    if "ALREADY_EXISTS" in str(e):
        print(f"Index '{index_name}' already exists. Skipping creation.")
index = pc.Index(index_name)
namespace_name = "ubc-info"


class TextRequest(BaseModel):
    text: str


@router.post("/upload")
async def upload(body: TextRequest):
    txt = body.text
    vector = model.encode(txt).tolist()
    index.upsert(
        vectors=[{"id": "Chunk-1", "values": vector}], namespace=namespace_name
    )
    print(index.describe_index_stats())
    return {"Message": "Success"}


@router.post("/retrieve")
async def retrieve(body: TextRequest):
    txt = body.text
    query_vector = model.encode(txt).tolist()
    results = index.query(
        vector=query_vector, top_k=5, include_values=True, namespace=namespace_name
    )
    match_vectors = [match["values"] for match in results.matches]
    print(match_vectors)
    return {"Message": "Success", "Results": None}


@router.delete("/delete")
async def delete(body: TextRequest):
    vector_id = body.text
    index.delete(ids=[vector_id], namespace=namespace_name)
    return {"Message": "Success"}
