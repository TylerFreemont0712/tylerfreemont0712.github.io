import React from 'react'
import { Music } from 'lucide-react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Music size={32} />
          <h1>YouTube Music Downloader</h1>
        </div>
        <p className="subtitle">Download your favorite music in high quality</p>
      </div>
    </header>
  )
}

export default Header
