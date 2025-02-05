from functools import lru_cache

from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer

from .. import config

model = SentenceTransformer("all-MiniLM-L6-v2")


@lru_cache()
def get_settings():
    return config.Settings()


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


def upload_vector(text: str):
    vector = model.encode(text).tolist()
    curr_vector_count = (index.describe_index_stats())["total_vector_count"]
    new_vector_count = int(curr_vector_count) + 1
    index.upsert(
        vectors=[
            {
                "id": "Chunk-" + str(new_vector_count),
                "values": vector,
                "metadata": {"sentence": text},
            }
        ],
        namespace=namespace_name,
    )


def retrieve_vectors(text: str):
    query_vector = model.encode(text).tolist()
    results = index.query(
        vector=query_vector,
        top_k=5,
        include_values=True,
        include_metadata=True,
        namespace=namespace_name,
    )
    return [match["metadata"]["sentence"] for match in results.matches]


def delete_vector(vector_id: str):
    index.delete(ids=[vector_id], namespace=namespace_name)
