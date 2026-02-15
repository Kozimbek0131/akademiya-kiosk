import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaBus, FaTaxi, FaSubway, FaMapMarkerAlt } from 'react-icons/fa';

const Transport = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // ⚠️ MUHIM: Akademiyaning aniq manzili koordinatalari (Uzunlik, Kenglik)
  // Hozir bu Toshkent markazi. O'zingiznikini Yandex xaritadan olib qo'yishingiz mumkin.
  // Format: ll=UZUNLIK%2CKENGLIK (vergul o'rniga %2C ishlatiladi)
  const mapCenter = "69.2401%2C41.2995"; 
  const mapUrl = `https://yandex.uz/map-widget/v1/?ll=${mapCenter}&z=14&l=trf%2Ctrfa`; 

  // Yandex Go uchun havola (QR kodga aylanadi)
  const taxiUrl = "https://go.yandex.com/";

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none">
      
      {/* ORQA FON */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-gray-900"></div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-slate-800/50 backdrop-blur-md border-b border-white/10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <FaBus className="text-red-500" /> 
          TRANSPORT VA YO'NALISHLAR
        </h1>
      </div>

      {/* ASOSIY QISM (2 ustunli) */}
      <div className="relative z-10 flex-1 p-6 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* 1. CHAP TOMON - YANDEX XARITA (Jonli) */}
        <div className="flex-[2] bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative group">
           {/* Iframe orqali Yandex Xaritani yuklaymiz */}
           <iframe 
             src={mapUrl}
             width="100%" 
             height="100%" 
             frameBorder="0"
             title="Yandex Maps"
             className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
           ></iframe>
           
           {/* Ustidagi yozuv */}
           <div className="absolute top-4 left-4 bg-black/80 backdrop-blur text-white px-4 py-2 rounded-xl border border-white/20 shadow-lg z-20">
             <span className="flex items-center gap-2 animate-pulse font-bold text-sm">
               <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
               Jonli tirbandlik (Traffic)
             </span>
           </div>
        </div>

        {/* 2. O'NG TOMON - TAKSI VA AVTOBUSLAR */}
        <div className="flex-1 flex flex-col gap-6 h-full">
          
          {/* Yandex Go QR Code */}
          <div className="flex-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(250,204,21,0.2)] border-4 border-white/20 relative overflow-hidden group">
             
             {/* Orqa fon bezagi */}
             <FaTaxi className="absolute -right-4 -bottom-4 text-9xl text-white/20 rotate-12" />

             <h2 className="text-2xl font-black uppercase mb-1 drop-shadow-sm">TAKSI CHAQIRISH</h2>
             <p className="text-sm font-bold opacity-80 mb-3 text-black/70">Telefoningiz orqali skaner qiling</p>
             
             {/* QR KOD */}
             <div className="bg-white p-3 rounded-2xl shadow-2xl mb-2 transform group-hover:scale-105 transition-transform duration-300">
               <img 
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${taxiUrl}`} 
                 alt="Yandex Go QR" 
                 className="w-36 h-36 mix-blend-multiply" 
               />
             </div>
             
             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-black/10 px-3 py-1 rounded-full text-black/60">
               <FaMapMarkerAlt /> Manzil avtomatik aniqlanadi
             </div>
          </div>

          {/* Avtobuslar Ro'yxati */}
          <div className="flex-1 bg-slate-800/80 backdrop-blur border border-white/10 rounded-3xl p-5 flex flex-col shadow-xl overflow-hidden">
            <h3 className="text-xl text-white font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
              <FaBus className="text-blue-400" /> YAQIN AVTOBUSLAR
            </h3>
            
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {/* Avtobus 1 */}
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border-l-4 border-blue-500 hover:bg-white/10 transition-colors">
                <span className="text-3xl font-black text-white">#51</span>
                <div className="text-right">
                  <p className="text-gray-300 text-sm font-medium">Chorsu - Yunusobod</p>
                  <p className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-1 rounded inline-block mt-1">Har 10 daqiqada</p>
                </div>
              </div>

              {/* Avtobus 2 */}
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border-l-4 border-green-500 hover:bg-white/10 transition-colors">
                <span className="text-3xl font-black text-white">#93</span>
                <div className="text-right">
                  <p className="text-gray-300 text-sm font-medium">Qo'yliq - O'rikzor</p>
                  <p className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-1 rounded inline-block mt-1">Har 15 daqiqada</p>
                </div>
              </div>

               {/* Metro */}
               <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border-l-4 border-red-500 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2">
                   <FaSubway className="text-red-500 text-2xl" />
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm font-medium">"Minor" bekati</p>
                  <p className="text-yellow-400 font-bold text-xs bg-yellow-400/10 px-2 py-1 rounded inline-block mt-1">1.2 km (Piyoda 15 daqiqa)</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Transport;