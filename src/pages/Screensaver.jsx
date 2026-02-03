import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png'; 
// Videoni to'g'ridan-to'g'ri assets papkasidan olamiz
import bgVideo from '../assets/reklama.mp4'; 

const Screensaver = ({ onInteract }) => {
  const { t } = useLanguage();

  return (
    <div 
      onClick={onInteract} 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black cursor-pointer overflow-hidden"
    >
      {/* 1. VIDEO ORQA FON */}
      <div className="absolute inset-0 z-0">
        <video 
          src={bgVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Qora parda (Videoni ustidan sal qoraytirish) */}
        <div className="absolute inset-0 bg-blue-950/40"></div>
      </div>

      {/* 2. LOGO VA MATN */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        <div className="relative mb-10">
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full animate-pulse"></div>
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-64 h-64 object-contain drop-shadow-2xl animate-bounce-slow" 
            />
        </div>

        <h1 className="text-4xl font-black text-white text-center uppercase tracking-widest drop-shadow-lg max-w-4xl px-4">
          {t('header_title')}
        </h1>

        <div className="mt-16 animate-bounce">
          <p className="text-white text-xl font-bold border border-white/30 px-10 py-3 rounded-full bg-white/10 backdrop-blur-md">
            👆 {t('touch_to_start') || "Boshlash uchun ekranni bosing"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Screensaver;