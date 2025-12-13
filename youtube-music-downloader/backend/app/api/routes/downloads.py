"""Download API routes"""

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from typing import Dict
import json

from app.api.schemas import (
    DownloadRequest,
    DownloadResponse,
    DownloadStatus,
    DownloadProgress,
)
from app.core.downloader.manager import download_manager

router = APIRouter(prefix="/downloads", tags=["downloads"])


@router.post("/", response_model=DownloadResponse)
async def create_download(request: DownloadRequest):
    """
    Create a new download task

    - **url**: YouTube video or playlist URL
    - **format**: Output audio format (mp3, m4a, flac, wav, opus)
    - **quality**: Audio quality (128, 192, 320, best)
    - **playlist**: Download entire playlist if True
    """
    try:
        # Validate URL
        is_valid = await download_manager.downloader.validate_url(request.url)
        if not is_valid:
            raise HTTPException(status_code=400, detail="Invalid or unsupported URL")

        # Add to download queue
        download_id = await download_manager.add_download(
            url=request.url,
            format=request.format.value,
            quality=request.quality.value,
            is_playlist=request.playlist,
        )

        return DownloadResponse(
            download_id=download_id,
            status=DownloadStatus.QUEUED,
            message="Download queued successfully"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{download_id}", response_model=DownloadProgress)
async def get_download_status(download_id: str):
    """Get the status of a download"""
    task = download_manager.get_task(download_id)

    if not task:
        raise HTTPException(status_code=404, detail="Download not found")

    return DownloadProgress(
        download_id=task.download_id,
        status=task.status,
        progress=task.progress,
        message=task.message,
        video_info=task.video_info,
        file_path=task.file_path,
        error=task.error,
    )


@router.get("/")
async def list_downloads():
    """List all downloads"""
    tasks = download_manager.get_all_tasks()

    return {
        "total": len(tasks),
        "downloads": [
            {
                "download_id": task.download_id,
                "status": task.status.value,
                "progress": task.progress,
                "message": task.message,
                "video_info": task.video_info.dict() if task.video_info else None,
                "created_at": task.created_at.isoformat(),
            }
            for task in tasks.values()
        ]
    }


@router.delete("/{download_id}")
async def cancel_download(download_id: str):
    """Cancel a download"""
    success = await download_manager.cancel_download(download_id)

    if not success:
        raise HTTPException(status_code=404, detail="Download not found or already completed")

    return {"message": "Download cancelled successfully"}


@router.websocket("/ws/{download_id}")
async def download_progress_websocket(websocket: WebSocket, download_id: str):
    """
    WebSocket endpoint for real-time download progress updates

    Connect to this endpoint to receive live progress updates for a download
    """
    await websocket.accept()

    async def send_progress(progress: DownloadProgress):
        """Send progress update to WebSocket client"""
        try:
            await websocket.send_json(progress.dict())
        except Exception:
            pass

    # Subscribe to progress updates
    download_manager.subscribe_progress(download_id, send_progress)

    # Send initial status
    task = download_manager.get_task(download_id)
    if task:
        initial_progress = DownloadProgress(
            download_id=task.download_id,
            status=task.status,
            progress=task.progress,
            message=task.message,
            video_info=task.video_info,
            file_path=task.file_path,
            error=task.error,
        )
        await websocket.send_json(initial_progress.dict())

    try:
        # Keep connection alive and listen for client messages
        while True:
            data = await websocket.receive_text()

            # Handle ping/pong for connection keep-alive
            if data == "ping":
                await websocket.send_text("pong")

    except WebSocketDisconnect:
        # Client disconnected, unsubscribe from updates
        download_manager.unsubscribe_progress(download_id, send_progress)
    except Exception as e:
        # Error occurred, unsubscribe and close
        download_manager.unsubscribe_progress(download_id, send_progress)
        await websocket.close()
