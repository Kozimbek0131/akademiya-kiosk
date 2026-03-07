import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaMapMarkedAlt, FaCog, FaTools } from 'react-icons/fa';

const Map = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white font-sans">
      
      {/* ORQA FON ANIMATSIYASI */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="absolute w-[60rem] h-[60rem] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-[80px] animate-pulse delay-700"></div>
      </div>

      {/* HEADER */}
      <div className="relative z-50 flex items-center justify-between p-6 bg-slate-900/50 backdrop-blur-xl border-b border-white/10 shadow-lg shrink-0">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-lg font-bold uppercase cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ASOSIY MENYU"}
        </button>
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <FaMapMarkedAlt className="text-cyan-400" /> BINO XARITASI
        </h1>
      </div>

      {/* ASOSIY QISM - "TEZ KUNDA" */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 text-center">
        
        {/* Katta animatsiyali Ikonka bloki */}
        <div className="relative mb-12 flex items-center justify-center">
          {/* Orqa fon nur sochishi */}
          <div className="absolute inset-0 bg-cyan-500/30 rounded-full animate-ping blur-xl"></div>
          
          <div className="relative z-10 w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-[3rem] shadow-[0_0_50px_rgba(6,182,212,0.4)] flex items-center justify-center transform hover:scale-105 transition-transform">
            <FaMapMarkedAlt className="text-7xl md:text-9xl text-cyan-400 drop-shadow-lg" />
            
            {/* Aylanuvchi shesternya (Jarayonda ekanligini bildiradi) */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-slate-800 rounded-full border border-amber-500/50 flex items-center justify-center shadow-lg">
               <FaCog className="text-5xl text-amber-400 animate-[spin_4s_linear_infinite]" />
            </div>
          </div>
        </div>

        {/* Matnlar */}
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white drop-shadow-md">
          TEZ KUNDA...
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-medium mb-12">
          Akademiya binosining interaktiv <span className="text-cyan-400 font-bold"> xaritasi</span> va xonalar joylashuvi hozirda ishlab chiqilmoqda. Tez orada ushbu bo'lim orqali kerakli xonani oson topishingiz mumkin bo'ladi!
        </p>

        {/* Soxta yuklanish (Progress bar) */}
        <div className="w-full max-w-xl flex flex-col items-center">
          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-white/10 shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[65%] rounded-full relative overflow-hidden">
               {/* Siltanib turuvchi oq nur */}
               <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4 px-2">
            <span className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
               <FaTools /> Ish jarayonida
            </span>
            <span className="text-sm md:text-base text-cyan-400 font-black tracking-wider">65%</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Map;