import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaUserTie, FaTrophy, FaFileAlt, FaBus, FaWifi, FaMapMarkedAlt, FaCloudSun, FaClock, FaGlobe } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  
  // 🕒 JONLI SOAT VA SANA
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sana formati (Tilga qarab o'zgaradi)
  const formattedDate = time.toLocaleDateString(language === 'uz' ? 'uz-UZ' : (language === 'ru' ? 'ru-RU' : 'en-US'), {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Soat formati
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // MENYU TUGMALARI
  const menuItems = [
    { id: 'employees', icon: <FaUserTie />, label: t('menu_employees'), path: '/employees', color: 'from-blue-600 to-blue-800' },
    { id: 'achievements', icon: <FaTrophy />, label: t('menu_achievements'), path: '/achievements', color: 'from-amber-500 to-yellow-600' },
    { id: 'documents', icon: <FaFileAlt />, label: t('menu_documents'), path: '/documents', color: 'from-slate-600 to-slate-800' },
    { id: 'transport', icon: <FaBus />, label: t('menu_transport'), path: '/transport', color: 'from-red-600 to-red-800' },
    { id: 'wifi', icon: <FaWifi />, label: t('menu_wifi'), path: '/wifi', color: 'from-indigo-600 to-indigo-800' },
    { id: 'map', icon: <FaMapMarkedAlt />, label: t('menu_map'), path: '/map', color: 'from-emerald-600 to-emerald-800' },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none">
      
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 z-0"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg')] bg-center bg-no-repeat bg-contain animate-pulse z-0"></div>

      {/* 🟢 TEPADAGI STATUS BAR (YANGI) */}
      <div className="relative z-20 bg-black/40 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
        
        {/* Chap: Soat va Sana */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-white">
             <FaClock className="text-blue-400 text-2xl" />
             <span className="text-3xl font-black tracking-widest">{formattedTime}</span>
          </div>
          <div className="h-8 w-[1px] bg-white/20"></div>
          <div className="text-gray-300 font-medium uppercase text-sm tracking-wide">
            {formattedDate}
          </div>
        </div>

        {/* O'rta: Ob-havo (Statik) */}
        <div className="flex items-center gap-3 text-white bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <FaCloudSun className="text-yellow-400 text-xl" />
          <span className="font-bold">+24°C</span>
          <span className="text-xs text-gray-400 uppercase">Tashkent</span>
        </div>

        {/* O'ng: Tilni o'zgartirish */}
        <div className="flex gap-2">
          {['uz', 'ru', 'en'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-lg font-bold uppercase text-sm transition-all ${
                language === lang 
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] scale-110' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* ASOSIY SARLAVHA */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-10 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] mb-2">
          {t('app_name')}
        </h1>
        <p className="text-blue-400 text-xl font-bold tracking-[0.5em] uppercase border-b-2 border-blue-500/50 pb-2">
          {t('subtitle')}
        </p>
      </div>

      {/* MENYU TUGMALARI (GRID) */}
      <div className="relative z-10 flex-1 p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-full max-w-7xl mx-auto">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.color} shadow-2xl border border-white/10 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex flex-col items-center justify-center gap-4`}
              style={{ animation: `fadeIn Up 0.5s ease-out ${index * 0.1}s backwards` }}
            >
              {/* Yaltiroq effekt */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              
              <div className="text-6xl text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              
              <span className="text-2xl font-black text-white uppercase tracking-wider text-center px-4">
                {item.label}
              </span>

              {/* Pastki chiziqcha */}
              <div className="w-12 h-1 bg-white/50 rounded-full group-hover:w-24 transition-all duration-300"></div>
            </button>
          ))}
        </div>
      </div>

      {/* PASTKI QISM (FOOTER) */}
      <div className="relative z-10 text-center py-4 text-white/20 text-xs uppercase font-bold tracking-widest">
        © 2026 Akademiya Axborot Texnologiyalari Markazi
      </div>

    </div>
  );
};

export default Home;