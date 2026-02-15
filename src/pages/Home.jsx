import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaUsers, FaTrophy, FaFileAlt, FaBus, FaWifi, FaMapMarkedAlt } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Fayllar tuzilmasiga mos 6 ta bo'lim:
  const menuItems = [
    { 
      id: 1, 
      label: "XODIMLAR", 
      icon: <FaUsers className="text-6xl mb-4 text-blue-400" />, 
      path: '/employees',
      color: 'border-blue-500 hover:bg-blue-500/20 shadow-blue-500/20'
    },
    { 
      id: 2, 
      label: "YUTUQLAR", // Achievements.jsx
      icon: <FaTrophy className="text-6xl mb-4 text-yellow-400" />, 
      path: '/achievements',
      color: 'border-yellow-500 hover:bg-yellow-500/20 shadow-yellow-500/20'
    },
    { 
      id: 3, 
      label: "HUJJATLAR", 
      icon: <FaFileAlt className="text-6xl mb-4 text-gray-300" />, 
      path: '/documents', 
      color: 'border-gray-500 hover:bg-gray-500/20 shadow-gray-500/20'
    },
    { 
      id: 4, 
      label: "TRANSPORT", 
      icon: <FaBus className="text-6xl mb-4 text-red-400" />, 
      path: '/transport', 
      color: 'border-red-500 hover:bg-red-500/20 shadow-red-500/20'
    },
    { 
      id: 5, 
      label: "WI-FI", 
      icon: <FaWifi className="text-6xl mb-4 text-purple-400" />, 
      path: '/wifi',
      color: 'border-purple-500 hover:bg-purple-500/20 shadow-purple-500/20'
    },
    { 
      id: 6, 
      label: "XARITA", // Map.jsx (Yangi qo'shilgan)
      icon: <FaMapMarkedAlt className="text-6xl mb-4 text-green-400" />, 
      path: '/map',
      color: 'border-green-500 hover:bg-green-500/20 shadow-green-500/20'
    },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-900 select-none">
      
      {/* Orqa fon bezagi (Gerb) */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg')] bg-center bg-no-repeat opacity-10 blur-md scale-125 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col h-[90vh]">
        
        {/* Sarlavha Qismi (To'g'rilandi) */}
        <div className="text-center mb-8 flex-none">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider drop-shadow-2xl mb-4 leading-tight">
            HUQUQNI MUHOFAZA QILISH AKADEMIYASI
          </h1>
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
          <p className="text-xl text-blue-200 font-medium tracking-[0.5em] uppercase py-4 inline-block">
            Axborot-resurs kioski
          </p>
        </div>

        {/* 6 ta Katta Menyu Tugmalari (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1 content-center pb-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`group relative h-full min-h-[180px] bg-white/5 backdrop-blur-xl border-2 ${item.color} rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]`}
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-2 scale-110">
                {item.icon}
              </div>
              <span className="text-2xl font-bold text-white tracking-widest uppercase mt-4 drop-shadow-md">
                {item.label}
              </span>
              
              {/* Yaltiroq effekt */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm mt-auto">
          &copy; 2026 Akademiya Axborot Tizimlari
        </div>
      </div>
    </div>
  );
};

export default Home;