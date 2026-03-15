import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaUserTie, FaPhoneAlt, FaEnvelope, FaStar, FaSpinner } from 'react-icons/fa';

const Leadership = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://web-production-8dce.up.railway.app/api/leadership/?lang=${language}`);
        if (!res.ok) throw new Error("Server xatosi");
        const data = await res.json();
        
        // TARTIBLASH QISMI (XAVFSIZ):
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

  // Tartiblangan ro'yxatdan birinchisini boshliq, qolganini o'rinbosar deb olamiz
  const chief = leaders[0];
  const deputies = leaders.slice(1);

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white font-sans">

      {/* Orqa fon */}
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

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-4 md:p-10 flex flex-col items-center overflow-y-auto custom-scrollbar touch-pan-y w-full">

        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-blue-400">
            <FaSpinner className="animate-spin text-5xl mb-4" />
            <p className="font-bold tracking-widest uppercase">{t('loading') || "Yuklanmoqda..."}</p>
          </div>
        ) : (
          <>
            {/* 1. AKADEMIYA BOSHLIG'I */}
            {chief && (
              <div className="w-full max-w-6xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-12 shadow-[0_0_60px_rgba(234,179,8,0.15)] mb-8 md:mb-12 relative overflow-hidden shrink-0">

                {/* Rasm */}
                <div className="w-48 h-48 md:w-72 md:h-72 rounded-3xl border-4 border-yellow-500/30 overflow-hidden shadow-2xl flex-shrink-0 bg-slate-700 flex items-center justify-center">
                  {chief.image ? (
                    <img src={chief.image} alt={chief.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <FaUserTie className="text-7xl md:text-9xl text-gray-500" />
                  )}
                </div>

                {/* Ma'lumot */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-2 md:mb-4">
                    <FaStar className="text-yellow-400 text-xl md:text-3xl" />
                    <span className="text-yellow-500 font-black uppercase tracking-widest text-sm md:text-xl">
                      {chief.position}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-6xl font-black text-white mb-2 md:mb-4 leading-tight">
                    {chief.full_name}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-4">
                    <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-3 md:px-6 md:py-4 rounded-2xl text-gray-200 shadow-inner">
                      <FaEnvelope className="text-blue-400 text-xl md:text-3xl shrink-0" />
                      <span className="font-mono text-base md:text-2xl font-bold whitespace-nowrap">info@proacademy.uz</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. O'RINBOSARLAR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl pb-20">
              {deputies.map(deputy => (
                <div key={deputy.id} className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center text-center hover:bg-slate-800/60 transition-all hover:border-blue-500/50 shadow-xl group">

                  {/* Rasm */}
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-blue-500/20 overflow-hidden mb-4 md:mb-6 bg-slate-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform shrink-0">
                    {deputy.image ? (
                      <img src={deputy.image} alt={deputy.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <FaUserTie className="text-5xl md:text-7xl text-gray-500" />
                    )}
                  </div>

                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">
                    {deputy.full_name}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-xl mb-6 font-medium leading-tight">
                    {deputy.position}
                  </p>

                  <div className="w-full bg-black/30 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center justify-center gap-3 text-blue-300 text-base md:text-lg font-bold">
                      <FaStar className="text-yellow-400 text-sm shrink-0" />
                      {t('menu_leadership') ? t('menu_leadership').split(' ')[0] : 'Rahbariyat'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leadership;