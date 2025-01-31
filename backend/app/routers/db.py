from functools import lru_cache

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from .. import config

router = APIRouter()


@lru_cache
def get_settings():
    return config.Settings()


class TextRequest(BaseModel):
    text: str


@router.post("/upload")
async def upload(body: TextRequest, settings: config.Settings = Depends(get_settings)):
    return {"Message": body.text}


@router.post("/retrieve")
async def retrieve(
    body: TextRequest, settings: config.Settings = Depends(get_settings)
):
    return {"Message": body.text}
