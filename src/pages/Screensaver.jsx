import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png'; 

const Screensaver = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Ekranga tekkanda (yoki sichqoncha qimirlaganda) darhol Homega qaytish
  const handleInteract = () => {
    navigate('/');
  };

  return (
    <div 
      onClick={handleInteract} 
      onMouseMove={handleInteract} 
      onTouchStart={handleInteract} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900 cursor-pointer overflow-hidden select-none"
    >
      {/* 1. ORQA FON (Faqat video va qoramtir shisha qoldi) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* Reklama videosi */}
        <video 
          src="/reklama.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105" 
        />
        
        {/* Yozuvlar chiroyli o'qilishi uchun ustiga qoramtir effekt */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. MARKAZIY QISM (Logo va yozuv) */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in px-4">
         <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full animate-pulse"></div>
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-bounce-slow relative z-10" 
            />
         </div>

         <h1 className="text-3xl md:text-5xl text-white font-black mb-12 text-center uppercase tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] max-w-4xl leading-tight">
            {t('app_name') || "HUQUQNI MUHOFAZA QILISH AKADEMIYASI"}
         </h1>

         <div className="text-white text-xl md:text-2xl font-bold border-2 border-white/40 px-10 py-5 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)] animate-pulse flex items-center gap-4">
            <span className="text-3xl md:text-4xl animate-bounce">👆</span> 
            {t('touch_to_start') || "BOSHLASH UCHUN EKRANGA TEGING"}
         </div>
      </div>
    </div>
  );
};

export default Screensaver;