import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaUserTie, FaSpinner } from 'react-icons/fa';

const Leadership = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://web-production-ba75.up.railway.app/api/leadership/?lang=${language}`);
        if (!res.ok) throw new Error("Server xatosi");
        const data = await res.json();
        setLeaders(Array.isArray(data) ? data : (data.results || []));
      } catch (error) {
        console.error("API xatoligi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaders();
  }, [language]);

  const chief = leaders.find(l => l.order === 0) || leaders[0];
  const deputies = leaders.filter(l => l !== chief);

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden select-none text-white relative">

      {/* Orqa fon */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #ffffff 40px, #ffffff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #ffffff 40px, #ffffff 41px)'}}>
        </div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all font-bold uppercase text-sm cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <span className="text-amber-400 text-lg">★</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">
            {t('menu_leadership') || "RAHBARIYAT"}
          </h1>
        </div>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-blue-400">
            <FaSpinner className="animate-spin text-5xl mb-4" />
            <p className="font-bold tracking-widest uppercase text-sm">{t('loading') || "Yuklanmoqda..."}</p>
          </div>
        ) : (
          <div className="p-6 md:p-10 max-w-7xl mx-auto">

            {/* BOSHLIK */}
            {chief && (
              <div className="mb-10 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-yellow-400/10 to-amber-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-amber-500/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 backdrop-blur-xl shadow-2xl overflow-hidden">

                  <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
                    <div className="w-full h-full border-[40px] border-amber-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                  </div>

                  {/* Rasm */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-[2rem] opacity-30 blur-md"></div>
                    <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-[2rem] border-2 border-amber-500/40 overflow-hidden bg-slate-700 flex items-center justify-center shadow-2xl">
                      {chief.image ? (
                        <img src={chief.image} alt={chief.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <FaUserTie className="text-6xl md:text-8xl text-slate-500" />
                      )}
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg uppercase tracking-wider">
                      ★ BOSHLIK
                    </div>
                  </div>

                  {/* Ma'lumot */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                      {chief.full_name}
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-5 py-2.5 rounded-2xl">
                      <span className="text-amber-400 text-lg">★</span>
                      <span className="text-amber-300 font-bold text-base md:text-xl uppercase tracking-wide">
                        {chief.position}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* O'RINBOSARLAR */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
              {deputies.map((deputy, index) => (
                <div
                  key={deputy.id}
                  className="group relative bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col items-center text-center hover:border-blue-500/40 hover:bg-slate-800/80 transition-all duration-300 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-300 rounded-[2rem]"></div>

                  {/* Tartib raqami */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-slate-400">
                    {index + 1}
                  </div>

                  {/* Rasm */}
                  <div className="relative mb-5">
                    <div className="absolute -inset-1.5 bg-gradient-to-br from-blue-500/30 to-slate-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-white/10 group-hover:border-blue-500/40 overflow-hidden bg-slate-700 flex items-center justify-center transition-all duration-300 shadow-xl">
                      {deputy.image ? (
                        <img src={deputy.image} alt={deputy.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <FaUserTie className="text-4xl md:text-5xl text-slate-500" />
                      )}
                    </div>
                  </div>

                  {/* Ism */}
                  <h3 className="text-lg md:text-xl font-black text-white mb-3 leading-tight">
                    {deputy.full_name}
                  </h3>

                  {/* Lavozim */}
                  <div className="w-full bg-blue-500/10 border border-blue-500/20 rounded-2xl px-4 py-3 mt-auto">
                    <p className="text-blue-300 text-xs md:text-sm font-semibold leading-snug">
                      {deputy.position}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Leadership;