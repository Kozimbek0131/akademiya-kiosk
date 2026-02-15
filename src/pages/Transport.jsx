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
    // Responsive: min-h-screen mobil uchun
    <div className="min-h-screen flex flex-col bg-slate-900 relative overflow-x-hidden select-none text-white">
      
      {/* Orqa fon */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 z-0"></div>

      {/* HEADER (Mobil uchun flex-col) */}
      <div className="relative z-50 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg gap-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <FaBus className="text-red-500 text-2xl md:text-4xl" /> 
          YO'NALISHNI IZLASH
        </h1>
      </div>

      {/* ASOSIY QISM (Mobil uchun flex-col) */}
      <div className="relative z-10 flex-1 p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-y-auto md:overflow-hidden">
        
        {/* 1. CHAP TOMON - QIDIRUV VA TUGMALAR */}
        <div className="w-full md:w-[400px] flex flex-col gap-4 md:gap-6 shrink-0 relative z-40">
          
          {/* Qidiruv Paneli */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl relative">
            <label className="text-white text-sm md:text-lg font-bold mb-2 md:mb-3 block">Qayerga borasiz?</label>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Joy nomini yozing..." 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-900/90 text-white border-2 border-blue-500/50 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 md:pl-12 pr-10 md:pr-12 text-base md:text-xl focus:outline-none focus:border-blue-400 transition-all placeholder-gray-500"
              />
              <FaSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base md:text-xl" />
              
              {destination && (
                <button type="button" onClick={clearSearch} className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 md:p-2">
                  <FaTimes />
                </button>
              )}
            </form>

            {/* MANZILLAR RO'YXATI */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/20 rounded-xl md:rounded-2xl shadow-2xl z-[100] max-h-48 md:max-h-60 overflow-y-auto">
                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectSuggestion(item.display_name.split(',')[0])} 
                    className="w-full text-left px-4 py-3 md:px-5 md:py-4 text-white hover:bg-blue-600 transition-colors border-b border-white/10 last:border-0 flex items-center gap-3"
                  >
                    <FaMapMarkerAlt className="text-red-400 flex-shrink-0 text-sm md:text-base" />
                    <span className="truncate text-xs md:text-base font-medium block w-full">
                      {item.display_name.split(',')[0]} 
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tezkor Tugmalar (Mobilda gorizontal scroll yoki kichikroq o'lcham) */}
          <div className="bg-slate-800/50 border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-3xl flex-1 flex flex-col">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-3 md:mb-4 text-[10px] md:text-sm">Tezkor yo'nalishlar</h3>
            <div className="flex flex-col gap-2 md:gap-3 overflow-y-auto custom-scrollbar pr-1">
              {[
                { name: "Aeroport", desc: "Xalqaro terminal", icon: <FaPlane />, color: "bg-blue-500/20", text: "text-blue-400", target: "Toshkent Xalqaro Aeroporti" },
                { name: "Janubiy Vokzal", desc: "Poyezd qatnovlari", icon: <FaTrain />, color: "bg-green-500/20", text: "text-green-400", target: "Toshkent Janubiy Vokzali" },
                { name: "Chorsu Bozori", desc: "Eski shahar", icon: <FaLandmark />, color: "bg-amber-500/20", text: "text-amber-400", target: "Chorsu Bozori" }
              ].map((item, idx) => (
                <button key={idx} onClick={() => updateMapRoute(item.target)} className="flex items-center gap-3 md:gap-4 bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-blue-600 hover:text-white transition-all border border-white/5 group text-left">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${item.color} flex items-center justify-center group-hover:bg-white/20 ${item.text} group-hover:text-white shrink-0`}>
                    <span className="text-base md:text-xl">{item.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm md:text-lg truncate">{item.name}</h4>
                    <p className="text-[10px] md:text-xs opacity-60 truncate">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. O'NG TOMON - XARITA */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-slate-700 relative z-0 min-h-[350px] md:h-full">
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
             <div className="absolute bottom-4 md:bottom-6 left-4 right-4 bg-black/80 backdrop-blur-md text-white p-3 md:p-4 rounded-xl text-center border border-white/20 text-[10px] md:text-sm animate-pulse">
               Manzilni yozing yoki tugmalardan birini tanlang
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Transport;