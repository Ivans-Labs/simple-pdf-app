import React from 'react';
import styles from '@/styles/sidebar.module.css';
import Link from 'next/link';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <ul>
        <li>
          <Link href="/">
            <button className={styles.toolButton}>Home</button>
          </Link>
        </li>
        <li>
          <Link href="/pdfmerger">
            <button className={styles.toolButton}>PDF Merger</button>
          </Link>
        </li>
        <li>
          <button className={styles.toolButton}>Tool 2</button>
        </li>
        <li>
          <button className={styles.toolButton}>Tool 3</button>
        </li>
      </ul>
      <button className={styles.closeSidebarButton} onClick={onClose}>
        Close Sidebar
      </button>
    </div>
  );
};

export default Sidebar;
