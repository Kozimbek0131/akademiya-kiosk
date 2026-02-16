import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ActivityMonitor = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  const SCREENSAVER_PATH = '/reklama'; 
  const HOME_PATH = '/';
  
  // 1 daqiqa = 60000 millisekund
  const TIMEOUT_MS = 60000; 

  const resetTimer = () => {
    // Agar Reklamada bo'lsak va ekranga tegsak -> Homega qayt
    if (location.pathname === SCREENSAVER_PATH) {
      navigate(HOME_PATH);
    }

    // Eski taymerni o'chiramiz
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Agar Reklamada bo'lmasak, vaqtni sanashni boshla
    if (location.pathname !== SCREENSAVER_PATH) {
      timerRef.current = setTimeout(() => {
        navigate(SCREENSAVER_PATH);
      }, TIMEOUT_MS);
    }
  };

  useEffect(() => {
    // Barcha harakatlarni kuzatamiz
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Dastur ishga tushganda taymerni boshlash
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [location.pathname, navigate]);

  return <>{children}</>;
};

export default ActivityMonitor;