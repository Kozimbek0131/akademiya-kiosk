import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ActivityMonitor = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  // location.pathname doim yangilanib turishi uchun ref ishlatamiz
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  const resetTimer = () => {
    // Agar allaqachon reklama (screensaver) sahifasida bo'lsak, taymerni sanashga hojat yo'q
    if (pathnameRef.current === '/screensaver') {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // Eski taymerni nolga tushiramiz
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Yangi 1 daqiqalik (60000 ms) taymerni boshlaymiz
    timerRef.current = setTimeout(() => {
      navigate('/screensaver');
    }, 60000); 
  };

  useEffect(() => {
    // Kiosk ishga tushishi bilan taymerni birinchi marta boshlaymiz
    resetTimer();

    // Kuzatiladigan harakatlar ro'yxati (touch - ekran uchun, click/mouse - kompyuter uchun)
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click', 'pointerdown'];

    // Harakat bo'lganda ishlaydigan funksiya
    const handleActivity = () => {
      resetTimer();
    };

    // Hodisalarni butun hujjatga (document) majburiy (capture: true) rejimida ulaymiz. 
    // Bu - istalgan tugma bosilsa ham harakatni o'tkazib yubormasligini kafolatlaydi.
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [navigate]);

  return <>{children}</>;
};

export default ActivityMonitor;