import React from 'react';
import styles from './Sidebar.module.css';
import { useKpa } from '../../context/KpaContext';

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage } = useKpa();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoCircle}>+</div>
        <div className={styles.logoText}>
          <span className={styles.brandName}>SVEN<strong>SCHRÖDER</strong></span>
          <span className={styles.brandSub}>Steuerberater</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li
            className={`${styles.navItem} ${currentPage === 'grundstueck' ? styles.active : ''}`}
            onClick={() => setCurrentPage('grundstueck')}
          >
            <span className={styles.navIcon}>🏠</span>
            Grundstücksdaten
          </li>
          <li
            className={`${styles.navItem} ${currentPage === 'gebaeude' ? styles.active : ''}`}
            onClick={() => setCurrentPage('gebaeude')}
          >
            <span className={styles.navIcon}>🏢</span>
            Gebäudedaten
          </li>
          <li
            className={`${styles.navItem} ${currentPage === 'berechnung' ? styles.active : ''}`}
            onClick={() => setCurrentPage('berechnung')}
          >
            <span className={styles.navIcon}>📊</span>
            Berechnung Sachwert
          </li>
          <li className={styles.navItem}>
            <span className={styles.navIcon}>📈</span>
            Vergleich
          </li>
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.version}>KPA Ultra v1.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
