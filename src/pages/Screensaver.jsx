import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png'; 

// Komponent nomi Screensaver bo'ldi
const Screensaver = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleInteract = () => {
    navigate('/');
  };

  return (
    <div 
      onClick={handleInteract} 
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black cursor-pointer overflow-hidden select-none"
    >
      <div className="absolute inset-0 z-0">
        {/* PUBLIC papkasidagi video nomi (agar fayl nomi reklama.mp4 bo'lsa shunday qoladi) */}
        <video 
          src="/reklama.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center animate-fade-in px-4">
        <div className="relative mb-10 md:mb-16">
            <div className="absolute inset-0 bg-blue-500/30 blur-[60px] rounded-full animate-pulse"></div>
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-bounce-slow" 
            />
        </div>

        <h1 className="text-3xl md:text-6xl font-black text-white text-center uppercase tracking-widest drop-shadow-2xl max-w-6xl leading-tight mb-8">
          {t('app_name') || "HUQUQNI MUHOFAZA QILISH AKADEMIYASI"}
        </h1>

        <div className="mt-10 md:mt-20 animate-pulse">
          <div className="text-white text-base md:text-2xl font-bold border-2 border-white/40 px-8 py-3 md:px-12 md:py-5 rounded-full bg-black/40 backdrop-blur-md shadow-2xl hover:bg-white/20 transition-all uppercase tracking-wider flex items-center gap-4">
            <span className="text-2xl md:text-3xl animate-bounce">👆</span> 
            {t('touch_to_start') || "BOSHLASH UCHUN EKRANGA TEGING"}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Screensaver;