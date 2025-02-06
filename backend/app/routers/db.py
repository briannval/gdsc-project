from fastapi import APIRouter
from pydantic import BaseModel

from ..utils.local_model import LocalModel
from ..utils.sentence_splitter import SentenceSplitter
from ..utils.vector_store import VectorStore

router = APIRouter()
vector_store = VectorStore()
sentence_splitter = SentenceSplitter()
local_model = LocalModel()


class TextRequest(BaseModel):
    text: str


@router.post("/upload-multiple")
async def upload_multiple(body: TextRequest):
    txt = body.text
    sents = sentence_splitter.split(txt)
    vector_store.upload_vectors(sents)
    return {"Message": "Success"}


@router.post("/upload")
async def upload(body: TextRequest):
    txt = body.text
    vector_store.upload_vector(txt)
    return {"Message": "Success"}


@router.post("/retrieve")
async def retrieve(body: TextRequest):
    txt = body.text
    match_sentences = vector_store.retrieve_vectors(txt)
    joined_sentences = sentence_splitter.join(match_sentences)
    res = local_model.send_query(joined_sentences, txt)
    return {"Message": "Success", "Results": res["message"]["content"]}


@router.delete("/delete")
async def delete(body: TextRequest):
    vector_id = body.text
    vector_store.delete_vector(vector_id)
    return {"Message": "Success"}
