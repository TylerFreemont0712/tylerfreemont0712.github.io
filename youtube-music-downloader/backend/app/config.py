"""Application configuration"""

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings"""

    # API Settings
    APP_NAME: str = "YouTube Music Downloader"
    VERSION: str = "1.0.0"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True

    # Download Settings
    DOWNLOAD_DIR: str = "./downloads"
    MAX_CONCURRENT_DOWNLOADS: int = 3
    DEFAULT_AUDIO_FORMAT: str = "mp3"
    DEFAULT_AUDIO_QUALITY: str = "320"

    # CORS Settings
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173"

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 10

    class Config:
        env_file = ".env"
        case_sensitive = True

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins into list"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


settings = Settings()

# Ensure download directory exists
os.makedirs(settings.DOWNLOAD_DIR, exist_ok=True)
