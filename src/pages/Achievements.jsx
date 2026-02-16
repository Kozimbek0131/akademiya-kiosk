import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaTrophy, FaMedal, FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Achievements = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const achievements = [
    {
      id: 1,
      title: "Xalqaro Sifat Sertifikati",
      desc: "Akademiyamiz ta'lim sifati bo'yicha ISO 9001 xalqaro sertifikatiga ega bo'ldi.",
      icon: <FaMedal className="text-yellow-400 text-4xl md:text-6xl" />,
      color: "from-blue-600 to-blue-900",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Yilning eng yaxshi huquq maktabi",
      desc: "2025-yil yakunlariga ko'ra innovatsion huquqni muhofaza qilish o'quv dargohi deb topildi.",
      icon: <FaTrophy className="text-amber-500 text-4xl md:text-6xl" />,
      color: "from-amber-600 to-red-900",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Sport Musobaqasi G'olibi",
      desc: "Kursantlarimiz qo'l jangi bo'yicha Osiyo chempionatida 1-o'rinni egallashdi.",
      icon: <FaStar className="text-white text-4xl md:text-6xl" />,
      color: "from-green-600 to-teal-900",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Raqamli Kriminalistika Laboratoriyasi",
      desc: "Yangi avlod texnologiyalari bilan jihozlangan zamonaviy laboratoriya ishga tushirildi.",
      icon: <FaMedal className="text-cyan-400 text-4xl md:text-6xl" />,
      color: "from-indigo-600 to-purple-900",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  // Avtomatik aylanish (Timer)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [achievements.length]);

  // KLAVIATURA BILAN BOSHQARISH (YANGI QO'SHILDI)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
      } else if (e.key === 'Escape') {
        navigate('/'); // Escape bosilganda orqaga qaytadi
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, achievements.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));

  return (
    // O'ZGARISH: overflow-hidden olib tashlandi va overflow-y-auto qo'yildi (kichik ekranlar uchun xavfsizlik)
    <div className="min-h-screen flex flex-col bg-slate-900 relative overflow-y-auto select-none text-white">
      
      {/* FON */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-1000 opacity-30 blur-sm scale-105 pointer-events-none"
        style={{ backgroundImage: `url(${achievements[currentIndex].image})` }}
      ></div>
      <div className="fixed inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/90 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 border-b border-white/10 gap-4 shrink-0">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit cursor-pointer z-50"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-xl md:text-4xl font-black text-center uppercase tracking-wider flex items-center gap-3 md:gap-4">
          <FaTrophy className="text-yellow-400 animate-bounce text-2xl md:text-4xl" /> 
          AKADEMIYA YUTUQLARI
        </h1>
      </div>

      {/* ASOSIY SLAYDER */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-10 min-h-[600px]">
        
        {/* Navigatsiya tugmalari */}
        <button onClick={prevSlide} className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-xl md:text-3xl absolute left-2 md:left-10 z-50 active:scale-90 cursor-pointer backdrop-blur-md border border-white/10">
          <FaChevronLeft />
        </button>

        <button onClick={nextSlide} className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-xl md:text-3xl absolute right-2 md:right-10 z-50 active:scale-90 cursor-pointer backdrop-blur-md border border-white/10">
          <FaChevronRight />
        </button>

        {/* KARTA */}
        <div className="w-full max-w-5xl relative flex items-center justify-center">
          <div className={`w-full min-h-[50vh] bg-gradient-to-br ${achievements[currentIndex].color} rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/20 flex flex-col md:flex-row overflow-hidden relative animate-fade-in`}>
            
            {/* Matn qismi */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center relative z-20 order-2 md:order-1">
              <div className="mb-4 md:mb-6">{achievements[currentIndex].icon}</div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                {achievements[currentIndex].title}
              </h2>
              <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed border-l-4 border-white/30 pl-4 md:pl-6">
                {achievements[currentIndex].desc}
              </p>
              
              {/* Indikatorlar */}
              <div className="mt-6 md:mt-10 flex gap-2">
                 {achievements.map((_, idx) => (
                   <div 
                     key={idx} 
                     onClick={() => setCurrentIndex(idx)}
                     className={`h-1.5 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'w-8 md:w-12 bg-white' : 'w-3 md:w-4 bg-white/30 hover:bg-white/50'}`}
                   />
                 ))}
              </div>
            </div>

            {/* Rasm qismi */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none"></div>
              <img 
                src={achievements[currentIndex].image} 
                alt="Achievement" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Achievements;