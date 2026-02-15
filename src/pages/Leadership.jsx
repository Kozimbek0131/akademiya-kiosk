import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaUserTie, FaPhoneAlt, FaEnvelope, FaStar } from 'react-icons/fa';

const Leadership = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
      
      {/* Orqa fon */}
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
      <div className="relative z-10 flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col items-center">
        
        {/* 1. AKADEMIYA BOSHLIG'I - O'lchovlar to'g'rilandi */}
        {leaders.filter(l => l.isChief).map(chief => (
          <div key={chief.id} className="w-full max-w-6xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-[3rem] p-10 flex items-center gap-12 shadow-[0_0_60px_rgba(234,179,8,0.15)] mb-10 relative overflow-hidden group min-h-fit">
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Rasm qismi - o'lcham adaptiv qilindi */}
            <div className="w-72 h-72 rounded-3xl border-4 border-yellow-500/30 overflow-hidden shadow-2xl flex-shrink-0 bg-slate-700 flex items-center justify-center">
               <FaUserTie className="text-9xl text-gray-500" />
            </div>

            {/* Ma'lumot qismi - shriftlar kioskga moslandi */}
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-4">
                 <FaStar className="text-yellow-400 text-3xl" />
                 <span className="text-yellow-500 font-black uppercase tracking-[0.2em] text-xl">
                   {chief.rank}
                 </span>
               </div>
               <h2 className="text-6xl font-black text-white mb-4 leading-tight">
                 {chief.name}
               </h2>
               <p className="text-3xl text-blue-400 font-bold mb-8 border-b border-white/10 pb-6 uppercase tracking-wide">
                 {chief.position}
               </p>
               
               <div className="flex gap-10">
                 <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-green-400 text-2xl border border-white/10"><FaPhoneAlt /></div>
                    <span className="font-mono text-2xl font-bold">{chief.phone}</span>
                 </div>
                 <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 text-2xl border border-white/10"><FaEnvelope /></div>
                    <span className="font-mono text-2xl font-bold">{chief.email}</span>
                 </div>
               </div>
            </div>
          </div>
        ))}

        {/* 2. O'RINBOSARLAR - To'liq ro'yxat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {leaders.filter(l => !l.isChief).map(deputy => (
            <div key={deputy.id} className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center text-center hover:bg-slate-800/60 transition-all hover:border-blue-500/50 group shadow-xl">
              
              <div className="w-44 h-44 rounded-full border-4 border-blue-500/20 overflow-hidden mb-6 bg-slate-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                 <FaUserTie className="text-7xl text-gray-500" />
              </div>

              <span className="text-blue-400 font-black uppercase text-sm tracking-widest mb-2 italic">
                {deputy.rank}
              </span>
              <h3 className="text-3xl font-bold text-white mb-3">
                {deputy.name}
              </h3>
              <p className="text-gray-400 text-xl mb-6 h-14 font-medium leading-tight">
                {deputy.position}
              </p>

              <div className="w-full bg-black/30 rounded-2xl p-4 border border-white/5">
                 <div className="flex items-center justify-center gap-3 text-green-400 text-2xl font-black font-mono">
                    <FaPhoneAlt className="text-lg" /> {deputy.phone}
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