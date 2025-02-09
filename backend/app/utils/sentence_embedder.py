from sentence_transformers import SentenceTransformer


class SentenceEmbedder:
    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

    def encode(self, sentences: list[str]) -> list[list[float]]:
        return self.model.encode(sentences).tolist()
