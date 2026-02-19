import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png'; 

const Screensaver = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleInteract = () => {
    console.log("Screensaverdan chiqilmoqda...");
    navigate('/');
  };

  return (
    <div 
      onClick={handleInteract} 
      onMouseMove={handleInteract} // Sichqoncha qimirlasa ham chiqib ketadi
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black cursor-pointer overflow-hidden select-none"
    >
      <div className="absolute inset-0 z-0">
        {/* Public papkasidagi video */}
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
         {/* Logo va matnlar... (o'zgarmadi) */}
         <img src={logoImg} alt="Logo" className="w-56 h-56 mb-10 object-contain animate-bounce-slow" />
         <h1 className="text-4xl text-white font-bold mb-10">{t('app_name')}</h1>
         <div className="text-white border px-10 py-4 rounded-full animate-pulse">
            👆 {t('touch_to_start')}
         </div>
      </div>
    </div>
  );
};

export default Screensaver;