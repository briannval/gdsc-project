from fastapi import FastAPI

from .routers import db

app = FastAPI()
app.include_router(db.router, prefix="/db")


@app.get("/")
def home():
    return {"message": "Hello GDSC!"}
