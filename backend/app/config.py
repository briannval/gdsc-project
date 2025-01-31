from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    pinecone_api_key: str

    model_config = SettingsConfigDict(env_file=".env")
