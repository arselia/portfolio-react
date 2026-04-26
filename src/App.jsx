import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import About from "./sections/about/About";
import Experience from "./sections/Experience/Experience";
import SudokuGame from './sections/Games/sudoku'; 
import CloseAll from './sections/Games/closeall';
import Homepage from "./sections/homepage/Homepage";
import Projects from "./sections/projects/Projects";
import Skills from "./sections/Skills/Skills";
import { useState, useEffect } from "react";
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');
  
  const [tabs, setTabs] = useState([
    { id: 'tab-1', history: [{ content: 'homepage', label: 'Start Page', icon: '🧭' }], currentIndex: 0 }
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-1');
  
  // 🎯 NEW: Track if the whole browser is closed!
  const [isWindowClosed, setIsWindowClosed] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleNewTab = () => {
    if (tabs.length >= 8) return; 
    const newId = `tab-${Date.now()}`;
    setTabs([...tabs, { id: newId, history: [{ content: 'homepage', label: 'Start Page', icon: '🧭' }], currentIndex: 0 }]);
    setActiveTabId(newId);
  };

  const handleNavigate = (contentId, newLabel, newIcon) => {
    setTabs(tabs.map(tab => {
      if (tab.id === activeTabId) {
        const newHistory = tab.history.slice(0, tab.currentIndex + 1);
        newHistory.push({ content: contentId, label: newLabel, icon: newIcon });
        return { ...tab, history: newHistory, currentIndex: newHistory.length - 1 };
      }
      return tab;
    }));
  };

  const handleBack = () => {
    setTabs(tabs.map(tab => {
      if (tab.id === activeTabId && tab.currentIndex > 0) {
        return { ...tab, currentIndex: tab.currentIndex - 1 };
      }
      return tab;
    }));
  };

  const handleForward = () => {
    setTabs(tabs.map(tab => {
      if (tab.id === activeTabId && tab.currentIndex < tab.history.length - 1) {
        return { ...tab, currentIndex: tab.currentIndex + 1 };
      }
      return tab;
    }));
  };

  const handleCloseTab = (tabIdToClose, e) => {
    e.stopPropagation(); 
    const newTabs = tabs.filter(tab => tab.id !== tabIdToClose);
    setTabs(newTabs);
    
    // 🎯 NEW: If the last tab is closed, trigger the surprise!
    if (newTabs.length === 0) {
      setIsWindowClosed(true);
    } else if (activeTabId === tabIdToClose) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  // 🎯 NEW: Handle the Red Traffic Light Button
  const handleCloseWindow = () => {
    setIsWindowClosed(true);
    setTabs([]); // Wipe all tabs
  };

  // 🎯 NEW: Bring the browser back to life
  const handleReopenWindow = () => {
    const newId = `tab-${Date.now()}`;
    setTabs([{ id: newId, history: [{ content: 'homepage', label: 'Start Page', icon: '🧭' }], currentIndex: 0 }]);
    setActiveTabId(newId);
    setIsWindowClosed(false);
  };

  const renderContent = () => {
    const currentTab = tabs.find(t => t.id === activeTabId);
    if (!currentTab) return null; 

    const currentView = currentTab.history[currentTab.currentIndex];

    switch (currentView.content) {
      case 'homepage':   return <Homepage onBookmarkClick={handleNavigate} />;
      case 'about':      return <About />;
      case 'experience': return <Experience />;
      case 'projects':   return <Projects />;
      case 'skills':     return <Skills />;
      case 'sudoku':     return <SudokuGame />; 
      default:           return <Homepage onBookmarkClick={handleNavigate} />;
    }
  };

  // 🎯 SURPRISE PAGE OVERLAY
  if (isWindowClosed) {
    return (
      <>
        {/* Blobs background tetep ada biar transisi mulus */}
        <div className="blob-container">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        
        {/* Panggil komponen game teka-teki yang baru kita buat! */}
        <CloseAll onReopen={handleReopenWindow} />
      </>
    );
  }

  // NORMAL APP RENDER
  return (
    <>
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <div className="app-window">
        <Header
          toggleTheme={toggleTheme}
          currentTheme={theme}
          tabs={tabs} 
          activeTab={activeTabId}
          setActiveTab={setActiveTabId}
          onNewTab={handleNewTab}
          onCloseTab={handleCloseTab}
          onCloseWindow={handleCloseWindow} // Pass red button action
          onBack={handleBack}       
          onForward={handleForward} 
        />
        <main className="content-area">
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default App;