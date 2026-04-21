import { useState, useEffect } from 'react';
import { Search, Mic, User, Briefcase, Rocket, Zap, Puzzle } from 'lucide-react';
import styles from './homepage.module.css';

export default function Homepage({ onBookmarkClick }) {
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const bookmarks = [
    { id: 'about',      label: 'About Me',   icon: <User size={32} strokeWidth={1.5} />,   tabIcon: '👤' },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={32} strokeWidth={1.5} />, tabIcon: '💼' },
    { id: 'projects',   label: 'Projects',   icon: <Rocket size={32} strokeWidth={1.5} />,    tabIcon: '🚀' },
    { id: 'skills',     label: 'Skills',     icon: <Zap size={32} strokeWidth={1.5} />,       tabIcon: '⚡' },
    { id: 'sudoku',     label: 'Sudoku',     icon: <Puzzle size={32} strokeWidth={1.5} />,    tabIcon: '🧩' }, 
  ];

  const filteredBookmarks = bookmarks.filter((bm) =>
    bm.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Easter Egg Trigger
    if (value.toLowerCase() === 'zoomies') {
      setIsZooming(true);
      setTimeout(() => setIsZooming(false), 2000); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredBookmarks.length > 0) {
      const firstMatch = filteredBookmarks[0];
      onBookmarkClick(firstMatch.id, firstMatch.label, firstMatch.tabIcon);
    }
  };

  return (
    <div className={styles.container}>
      
      <h1 className={styles.greeting}>{greeting}, Sherly</h1>

      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Search favorites or type 'zoomies'..." 
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Mic className={styles.micIcon} size={20} />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>Favorites</h2>
        {filteredBookmarks.length > 0 ? (
          <div className={styles.grid}>
            {filteredBookmarks.map((bm) => (
              <button 
                key={bm.id} 
                className={styles.bookmark}
                onClick={() => onBookmarkClick(bm.id, bm.label, bm.tabIcon)}
              >
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{bm.icon}</span>
                </div>
                <span className={styles.label}>{bm.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No matches found for "{searchQuery}" 🤷‍♀️</p>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.privacyCard}>
          <div className={`${styles.privacyIcon} ${isZooming ? styles.zoomiesAnimation : ''}`}>
            🐈
          </div> 
          <div className={styles.privacyText}>
            <h3>Status Report</h3>
            <p>In the last seven days, Sherly's cat has experienced exactly 42 midnight zoomies while she built this site.</p>
          </div>
        </div>
      </div>
      {/* ✨ THE NEW 3D INTERACTIVE CARD ✨ */}
      <div className={styles.floatingWidget}>
        <div className={styles.card}>
          <div className={styles.background}></div>
          <div className={styles.logo}>
            <svg viewBox="0 0 29.667 31.69" className={styles.logoSvg}>
            </svg>
          </div>
          
          {/* Box 1: Instagram */}
          <a href="https://instagram.com/sherly_lily_04" target="_blank" rel="noreferrer" className={`${styles.box} ${styles.box1}`}>
            <span className={styles.icon}>
              <svg viewBox="0 0 30 30" className={styles.svgIcon}>
                <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
              </svg>
            </span>
          </a>
          
          {/* Box 2: LinkedIn (Replaced Twitter) */}
          <a href="https://linkedin.com/in/sherly-septiani-4556282b7" target="_blank" rel="noreferrer" className={`${styles.box} ${styles.box2}`}> 
            <span className={styles.icon}>
              <svg viewBox="0 0 448 512" className={styles.svgIcon}>
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </span>
          </a>
          
          {/* Box 3: Email (Replaced GitHub/Octocat) */}
          <a href="mailto:sherlyseptianisp@gmail.com" className={`${styles.box} ${styles.box3}`}>
            <span className={styles.icon}>
              <svg viewBox="0 0 512 512" className={styles.svgIcon}>
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
              </svg>
            </span>
          </a>
          
          {/* Box 4: GitHub (Added so it's not empty!) */}
          <a href="https://github.com/arselia" target="_blank" rel="noreferrer" className={`${styles.box} ${styles.box4}`}>
             <span className={styles.icon}>
              <svg viewBox="0 0 496 512" className={styles.svgIcon}>
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>

    
  );
}