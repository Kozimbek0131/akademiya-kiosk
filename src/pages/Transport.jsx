import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaBus, FaSearch, FaMapMarkerAlt, FaPlane, FaTrain, FaLandmark } from 'react-icons/fa';

const Transport = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [destination, setDestination] = useState('');
  const [mapSrc, setMapSrc] = useState(null);

  // 📍 AKADEMIYA LOKATSIYASI (Yunusobod, Rixsiliy 9)
  const akademiyaLat = "41.374751";
  const akademiyaLong = "69.272917";

  // Standart holatda (hech narsa qidirilmaganda) ko'rinadigan xarita
  const defaultMapUrl = `https://yandex.uz/map-widget/v1/?ll=${akademiyaLong}%2C${akademiyaLat}&z=17&pt=${akademiyaLong}%2C${akademiyaLat},pm2rdm`;

  // 🔎 Qidirish funksiyasi
  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      updateMapRoute(destination);
    }
  };

  // 🗺️ Xaritada yo'nalish chizish (A nuqta: Akademiya -> B nuqta: Foydalanuvchi yozgan joy)
  const updateMapRoute = (place) => {
    // rtext = A~B (Akademiya ~ Manzil)
    // rtt = mt (Mass Transit - Jamoat transporti: Avtobus/Metro)
    // z = 12 (kattaroq masshtab)
    const routeUrl = `https://yandex.uz/map-widget/v1/?rtext=${akademiyaLat},${akademiyaLong}~${encodeURIComponent(place)}&rtt=mt&z=12`;
    setMapSrc(routeUrl);
    setDestination(place);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none">
      
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"></div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <FaBus className="text-red-500" /> 
          YO'NALISHNI IZLASH
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-6 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* 1. CHAP TOMON - QIDIRUV VA TUGMALAR */}
        <div className="flex-1 flex flex-col gap-6 max-w-md">
          
          {/* Qidiruv Paneli */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl">
            <label className="text-white text-lg font-bold mb-3 block pl-2">Qayerga borasiz?</label>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Joy nomini yozing (masalan: Chorsu)" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-900/80 text-white border-2 border-blue-500/50 rounded-2xl py-4 pl-12 pr-4 text-xl focus:outline-none focus:border-blue-400 focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all placeholder-gray-500"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-bold hover:bg-blue-500 active:scale-95 transition-all"
              >
                IZLASH
              </button>
            </form>
          </div>

          {/* Tezkor Tugmalar (Mashhur joylar) */}
          <div className="bg-slate-800/50 border border-white/10 p-6 rounded-3xl flex-1 flex flex-col">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-4 text-sm pl-2">Tezkor yo'nalishlar</h3>
            <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-2 custom-scrollbar">
              
              <button onClick={() => updateMapRoute("Toshkent Xalqaro Aeroporti")} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-blue-600 hover:text-white text-gray-200 transition-all border border-white/5 group text-left">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-white/20 text-blue-400 group-hover:text-white">
                  <FaPlane className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Aeroport</h4>
                  <p className="text-xs opacity-60">Islom Karimov nomidagi</p>
                </div>
              </button>

              <button onClick={() => updateMapRoute("Toshkent Janubiy Vokzali")} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-green-600 hover:text-white text-gray-200 transition-all border border-white/5 group text-left">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-white/20 text-green-400 group-hover:text-white">
                  <FaTrain className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Janubiy Vokzal</h4>
                  <p className="text-xs opacity-60">Poyezd qatnovlari</p>
                </div>
              </button>

              <button onClick={() => updateMapRoute("Chorsu Bozori")} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-amber-600 hover:text-white text-gray-200 transition-all border border-white/5 group text-left">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-white/20 text-amber-400 group-hover:text-white">
                  <FaLandmark className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Chorsu Bozori</h4>
                  <p className="text-xs opacity-60">Eski shahar</p>
                </div>
              </button>

              <button onClick={() => updateMapRoute("Mustaqillik Maydoni")} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-purple-600 hover:text-white text-gray-200 transition-all border border-white/5 group text-left">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-white/20 text-purple-400 group-hover:text-white">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Markaz (Skver)</h4>
                  <p className="text-xs opacity-60">Mustaqillik maydoni</p>
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* 2. O'NG TOMON - INTERAKTIV XARITA */}
        <div className="flex-[2] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 relative">
           
           {/* Agar qidiruv bo'lmagan bo'lsa, oddiy lokatsiyani, qidirilsa yo'nalishni ko'rsatamiz */}
           <iframe 
             src={mapSrc || defaultMapUrl}
             width="100%" 
             height="100%" 
             frameBorder="0"
             title="Yandex Maps"
             allowFullScreen
             className="w-full h-full"
           ></iframe>

           {/* Maslahat yozuvi */}
           {!mapSrc && (
             <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md text-white p-4 rounded-xl text-center border border-white/20 animate-pulse">
               Menga qayerga borishingizni ayting, men eng qulay <b>Avtobus</b> yoki <b>Metro</b> yo'lini ko'rsataman!
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Transport;