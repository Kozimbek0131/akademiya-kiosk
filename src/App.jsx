import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Documents from './pages/Documents';
import Transport from './pages/Transport';
import Wifi from './pages/Wifi';
import Achievements from './pages/Achievements';
// To'g'ri import qilingan
import Map from './pages/Map';
import Screensaver from './pages/Screensaver';

const App = () => {
  // Screensaver holati (Boshida true = yonuq bo'ladi)
  const [isIdle, setIsIdle] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Har qanday harakat bo'lganda Screensaverni o'chirish
  const handleUserActivity = () => {
    setIsIdle(false);
  };

  // Harakatsizlikni kuzatish (Vaqtni o'zingiz sozlashingiz mumkin, hozir 60 sekund)
  useEffect(() => {
    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      // Agar 60 sekund (60000 ms) harakat bo'lmasa, Screensaver yonadi
      timeout = setTimeout(() => setIsIdle(true), 60000); 
    };

    // Hodisalarni tinglash
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer(); // Boshlanishida ishga tushirish

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" onClick={handleUserActivity} onTouchStart={handleUserActivity}>
      
      {/* Agar harakatsiz bo'lsa (isIdle = true), SCREENSAVER chiqadi */}
      {isIdle && (
        <Screensaver onInteract={() => setIsIdle(false)} />
      )}

      {/* Agar Asosiy menyuda bo'lmasak, chap menyuni ko'rsatamiz */}
      {location.pathname !== '/' && !isIdle && <Sidebar />}

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/wifi" element={<Wifi />} />
          <Route path="/achievements" element={<Achievements />} />
          
          {/* --- MANA SHU YER TUZATILDI --- */}
          {/* Oldin <MapPage /> edi, hozir <Map /> qildim */}
          <Route path="/map" element={<Map />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default App;