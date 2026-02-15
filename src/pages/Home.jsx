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

  // 🔘 MENYU TUGMALARI
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
      path: 'https://proacademy.uz', // 🌐 SAYTGA LINK
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

  // Linkni ochish funksiyasi (Ichki yoki Tashqi ekanini tekshiradi)
  const handleNavigation = (path) => {
    if (path.startsWith('http')) {
      // Agar link "http" bilan boshlansa, brauzerda yangi saytni och
      window.location.href = path;
    } else {
      // Aks holda ichki sahifaga o't
      navigate(path);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] relative overflow-hidden select-none font-sans">
      
      {/* FON */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] z-0"></div>
      
      {/* STATUS BAR */}
      <div className="relative z-20 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex flex-col">
           <span className="text-3xl font-bold text-white tracking-widest">{formattedTime}</span>
           <span className="text-xs text-blue-200 uppercase tracking-wide opacity-80">{formattedDate}</span>
        </div>
        <div className="flex bg-black/30 rounded-lg p-1">
            {['uz', 'ru', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-md font-bold uppercase text-xs transition-all ${
                  language === lang ? 'bg-blue-600 text-white shadow' : 'text-gray-400'
                }`}
              >
                {lang}
              </button>
            ))}
        </div>
      </div>

      {/* 🏛️ HEADER (RASMIY NOM) */}
      <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center shrink-0">
        
        {/* Logo */}
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="h-24 md:h-32 w-auto object-contain mb-3 drop-shadow-2xl filter brightness-110"
        />
        
        {/* 1. O'zbekiston Respublikasi (Oltin rangda) */}
        <h2 className="text-xs md:text-sm font-bold text-amber-500 uppercase tracking-[0.2em] mb-1 drop-shadow-md">
           O'ZBEKISTON RESPUBLIKASI
        </h2>

        {/* 2. Akademiya Nomi (Oq rangda, Katta) */}
        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-widest mb-1 px-4 leading-tight drop-shadow-lg max-w-4xl">
           HUQUQNI MUHOFAZA QILISH AKADEMIYASI
        </h1>

        {/* 3. Chiziqcha */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-3 mb-2 opacity-80"></div>

        {/* 4. Kiosk subtitri */}
        <p className="text-blue-200/60 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
          {t('subtitle')}
        </p>
      </div>

      {/* ASOSIY MENYU */}
      <div className="relative z-10 flex-1 px-4 pb-4 overflow-hidden flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-3 md:gap-4 h-full max-h-[800px] w-full max-w-2xl mx-auto">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)} // <-- O'zgartirilgan joyi
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center text-center p-2 active:scale-95 shadow-lg"
              style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.05}s backwards` }}
            >
              <div className="text-4xl md:text-5xl text-blue-100 mb-2 group-hover:scale-110 group-hover:text-blue-400 transition-transform duration-300 drop-shadow-lg">
                {item.icon}
              </div>
              <span className="text-sm md:text-lg font-bold text-white uppercase tracking-wider mb-0.5 leading-tight">
                {item.label}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-gray-300 line-clamp-1 px-1">
                {item.desc}
              </span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center py-2 bg-black/20 text-white/20 text-[9px] uppercase font-bold tracking-[0.2em] shrink-0">
        © 2026 Akademiya Axborot Texnologiyalari Markazi
      </div>

    </div>
  );
};

export default Home;