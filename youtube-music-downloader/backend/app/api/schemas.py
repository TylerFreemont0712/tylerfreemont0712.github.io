"""API request and response schemas"""

from pydantic import BaseModel, HttpUrl, Field
from typing import Optional, List
from enum import Enum


class AudioFormat(str, Enum):
    """Supported audio formats"""
    MP3 = "mp3"
    M4A = "m4a"
    FLAC = "flac"
    WAV = "wav"
    OPUS = "opus"


class AudioQuality(str, Enum):
    """Audio quality presets"""
    LOW = "128"
    MEDIUM = "192"
    HIGH = "320"
    BEST = "best"


class DownloadRequest(BaseModel):
    """Download request schema"""
    url: str = Field(..., description="YouTube video or playlist URL")
    format: AudioFormat = Field(AudioFormat.MP3, description="Output audio format")
    quality: AudioQuality = Field(AudioQuality.HIGH, description="Audio quality")
    extract_metadata: bool = Field(True, description="Extract and embed metadata")
    embed_thumbnail: bool = Field(True, description="Embed thumbnail as album art")
    playlist: bool = Field(False, description="Download entire playlist")


class VideoInfo(BaseModel):
    """Video information"""
    id: str
    title: str
    uploader: str
    duration: int
    thumbnail: Optional[str] = None
    description: Optional[str] = None


class DownloadStatus(str, Enum):
    """Download status"""
    QUEUED = "queued"
    DOWNLOADING = "downloading"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class DownloadProgress(BaseModel):
    """Download progress update"""
    download_id: str
    status: DownloadStatus
    progress: float = Field(0.0, ge=0.0, le=100.0)
    message: str = ""
    video_info: Optional[VideoInfo] = None
    file_path: Optional[str] = None
    error: Optional[str] = None


class DownloadResponse(BaseModel):
    """Download response"""
    download_id: str
    status: DownloadStatus
    message: str


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    version: str
    yt_dlp_available: bool
    ffmpeg_available: bool
