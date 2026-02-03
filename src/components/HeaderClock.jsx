import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const HeaderClock = () => {
  const { lang } = useLanguage();
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    // Har 1 sekundda vaqtni yangilash
    const timer = setInterval(() => setDateState(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tilga mos sana formati
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const locale = lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US';

  return (
    <div className="flex flex-col items-end text-white/90">
      <div className="text-2xl font-black tracking-widest leading-none font-mono">
        {dateState.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-[10px] font-bold uppercase opacity-80 mt-1">
        {dateState.toLocaleDateString(locale, options)}
      </div>
    </div>
  );
};

export default HeaderClock;