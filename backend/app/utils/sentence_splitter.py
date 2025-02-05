import nltk
from nltk.tokenize import sent_tokenize


class SentenceSplitter:
    def __init__(self):
        nltk.download("punkt")
        nltk.download("punkt_tab")

    def split(self, text):
        return sent_tokenize(text)
