import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft } from 'react-icons/fa';

const Map = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden">
      
      {/* ORQA FON */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col h-full p-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
          >
            <FaArrowLeft /> {t('back_btn')}
          </button>
          
          <h1 className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg">
            {t('menu_map')}
          </h1>
        </div>

        {/* XARITA QISMI */}
        <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 flex items-center justify-center overflow-hidden relative group">
            {/* Bu yerga keyinchalik haqiqiy xarita rasmi qo'yiladi */}
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
                alt="Map" 
                className="w-full h-full object-contain opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            
            <div className="absolute bottom-8 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl text-white font-medium border border-white/10">
                Binoning interaktiv xaritasi (Tez kunda)
            </div>
        </div>

      </div>
    </div>
  );
};

export default Map;