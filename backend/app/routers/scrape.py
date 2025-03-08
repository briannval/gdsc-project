from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ScrapeRequest(BaseModel):
    url: str


@router.post("/scrape")
async def scrape_request(body: ScrapeRequest):
    scrape_url = body.url
    return {"Message": scrape_url}
