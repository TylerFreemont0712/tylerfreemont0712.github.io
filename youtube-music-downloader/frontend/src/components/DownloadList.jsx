import React, { useEffect } from 'react'
import DownloadItem from './DownloadItem'
import { Music2 } from 'lucide-react'
import './DownloadList.css'

function DownloadList({ downloads, activeDownloadId, onDownloadUpdate }) {
  return (
    <div className="download-list-container">
      <h2 className="list-title">Downloads</h2>

      {downloads.length === 0 ? (
        <div className="empty-state">
          <Music2 size={48} />
          <p>No downloads yet</p>
          <span>Enter a YouTube URL above to get started</span>
        </div>
      ) : (
        <div className="download-list">
          {downloads.map((download) => (
            <DownloadItem
              key={download.download_id}
              download={download}
              isActive={download.download_id === activeDownloadId}
              onUpdate={onDownloadUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DownloadList
