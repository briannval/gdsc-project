# Requires local LLM with Ollama

import json

import requests


class LocalModel:
    def __init__(self):
        self.model = "mistral:7b-instruct"
        self.system_message = """
        You are an assistant that provides information about the University of British Columbia (UBC).
        You MUST ONLY use the provided documents for answering.
        If the answer is not in the documents, reply strictly with: 'I don’t have the information.'
        Additionally, DO NOT provide context that you are answering according to the document, just provide the answer.
        """
        self.localhost_url = "http://localhost:11434"

    def check_connection(self):
        try:
            response = requests.get(self.localhost_url, timeout=5)
            return response.status_code == 200
        except requests.exceptions.RequestException as e:
            return False

    def send_query(self, documents, query):
        if not self.check_connection():
            return None

        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": self.system_message,
                },
                {
                    "role": "user",
                    "content": "Below are the only documents you are allowed to use:\n\n"
                    + documents,
                },
                {
                    "role": "user",
                    "content": "Now, based ONLY on these documents, answer this query:\n"
                    + query,
                },
            ],
            "stream": False,
        }
        json_payload = json.dumps(payload)
        response = requests.post(self.localhost_url + "/api/chat", data=json_payload)

        if response.status_code == 200:
            return response.json()
        else:
            return None
