from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ScrapeRequest(BaseModel):
    url: str


@router.post("/scrape")
async def scrape(body: ScrapeRequest):
    return {"Message": "Test"}
