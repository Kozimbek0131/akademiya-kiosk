import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import HeaderClock from '../components/HeaderClock';
import { FaUserTie, FaFileAlt, FaBus, FaWifi, FaTrophy, FaMapMarkedAlt } from 'react-icons/fa';
import logoImg from '../assets/logo.png'; 

const Home = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();

  const menuItems = [
    { id: 1, title: t('menu_employees'), icon: <FaUserTie />, path: '/employees', color: 'bg-blue-600' },
    { id: 2, title: t('menu_docs'), icon: <FaFileAlt />, path: '/documents', color: 'bg-green-600' },
    { id: 3, title: t('menu_transport'), icon: <FaBus />, path: '/transport', color: 'bg-amber-500' },
    { id: 4, title: t('menu_wifi'), icon: <FaWifi />, path: '/wifi', color: 'bg-indigo-500' },
    { id: 5, title: t('menu_achievements'), icon: <FaTrophy />, path: '/achievements', color: 'bg-red-500' },
    { id: 6, title: t('menu_map'), icon: <FaMapMarkedAlt />, path: '/map', color: 'bg-teal-600' },
  ];

  return (
    <div className="h-screen flex flex-col font-sans select-none overflow-hidden relative">
      
      {/* --- 1. ORQA FON VIDEOSI (Yangi video) --- */}
      <div className="absolute inset-0 z-0">
        <video 
          // DIQQAT: Bu yerda 'fon.mp4' yozildi
          src="/fon.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Qora parda (Yozuvlar ko'rinishi uchun) */}
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[3px]"></div>
      </div>

      {/* --- 2. ASOSIY CONTENT --- */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* HEADER */}
        <div className="h-80 relative flex flex-col items-center justify-center text-white shrink-0">
          
          <div className="absolute top-8 left-8 scale-110 origin-top-left">
             <HeaderClock />
          </div>

          <div className="absolute top-8 right-8 flex gap-3 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20">
            {['uz', 'ru', 'en'].map((lng) => (
              <button
                key={lng}
                onClick={() => setLang(lng)}
                className={`px-5 py-3 rounded-xl font-bold uppercase text-sm transition-all ${
                  lang === lng 
                    ? "bg-amber-400 text-blue-900 shadow-lg scale-105" 
                    : "text-white/80 hover:bg-white/20"
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

          <div className="mb-5 p-4 bg-white/10 rounded-full shadow-lg mt-10 backdrop-blur-md border border-white/20">
             <img src={logoImg} alt="Logo" className="w-28 h-28 object-contain" />
          </div>
          
          <h1 className="text-3xl font-black uppercase tracking-wider text-center px-4 max-w-4xl leading-snug drop-shadow-lg text-white">
            {t('header_title')}
          </h1>
          <p className="text-blue-200 mt-3 font-medium tracking-widest text-lg uppercase border-t border-blue-400/30 pt-3">
            {t('welcome')}
          </p>
        </div>

        {/* MENU GRID */}
        <div className="flex-1 overflow-y-auto mt-2 px-6 pb-10 custom-scrollbar">
          <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => navigate(item.path)}
                className="bg-white/10 backdrop-blur-md p-6 rounded-[30px] border border-white/20 flex flex-col items-center justify-center gap-4 active:scale-95 transition-all hover:bg-white/20 hover:border-white/40 hover:shadow-2xl cursor-pointer group h-56 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-2 ${item.color}`}></div>
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg group-hover:scale-110 transition-transform ${item.color}`}>
                  {item.icon}
                </div>
                <h2 className="text-xl font-bold text-white text-center leading-tight uppercase tracking-wide">
                  {item.title}
                </h2>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;