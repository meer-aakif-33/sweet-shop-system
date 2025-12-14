from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

# Resolve project root
BASE_DIR = Path(__file__).resolve().parents[3]

class Settings(BaseSettings):
    DATABASE_URL: str = f"sqlite:///{BASE_DIR}/db.sqlite3"
    JWT_SECRET: str = "dev-secret"
    JWT_ALGORITHM: str = "HS256"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

settings = Settings()
