// v4.0: Qidiruv ro'yxati va dizayn muammosi hal qilindi
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

  // 📍 AKADEMIYA LOKATSIYASI
  const akademiyaLat = "41.374751";
  const akademiyaLong = "69.272917";

  const defaultMapUrl = `https://yandex.uz/map-widget/v1/?ll=${akademiyaLong}%2C${akademiyaLat}&z=17&pt=${akademiyaLong}%2C${akademiyaLat},pm2rdm`;

  // ⌨️ Harf yozganda ishlaydigan funksiya
  useEffect(() => {
    const fetchSuggestions = async () => {
      // 2 ta harfdan kam bo'lsa qidirmasin
      if (destination.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        // Cheklovlarni olib tashladik, endi erkinroq qidiradi
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

    const timeoutId = setTimeout(fetchSuggestions, 300); // 0.3 sekund kutib keyin qidiradi
    return () => clearTimeout(timeoutId);
  }, [destination]);

  const handleSelectSuggestion = (placeName) => {
    setDestination(placeName);
    setSuggestions([]);
    updateMapRoute(placeName);
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

      {/* ASOSIY QISM - BU YERDAN "overflow-hidden" OLIB TASHLANDI */}
      <div className="relative z-10 flex-1 p-6 flex flex-col md:flex-row gap-6">
        
        {/* 1. CHAP TOMON */}
        <div className="flex-1 flex flex-col gap-6 max-w-md relative z-[50]">
          
          {/* Qidiruv Paneli */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl relative">
            <label className="text-white text-lg font-bold mb-3 block pl-2">Qayerga borasiz?</label>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Joy nomini yozing..." 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-900/90 text-white border-2 border-blue-500/50 rounded-2xl py-4 pl-12 pr-12 text-xl focus:outline-none focus:border-blue-400 transition-all placeholder-gray-500"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              
              {destination && (
                <button 
                  type="button" 
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-2"
                >
                  <FaTimes />
                </button>
              )}
            </form>

            {/* 🔽 MANZILLAR RO'YXATI - ENDI DOIM KO'RINADI */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/20 rounded-2xl shadow-2xl z-[100] max-h-60 overflow-y-auto">
                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectSuggestion(item.display_name.split(',')[0])} 
                    className="w-full text-left px-5 py-4 text-white hover:bg-blue-600 transition-colors border-b border-white/10 last:border-0 flex items-center gap-3"
                  >
                    <FaMapMarkerAlt className="text-red-400 flex-shrink-0" />
                    <span className="truncate text-sm md:text-base font-medium block w-full">
                      {item.display_name.split(',')[0]} 
                      <span className="text-xs text-gray-400 block mt-1 truncate">
                        {item.display_name.replace(item.display_name.split(',')[0], '').replace(/^, /, '')}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
             
            {isSearching && (
               <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-black/50 backdrop-blur rounded-xl text-center text-white text-sm z-[100]">
                 🔍 Qidirilmoqda...
               </div>
            )}
          </div>

          {/* Tezkor Tugmalar */}
          <div className="bg-slate-800/50 border border-white/10 p-6 rounded-3xl flex-1 flex flex-col overflow-hidden">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-4 text-sm pl-2">Tezkor yo'nalishlar</h3>
            <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-2 custom-scrollbar">
              
              <button onClick={() => updateMapRoute("Toshkent Xalqaro Aeroporti")} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-blue-600 hover:text-white text-gray-200 transition-all border border-white/5 group text-left">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-white/20 text-blue-400 group-hover:text-white">
                  <FaPlane className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Aeroport</h4>
                  <p className="text-xs opacity-60">Xalqaro terminal</p>
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
            </div>
          </div>
        </div>

        {/* 2. O'NG TOMON - XARITA */}
        <div className="flex-[2] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 relative z-0 h-full">
           <iframe 
             src={mapSrc || defaultMapUrl}
             width="100%" 
             height="100%" 
             frameBorder="0"
             title="Yandex Maps"
             allowFullScreen
             className="w-full h-full"
           ></iframe>

           {!mapSrc && (
             <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md text-white p-4 rounded-xl text-center border border-white/20 animate-pulse">
               Manzilni yozing yoki pastdagi tugmalardan birini tanlang
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Transport;