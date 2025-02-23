from supabase import Client, create_client

from .. import config


class SupabaseDB:
    def __init__(self):
        self.settings = config.Settings()
        self.supabase_client: Client = create_client(
            self.settings.supabase_url, self.settings.supabase_api_key
        )

    def get_waitlist(self):
        return self.supabase_client.table("Waitlist").select("*").execute()

    def add_waitlist(self, entry):
        return self.supabase_client.table("Waitlist").insert(entry).execute()
