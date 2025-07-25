from pinecone import Pinecone, ServerlessSpec

from .. import config
from .sentence_embedder import SentenceEmbedder


class VectorStore:
    def __init__(self):
        self.model = SentenceEmbedder()
        self.settings = config.Settings()
        self.pc = Pinecone(api_key=self.settings.pinecone_api_key)
        self.index_name = "gdsc-project"
        self.namespace_name = "ubc-info"
        self.create_index()
        self.index = self.pc.Index(self.index_name)

    def create_index(self):
        try:
            self.pc.create_index(
                name=self.index_name,
                dimension=384,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1"),
            )
        except Exception as e:
            if "ALREADY_EXISTS" in str(e):
                print(f"Index '{self.index_name}' already exists. Skipping creation.")

    def upsert_index(self, res):
        self.index.upsert(
            vectors=res,
            namespace=self.namespace_name,
        )

    def upload_vectors(self, sents: list[str]):
        vectors = self.model.encode(sents)
        curr_vector_count = self.index.describe_index_stats()["total_vector_count"]
        vector_data = [
            {
                "id": f"Chunk-{curr_vector_count + i + 1}",
                "values": vectors[i],
                "metadata": {"sentence": sents[i]},
            }
            for i in range(len(sents))
        ]
        self.upsert_index(vector_data)

    def upload_vector(self, text: str):
        vector = self.model.encode([text])[0]
        curr_vector_count = (self.index.describe_index_stats())["total_vector_count"]
        new_vector_count = int(curr_vector_count) + 1
        res = [
            {
                "id": "Chunk-" + str(new_vector_count),
                "values": vector,
                "metadata": {"sentence": text},
            }
        ]
        self.upsert_index(res)

    def retrieve_vectors(self, text: str):
        query_vector = self.model.encode([text])[0]
        results = self.index.query(
            vector=query_vector,
            top_k=5,
            include_values=True,
            include_metadata=True,
            namespace=self.namespace_name,
        )
        return [match["metadata"]["sentence"] for match in results.matches]

    def delete_vector(self, vector_id: str):
        self.index.delete(ids=[vector_id], namespace=self.namespace_name)
