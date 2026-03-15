import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaUserTie, FaPhoneAlt, FaEnvelope, FaStar, FaSpinner, FaClock, FaTimes } from 'react-icons/fa';

const Leadership = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeader, setSelectedLeader] = useState(null); // Modal uchun state

  useEffect(() => {
    const fetchLeaders = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://web-production-8dce.up.railway.app/api/leadership/?lang=${language}`);
        if (!res.ok) throw new Error("Server xatosi");
        const data = await res.json();
        const rawData = Array.isArray(data) ? data : (data.results || []);
        const sortedLeaders = [...rawData].sort((a, b) => (a.order || 0) - (b.order || 0));
        setLeaders(sortedLeaders);
      } catch (error) {
        console.error("API xatoligi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaders();
  }, [language]);

  const chief = leaders[0];
  const deputies = leaders.slice(1);

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white font-sans">
      
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-5 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e4/Emblem_of_Uzbekistan.svg')] bg-center bg-no-repeat bg-contain z-0 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>

        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider flex items-center gap-3 drop-shadow-lg">
          <FaStar className="text-yellow-400 text-2xl md:text-4xl" />
          {t('menu_leadership') || "AKADEMIYA RAHBARIYATI"}
        </h1>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 p-4 md:p-10 flex flex-col items-center overflow-y-auto custom-scrollbar touch-pan-y w-full">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-blue-400">
            <FaSpinner className="animate-spin text-5xl mb-4" />
            <p className="font-bold tracking-widest uppercase">{t('loading') || "Yuklanmoqda..."}</p>
          </div>
        ) : (
          <>
            {/* 1. CHIEF SECTION */}
            {chief && (
              <div 
                onClick={() => setSelectedLeader(chief)}
                className="w-full max-w-6xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-12 shadow-[0_0_60px_rgba(234,179,8,0.15)] mb-8 md:mb-12 relative overflow-hidden shrink-0 cursor-pointer hover:scale-[1.01] transition-transform active:scale-95"
              >
                <div className="w-48 h-48 md:w-72 md:h-72 rounded-3xl border-4 border-yellow-500/30 overflow-hidden shadow-2xl flex-shrink-0 bg-slate-700">
                  {chief.image ? <img src={chief.image} alt={chief.full_name} className="w-full h-full object-cover" /> : <FaUserTie className="w-full h-full p-10 text-gray-500" />}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-yellow-500 font-black uppercase tracking-widest text-xs md:text-lg mb-1">{chief.rank}</p>
                  <h2 className="text-3xl md:text-6xl font-black text-white mb-2 leading-tight">{chief.full_name}</h2>
                  <p className="text-blue-300 font-bold uppercase text-sm md:text-xl mb-4">{chief.position}</p>
                  
                  <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-gray-300">
                    <FaEnvelope className="text-blue-400" />
                    <span className="font-mono text-sm md:text-lg">{chief.email}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DEPUTIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl pb-20">
              {deputies.map(deputy => (
                <div 
                  key={deputy.id} 
                  onClick={() => setSelectedLeader(deputy)}
                  className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center hover:bg-slate-800/60 transition-all hover:border-blue-500/50 shadow-xl group cursor-pointer active:scale-95"
                >
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-blue-500/20 overflow-hidden mb-4 bg-slate-700 group-hover:scale-105 transition-transform">
                    {deputy.image ? <img src={deputy.image} alt={deputy.full_name} className="w-full h-full object-cover" /> : <FaUserTie className="w-full h-full p-6 text-gray-500" />}
                  </div>
                  <p className="text-blue-400 font-bold text-[10px] md:text-sm uppercase tracking-tighter mb-1">{deputy.rank}</p>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2 leading-tight">{deputy.full_name}</h3>
                  <p className="text-gray-400 text-xs md:text-lg mb-4 font-medium line-clamp-2">{deputy.position}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 3. MODAL COMPONENT (Kattalashtirib ko'rsatish) */}
      {selectedLeader && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedLeader(null)}></div>
          
          <div className="relative w-full max-w-5xl bg-slate-900 border border-white/20 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedLeader(null)}
              className="absolute top-6 right-6 z-20 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors text-2xl md:text-4xl shadow-lg"
            >
              <FaTimes />
            </button>

            {/* Left Side: Photo */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-800 relative">
              {selectedLeader.image ? (
                <img src={selectedLeader.image} alt={selectedLeader.full_name} className="w-full h-full object-cover" />
              ) : (
                <FaUserTie className="w-full h-full p-20 text-gray-600" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden"></div>
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-900">
              <span className="text-yellow-500 font-black uppercase tracking-[0.2em] text-sm md:text-xl mb-2">{selectedLeader.rank}</span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-[1.1]">{selectedLeader.full_name}</h1>
              <p className="text-blue-300 text-lg md:text-3xl font-bold uppercase mb-8 border-l-4 border-blue-500 pl-4">{selectedLeader.position}</p>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <FaPhoneAlt className="text-green-400 text-2xl md:text-4xl" />
                  <div>
                    <p className="text-[10px] md:text-sm text-gray-500 uppercase font-bold">{t('phone') || "Telefon"}</p>
                    <p className="text-lg md:text-3xl font-bold font-mono">{selectedLeader.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <FaEnvelope className="text-blue-400 text-2xl md:text-4xl" />
                  <div>
                    <p className="text-[10px] md:text-sm text-gray-500 uppercase font-bold">Email</p>
                    <p className="text-lg md:text-2xl font-bold font-mono break-all">{selectedLeader.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <FaClock className="text-yellow-400 text-2xl md:text-4xl" />
                  <div>
                    <p className="text-[10px] md:text-sm text-gray-500 uppercase font-bold">{t('work_hours') || "Qabul vaqti"}</p>
                    <p className="text-lg md:text-2xl font-bold">{selectedLeader.work_hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leadership;