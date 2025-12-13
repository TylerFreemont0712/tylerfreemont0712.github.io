import React, { useState } from 'react'
import { Download, Loader } from 'lucide-react'
import { downloadAPI } from '../services/api'
import './DownloadForm.css'

function DownloadForm({ onDownloadCreated }) {
  const [url, setUrl] = useState('')
  const [format, setFormat] = useState('mp3')
  const [quality, setQuality] = useState('320')
  const [playlist, setPlaylist] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await downloadAPI.create({
        url,
        format,
        quality,
        playlist,
        extract_metadata: true,
        embed_thumbnail: true,
      })

      onDownloadCreated(response.download_id)
      setUrl('')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to start download')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="download-form-container">
      <form onSubmit={handleSubmit} className="download-form">
        <div className="form-group">
          <label htmlFor="url">YouTube URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="format">Format</label>
            <select
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              disabled={loading}
            >
              <option value="mp3">MP3</option>
              <option value="m4a">M4A</option>
              <option value="flac">FLAC</option>
              <option value="wav">WAV</option>
              <option value="opus">OPUS</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quality">Quality</label>
            <select
              id="quality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              disabled={loading}
            >
              <option value="128">128 kbps</option>
              <option value="192">192 kbps</option>
              <option value="320">320 kbps</option>
              <option value="best">Best</option>
            </select>
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={playlist}
              onChange={(e) => setPlaylist(e.target.checked)}
              disabled={loading}
            />
            <span>Download entire playlist</span>
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? (
            <>
              <Loader className="spin" size={20} />
              Starting Download...
            </>
          ) : (
            <>
              <Download size={20} />
              Download
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default DownloadForm
