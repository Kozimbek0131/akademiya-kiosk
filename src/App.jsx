import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// YANGI KOMPONENTLAR
import ActivityMonitor from './components/ActivityMonitor'; 
import Reklama from './pages/Reklama'; 

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
  // O'ng tugmani (Context menu) o'chirish
  React.useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', disableContextMenu);
    return () => window.removeEventListener('contextmenu', disableContextMenu);
  }, []);

  return (
    <LanguageProvider>
      <div className="w-full h-screen bg-slate-900 overflow-hidden relative">
        
        {/* Butun ilovani ActivityMonitor bilan o'raymiz */}
        <ActivityMonitor>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reklama" element={<Reklama />} />
            
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