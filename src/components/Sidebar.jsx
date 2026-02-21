import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaHome, FaUserTie, FaFileAlt, FaBus, FaWifi, 
  FaTrophy, FaMapMarkedAlt, FaArrowLeft, FaStar, FaQuestionCircle 
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { path: '/', icon: <FaHome />, title: "Bosh sahifa" },
    { path: '/employees', icon: <FaUserTie />, title: t('menu_employees') || "Xodimlar" },
    { path: '/leadership', icon: <FaStar />, title: t('menu_leadership') || "Rahbariyat" },
    { path: '/achievements', icon: <FaTrophy />, title: t('menu_achievements') || "Yutuqlar" },
    { path: '/documents', icon: <FaFileAlt />, title: t('menu_documents') || "Hujjatlar" },
    { path: '/transport', icon: <FaBus />, title: t('menu_transport') || "Transport" },
    { path: '/wifi', icon: <FaWifi />, title: t('menu_wifi') || "Wi-Fi" },
    { path: '/map', icon: <FaMapMarkedAlt />, title: t('menu_map') || "Xarita" },
    { path: '/faq', icon: <FaQuestionCircle />, title: t('menu_faq') || "Ma'lumot" },
  ];

  return (
    <div className="w-24 bg-slate-900 border-r border-white/10 h-full flex flex-col items-center py-6 gap-4 shadow-xl z-50 shrink-0">
      
      {/* Orqaga qaytish tugmasi (TO'G'RIDAN-TO'G'RI BOSH SAHIFAGA) */}
      <button 
        onClick={() => navigate('/')} 
        className="p-4 bg-amber-500 rounded-2xl text-white mb-2 shadow-lg hover:bg-amber-400 active:scale-95 transition-all"
        title="Asosiy menyuga"
      >
         <FaArrowLeft size={24} />
      </button>

      {/* Ajratuvchi chiziq */}
      <div className="w-12 h-px bg-white/20 mb-2"></div>

      {/* Menyu tugmalari */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto w-full px-2 custom-scrollbar pb-10">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={item.title}
              className={`p-4 rounded-xl text-2xl transition-all flex justify-center items-center group relative ${
                isActive 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] scale-105' 
                : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              
              {/* Tanlangan sahifa indikatori */}
              {isActive && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-amber-500 rounded-l-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;