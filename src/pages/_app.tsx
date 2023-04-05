import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Sidebar from './sidebar'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="app-container">
      <Sidebar open={sidebarOpen} />
      <div className="main-container">
        <Component {...pageProps} />
      </div>
      <button className={`sidebar-toggle ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
    </div>
  )
}