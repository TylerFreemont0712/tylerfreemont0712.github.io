#!/bin/bash

# Setup and run script for backend

echo "🚀 Starting YouTube Music Downloader Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your settings"
fi

# Create downloads directory
mkdir -p downloads

# Run the server
echo "✅ Starting server..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
