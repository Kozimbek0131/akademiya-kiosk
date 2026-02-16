import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaBus, FaSearch, FaMapMarkerAlt, FaPlane, FaTrain, FaLandmark, FaTimes } from 'react-icons/fa';

const Transport = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [destination, setDestination] = useState('');
  const [mapSrc, setMapSrc] = useState(null);
  const [suggestions, setSuggestions] = useState([]); 
  const [isSearching, setIsSearching] = useState(false);

  const akademiyaLat = "41.374751";
  const akademiyaLong = "69.272917";
  const defaultMapUrl = `https://yandex.uz/map-widget/v1/?ll=${akademiyaLong}%2C${akademiyaLat}&z=17&pt=${akademiyaLong}%2C${akademiyaLat},pm2rdm`;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&addressdetails=1&limit=5&countrycodes=uz`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setIsSearching(false);
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [destination]);

  const handleSelectSuggestion = (placeName) => {
    const cleanName = placeName.split(',')[0];
    setDestination(cleanName);
    setSuggestions([]);
    updateMapRoute(cleanName);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      updateMapRoute(destination);
      setSuggestions([]);
    }
  };

  const updateMapRoute = (place) => {
    const routeUrl = `https://yandex.uz/map-widget/v1/?rtext=${akademiyaLat},${akademiyaLong}~${encodeURIComponent(place)}&rtt=mt&z=12`;
    setMapSrc(routeUrl);
  };

  const clearSearch = () => {
    setDestination('');
    setSuggestions([]);
    setMapSrc(null);
  };

  return (
    // ASOSIY KONTEYNER: h-screen (ekran to'ladi)
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 z-0 pointer-events-none"></div>

      {/* HEADER (Qotirilgan - Balandligi aniq) */}
      <div className="relative z-50 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg gap-4 shrink-0">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-3">
          <FaBus className="text-red-500 text-2xl md:text-4xl" /> YO'NALISHNI IZLASH
        </h1>
      </div>

      {/* ASOSIY QISM (Headerdan qolgan barcha joyni egallaydi) */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* 1. CHAP TOMON - SIDEBAR (Qotirilgan kenglik, ichki scroll) */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-slate-900/50 backdrop-blur-md border-r border-white/10 flex flex-col gap-4 p-4 md:p-6 z-20 shrink-0 overflow-y-auto custom-scrollbar h-[40vh] md:h-full">
          
          {/* Qidiruv Paneli */}
          <div className="bg-white/10 border border-white/20 p-4 rounded-2xl shadow-xl relative shrink-0">
            <label className="text-white text-sm md:text-lg font-bold mb-2 block">Qayerga borasiz?</label>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Joy nomini yozing..." 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-900/90 text-white border-2 border-blue-500/50 rounded-xl py-3 pl-10 pr-10 text-base md:text-lg focus:outline-none focus:border-blue-400 transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {destination && (
                <FaTimes 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white"
                  onClick={clearSearch}
                />
              )}
            </form>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-2 bg-slate-800 border border-white/20 rounded-xl shadow-2xl overflow-hidden absolute left-0 right-0 top-full z-50">
                {suggestions.map((item, index) => (
                  <button key={index} onClick={() => handleSelectSuggestion(item.display_name)} 
                    className="w-full text-left px-4 py-3 text-white hover:bg-blue-600 transition-colors border-b border-white/10 last:border-0 flex items-center gap-3"
                  >
                    <FaMapMarkerAlt className="text-red-400 shrink-0" />
                    <span className="truncate text-sm font-medium block">{item.display_name.split(',')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tezkor tugmalar */}
          <div className="bg-slate-800/50 border border-white/10 p-4 rounded-2xl flex-1 md:flex-none">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-3 text-xs md:text-sm">Tezkor yo'nalishlar</h3>
            <div className="flex flex-col gap-2">
              <button onClick={() => updateMapRoute("Toshkent Xalqaro Aeroporti")} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group">
                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors"><FaPlane /></div>
                 <span className="font-bold">Aeroport</span>
              </button>
              <button onClick={() => updateMapRoute("Toshkent Janubiy Vokzali")} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group">
                 <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors"><FaTrain /></div>
                 <span className="font-bold">Janubiy Vokzal</span>
              </button>
              <button onClick={() => updateMapRoute("Chorsu Bozori")} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group">
                 <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors"><FaLandmark /></div>
                 <span className="font-bold">Chorsu Bozori</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. O'NG TOMON - XARITA (To'liq egallaydi) */}
        {/* flex-1 va relative ishlatamiz. Iframe esa absolute bo'lib to'liq yoyiladi */}
        <div className="flex-1 relative bg-gray-100 h-[60vh] md:h-full w-full">
           <iframe 
             src={mapSrc || defaultMapUrl} 
             frameBorder="0" 
             title="Yandex Maps" 
             allowFullScreen 
             className="absolute inset-0 w-full h-full border-0"
           ></iframe>
           
           {/* Agar qidiruv bo'lmasa, ustiga yozuv chiqishi mumkin */}
           {!mapSrc && (
             <div className="absolute top-4 left-4 bg-white/90 text-slate-900 px-4 py-2 rounded-lg shadow-lg text-sm font-bold z-10 pointer-events-none border border-slate-200">
               📍 Akademiya joylashuvi
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Transport;