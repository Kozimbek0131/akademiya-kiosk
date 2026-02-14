import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Map from './pages/Map'; // <-- YANGI SAHIFA

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      // 3 daqiqa (180000ms) harakatsizlikdan keyin
      timeoutId = setTimeout(() => {
        setIsIdle(true);
        if (location.pathname !== '/') {
          navigate('/');
        }
      }, 180000); 
    };

    const disableContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', disableContextMenu);
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('contextmenu', disableContextMenu);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [navigate, location.pathname]);

  return (
    <div className="w-full h-screen bg-slate-900 overflow-hidden relative">
      
      {/* SCREENSAVER (Video o'rniga Rasm/Gerb) */}
      <div className={`fixed inset-0 z-[100] bg-slate-950 transition-opacity duration-1000 flex flex-col items-center justify-center ${isIdle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         {/* Orqa fon bezagi */}
         <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg')] bg-center bg-no-repeat opacity-10 blur-3xl scale-150 animate-pulse"></div>
         
         <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg" alt="Logo" className="w-60 h-60 mb-10 drop-shadow-2xl relative z-10" />
         <h1 className="text-3xl text-white/80 font-bold tracking-[0.3em] uppercase text-center animate-bounce relative z-10">
           {t('touch_to_start')}
         </h1>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/map" element={<Map />} /> {/* <-- Xarita yo'li */}
      </Routes>
    </div>
  );
}

export default App;