import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext'; // Tilni chaqiramiz
import Home from './pages/Home';
import Employees from './pages/Employees';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  // Screensaver holati (Boshida o'chiq bo'ladi)
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    // --- 1. SCREENSAVER MANTIQI ---
    const resetTimer = () => {
      // Har qanday harakat bo'lganda screensaver o'chadi
      setIsIdle(false); 
      
      clearTimeout(timeoutId);
      
      // Agar 10 SONIYA (test uchun) harakat bo'lmasa, Screensaver yonadi
      timeoutId = setTimeout(() => {
        setIsIdle(true);
        // Agar boshqa sahifada bo'lsa, Home'ga ham qaytarib yuboradi
        if (location.pathname !== '/') {
          navigate('/');
        }
      }, 10000); // <-- 10000 ms = 10 soniya
    };

    // --- 2. HIMOYA ---
    const disableContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', disableContextMenu);

    // Harakatlarni kuzatish
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    resetTimer(); // Dastur yonganda ishga tushirish

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('contextmenu', disableContextMenu);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [navigate, location.pathname]);

  return (
    <div className="w-full h-screen bg-slate-900 overflow-hidden relative">
      
      {/* --- SCREENSAVER PERDESI --- */}
      {/* Bu qism faqat isIdle=true bo'lganda ko'rinadi */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-1000 ${isIdle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Toza Video */}
        <video 
          src="/bg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        />
        
        {/* Qora parda va Yozuv */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center animate-pulse">
           <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg" alt="Logo" className="w-40 h-40 mb-8 drop-shadow-2xl opacity-80" />
           <h1 className="text-4xl text-white font-bold tracking-[0.2em] uppercase text-center drop-shadow-lg">
             {t('touch_to_start')}
           </h1>
        </div>
      </div>

      {/* --- ASOSIY SAHIFALAR --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default App;