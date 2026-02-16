import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
// Logo va Video importlari
import logoImg from '../assets/logo.png'; 
import bgVideo from '../assets/reklama.mp4'; 

const Reklama = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Ekranga tekkanda Bosh sahifaga qaytish funksiyasi
  const handleInteract = () => {
    navigate('/');
  };

  return (
    <div 
      onClick={handleInteract} 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 cursor-pointer overflow-hidden select-none"
    >
      {/* 1. ORQA FON (VIDEO) */}
      <div className="absolute inset-0 z-0">
        {/* Agar video bo'lmasa yoki yuklanmasa, shu fon ko'rinadi */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        
        <video 
          src={bgVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80" // Opacity videoni sal qoraytiradi
        />
        
        {/* Qora parda (Video ustidan yozuvlar yaxshi o'qilishi uchun) */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. MARKAZIY KONTENT */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in px-4">
        
        {/* Logo qismi */}
        <div className="relative mb-8 md:mb-12">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-48 h-48 md:w-72 md:h-72 object-contain drop-shadow-2xl animate-bounce-slow filter brightness-110" 
            />
        </div>

        {/* Sarlavha */}
        <h1 className="text-2xl md:text-5xl font-black text-white text-center uppercase tracking-widest drop-shadow-lg max-w-5xl leading-tight mb-8">
          {t('app_name') || "HUQUQNI MUHOFAZA QILISH AKADEMIYASI"}
        </h1>

        {/* Chaqiruv tugmasi */}
        <div className="mt-8 md:mt-16 animate-bounce">
          <div className="text-white text-sm md:text-2xl font-bold border-2 border-white/30 px-8 py-3 md:px-12 md:py-4 rounded-full bg-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-white/20 transition-all uppercase tracking-wider flex items-center gap-3">
            <span className="text-2xl">👆</span> 
            {t('touch_to_start') || "BOSHLASH UCHUN EKRANGA TEGING"}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reklama;