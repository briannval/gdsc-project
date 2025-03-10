import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .queue.mq import MQClient
from .routers import db, scrape, waitlist

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(db.router, prefix="/db")
app.include_router(waitlist.router, prefix="/waitlist")
app.include_router(scrape.router)


@app.on_event("startup")
def start_listening():
    mq_client = MQClient()
    mq_client.start_consumer_thread("scrape_done")
    print("Started listening to RabbitMQ queues.")


@app.get("/")
def home():
    logging.info("Hello GDSC!")
    return {"message": "Hello GDSC!"}
