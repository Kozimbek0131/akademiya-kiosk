import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaUserTie, FaTrophy, FaFileAlt, FaBus, FaWifi, 
  FaMapMarkedAlt, FaQuestionCircle, FaStar 
} from 'react-icons/fa';
import logoImg from '../assets/logo.png';

const Home = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString(language === 'uz' ? 'uz-UZ' : (language === 'ru' ? 'ru-RU' : 'en-US'), {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const menuItems = [
    { id: 'employees', icon: <FaUserTie />, label: t('menu_employees'), path: '/employees', desc: t('desc_employees') },
    { id: 'leadership', icon: <FaStar />, label: t('menu_leadership'), path: '/leadership', desc: t('desc_leadership') },
    { id: 'achievements', icon: <FaTrophy />, label: t('menu_achievements'), path: '/achievements', desc: t('desc_achievements') },
    { id: 'documents', icon: <FaFileAlt />, label: t('menu_documents'), path: '/documents', desc: t('desc_documents') },
    { id: 'transport', icon: <FaBus />, label: t('menu_transport'), path: '/transport', desc: t('desc_transport') },
    { id: 'wifi', icon: <FaWifi />, label: t('menu_wifi'), path: '/wifi', desc: t('desc_wifi') },
    { id: 'map', icon: <FaMapMarkedAlt />, label: t('menu_map'), path: '/map', desc: t('desc_map') },
    { id: 'faq', icon: <FaQuestionCircle />, label: t('menu_faq'), path: '/faq', desc: t('desc_faq') },
  ];

  const handleNavigation = (path) => {
    if (path.startsWith('http')) {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] relative overflow-hidden select-none font-sans text-white">
      
      {/* VIDEO FON (Public papkasidan) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]"></div>
        <video 
          src="/bg_video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/40 to-[#0f172a]/90"></div>
      </div>
      
      {/* STATUS BAR */}
      <div className="relative z-20 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex flex-col">
           <span className="text-xl md:text-3xl font-bold text-white tracking-widest">{formattedTime}</span>
           <span className="text-[10px] md:text-xs text-blue-200 uppercase tracking-wide opacity-80">{formattedDate}</span>
        </div>
        <div className="flex bg-black/30 rounded-lg p-1 gap-1">
            {['uz', 'ru', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 md:px-3 py-1 rounded-md font-bold uppercase text-[10px] md:text-xs transition-all ${
                  language === lang ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
        </div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-6 md:pt-10 pb-6 text-center shrink-0 px-4">
        <img 
          src={logoImg} 
          alt="Logo" 
          className="h-24 md:h-40 w-auto object-contain mb-4 drop-shadow-2xl filter brightness-110 animate-fade-in-down"
        />
        <h2 className="text-[10px] md:text-sm font-bold text-amber-500 uppercase tracking-[0.2em] mb-1">O'ZBEKISTON RESPUBLIKASI</h2>
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider mb-2 px-2 leading-tight max-w-5xl drop-shadow-lg">
          HUQUQNI MUHOFAZA QILISH AKADEMIYASI
        </h1>
        <div className="w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2 mb-2 opacity-80"></div>
        <p className="text-blue-200/60 text-[8px] md:text-xs font-bold tracking-[0.3em] uppercase">{t('subtitle')}</p>
      </div>

      {/* MENYU */}
      <div className="relative z-10 flex-1 px-4 md:px-8 pb-12 overflow-y-visible w-full flex justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl mt-4 pb-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-800/40 backdrop-blur-sm border border-white/10 hover:bg-slate-700/60 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center text-center p-4 md:p-6 active:scale-95 shadow-lg min-h-[140px] md:min-h-[220px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"></div>
              <div className="text-4xl md:text-6xl text-blue-400 mb-3 md:mb-5 group-hover:scale-110 group-hover:text-white transition-transform duration-300 drop-shadow-md relative z-10">
                {item.icon}
              </div>
              <span className="text-sm md:text-xl font-black text-white uppercase tracking-wider mb-1 leading-tight relative z-10 group-hover:text-blue-300 transition-colors">
                {item.label}
              </span>
              <span className="text-[10px] md:text-sm text-gray-400 group-hover:text-gray-200 line-clamp-2 px-1 font-medium relative z-10">
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-20 text-center py-4 bg-black/40 text-white/20 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.2em] shrink-0 backdrop-blur-sm border-t border-white/5">
        {t('footer_text')}
      </div>
    </div>
  );
};

export default Home;