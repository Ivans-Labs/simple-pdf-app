import React from 'react';
import styles from '@/styles/sidebar.module.css';

type SidebarProps = {
  open: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <div className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <ul>
        <li>
          <button>Tool 1</button>
        </li>
        <li>
          <button>Tool 2</button>
        </li>
        <li>
          <button>Tool 3</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
