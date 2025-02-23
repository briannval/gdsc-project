from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import db, waitlist

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


@app.get("/")
def home():
    return {"message": "Hello GDSC!"}
