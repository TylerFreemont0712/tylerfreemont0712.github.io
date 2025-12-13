"""YouTube downloader using yt-dlp"""

import yt_dlp
import os
import asyncio
from typing import Dict, Any, Callable, Optional
from pathlib import Path
from app.config import settings


class YouTubeDownloader:
    """YouTube audio downloader"""

    def __init__(self, download_dir: Optional[str] = None):
        """Initialize downloader"""
        self.download_dir = download_dir or settings.DOWNLOAD_DIR
        os.makedirs(self.download_dir, exist_ok=True)

    async def get_video_info(self, url: str) -> Dict[str, Any]:
        """Extract video information without downloading"""
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
        }

        def _extract():
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                return ydl.extract_info(url, download=False)

        loop = asyncio.get_event_loop()
        info = await loop.run_in_executor(None, _extract)

        return {
            'id': info.get('id', ''),
            'title': info.get('title', 'Unknown'),
            'uploader': info.get('uploader', 'Unknown'),
            'duration': info.get('duration', 0),
            'thumbnail': info.get('thumbnail'),
            'description': info.get('description'),
        }

    async def download(
        self,
        url: str,
        format: str = "mp3",
        quality: str = "320",
        progress_callback: Optional[Callable] = None,
    ) -> str:
        """Download audio from YouTube URL"""

        # Format-specific options
        format_opts = self._get_format_options(format, quality)

        output_template = os.path.join(
            self.download_dir,
            '%(title)s.%(ext)s'
        )

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_template,
            'quiet': False,
            'no_warnings': False,
            'extract_audio': True,
            **format_opts,
        }

        # Add progress hook if callback provided
        if progress_callback:
            ydl_opts['progress_hooks'] = [progress_callback]

        def _download():
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                # Get the actual file path
                filename = ydl.prepare_filename(info)
                # Replace extension with target format
                base = os.path.splitext(filename)[0]
                return f"{base}.{format}"

        loop = asyncio.get_event_loop()
        file_path = await loop.run_in_executor(None, _download)

        return file_path

    def _get_format_options(self, format: str, quality: str) -> Dict[str, Any]:
        """Get format-specific yt-dlp options"""

        base_opts = {
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': format,
            }]
        }

        # Add quality settings for formats that support it
        if format in ['mp3', 'm4a', 'opus'] and quality != 'best':
            base_opts['postprocessors'][0]['preferredquality'] = quality

        # Add metadata postprocessor
        base_opts['postprocessors'].append({
            'key': 'FFmpegMetadata',
            'add_metadata': True,
        })

        # Add thumbnail embedding
        base_opts['postprocessors'].append({
            'key': 'EmbedThumbnail',
        })
        base_opts['writethumbnail'] = True

        return base_opts

    async def download_playlist(
        self,
        url: str,
        format: str = "mp3",
        quality: str = "320",
        progress_callback: Optional[Callable] = None,
    ) -> list[str]:
        """Download all videos from a playlist"""

        output_template = os.path.join(
            self.download_dir,
            '%(playlist_title)s/%(title)s.%(ext)s'
        )

        format_opts = self._get_format_options(format, quality)

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_template,
            'quiet': False,
            'no_warnings': False,
            'extract_audio': True,
            'noplaylist': False,
            **format_opts,
        }

        if progress_callback:
            ydl_opts['progress_hooks'] = [progress_callback]

        def _download():
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                files = []

                if 'entries' in info:
                    for entry in info['entries']:
                        if entry:
                            filename = ydl.prepare_filename(entry)
                            base = os.path.splitext(filename)[0]
                            files.append(f"{base}.{format}")

                return files

        loop = asyncio.get_event_loop()
        file_paths = await loop.run_in_executor(None, _download)

        return file_paths

    @staticmethod
    async def validate_url(url: str) -> bool:
        """Validate if URL is supported by yt-dlp"""
        try:
            ydl_opts = {'quiet': True, 'no_warnings': True}

            def _validate():
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.extract_info(url, download=False)
                    return True

            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, _validate)
        except Exception:
            return False
