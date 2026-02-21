import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

import ActivityMonitor from './components/ActivityMonitor'; 
import Screensaver from './pages/Screensaver'; 
import Home from './pages/Home';
// ... boshqa importlar

function App() {
  return (
    <LanguageProvider>
      <div className="w-full h-screen bg-slate-900 overflow-hidden relative">
        
        {/* ActivityMonitor SHU YERDA BO'LISHI KERAK */}
        <ActivityMonitor>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/screensaver" element={<Screensaver />} />
            
            {/* Boshqa barcha sahifalar */}
            <Route path="/employees" element={<Employees />} />
            {/* ... */}
          </Routes>
        </ActivityMonitor>

      </div>
    </LanguageProvider>
  );
}

export default App;