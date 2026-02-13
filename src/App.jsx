import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/Employees'; // <-- YANGI QO'SHILDI

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timeoutId;

    // --- 1. KUTISH REJIMI (SCREENSAVER) ---
    const resetTimer = () => {
      clearTimeout(timeoutId);
      // 1 daqiqa harakatsizlikdan keyin Bosh sahifaga qaytadi
      timeoutId = setTimeout(() => {
        if (location.pathname !== '/') {
          navigate('/'); 
        }
      }, 60000); 
    };

    // --- 2. HIMOYA ---
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
    <div className="w-full h-screen bg-slate-900 overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Xodimlar sahifasi yo'nalishi */}
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default App;