import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// KOMPONENTLAR
import ActivityMonitor from './components/ActivityMonitor'; 
import Screensaver from './pages/Screensaver'; 

// SAHIFALARNI IMPORT QILISH (Mana shu yerda qolib ketgan bo'lishi mumkin)
import Home from './pages/Home';
import Employees from './pages/Employees'; // <--- MANA SHU QATOR KERAK!
import Leadership from './pages/Leadership';
import Map from './pages/Map';
import Transport from './pages/Transport';
import Documents from './pages/Documents';
import Achievements from './pages/Achievements';
import Wifi from './pages/Wifi';
import FAQ from './pages/FAQ';

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