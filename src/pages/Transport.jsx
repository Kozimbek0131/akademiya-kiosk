import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaBus, FaSearch, FaMapMarkerAlt, FaPlane, FaTrain, FaLandmark, FaTimes, FaBuilding, FaBalanceScale, FaMonument, FaCity, FaStore } from 'react-icons/fa';

const quickDestinations = [
  { id: 1, name: { uz: "Bosh Prokuratura",    ru: "Генеральная прокуратура", en: "General Prosecutor's Office" }, query: "Bosh prokuratura, Toshkent",     icon: 'building',  color: "text-blue-400",   bg: "bg-blue-500/20" },
  { id: 2, name: { uz: "Oliy Sud",            ru: "Верховный суд",           en: "Supreme Court" },              query: "Oliy Sud, Toshkent",            icon: 'balance',   color: "text-amber-500",  bg: "bg-amber-500/20" },
  { id: 3, name: { uz: "Adliya Vazirligi",    ru: "Министерство юстиции",    en: "Ministry of Justice" },        query: "Adliya vazirligi, Toshkent",    icon: 'landmark',  color: "text-sky-400",    bg: "bg-sky-500/20" },
  { id: 4, name: { uz: "Xalqaro Aeroport",    ru: "Международный аэропорт",  en: "International Airport" },      query: "Toshkent Xalqaro Aeroporti",    icon: 'plane',     color: "text-blue-500",   bg: "bg-blue-600/20" },
  { id: 5, name: { uz: "Shimoliy Vokzal",     ru: "Северный вокзал",         en: "North Railway Station" },      query: "Toshkent Shimoliy Vokzali",     icon: 'train',     color: "text-green-500",  bg: "bg-green-500/20" },
  { id: 6, name: { uz: "Janubiy Vokzal",      ru: "Южный вокзал",            en: "South Railway Station" },      query: "Toshkent Janubiy Vokzali",      icon: 'train',     color: "text-teal-500",   bg: "bg-teal-500/20" },
  { id: 7, name: { uz: "Tashkent City",       ru: "Ташкент Сити",            en: "Tashkent City" },              query: "Tashkent City, Toshkent",       icon: 'city',      color: "text-purple-400", bg: "bg-purple-500/20" },
  { id: 8, name: { uz: "Mustaqillik Maydoni", ru: "пл. Независимости",       en: "Independence Square" },        query: "Mustaqillik Maydoni, Toshkent", icon: 'monument',  color: "text-yellow-500", bg: "bg-yellow-500/20" },
  { id: 9, name: { uz: "Amir Temur Maydoni",  ru: "сквер Амира Тимура",      en: "Amir Temur Square" },          query: "Amir Temur Xiyoboni, Toshkent", icon: 'marker',    color: "text-red-400",    bg: "bg-red-500/20" },
  { id:10, name: { uz: "Chorsu Bozori",       ru: "Базар Чорсу",             en: "Chorsu Bazaar" },              query: "Chorsu bozori, Toshkent",       icon: 'store',     color: "text-orange-500", bg: "bg-orange-500/20" },
];

const Icon = ({ type, className }) => {
  if (type === 'balance')  return <FaBalanceScale className={className} />;
  if (type === 'landmark') return <FaLandmark     className={className} />;
  if (type === 'plane')    return <FaPlane        className={className} />;
  if (type === 'train')    return <FaTrain        className={className} />;
  if (type === 'city')     return <FaCity         className={className} />;
  if (type === 'monument') return <FaMonument     className={className} />;
  if (type === 'marker')   return <FaMapMarkerAlt className={className} />;
  if (type === 'store')    return <FaStore        className={className} />;
  return                          <FaBuilding     className={className} />;
};

const Transport = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [destination, setDestination] = useState('');
  const [mapSrc, setMapSrc] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const akademiyaLat  = "41.374751";
  const akademiyaLong = "69.272917";
  const defaultMapUrl = `https://yandex.uz/map-widget/v1/?ll=${akademiyaLong}%2C${akademiyaLat}&z=15&pt=${akademiyaLong}%2C${akademiyaLat},pm2rdm`;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length < 3) { setSuggestions([]); return; }
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&addressdetails=1&limit=5&countrycodes=uz`);
        setSuggestions(await res.json());
      } catch (e) { console.error(e); }
    };
    const id = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(id);
  }, [destination]);

  const handleSelectSuggestion = (item) => {
    setDestination(item.display_name.split(',')[0]);
    setSuggestions([]);
    setMapSrc(`https://yandex.uz/map-widget/v1/?rtext=${akademiyaLat},${akademiyaLong}~${item.lat},${item.lon}&rtt=mt&z=13`);
  };

  const updateMapRoute = (query) => setMapSrc(`https://yandex.uz/map-widget/v1/?rtext=${akademiyaLat},${akademiyaLong}~${encodeURIComponent(query)}&rtt=mt&z=12`);

  const handleSearch = (e) => { e.preventDefault(); if (destination.trim()) { updateMapRoute(destination); setSuggestions([]); } };
  const clearSearch  = () => { setDestination(''); setSuggestions([]); setMapSrc(null); };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">

      {/* HEADER */}
      <div className="relative z-50 flex items-center justify-between p-4 md:p-6 bg-slate-900/90 backdrop-blur-md border-b border-white/10 shadow-lg shrink-0">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all font-bold uppercase cursor-pointer">
          <FaArrowLeft /> {t('back_btn')}
        </button>
        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <FaBus className="text-blue-400" /> {t('page_transport')}
        </h1>
      </div>

      {/* XARITA */}
      <div className="flex-1 relative bg-gray-200 w-full z-0">
        <iframe src={mapSrc || defaultMapUrl} frameBorder="0" title="Yandex Maps" allowFullScreen className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-125"></iframe>
        {!mapSrc && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold z-10 pointer-events-none border border-white/20 animate-pulse">
            📍 {t('map_academy_loc')}
          </div>
        )}
      </div>

      {/* PASTKI PANEL */}
      <div className="relative z-20 w-full h-[45%] bg-slate-900 border-t border-white/10 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col p-6 md:p-8">

        {/* Qidiruv */}
        <div className="relative w-full max-w-4xl mx-auto mb-6">
          <form onSubmit={handleSearch} className="relative shadow-2xl">
            <input type="text" placeholder={`${t('label_where')} ${t('placeholder_location')}`}
              value={destination} onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-800 text-white border-2 border-white/10 rounded-2xl py-4 pl-14 pr-12 text-lg md:text-xl focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400" />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            {destination && <FaTimes className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white text-xl" onClick={clearSearch} />}
          </form>
          {suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
              {suggestions.map((item, i) => (
                <button key={i} onClick={() => handleSelectSuggestion(item)} className="w-full text-left px-5 py-4 text-white hover:bg-blue-600 transition-colors border-b border-white/10 last:border-0 flex items-center gap-4 cursor-pointer">
                  <FaMapMarkerAlt className="text-blue-400 shrink-0 text-xl" />
                  <div>
                    <span className="text-base font-bold block">{item.display_name.split(',')[0]}</span>
                    <span className="text-xs text-gray-400 line-clamp-1">{item.display_name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tezkor tugmalar */}
        <div className="w-full max-w-4xl mx-auto flex-1 overflow-y-auto custom-scrollbar pb-10">
          <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-4 text-sm px-2">{t('quick_routes')}</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {quickDestinations.map((dest) => (
              <button key={dest.id} onClick={() => updateMapRoute(dest.query)}
                className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 md:p-4 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group text-left shadow-md active:scale-95">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${dest.bg} flex items-center justify-center ${dest.color} group-hover:scale-110 transition-transform shrink-0 text-xl md:text-2xl`}>
                  <Icon type={dest.icon} />
                </div>
                <span className="font-bold text-sm md:text-base text-gray-200 group-hover:text-white leading-tight">
                  {dest.name[language] || dest.name.uz}
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