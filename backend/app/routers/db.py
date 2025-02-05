from fastapi import APIRouter
from pydantic import BaseModel

from ..utils.vector_store import delete_vector, retrieve_vectors, upload_vector

router = APIRouter()


class TextRequest(BaseModel):
    text: str


@router.post("/upload")
async def upload(body: TextRequest):
    txt = body.text
    upload_vector(txt)
    return {"Message": "Success"}


@router.post("/retrieve")
async def retrieve(body: TextRequest):
    txt = body.text
    match_sentences = retrieve_vectors(txt)
    return {"Message": "Success", "Results": match_sentences}


@router.delete("/delete")
async def delete(body: TextRequest):
    vector_id = body.text
    delete_vector(vector_id)
    return {"Message": "Success"}
