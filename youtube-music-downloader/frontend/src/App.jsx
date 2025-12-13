import React, { useState, useEffect } from 'react'
import DownloadForm from './components/DownloadForm'
import DownloadList from './components/DownloadList'
import Header from './components/Header'
import './App.css'

function App() {
  const [downloads, setDownloads] = useState([])
  const [activeDownload, setActiveDownload] = useState(null)

  const handleDownloadCreated = (downloadId) => {
    setActiveDownload(downloadId)
  }

  const handleDownloadUpdate = (downloadData) => {
    setDownloads((prev) => {
      const existing = prev.find((d) => d.download_id === downloadData.download_id)
      if (existing) {
        return prev.map((d) =>
          d.download_id === downloadData.download_id ? downloadData : d
        )
      }
      return [downloadData, ...prev]
    })
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <DownloadForm onDownloadCreated={handleDownloadCreated} />
          <DownloadList
            downloads={downloads}
            activeDownloadId={activeDownload}
            onDownloadUpdate={handleDownloadUpdate}
          />
        </div>
      </main>
    </div>
  )
}

export default App
