# YouTube Music Downloader

A modern, modular web application for downloading music from YouTube with high quality audio and embedded metadata.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![React](https://img.shields.io/badge/react-18.2+-blue.svg)

## Features

- **High-Quality Audio**: Download music in various formats (MP3, M4A, FLAC, WAV, OPUS)
- **Quality Options**: Choose from 128kbps to 320kbps or best available quality
- **Playlist Support**: Download entire playlists with a single click
- **Real-time Progress**: WebSocket-based live progress updates
- **Metadata Embedding**: Automatic metadata extraction and embedding
- **Album Art**: Embeds thumbnail as album art
- **Concurrent Downloads**: Queue multiple downloads simultaneously
- **Modern UI**: Clean, responsive React interface with dark theme
- **Docker Ready**: Easy deployment with Docker Compose

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **yt-dlp**: Robust YouTube downloader
- **FFmpeg**: Audio processing and conversion
- **WebSockets**: Real-time progress updates
- **Pydantic**: Data validation

### Frontend
- **React 18**: UI framework
- **Vite**: Fast build tool
- **Axios**: HTTP client
- **Lucide React**: Icon library

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd youtube-music-downloader
   ```

2. **Start the application**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - Frontend: http://localhost
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/api/docs

### Manual Setup

#### Prerequisites
- Python 3.11+
- Node.js 18+
- FFmpeg

#### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

5. **Run the server**:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

#### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

## Project Structure

```
youtube-music-downloader/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/          # API endpoints
│   │   │   └── schemas.py       # Pydantic models
│   │   ├── core/
│   │   │   └── downloader/      # Download logic
│   │   ├── config.py            # Configuration
│   │   └── main.py              # FastAPI app
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/            # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## API Documentation

### Endpoints

#### Create Download
```http
POST /api/downloads/
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=...",
  "format": "mp3",
  "quality": "320",
  "playlist": false,
  "extract_metadata": true,
  "embed_thumbnail": true
}
```

#### Get Download Status
```http
GET /api/downloads/{download_id}
```

#### List All Downloads
```http
GET /api/downloads/
```

#### Cancel Download
```http
DELETE /api/downloads/{download_id}
```

#### WebSocket Progress
```
WS /api/downloads/ws/{download_id}
```

For complete API documentation, visit http://localhost:8000/api/docs when the server is running.

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
HOST=0.0.0.0
PORT=8000
DEBUG=True

DOWNLOAD_DIR=./downloads
MAX_CONCURRENT_DOWNLOADS=3
DEFAULT_AUDIO_FORMAT=mp3
DEFAULT_AUDIO_QUALITY=320

CORS_ORIGINS=http://localhost:3000,http://localhost:5173
RATE_LIMIT_PER_MINUTE=10
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

## Usage

1. **Enter YouTube URL**: Paste a YouTube video or playlist URL
2. **Select Format**: Choose your preferred audio format (MP3, M4A, FLAC, WAV, OPUS)
3. **Select Quality**: Choose audio quality (128kbps, 192kbps, 320kbps, or best)
4. **Download**: Click the download button and watch real-time progress
5. **Access Files**: Downloaded files are saved in the `downloads` directory

## Development

### Backend Development

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## Deployment

### Production Deployment

1. **Update environment variables** for production
2. **Set DEBUG=False** in backend `.env`
3. **Build and deploy** with Docker:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Nginx Reverse Proxy

For production, consider using Nginx as a reverse proxy. Example configuration is provided in `frontend/nginx.conf`.

## Troubleshooting

### FFmpeg Not Found
Install FFmpeg:
- **Ubuntu/Debian**: `sudo apt-get install ffmpeg`
- **macOS**: `brew install ffmpeg`
- **Windows**: Download from https://ffmpeg.org/

### CORS Issues
Ensure the backend `CORS_ORIGINS` includes your frontend URL.

### WebSocket Connection Failed
Check that your firewall allows WebSocket connections and that the backend is accessible.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is for educational purposes only. Please respect copyright laws and YouTube's Terms of Service. Only download content you have the right to download.

## Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Powerful YouTube downloader
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [React](https://react.dev/) - UI library
- [FFmpeg](https://ffmpeg.org/) - Multimedia framework

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Made with ❤️ by Tyler Freemont
