from fastapi import APIRouter
from pydantic import BaseModel

from ..queue.mq import MQClient

router = APIRouter()
mqclient = MQClient()


class ScrapeRequest(BaseModel):
    url: str


@router.post("/scrape")
async def scrape_request(body: ScrapeRequest):
    scrape_url = body.url
    mqclient.publish("scrape_request", scrape_url)
    return {"Message": scrape_url}
