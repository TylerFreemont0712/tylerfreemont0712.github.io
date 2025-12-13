import React, { useEffect, useRef } from 'react'
import { CheckCircle, XCircle, Loader, Music, X } from 'lucide-react'
import { createWebSocket, downloadAPI } from '../services/api'
import './DownloadItem.css'

function DownloadItem({ download, isActive, onUpdate }) {
  const wsRef = useRef(null)

  useEffect(() => {
    if (!download.download_id) return

    // Connect to WebSocket for real-time updates
    const ws = createWebSocket(download.download_id)
    wsRef.current = ws

    ws.onopen = () => {
      console.log(`WebSocket connected for ${download.download_id}`)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      onUpdate(data)
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log(`WebSocket closed for ${download.download_id}`)
    }

    // Keep-alive ping
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send('ping')
      }
    }, 30000)

    return () => {
      clearInterval(pingInterval)
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [download.download_id])

  const handleCancel = async () => {
    try {
      await downloadAPI.cancel(download.download_id)
    } catch (error) {
      console.error('Failed to cancel download:', error)
    }
  }

  const getStatusIcon = () => {
    switch (download.status) {
      case 'completed':
        return <CheckCircle size={24} className="status-icon success" />
      case 'failed':
        return <XCircle size={24} className="status-icon error" />
      case 'downloading':
      case 'processing':
      case 'queued':
        return <Loader size={24} className="status-icon spin" />
      default:
        return <Music size={24} className="status-icon" />
    }
  }

  const getStatusColor = () => {
    switch (download.status) {
      case 'completed':
        return 'success'
      case 'failed':
        return 'error'
      case 'downloading':
      case 'processing':
        return 'progress'
      default:
        return 'queued'
    }
  }

  return (
    <div className={`download-item ${isActive ? 'active' : ''}`}>
      <div className="download-header">
        <div className="download-info">
          {getStatusIcon()}
          <div className="download-details">
            <h3 className="download-title">
              {download.video_info?.title || 'Loading...'}
            </h3>
            <p className="download-uploader">
              {download.video_info?.uploader || 'Unknown'}
            </p>
          </div>
        </div>
        {(download.status === 'downloading' ||
          download.status === 'queued' ||
          download.status === 'processing') && (
          <button className="cancel-button" onClick={handleCancel}>
            <X size={18} />
          </button>
        )}
      </div>

      <div className="download-progress">
        <div className="progress-bar">
          <div
            className={`progress-fill ${getStatusColor()}`}
            style={{ width: `${download.progress || 0}%` }}
          />
        </div>
        <div className="progress-info">
          <span className="progress-message">{download.message}</span>
          <span className="progress-percentage">
            {Math.round(download.progress || 0)}%
          </span>
        </div>
      </div>

      {download.error && (
        <div className="error-details">
          <p>{download.error}</p>
        </div>
      )}

      {download.file_path && download.status === 'completed' && (
        <div className="success-details">
          <p>Saved to: {download.file_path}</p>
        </div>
      )}
    </div>
  )
}

export default DownloadItem
