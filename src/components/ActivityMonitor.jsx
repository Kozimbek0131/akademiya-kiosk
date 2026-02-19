import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ActivityMonitor = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  const SCREENSAVER_PATH = '/screensaver'; 
  const HOME_PATH = '/';
  
  // 1 daqiqa = 60000 ms (Sinash uchun 5000 (5 soniya) qilib ko'ring, keyin 60000 ga qaytarasiz)
  const TIMEOUT_MS = 60000; 

  const resetTimer = () => {
    // 1. Agar hozir Screensaverda bo'lsak, hech narsa qilmaymiz (u yerdagi onClick ishlaydi)
    if (location.pathname === SCREENSAVER_PATH) {
      return;
    }

    // 2. Eski taymerni o'chiramiz
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 3. Konsolga yozamiz (Tekshirish uchun)
    console.log("Harakat sezildi! Taymer 0 dan boshlandi...");

    // 4. Yangi taymerni ishga tushiramiz
    timerRef.current = setTimeout(() => {
      console.log("Vaqt tugadi! Screensaverga o'tmoqda...");
      navigate(SCREENSAVER_PATH);
    }, TIMEOUT_MS);
  };

  useEffect(() => {
    // Qaysi harakatlarni kuzatamiz?
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    // Hodisalarni ulaymiz
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Dastur boshlanganda taymerni ishga tushirish
    resetTimer();

    // Tozalash
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [location.pathname]); // Sahifa o'zgarganda qayta ishga tushadi

  return <>{children}</>;
};

export default ActivityMonitor;