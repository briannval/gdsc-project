from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class TextRequest(BaseModel):
    text: str


@router.post("/upload")
async def upload(body: TextRequest):
    return {"Message": body.text}


@router.post("/retrieve")
async def retrieve(body: TextRequest):
    return {"Message": body.text}
