import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const HeaderClock = () => {
  // "lang" emas, "language" bo'lishi kerak (agar Context shunday tuzilgan bo'lsa)
  const { language } = useLanguage();
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    // Har 1 sekundda vaqtni yangilash
    const timer = setInterval(() => setDateState(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tilga mos sana formati
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const locale = language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US';

  return (
    // "items-end" o'rniga "items-start" qildim, Home da chap tarafda turishi uchun
    <div className="flex flex-col items-start text-white">
      <div className="text-xl md:text-3xl font-bold tracking-widest leading-none">
        {dateState.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-[10px] md:text-xs text-blue-200 uppercase tracking-wide opacity-80 mt-1">
        {dateState.toLocaleDateString(locale, options)}
      </div>
    </div>
  );
};

export default HeaderClock;