import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// YANGI KOMPONENTLAR
import ActivityMonitor from './components/ActivityMonitor'; 
// O'ZGARISH: Reklama o'rniga Screensaver import qilindi
import Screensaver from './pages/Screensaver'; 

// SAHIFALAR
import Home from './pages/Home';
import Employees from './pages/Employees';
import Map from './pages/Map';
import Transport from './pages/Transport';
import Documents from './pages/Documents';
import Achievements from './pages/Achievements';
import Wifi from './pages/Wifi';
import FAQ from './pages/FAQ';
import Leadership from './pages/Leadership';

function App() {
  React.useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', disableContextMenu);
    return () => window.removeEventListener('contextmenu', disableContextMenu);
  }, []);

  return (
    <LanguageProvider>
      <div className="w-full h-screen bg-slate-900 overflow-hidden relative">
        
        <ActivityMonitor>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* O'ZGARISH: Route nomi ham /screensaver bo'ldi */}
            <Route path="/screensaver" element={<Screensaver />} />
            
            <Route path="/employees" element={<Employees />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/map" element={<Map />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/wifi" element={<Wifi />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </ActivityMonitor>

      </div>
    </LanguageProvider>
  );
}

export default App;