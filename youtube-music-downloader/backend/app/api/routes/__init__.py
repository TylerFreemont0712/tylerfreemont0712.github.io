"""API routes"""

from fastapi import APIRouter
from app.api.routes import downloads

api_router = APIRouter()

# Include route modules
api_router.include_router(downloads.router)
