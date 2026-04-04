import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaUserTie, FaTrophy, FaFileAlt, FaBus, FaWifi, 
  FaMapMarkedAlt, FaQuestionCircle, FaStar, FaExclamationTriangle, FaExpand 
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

  const getFormattedDate = () => {
    if (language === 'uz') {
      const monthsUz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
      const daysUz = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
      return `${time.getDate()}-${monthsUz[time.getMonth()]}, ${time.getFullYear()}-yil, ${daysUz[time.getDay()]}`;
    } else {
      return time.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    }
  };

  const formattedDate = getFormattedDate();
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`To'liq ekranga o'tishda xatolik: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const menuItems = [
    { id: 'leadership', icon: <FaStar />, label: t('menu_leadership'), path: '/leadership', desc: t('desc_leadership') },
    { id: 'employees', icon: <FaUserTie />, label: t('menu_employees'), path: '/employees', desc: t('desc_employees') },
    { id: 'achievements', icon: <FaTrophy />, label: t('menu_achievements'), path: '/achievements', desc: t('desc_achievements') },
    { id: 'documents', icon: <FaFileAlt />, label: t('menu_documents'), path: '/documents', desc: t('desc_documents'), isComingSoon: true },
    { id: 'transport', icon: <FaBus />, label: t('menu_transport'), path: '/transport', desc: t('desc_transport') },
    { id: 'wifi', icon: <FaWifi />, label: t('menu_wifi'), path: '/wifi', desc: t('desc_wifi') },
    { id: 'map', icon: <FaMapMarkedAlt />, label: t('menu_map'), path: '/map', desc: t('desc_map'), isComingSoon: true },
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
      
      {/* VIDEO IZOHDAN CHIQARILDI */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105">
          <source src="/bg_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
      </div> */}
      
      <div className="relative z-20 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex flex-col">
           <span className="text-xl md:text-3xl font-bold text-white tracking-widest drop-shadow-lg">{formattedTime}</span>
           <span className="text-[10px] md:text-sm text-blue-200 uppercase tracking-wide opacity-80">{formattedDate}</span>
        </div>
        <div className="flex bg-black/40 backdrop-blur-md rounded-lg p-1 gap-1 border border-white/10">
             {['uz', 'ru', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-2 rounded-md font-bold uppercase text-xs md:text-sm transition-all ${
                  language === lang ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]' : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center pt-4 md:pt-6 pb-2 text-center shrink-0 px-4">
        <img 
          src={logoImg} 
          alt="Logo" 
          className="h-20 md:h-32 w-auto object-contain mb-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-fade-in-down"
        />
        <h2 className="text-[10px] md:text-sm font-bold text-amber-500 uppercase tracking-[0.2em] mb-1 drop-shadow-md">
          {t('country_name')}
        </h2>
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider mb-2 px-2 leading-tight max-w-5xl drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
          {t('app_name')}
        </h1>
        <div className="w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2 mb-2 opacity-80"></div>
        <p className="text-blue-200 text-[8px] md:text-xs font-bold tracking-[0.3em] uppercase drop-shadow-md">
          {t('subtitle')}
        </p>
      </div>

      <div className="relative z-10 flex-1 px-4 md:px-8 w-full flex justify-center overflow-y-auto custom-scrollbar touch-pan-y pb-6">
        <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl mt-4 h-fit">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-slate-900/60 backdrop-blur-xl border border-white/20 hover:bg-slate-800/80 hover:border-blue-400 transition-all duration-300 flex flex-col items-center justify-center text-center p-6 md:p-8 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-h-[160px] md:min-h-[240px] cursor-pointer"
            >
              {item.isComingSoon && (
                <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse z-20">
                  Jarayonda
                </div>
              )}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="text-5xl md:text-7xl text-blue-400 mb-4 md:mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-300 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)] relative z-10">
                {item.icon}
              </div>
              
              <span className="text-base md:text-2xl font-black text-white uppercase tracking-wider mb-2 leading-tight relative z-10 group-hover:text-blue-300 transition-colors drop-shadow-md">
                {item.label}
              </span>
              
              <span className="text-xs md:text-base text-gray-300 group-hover:text-gray-100 line-clamp-2 px-2 font-medium relative z-10">
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-20 w-full flex items-center bg-black/80 backdrop-blur-md border-t border-white/10 shrink-0 mt-auto">
        
        <div className="flex-1 overflow-hidden py-3 md:py-4">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-6 text-[10px] md:text-sm tracking-widest px-4">
            
            <FaExclamationTriangle className="text-lg md:text-xl animate-pulse text-amber-500" />
            <span className="uppercase font-black text-amber-500">{t('test_mode_warning')}</span>
            <span className="text-white/20 mx-2 font-black">///</span>
            <div className="flex items-center">
               <span className="uppercase font-bold text-amber-200">{t('suggestions_text').split('@')[0]}</span>
               <span className="lowercase font-black text-amber-400">@akhatov0131</span>
            </div>
            
            <span className="text-white/20 mx-2 font-black">///</span>
            
            <FaExclamationTriangle className="text-lg md:text-xl animate-pulse text-amber-500" />
            <span className="uppercase font-black text-amber-500">{t('test_mode_warning')}</span>
            <span className="text-white/20 mx-2 font-black">///</span>
            <div className="flex items-center">
               <span className="uppercase font-bold text-amber-200">{t('suggestions_text').split('@')[0]}</span>
               <span className="lowercase font-black text-amber-400">@akhatov0131</span>
            </div>

            <span className="text-white/20 mx-2 font-black">///</span>
            
            <FaExclamationTriangle className="text-lg md:text-xl animate-pulse text-amber-500" />
            <span className="uppercase font-black text-amber-500">{t('test_mode_warning')}</span>
            <span className="text-white/20 mx-2 font-black">///</span>
            <div className="flex items-center">
               <span className="uppercase font-bold text-amber-200">{t('suggestions_text').split('@')[0]}</span>
               <span className="lowercase font-black text-amber-400">@akhatov0131</span>
            </div>
            
          </div>
        </div>

        <button 
          onClick={toggleFullScreen}
          className="absolute right-0 top-0 bottom-0 z-50 px-4 md:px-6 bg-black/50 opacity-10 hover:opacity-100 transition-opacity cursor-pointer text-white flex items-center justify-center"
          title="To'liq ekranga o'tish"
        >
          <FaExpand className="text-base md:text-xl" />
        </button>

      </div>

    </div>
  );
};

export default Home;