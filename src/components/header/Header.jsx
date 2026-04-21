import styles from './Header.module.css';
import { Plus } from 'lucide-react';

export default function Header({ toggleTheme, currentTheme, tabs, activeTab, setActiveTab, onNewTab, onCloseTab, onCloseWindow, onBack, onForward }) {
  
  // Find out what to show in the URL bar and if buttons should be disabled
  const currentTabObj = tabs.find(tab => tab.id === activeTab);
  const currentView = currentTabObj ? currentTabObj.history[currentTabObj.currentIndex] : null;
  
  const urlPath = currentView && currentView.content !== 'homepage' 
    ? `/${currentView.content}` 
    : '';

  // Can we go back/forward?
  const canGoBack = currentTabObj && currentTabObj.currentIndex > 0;
  const canGoForward = currentTabObj && currentTabObj.currentIndex < currentTabObj.history.length - 1;

  return (
    <header className={styles.safariHeader}>
      <div className={styles.toolbar}>
        <div className={styles.leftSide}>
          <div className={styles.trafficLights}>
            {/* 2. Add the onClick and cursor style to the red dot! */}
            <div className={styles.dotRed} onClick={onCloseWindow} style={{ cursor: 'pointer' }} title="Close Browser" />
            <div className={styles.dotYellow} />
            <div className={styles.dotGreen} />
          </div>

          <div className={styles.navButtons}>
            <button 
              className={`${styles.navBtn} ${!canGoBack ? styles.disabled : ''}`} 
              onClick={onBack}
              disabled={!canGoBack}
              title="Go back"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div className={styles.navDivider} />
            <button 
              className={`${styles.navBtn} ${!canGoForward ? styles.disabled : ''}`} 
              onClick={onForward}
              disabled={!canGoForward}
              title="Go forward"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        <div className={styles.urlBar}>
          <span className={styles.lockIcon}>🔒</span>
          sherly-septiani.dev{urlPath}
        </div>

       <div className={styles.controls}>
          <button onClick={onNewTab} className={styles.iconButton} title="Create New Tab">
            {/* Ini pengganti emotikon ➕ */}
            <Plus size={20} strokeWidth={2.5} />
          </button>
          
          {/* Uiverse Theme Toggle Switch */}
          <label className={styles.switch} title="Toggle Theme">
            <input 
              type="checkbox" 
              checked={currentTheme === 'dark'} 
              onChange={toggleTheme} 
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      <div className={styles.tabBar}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const isLast = index === tabs.length - 1;
          const tabView = tab.history[tab.currentIndex]; // Look at the history!

          return (
            <div key={tab.id} className={styles.tabWrapper}>
              <button
                className={`${styles.tab} ${isActive ? styles.activeTab : styles.inactiveTab}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div 
                  className={styles.closeTabBtn} 
                  onClick={(e) => onCloseTab(tab.id, e)}
                  title="Close Tab"
                >
                  ✕
                </div>
                
                <span className={styles.tabIcon}>{tabView.icon}</span>
                <span className={styles.tabLabel}>{tabView.label}</span>
              </button>

              {!isLast && !isActive && (
                <div className={styles.separator} />
              )}
            </div>
          );
        })}
      </div>

    </header>
  );
}