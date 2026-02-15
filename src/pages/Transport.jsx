import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaBus, FaSearch, FaMapMarkerAlt, FaPlane, FaTrain, FaLandmark, FaTimes } from 'react-icons/fa';

const Transport = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [destination, setDestination] = useState('');
  const [mapSrc, setMapSrc] = useState(null);
  
  // Qidiruv uchun yangi o'zgaruvchilar
  const [suggestions, setSuggestions] = useState([]); // Topilgan manzillar ro'yxati
  const [isSearching, setIsSearching] = useState(false); // Qidiryaptimi?

  // 📍 AKADEMIYA LOKATSIYASI (Yunusobod, Rixsiliy 9)
  const akademiyaLat = "41.374751";
  const akademiyaLong = "69.272917";

  const defaultMapUrl = `https://yandex.uz/map-widget/v1/?ll=${akademiyaLong}%2C${akademiyaLat}&z=17&pt=${akademiyaLong}%2C${akademiyaLat},pm2rdm`;

  // ⌨️ Harf yozganda ishlaydigan funksiya
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (destination.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        // OpenStreetMap bepul qidiruv xizmati (faqat O'zbekiston hududida)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&addressdetails=1&limit=5&countrycodes=uz&viewbox=69.1,41.4,69.4,41.2&bounded=1`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Manzil topishda xatolik:", error);
      } finally {
        setIsSearching(false);
      }
    };

    // Har bir harf yozganda serverga so'rov yubormaslik uchun 500ms kutamiz (Debounce)
    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [destination]);

  // 🔎 Ro'yxatdan birini tanlaganda
  const handleSelectSuggestion = (placeName) => {
    setDestination(placeName); // Inputga yozib qo'yamiz
    setSuggestions([]); // Ro'yxatni yopamiz
    updateMapRoute(placeName); // Xaritada yo'l chizamiz
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

  // Inputni tozalash
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

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-6 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* 1. CHAP TOMON - QIDIRUV VA TUGMALAR */}
        <div className="flex-1 flex flex-col gap-6 max-w-md relative z-50">
          
          {/* Qidiruv Paneli */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl relative">
            <label className="text-white text-lg font-bold mb-3 block pl-2">Qayerga borasiz?</label>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Joy nomini yozing..." 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-900/80 text-white border-2 border-blue-500/50 rounded-2xl