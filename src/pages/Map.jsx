import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft } from 'react-icons/fa';

const Map = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    // Responsive: min-h-screen mobil brauzerlar uchun mosroq
    <div className="min-h-screen flex flex-col bg-slate-900 relative overflow-x-hidden select-none">
      
      {/* ORQA FON */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-6">
        
        {/* HEADER (Mobil uchun flex-col va o'lchamlar moslashtirildi) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 md:mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto"
          >
            <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
          </button>
          
          <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg text-center">
            {t('menu_map') || "XARITA"}
          </h1>
        </div>

        {/* XARITA QISMI (Mobil ekranda balandligi va sig'imi to'g'rilandi)  */}
        <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-2 md:p-4 flex items-center justify-center overflow-hidden relative group min-h-[300px] md:min-h-fit mb-4">
            {/* Bu yerga keyinchalik haqiqiy xarita rasmi qo'yiladi */}
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
                alt="Map" 
                className="w-full h-full object-contain opacity-60 md:opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            
            <div className="absolute bottom-4 md:bottom-8 bg-black/60 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-white text-xs md:text-base font-medium border border-white/10 text-center mx-4">
                Binoning interaktiv xaritasi (Tez kunda)
            </div>
        </div>

      </div>
    </div>
  );
};

export default Map;