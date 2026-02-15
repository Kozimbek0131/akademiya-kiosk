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
    // min-h-screen mobil brauzerlar uchun (Safari/Chrome navigatsiya panellari bilan) qulayroq
    <div className="min-h-screen flex flex-col bg-slate-900 relative overflow-x-hidden select-none text-white">
      
      {/* Orqa fon */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 z-0"></div>
      <div className="fixed inset-0 opacity-5 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg')] bg-center bg-no-repeat bg-contain z-0"></div>

      {/* HEADER (Mobil uchun flex-col) */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg gap-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <FaStar className="text-yellow-400 text-2xl md:text-4xl" /> 
          AKADEMIYA RAHBARIYATI
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-4 md:p-10 overflow-y-auto custom-scrollbar flex flex-col items-center">
        
        {/* 1. AKADEMIYA BOSHLIG'I - iPhone 12 Pro uchun o'lchovlar moslashtirildi */}
        {leaders.filter(l => l.isChief).map(chief => (
          <div key={chief.id} className="w-full max-w-6xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-12 shadow-[0_0_60px_rgba(234,179,8,0.15)] mb-8 md:mb-12 relative overflow-hidden group">
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Rasm qismi - mobil uchun kichraytirildi */}
            <div className="w-48 h-48 md:w-72 md:h-72 rounded-3xl border-4 border-yellow-500/30 overflow-hidden shadow-2xl flex-shrink-0 bg-slate-700 flex items-center justify-center">
               <FaUserTie className="text-7xl md:text-9xl text-gray-500" />
            </div>

            {/* Ma'lumot qismi - shriftlar mobil ekranga moslandi */}
            <div className="flex-1 text-center md:text-left">
               <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-2 md:mb-4">
                 <FaStar className="text-yellow-400 text-xl md:text-3xl" />
                 <span className="text-yellow-500 font-black uppercase tracking-widest text-sm md:text-xl">
                   {chief.rank}
                 </span>
               </div>
               <h2 className="text-3xl md:text-6xl font-black text-white mb-2 md:mb-4 leading-tight">
                 {chief.name}
               </h2>
               <p className="text-xl md:text-3xl text-blue-400 font-bold mb-4 md:mb-8 border-b border-white/10 pb-4 md:pb-6 uppercase tracking-wide">
                 {chief.position}
               </p>
               
               <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                 <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white/5 flex items-center justify-center text-green-400 text-lg md:text-2xl border border-white/10"><FaPhoneAlt /></div>
                    <span className="font-mono text-base md:text-2xl font-bold">{chief.phone}</span>
                 </div>
                 <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 text-lg md:text-2xl border border-white/10"><FaEnvelope /></div>
                    <span className="font-mono text-sm md:text-2xl font-bold truncate max-w-[200px] md:max-w-none">{chief.email}</span>
                 </div>
               </div>
            </div>
          </div>
        ))}

        {/* 2. O'RINBOSARLAR - Grid mobil uchun optimallashtirildi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl pb-10">
          {leaders.filter(l => !l.isChief).map(deputy => (
            <div key={deputy.id} className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center hover:bg-slate-800/60 transition-all hover:border-blue-500/50 group shadow-xl">
              
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-blue-500/20 overflow-hidden mb-4 md:mb-6 bg-slate-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                 <FaUserTie className="text-5xl md:text-7xl text-gray-500" />
              </div>

              <span className="text-blue-400 font-black uppercase text-[10px] md:text-sm tracking-widest mb-1 md:mb-2 italic">
                {deputy.rank}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">
                {deputy.name}
              </h3>
              <p className="text-gray-400 text-sm md:text-xl mb-4 md:mb-6 h-auto md:h-14 font-medium leading-tight">
                {deputy.position}
              </p>

              <div className="w-full bg-black/30 rounded-2xl p-3 md:p-4 border border-white/5">
                 <div className="flex items-center justify-center gap-3 text-green-400 text-lg md:text-2xl font-black font-mono">
                    <FaPhoneAlt className="text-sm md:text-lg" /> {deputy.phone}
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