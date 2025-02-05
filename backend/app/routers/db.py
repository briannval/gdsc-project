from fastapi import APIRouter
from pydantic import BaseModel

from ..utils.sentence_splitter import SentenceSplitter
from ..utils.vector_store import VectorStore

router = APIRouter()
vector_store = VectorStore()
sentence_splitter = SentenceSplitter()


class TextRequest(BaseModel):
    text: str


@router.post("/upload-multiple")
async def upload_multiple(body: TextRequest):
    txt = body.text
    sents = sentence_splitter.split(txt)
    return {"Message": sents}


@router.post("/upload")
async def upload(body: TextRequest):
    txt = body.text
    vector_store.upload_vector(txt)
    return {"Message": "Success"}


@router.post("/retrieve")
async def retrieve(body: TextRequest):
    txt = body.text
    match_sentences = vector_store.retrieve_vectors(txt)
    return {"Message": "Success", "Results": match_sentences}


@router.delete("/delete")
async def delete(body: TextRequest):
    vector_id = body.text
    vector_store.delete_vector(vector_id)
    return {"Message": "Success"}
