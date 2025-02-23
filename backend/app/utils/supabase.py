from supabase import Client, create_client

from . import get_settings


class Supabase:
    def __init__(self):
        self.settings = get_settings()
        self.supabase_client: Client = create_client(
            self.settings.supabase_url, self.settings.supabase_api_key
        )
