import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from './sidebar';
import { useState } from 'react';
import PDFMerger from './pdfmerger';
import 'font-awesome/css/font-awesome.min.css';

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isPdfMerger = Component === PDFMerger;
  return (
    <div className="app-container">
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <button
        className={`sidebar-toggle ${sidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
      <div className="main-container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
