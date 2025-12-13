# API Documentation

## Base URL

```
http://localhost:8000
```

## Endpoints

### 1. Health Check

Check the health status of the API and its dependencies.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "yt_dlp_available": true,
  "ffmpeg_available": true
}
```

---

### 2. Create Download

Start a new download task.

**Endpoint:** `POST /api/downloads/`

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "format": "mp3",
  "quality": "320",
  "playlist": false,
  "extract_metadata": true,
  "embed_thumbnail": true
}
```

**Parameters:**
- `url` (string, required): YouTube video or playlist URL
- `format` (string, optional): Audio format - `mp3`, `m4a`, `flac`, `wav`, `opus` (default: `mp3`)
- `quality` (string, optional): Audio quality - `128`, `192`, `320`, `best` (default: `320`)
- `playlist` (boolean, optional): Download entire playlist (default: `false`)
- `extract_metadata` (boolean, optional): Extract and embed metadata (default: `true`)
- `embed_thumbnail` (boolean, optional): Embed thumbnail as album art (default: `true`)

**Response:**
```json
{
  "download_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "queued",
  "message": "Download queued successfully"
}
```

---

### 3. Get Download Status

Get the current status of a download.

**Endpoint:** `GET /api/downloads/{download_id}`

**Response:**
```json
{
  "download_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "downloading",
  "progress": 45.5,
  "message": "Downloading: Never Gonna Give You Up",
  "video_info": {
    "id": "dQw4w9WgXcQ",
    "title": "Rick Astley - Never Gonna Give You Up",
    "uploader": "Rick Astley",
    "duration": 213,
    "thumbnail": "https://..."
  },
  "file_path": null,
  "error": null
}
```

**Status Values:**
- `queued`: Download is in queue
- `downloading`: Currently downloading
- `processing`: Converting audio
- `completed`: Download completed
- `failed`: Download failed

---

### 4. List All Downloads

Get a list of all downloads.

**Endpoint:** `GET /api/downloads/`

**Response:**
```json
{
  "total": 5,
  "downloads": [
    {
      "download_id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "completed",
      "progress": 100.0,
      "message": "Download completed",
      "video_info": {
        "id": "dQw4w9WgXcQ",
        "title": "Rick Astley - Never Gonna Give You Up",
        "uploader": "Rick Astley",
        "duration": 213
      },
      "created_at": "2025-01-15T10:30:00"
    }
  ]
}
```

---

### 5. Cancel Download

Cancel an ongoing download.

**Endpoint:** `DELETE /api/downloads/{download_id}`

**Response:**
```json
{
  "message": "Download cancelled successfully"
}
```

---

### 6. WebSocket Progress Updates

Connect to receive real-time progress updates for a download.

**Endpoint:** `WS /api/downloads/ws/{download_id}`

**Messages Received:**
```json
{
  "download_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "downloading",
  "progress": 45.5,
  "message": "Downloading: Never Gonna Give You Up",
  "video_info": {
    "id": "dQw4w9WgXcQ",
    "title": "Rick Astley - Never Gonna Give You Up",
    "uploader": "Rick Astley",
    "duration": 213,
    "thumbnail": "https://..."
  },
  "file_path": null,
  "error": null
}
```

**Keep-Alive:**
Send `"ping"` to keep the connection alive. Server will respond with `"pong"`.

---

## Error Responses

All errors follow this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `400`: Bad Request (invalid URL, invalid parameters)
- `404`: Not Found (download ID doesn't exist)
- `500`: Internal Server Error

---

## Interactive Documentation

For interactive API documentation with the ability to test endpoints:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

---

## Rate Limiting

Default rate limit: 10 requests per minute per IP address.

Configure in `.env`:
```env
RATE_LIMIT_PER_MINUTE=10
```

---

## Examples

### cURL Examples

**Create a download:**
```bash
curl -X POST http://localhost:8000/api/downloads/ \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "format": "mp3",
    "quality": "320"
  }'
```

**Get download status:**
```bash
curl http://localhost:8000/api/downloads/550e8400-e29b-41d4-a716-446655440000
```

**List all downloads:**
```bash
curl http://localhost:8000/api/downloads/
```

### Python Example

```python
import requests
import websocket
import json

# Create a download
response = requests.post(
    "http://localhost:8000/api/downloads/",
    json={
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "format": "mp3",
        "quality": "320"
    }
)

download_id = response.json()["download_id"]

# Connect to WebSocket for progress
ws = websocket.WebSocket()
ws.connect(f"ws://localhost:8000/api/downloads/ws/{download_id}")

while True:
    message = ws.recv()
    data = json.loads(message)
    print(f"Progress: {data['progress']}% - {data['message']}")

    if data['status'] in ['completed', 'failed']:
        break

ws.close()
```

### JavaScript Example

```javascript
// Create a download
const response = await fetch('http://localhost:8000/api/downloads/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    format: 'mp3',
    quality: '320',
  }),
});

const { download_id } = await response.json();

// Connect to WebSocket for progress
const ws = new WebSocket(`ws://localhost:8000/api/downloads/ws/${download_id}`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(`Progress: ${data.progress}% - ${data.message}`);

  if (data.status === 'completed' || data.status === 'failed') {
    ws.close();
  }
};
```
