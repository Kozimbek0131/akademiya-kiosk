import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaUsers, FaFileAlt, FaMapMarkedAlt, FaWifi } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const menuItems = [
    { 
      id: 1, 
      label: "XODIMLAR", 
      icon: <FaUsers className="text-5xl mb-4 text-blue-400" />, 
      path: '/employees',
      color: 'border-blue-500 hover:bg-blue-500/20'
    },
    { 
      id: 2, 
      label: "XARITA",   // <-- YANGI TUGMA (Transport o'rniga)
      icon: <FaMapMarkedAlt className="text-5xl mb-4 text-green-400" />, 
      path: '/map',
      color: 'border-green-500 hover:bg-green-500/20'
    },
    { 
      id: 3, 
      label: "HUJJATLAR", 
      icon: <FaFileAlt className="text-5xl mb-4 text-amber-400" />, 
      path: '/documents', // Hali bu sahifani ochmadik, keyingi darsda qilamiz
      color: 'border-amber-500 hover:bg-amber-500/20'
    },
    { 
      id: 4, 
      label: "WI-FI", 
      icon: <FaWifi className="text-5xl mb-4 text-purple-400" />, 
      path: '/wifi',
      color: 'border-purple-500 hover:bg-purple-500/20'
    },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-900">
      
      {/* Orqa fon bezagi */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg')] bg-center bg-no-repeat opacity-5 blur-sm scale-150 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-6xl px-4">
        {/* Sarlavha */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-wider drop-shadow-2xl mb-4">
            {t('academy_name') || "HUQUQNI MUHOFAZA QILISH AKADEMIYASI"}
          </h1>
          <p className="text-xl text-blue-200 font-medium tracking-[0.5em] uppercase border-t border-b border-blue-500/30 py-4 inline-block">
            Axborot-resurs kioski
          </p>
        </div>

        {/* Menyu Tugmalari */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`group relative h-64 bg-white/5 backdrop-blur-md border-2 ${item.color} rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95`}
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-2 scale-125">
                {item.icon}
              </div>
              <span className="text-2xl font-bold text-white tracking-widest uppercase mt-2">
                {item.label}
              </span>
              
              {/* Yaltiroq effekt */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;