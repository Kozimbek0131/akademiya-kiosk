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
  
  // 🕒 JONLI SOAT VA SANA
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString(language === 'uz' ? 'uz-UZ' : (language === 'ru' ? 'ru-RU' : 'en-US'), {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 🔘 MENYU TUGMALARI (Rang-baranglik olib tashlandi, jiddiy stil berildi)
  const menuItems = [
    { 
      id: 'employees', 
      icon: <FaUserTie />, 
      label: t('menu_employees') || "XODIMLAR", 
      path: '/employees',
      desc: "Professor va o'qituvchilar tarkibi" 
    },
    { 
      id: 'leadership', 
      icon: <FaStar />, 
      label: "RAHBARIYAT", 
      path: '/leadership',
      desc: "Akademiya boshlig'i va o'rinbosarlar"
    },
    { 
      id: 'achievements', 
      icon: <FaTrophy />, 
      label: t('menu_achievements') || "YUTUQLAR", 
      path: '/achievements',
      desc: "Sertifikatlar va mukofotlar"
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
      desc: "Avtobus va yo'nalishlar"
    },
    { 
      id: 'wifi', 
      icon: <FaWifi />, 
      label: t('menu_wifi') || "WI-FI", 
      path: '/wifi',
      desc: "Bepul internetga ulanish"
    },
    { 
      id: 'map', 
      icon: <FaMapMarkedAlt />, 
      label: t('menu_map') || "XARITA", 
      path: '/map',
      desc: "Bino va auditoriyalar rejasi"
    },
    { 
      id: 'faq', 
      icon: <FaQuestionCircle />, 
      label: "MA'LUMOT", 
      path: '/faq',
      desc: "Ko'p beriladigan savollar"
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] relative overflow-hidden select-none font-sans">
      
      {/* 🌌 FON (Tinch va Jiddiy) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] z-0"></div>
      
      {/* Orqa fondagi katta xira Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
         <img src="/logo.png" alt="Background Logo" className="w-[80%] opacity-20 grayscale" />
      </div>

      {/* 🟢 TEPADAGI STATUS BAR (Glass Effect) */}
      <div className="relative z-20 bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-lg">
        
        {/* Soat */}
        <div className="flex flex-col">
           <span className="text-4xl font-bold text-white tracking-widest">{formattedTime}</span>
           <span className="text-sm text-blue-200 uppercase tracking-wide opacity-80">{formattedDate}</span>
        </div>

        {/* Ob-havo va Til */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-white bg-white/5 px-4 py-2 rounded-xl border border-white/5">
             <FaCloudSun className="text-amber-400 text-xl" />
             <span className="font-bold">Tashkent +24°C</span>
          </div>

          <div className="flex bg-black/20 rounded-xl p-1">
            {['uz', 'ru', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-lg font-bold uppercase text-sm transition-all duration-300 ${
                  language === lang 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🏛️ HEADER QISMI (Logo va Sarlavha) */}
      <div className="relative z-10 flex flex-col items-center justify-center py-8 text-center space-y-4">
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="w-28 h-28 drop-shadow-2xl filter brightness-110"
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-1">
            {t('app_name')}
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="text-blue-200/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mt-2">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* 🔲 ASOSIY MENYU (VERTIKAL EKRAN UCHUN 2 USTUN) */}
      <div className="relative z-10 flex-1 px-6 pb-6 overflow-hidden">
        <div className="grid grid-cols-2 gap-4 h-full max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center text-center p-4 active:scale-95"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards` }}
            >
              {/* Yon tarafdagi bezak chiziq */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Icon */}
              <div className="text-5xl text-blue-100 mb-3 group-hover:scale-110 group-hover:text-white transition-transform duration-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                {item.icon}
              </div>
              
              {/* Label */}
              <span className="text-lg md:text-xl font-bold text-white uppercase tracking-wider mb-1">
                {item.label}
              </span>

              {/* Description (Kichik izoh) */}
              <span className="text-xs text-gray-400 group-hover:text-blue-200 transition-colors line-clamp-1 px-2">
                {item.desc}
              </span>

              {/* Yaltiroq effekt */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center py-3 bg-black/20 text-white/30 text-[10px] uppercase font-bold tracking-[0.2em] border-t border-white/5">
        © 2026 Akademiya Axborot Tizimlari
      </div>

    </div>
  );
};

export default Home;