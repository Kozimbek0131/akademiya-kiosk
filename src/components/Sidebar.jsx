import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaHome, FaUserTie, FaFileAlt, FaBus, FaWifi, FaTrophy, FaMapMarkedAlt, FaArrowLeft } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { path: '/', icon: <FaHome />, title: "Bosh sahifa" },
    { path: '/employees', icon: <FaUserTie />, title: t('menu_employees') },
    { path: '/documents', icon: <FaFileAlt />, title: t('menu_docs') },
    { path: '/transport', icon: <FaBus />, title: t('menu_transport') },
    { path: '/wifi', icon: <FaWifi />, title: t('menu_wifi') },
    { path: '/achievements', icon: <FaTrophy />, title: t('menu_achievements') },
    { path: '/map', icon: <FaMapMarkedAlt />, title: t('menu_map') },
  ];

  return (
    <div className="w-24 bg-blue-900 h-full flex flex-col items-center py-6 gap-4 shadow-xl z-50 shrink-0">
      {/* Orqaga qaytish tugmasi */}
      <button 
        onClick={() => navigate('/')} 
        className="p-4 bg-amber-500 rounded-2xl text-white mb-4 shadow-lg active:scale-95 transition-all animate-pulse"
      >
         <FaArrowLeft size={24} />
      </button>

      {/* Menyu tugmalari */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto w-full px-2 no-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`p-4 rounded-xl text-2xl transition-all flex justify-center ${
                isActive 
                ? 'bg-white text-blue-900 shadow-lg scale-105 ring-4 ring-blue-300/30' 
                : 'text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;