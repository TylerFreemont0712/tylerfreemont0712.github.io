"""FastAPI application entry point"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import yt_dlp
import shutil

from app.config import settings
from app.api.routes import api_router
from app.api.schemas import HealthResponse


# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="A modular YouTube music downloader with web interface",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api")


@app.get("/", include_in_schema=False)
async def root():
    """Root endpoint"""
    return JSONResponse({
        "message": "YouTube Music Downloader API",
        "version": settings.VERSION,
        "docs": "/api/docs",
    })


@app.get("/health", response_model=HealthResponse, tags=["system"])
async def health_check():
    """
    Health check endpoint

    Returns the status of the application and dependencies
    """
    # Check if ffmpeg is available
    ffmpeg_available = shutil.which("ffmpeg") is not None

    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        yt_dlp_available=True,  # yt_dlp is imported
        ffmpeg_available=ffmpeg_available,
    )


@app.on_event("startup")
async def startup_event():
    """Application startup"""
    print(f"🚀 {settings.APP_NAME} v{settings.VERSION} starting...")
    print(f"📁 Download directory: {settings.DOWNLOAD_DIR}")
    print(f"🎵 Default format: {settings.DEFAULT_AUDIO_FORMAT}")
    print(f"📊 Max concurrent downloads: {settings.MAX_CONCURRENT_DOWNLOADS}")


@app.on_event("shutdown")
async def shutdown_event():
    """Application shutdown"""
    print(f"👋 {settings.APP_NAME} shutting down...")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
