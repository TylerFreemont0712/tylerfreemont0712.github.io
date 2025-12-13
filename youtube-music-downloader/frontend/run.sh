#!/bin/bash

# Setup and run script for frontend

echo "🚀 Starting YouTube Music Downloader Frontend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    echo "VITE_API_URL=http://localhost:8000" > .env
fi

# Run the development server
echo "✅ Starting development server..."
npm run dev
