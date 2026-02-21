import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaArrowLeft, FaBus, FaSearch, FaMapMarkerAlt, 
  FaPlane, FaTrain, FaLandmark, FaTimes, 
  FaBuilding, FaBalanceScale, FaMonument, FaCity, FaStore 
} from 'react-icons/fa';

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

  // TEZKOR MANZILLAR RO'YXATI (10 ta muhim joy)
  const quickDestinations = [
    { id: 1, name: "Bosh Prokuratura", query: "Bosh prokuratura, Toshkent", icon: <FaBuilding />, color: "text-blue-400", bg: "bg-blue-500/20" },
    { id: 2, name: "Oliy Sud", query: "Oliy Sud, Toshkent", icon: <FaBalanceScale />, color: "text-amber-500", bg: "bg-amber-500/20" },
    { id: 3, name: "Adliya Vazirligi", query: "Adliya vazirligi, Toshkent", icon: <FaLandmark />, color: "text-sky-400", bg: "bg-sky-500/20" },
    { id: 4, name: "Xalqaro Aeroport", query: "Toshkent Xalqaro Aeroporti", icon: <FaPlane />, color: "text-blue-500", bg: "bg-blue-600/20" },
    { id: 5, name: "Shimoliy Vokzal", query: "Toshkent Shimoliy Vokzali", icon: <FaTrain />, color: "text-green-500", bg: "bg-green-500/20" },
    { id: 6, name: "Janubiy Vokzal", query: "Toshkent Janubiy Vokzali", icon: <FaTrain />, color: "text-teal-500", bg: "bg-teal-500/20" },
    { id: 7, name: "Tashkent City", query: "Tashkent City, Toshkent", icon: <FaCity />, color: "text-purple-400", bg: "bg-purple-500/20" },
    { id: 8, name: "Mustaqillik Maydoni", query: "Mustaqillik Maydoni, Toshkent", icon: <FaMonument />, color: "text-yellow-500", bg: "bg-yellow-500/20" },
    { id: 9, name: "Amir Temur Maydoni", query: "Amir Temur Xiyoboni, Toshkent", icon: <FaMapMarkerAlt />, color: "text-red-400", bg: "bg-red-500/20" },
    { id: 10, name: "Chorsu Bozori", query: "Chorsu bozori, Toshkent", icon: <FaStore />, color: "text-orange-500", bg: "bg-orange-500/20" },
  ];

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

  const updateMapRoute = (placeQuery) => {
    const routeUrl = `https://yandex.uz/map-widget/v1/?rtext=${akademiyaLat},${akademiyaLong}~${encodeURIComponent(placeQuery)}&rtt=mt&z=12`;
    setMapSrc(routeUrl);
  };

  const clearSearch = () => {
    setDestination('');
    setSuggestions([]);
    setMapSrc(null);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 z-0 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-50 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg gap-4 shrink-0">
        <button 
          onClick={() => navigate(-1)} // Orqaga qaytish yanada to'g'ri ishlashi uchun navigate(-1) ishlatildi
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-3">
          <FaBus className="text-blue-400 text-2xl md:text-4xl" /> YO'NALISHNI IZLASH
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* 1. CHAP TOMON - SIDEBAR */}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition-colors"
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
                    <FaMapMarkerAlt className="text-blue-400 shrink-0" />
                    <span className="truncate text-sm font-medium block">{item.display_name.split(',')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tezkor tugmalar ro'yxati */}
          <div className="bg-slate-800/50 border border-white/10 p-4 rounded-2xl flex-1 md:flex-none flex flex-col">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-4 text-xs md:text-sm">Tezkor yo'nalishlar</h3>
            
            <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-1 pb-4">
              {quickDestinations.map((dest) => (
                <button 
                  key={dest.id}
                  onClick={() => updateMapRoute(dest.query)} // Qidiruv uchun aniq manzil yuboriladi
                  className="flex items-center gap-3 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group shrink-0"
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${dest.bg} flex items-center justify-center ${dest.color} group-hover:scale-110 transition-transform`}>
                    {dest.icon}
                  </div>
                  <span className="font-bold text-sm md:text-base text-gray-200 group-hover:text-white transition-colors">
                    {dest.name}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* 2. O'NG TOMON - XARITA */}
        <div className="flex-1 relative bg-gray-100 h-[60vh] md:h-full w-full">
           <iframe 
             src={mapSrc || defaultMapUrl} 
             frameBorder="0" 
             title="Yandex Maps" 
             allowFullScreen 
             className="absolute inset-0 w-full h-full border-0"
           ></iframe>
           
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