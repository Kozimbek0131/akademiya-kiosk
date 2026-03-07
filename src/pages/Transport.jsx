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
  const defaultMapUrl = `https://yandex.uz/map-widget/v1/?ll=${akademiyaLong}%2C${akademiyaLat}&z=15&pt=${akademiyaLong}%2C${akademiyaLat},pm2rdm`;

  // TEZKOR MANZILLAR RO'YXATI
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

  // Qidiruv so'rovlari
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length < 3) {
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
    const timeoutId = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(timeoutId);
  }, [destination]);

  // YANGILANISH: Matn emas, aniq KOORDINATALAR (lat, lon) yuboriladi
  const handleSelectSuggestion = (item) => {
    const cleanName = item.display_name.split(',')[0];
    setDestination(cleanName);
    setSuggestions([]);
    
    // Yandex'ga to'g'ridan-to'g'ri koordinatani beramiz (100% aniq ishlashi uchun)
    const routeUrl = `https://yandex.uz/map-widget/v1/?rtext=${akademiyaLat},${akademiyaLong}~${item.lat},${item.lon}&rtt=mt&z=13`;
    setMapSrc(routeUrl);
  };

  // Tezkor tugmalar va enter bosilganda matn orqali izlash
  const updateMapRoute = (placeQuery) => {
    const routeUrl = `https://yandex.uz/map-widget/v1/?rtext=${akademiyaLat},${akademiyaLong}~${encodeURIComponent(placeQuery)}&rtt=mt&z=12`;
    setMapSrc(routeUrl);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      updateMapRoute(destination);
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    setDestination('');
    setSuggestions([]);
    setMapSrc(null);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      
      {/* 1. HEADER (Tepa qism) */}
      <div className="relative z-50 flex items-center justify-between p-4 md:p-6 bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-lg shrink-0">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-base md:text-xl font-bold uppercase cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ASOSIY MENYU"}
        </button>
        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <FaBus className="text-blue-400" /> YO'NALISHNI IZLASH
        </h1>
      </div>

      {/* 2. XARITA QISMI (O'rta va orqa fon) */}
      <div className="flex-1 relative bg-gray-200 w-full z-0">
         <iframe 
           src={mapSrc || defaultMapUrl} 
           frameBorder="0" 
           title="Yandex Maps" 
           allowFullScreen 
           className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-125"
         ></iframe>
         
         {!mapSrc && (
           <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl text-base md:text-lg font-bold z-10 pointer-events-none border border-white/20 animate-pulse">
             📍 Akademiya joylashuvi
           </div>
         )}
      </div>

      {/* 3. BOSHQARUV PANELI (Pastki qism - Qo'l yetadigan joyda) */}
      <div className="relative z-20 w-full h-[45%] bg-slate-900 border-t border-white/10 rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col p-6 md:p-8">
        
        {/* Qidiruv Paneli */}
        <div className="relative w-full max-w-4xl mx-auto mb-6">
          <form onSubmit={handleSearch} className="relative shadow-2xl">
            <input 
              type="text" 
              placeholder="Qayerga borasiz? Joy nomini yozing..." 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-800 text-white border-2 border-white/10 rounded-2xl py-4 pl-14 pr-12 text-lg md:text-xl focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400"
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            {destination && (
              <FaTimes 
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition-colors text-xl"
                onClick={clearSearch}
              />
            )}
          </form>

          {/* Suggestions (Natijalar) - Qidiruvning tepasiga chiqadi */}
          {suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
              {suggestions.map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => handleSelectSuggestion(item)} 
                  className="w-full text-left px-5 py-4 text-white hover:bg-blue-600 transition-colors border-b border-white/10 last:border-0 flex items-center gap-4 cursor-pointer"
                >
                  <FaMapMarkerAlt className="text-blue-400 shrink-0 text-xl" />
                  <div>
                    <span className="text-base md:text-lg font-bold block">{item.display_name.split(',')[0]}</span>
                    <span className="text-xs md:text-sm text-gray-400 line-clamp-1">{item.display_name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tezkor tugmalar ro'yxati (Grid usulida) */}
        <div className="w-full max-w-4xl mx-auto flex-1 overflow-y-auto custom-scrollbar pb-10">
          <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-4 text-sm px-2">Tezkor yo'nalishlar</h3>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {quickDestinations.map((dest) => (
              <button 
                key={dest.id}
                onClick={() => updateMapRoute(dest.query)} 
                className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 md:p-4 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group text-left shadow-md active:scale-95"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${dest.bg} flex items-center justify-center ${dest.color} group-hover:scale-110 transition-transform shrink-0 text-xl md:text-2xl`}>
                  {dest.icon}
                </div>
                <span className="font-bold text-sm md:text-base text-gray-200 group-hover:text-white transition-colors leading-tight">
                  {dest.name}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Transport;