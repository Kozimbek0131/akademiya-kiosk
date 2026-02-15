import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaUserTie, FaTrophy, FaFileAlt, FaBus, FaWifi, 
  FaMapMarkedAlt, FaCloudSun, FaClock, FaQuestionCircle, FaStar 
} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  
  // 🕒 JONLI SOAT
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString(language === 'uz' ? 'uz-UZ' : (language === 'ru' ? 'ru-RU' : 'en-US'), {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 🔘 MENYU TUGMALARI (Barcha ma'lumotlar saqlandi)
  const menuItems = [
    { 
      id: 'employees', 
      icon: <FaUserTie />, 
      label: t('menu_employees') || "XODIMLAR", 
      path: '/employees', 
      desc: "Professor va o'qituvchilar" 
    },
    { 
      id: 'leadership', 
      icon: <FaStar />, 
      label: "RAHBARIYAT", 
      path: '/leadership', 
      desc: "Akademiya boshlig'i" 
    },
    { 
      id: 'achievements', 
      icon: <FaTrophy />, 
      label: t('menu_achievements') || "YUTUQLAR", 
      path: 'https://proacademy.uz', 
      desc: "proacademy.uz saytiga o'tish" 
    },
    { 
      id: 'documents', 
      icon: <FaFileAlt />, 
      label: t('menu_documents') || "HUJJATLAR", 
      path: '/documents', 
      desc: "Qonunlar va buyruqlar" 
    },
    { 
      id: 'transport', 
      icon: <FaBus />, 
      label: t('menu_transport') || "TRANSPORT", 
      path: '/transport', 
      desc: "Yo'nalishlar" 
    },
    { 
      id: 'wifi', 
      icon: <FaWifi />, 
      label: t('menu_wifi') || "WI-FI", 
      path: '/wifi', 
      desc: "Bepul internet" 
    },
    { 
      id: 'map', 
      icon: <FaMapMarkedAlt />, 
      label: t('menu_map') || "XARITA", 
      path: '/map', 
      desc: "Bino rejasi" 
    },
    { 
      id: 'faq', 
      icon: <FaQuestionCircle />, 
      label: "MA'LUMOT", 
      path: '/faq', 
      desc: "Savol-javoblar" 
    },
  ];

  const handleNavigation = (path) => {
    if (path.startsWith('http')) {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] relative overflow-x-hidden select-none font-sans text-white">
      
      {/* FON - Fixed qilingan, scroll paytida joyida turadi */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] z-0"></div>
      
      {/* STATUS BAR */}
      <div className="relative z-20 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex flex-col">
           <span className="text-xl md:text-3xl font-bold text-white tracking-widest">{formattedTime}</span>
           <span className="text-[10px] md:text-xs text-blue-200 uppercase tracking-wide opacity-80">{formattedDate}</span>
        </div>
        <div className="flex bg-black/30 rounded-lg p-1">
            {['uz', 'ru', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-md font-bold uppercase text-[10px] md:text-xs transition-all ${
                  language === lang ? 'bg-blue-600 text-white shadow' : 'text-gray-400'
                }`}
              >
                {lang}
              </button>
            ))}
        </div>
      </div>

      {/* 🏛️ HEADER */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-6 pb-4 text-center shrink-0 px-4">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="h-20 md:h-32 w-auto object-contain mb-3 drop-shadow-2xl filter brightness-110"
        />
        
        <h2 className="text-[10px] md:text-sm font-bold text-amber-500 uppercase tracking-[0.2em] mb-1 drop-shadow-md">
           O'ZBEKISTON RESPUBLIKASI
        </h2>

        <h1 className="text-lg md:text-3xl font-black text-white uppercase tracking-wider mb-1 px-2 leading-tight max-w-4xl">
           HUQUQNI MUHOFAZA QILISH AKADEMIYASI
        </h1>

        <div className="w-20 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-3 mb-2 opacity-80"></div>

        <p className="text-blue-200/60 text-[8px] md:text-xs font-bold tracking-[0.3em] uppercase">
          {t('subtitle') || "AXBOROT-RESURS KIOSKI"}
        </p>
      </div>

      {/* ASOSIY MENYU */}
      <div className="relative z-10 flex-1 px-4 pb-12 overflow-y-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-5xl mx-auto mt-4 pb-10">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center text-center p-4 active:scale-95 shadow-lg min-h-[110px] md:min-h-[160px]"
            >
              <div className="text-3xl md:text-5xl text-blue-100 mb-2 group-hover:scale-110 group-hover:text-blue-400 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-xs md:text-lg font-bold text-white uppercase tracking-wider mb-0.5 leading-tight">
                {item.label}
              </span>
              <span className="hidden md:block text-[10px] text-gray-500 group-hover:text-gray-300 line-clamp-1 px-1">
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-20 text-center py-2 bg-black/40 text-white/20 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.2em] shrink-0">
        © 2026 Akademiya Axborot Texnologiyalari Markazi
      </div>
    </div>
  );
};

export default Home;