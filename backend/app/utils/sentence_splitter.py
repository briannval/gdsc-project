import nltk
from nltk.tokenize import sent_tokenize
from nltk.tokenize.treebank import TreebankWordDetokenizer


class SentenceSplitter:
    def __init__(self):
        nltk.download("punkt")
        nltk.download("punkt_tab")

    def split(self, text):
        return sent_tokenize(text)

    def join(self, sents):
        return TreebankWordDetokenizer().detokenize(sents)
