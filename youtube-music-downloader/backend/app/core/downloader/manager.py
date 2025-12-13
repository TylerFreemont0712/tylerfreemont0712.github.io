"""Download manager for handling concurrent downloads"""

import asyncio
import uuid
from typing import Dict, Optional, Callable
from datetime import datetime
from app.api.schemas import DownloadStatus, DownloadProgress, VideoInfo
from app.core.downloader.youtube import YouTubeDownloader


class DownloadTask:
    """Represents a download task"""

    def __init__(
        self,
        download_id: str,
        url: str,
        format: str,
        quality: str,
        is_playlist: bool = False,
    ):
        self.download_id = download_id
        self.url = url
        self.format = format
        self.quality = quality
        self.is_playlist = is_playlist
        self.status = DownloadStatus.QUEUED
        self.progress = 0.0
        self.message = "Queued"
        self.video_info: Optional[VideoInfo] = None
        self.file_path: Optional[str] = None
        self.error: Optional[str] = None
        self.created_at = datetime.utcnow()


class DownloadManager:
    """Manages download queue and concurrent downloads"""

    def __init__(self, max_concurrent: int = 3):
        self.max_concurrent = max_concurrent
        self.tasks: Dict[str, DownloadTask] = {}
        self.active_downloads: Dict[str, asyncio.Task] = {}
        self.downloader = YouTubeDownloader()
        self.progress_callbacks: Dict[str, list[Callable]] = {}
        self._semaphore = asyncio.Semaphore(max_concurrent)

    async def add_download(
        self,
        url: str,
        format: str = "mp3",
        quality: str = "320",
        is_playlist: bool = False,
    ) -> str:
        """Add a new download to the queue"""
        download_id = str(uuid.uuid4())

        task = DownloadTask(
            download_id=download_id,
            url=url,
            format=format,
            quality=quality,
            is_playlist=is_playlist,
        )

        self.tasks[download_id] = task

        # Start download task
        download_task = asyncio.create_task(self._process_download(task))
        self.active_downloads[download_id] = download_task

        return download_id

    async def _process_download(self, task: DownloadTask):
        """Process a single download task"""
        async with self._semaphore:
            try:
                # Update status to downloading
                task.status = DownloadStatus.DOWNLOADING
                task.message = "Fetching video information..."
                await self._notify_progress(task)

                # Get video info
                video_info = await self.downloader.get_video_info(task.url)
                task.video_info = VideoInfo(**video_info)
                task.message = f"Downloading: {task.video_info.title}"
                await self._notify_progress(task)

                # Create progress hook
                def progress_hook(d):
                    if d['status'] == 'downloading':
                        total = d.get('total_bytes') or d.get('total_bytes_estimate', 0)
                        downloaded = d.get('downloaded_bytes', 0)

                        if total > 0:
                            task.progress = (downloaded / total) * 100
                            asyncio.create_task(self._notify_progress(task))

                    elif d['status'] == 'finished':
                        task.status = DownloadStatus.PROCESSING
                        task.progress = 100.0
                        task.message = "Processing audio..."
                        asyncio.create_task(self._notify_progress(task))

                # Download
                if task.is_playlist:
                    file_paths = await self.downloader.download_playlist(
                        task.url,
                        task.format,
                        task.quality,
                        progress_hook,
                    )
                    task.file_path = str(file_paths)
                else:
                    file_path = await self.downloader.download(
                        task.url,
                        task.format,
                        task.quality,
                        progress_hook,
                    )
                    task.file_path = file_path

                # Complete
                task.status = DownloadStatus.COMPLETED
                task.progress = 100.0
                task.message = "Download completed"
                await self._notify_progress(task)

            except Exception as e:
                task.status = DownloadStatus.FAILED
                task.error = str(e)
                task.message = f"Download failed: {str(e)}"
                await self._notify_progress(task)

            finally:
                # Clean up
                if task.download_id in self.active_downloads:
                    del self.active_downloads[task.download_id]

    async def _notify_progress(self, task: DownloadTask):
        """Notify all progress callbacks for a task"""
        if task.download_id in self.progress_callbacks:
            progress = DownloadProgress(
                download_id=task.download_id,
                status=task.status,
                progress=task.progress,
                message=task.message,
                video_info=task.video_info,
                file_path=task.file_path,
                error=task.error,
            )

            callbacks = self.progress_callbacks[task.download_id].copy()
            for callback in callbacks:
                try:
                    await callback(progress)
                except Exception:
                    pass

    def subscribe_progress(self, download_id: str, callback: Callable):
        """Subscribe to progress updates for a download"""
        if download_id not in self.progress_callbacks:
            self.progress_callbacks[download_id] = []

        self.progress_callbacks[download_id].append(callback)

    def unsubscribe_progress(self, download_id: str, callback: Callable):
        """Unsubscribe from progress updates"""
        if download_id in self.progress_callbacks:
            try:
                self.progress_callbacks[download_id].remove(callback)
            except ValueError:
                pass

    def get_task(self, download_id: str) -> Optional[DownloadTask]:
        """Get task by ID"""
        return self.tasks.get(download_id)

    def get_all_tasks(self) -> Dict[str, DownloadTask]:
        """Get all tasks"""
        return self.tasks

    async def cancel_download(self, download_id: str) -> bool:
        """Cancel a download"""
        if download_id in self.active_downloads:
            self.active_downloads[download_id].cancel()
            task = self.tasks.get(download_id)
            if task:
                task.status = DownloadStatus.FAILED
                task.error = "Cancelled by user"
                task.message = "Download cancelled"
                await self._notify_progress(task)
            return True
        return False


# Global download manager instance
download_manager = DownloadManager()
