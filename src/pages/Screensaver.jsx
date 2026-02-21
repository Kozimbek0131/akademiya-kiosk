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
      onTouchStart={handleInteract} // Sensor ekran uchun
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900 cursor-pointer overflow-hidden select-none"
    >
      {/* ORQA FON */}
      <div className="absolute inset-0 z-0">
        {/* Asosiy chiroyli fon (Video o'rnida turadi) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-black"></div>

        {/* === VIDEO KODI (Vercel uchun vaqtincha izohga olindi) === 
        <video 
          src="/reklama.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80" 
        />
        ========================================================= */}
        
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* MARKAZIY QISM (Logo va yozuv) */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in px-4">
         <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full animate-pulse"></div>
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-2xl animate-bounce-slow relative z-10" 
            />
         </div>

         <h1 className="text-3xl md:text-5xl text-white font-black mb-12 text-center uppercase tracking-widest drop-shadow-lg max-w-4xl leading-tight">
            {t('app_name') || "HUQUQNI MUHOFAZA QILISH AKADEMIYASI"}
         </h1>

         <div className="text-white text-xl md:text-2xl font-bold border-2 border-white/40 px-10 py-4 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)] animate-pulse">
            👆 {t('touch_to_start') || "BOSHLASH UCHUN EKRANGA TEGING"}
         </div>
      </div>
    </div>
  );
};

export default Screensaver;