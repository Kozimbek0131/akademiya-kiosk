import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timeoutId;

    // --- 1. KUTISH REJIMI (SCREENSAVER MANTIQI) ---
    const resetTimer = () => {
      clearTimeout(timeoutId);
      // Agar 1 daqiqa (60000 ms) hech kim ekranni bosmasa, Home'ga qaytadi
      timeoutId = setTimeout(() => {
        if (location.pathname !== '/') {
          navigate('/'); 
        }
      }, 60000); 
    };

    // --- 2. SICHQONCHA O'NG TUGMASINI QULFLASH ---
    const disableContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', disableContextMenu);

    // Ekranga tegilganda yoki sichqoncha qimirlaganda taymerni nollash
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer(); // Dastur yonganda taymerni ishga tushirish

    // Tozalash (xotira to'lib ketmasligi uchun)
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('contextmenu', disableContextMenu);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [navigate, location.pathname]);

  return (
    <div className="w-full h-screen bg-slate-900 overflow-hidden">
      <Routes>
        {/* Asosiy sahifa */}
        <Route path="/" element={<Home />} />
        
        {/* Kelajakda boshqa sahifalarni (Employees, Map va h.k) shu yerga qo'shamiz */}
        {/* <Route path="/employees" element={<Employees />} /> */}
      </Routes>
    </div>
  );
}

export default App;