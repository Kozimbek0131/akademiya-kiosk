import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaUserTie, FaPhoneAlt, FaEnvelope, FaStar } from 'react-icons/fa';

const Leadership = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // RAHBARIYAT MA'LUMOTLARI (To'g'rilangan variant)
  const leaders = [
    {
      id: 1,
      name: "Samadov Salom Ismatovich",
      rank: "3-darajali davlat adliya maslahatchisi",
      position: "Akademiya Boshlig'i",
      phone: "+998 71 202-04-96",
      email: "info@proacademy.uz",
      image: null, 
      isChief: true 
    },
    {
      id: 2,
      name: "Коленко Евгений Вячеславович",
      rank: "Adliya katta maslahatchisi",
      position: "Akademiya boshlig‘ining birinchi o‘rinbosari",
      phone: "+998 71 202-04-96",
      email: "info@proacademy.uz",
      image: null,
      isChief: false
    },
    {
      id: 3,
      name: "Турахонов Дурбек Лермонович",
      rank: "Polkovnik",
      position: "Akademiya boshlig‘i o‘rinbosari",
      phone: "+998 71 202-04-96",
      email: "info@proacademy.uz",
      image: null,
      isChief: false
    },
    {
      id: 4,
      name: "Одинаев Адҳам Саъдуллоевич",
      rank: "Polkovnik",
      position: "Akademiya boshlig‘i o‘rinbosari",
      phone: "+998 71 202-04-96",
      email: "info@proacademy.uz",
      image: null,
      isChief: false
    },
    {
      id: 5,
      name: "Нигмаджанов Уйгун Учкунович",
      rank: "Polkovnik",
      position: "Akademiya boshlig‘i o‘rinbosari",
      phone: "+998 71 202-04-96",
      email: "info@proacademy.uz",
      image: null,
      isChief: false
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      
      {/* Orqa fon (Gerb bilan) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900"></div>
      <div className="absolute inset-0 opacity-5 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg')] bg-center bg-no-repeat bg-contain"></div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-4xl font-black text-white uppercase tracking-wider flex items-center gap-4">
          <FaStar className="text-yellow-400" /> 
          AKADEMIYA RAHBARIYATI
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-10 overflow-y-auto custom-scrollbar flex flex-col items-center">
        
        {/* 1. AKADEMIYA BOSHLIG'I (KATTA KARTA) */}
        {leaders.filter(l => l.isChief).map(chief => (
          <div key={chief.id} className="w-full max-w-5xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-[3rem] p-8 flex items-center gap-10 shadow-[0_0_50px_rgba(234,179,8,0.2)] mb-12 transform hover:scale-105 transition-transform duration-500 relative overflow-hidden group">
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Rasm qismi */}
            <div className="w-64 h-64 rounded-full border-4 border-yellow-500 overflow-hidden shadow-2xl flex-shrink-0 bg-slate-700 flex items-center justify-center">
               <FaUserTie className="text-8xl text-gray-400" />
            </div>

            {/* Ma'lumot qismi */}
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-2">
                 <FaStar className="text-yellow-400 text-2xl" />
                 <span className="text-yellow-400 font-bold uppercase tracking-widest text-lg">{chief.rank}</span>
               </div>
               <h2 className="text-5xl font-black text-white mb-2 leading-tight">{chief.name}</h2>
               <p className="text-2xl text-gray-300 font-medium mb-6 border-b border-white/10 pb-4">{chief.position}</p>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-green-400"><FaPhoneAlt /></div>
                    <span className="font-mono text-lg">{chief.phone}</span>
                 </div>
                 <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-400"><FaEnvelope /></div>
                    <span className="font-mono text-lg">{chief.email}</span>
                 </div>
               </div>
            </div>
          </div>
        ))}

        {/* 2. O'RINBOSARLAR (GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl">
          {leaders.filter(l => !l.isChief).map(deputy => (
            <div key={deputy.id} className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center hover:bg-slate-800 transition-all hover:border-blue-500/50 group">
              
              <div className="w-40 h-40 rounded-full border-2 border-blue-500/30 overflow-hidden mb-4 bg-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                 <FaUserTie className="text-6xl text-gray-400" />
              </div>

              <span className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-1">{deputy.rank}</span>
              <h3 className="text-2xl font-bold text-white mb-2">{deputy.name}</h3>
              <p className="text-gray-400 text-sm mb-4 h-10 leading-tight">{deputy.position}</p>

              <div className="w-full bg-black/20 rounded-xl p-3 flex flex-col gap-2">
                 <div className="flex items-center justify-center gap-2 text-gray-300 text-sm font-mono">
                    <FaPhoneAlt className="text-green-500" /> {deputy.phone}
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Leadership;