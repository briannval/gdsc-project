import json
from datetime import datetime
from functools import lru_cache

import boto3

from .. import config
from .sentence_embedder import SentenceEmbedder


class S3Store:
    def __init__(self):
        self.model = SentenceEmbedder()
        self.settings = self.get_settings()
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=self.settings.aws_access_key,
            aws_secret_access_key=self.settings.aws_secret_key,
            region_name="us-east-2",
        )
        self.bucket_name = "gdsc-advising"

    @lru_cache()
    def get_settings(self):
        return config.Settings()

    def upload_to_s3(self, file_name, data):
        file_content = json.dumps(data)
        self.s3_client.put_object(
            Bucket=self.bucket_name,
            Key=file_name,
            Body=file_content,
            ContentType="application/json",
        )

    def upload_vectors(self, sents, file_name, url):
        vectors = self.model.encode(sents)
        data = {
            "url": url,
            "sentences": sents,
            "embeddings": vectors,
        }
        self.upload_to_s3(file_name, data)
