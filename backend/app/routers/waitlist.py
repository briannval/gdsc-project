from fastapi import APIRouter
from pydantic import BaseModel

from ..utils.supabase_db import SupabaseDB

router = APIRouter()
supabase_db = SupabaseDB()


class WaitlistRequest(BaseModel):
    name: str
    email: str
    gender: str
    faculty: str
    year: int
    major: str
    annoyance: str
    improvement: str
    survey: str


@router.get("/fetch")
async def fetch_waitlist():
    return supabase_db.get_waitlist()


@router.post("/insert")
async def insert_waitlist(body: WaitlistRequest):
    return supabase_db.add_waitlist(dict(body))
