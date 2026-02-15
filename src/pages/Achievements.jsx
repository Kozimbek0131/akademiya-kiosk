import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaTrophy, FaMedal, FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Achievements = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // NAMUNA YUTUQLAR (Rasmlar va matnlar)
  const achievements = [
    {
      id: 1,
      title: "Xalqaro Sifat Sertifikati",
      desc: "Akademiyamiz ta'lim sifati bo'yicha ISO 9001 xalqaro sertifikatiga ega bo'ldi.",
      icon: <FaMedal className="text-yellow-400 text-6xl" />,
      color: "from-blue-600 to-blue-900",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Yilning eng yaxshi huquq maktabi",
      desc: "2025-yil yakunlariga ko'ra O'zbekistondagi eng innovatsion huquqni muhofaza qilish o'quv dargohi deb topildi.",
      icon: <FaTrophy className="text-amber-500 text-6xl" />,
      color: "from-amber-600 to-red-900",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Sport Musobaqasi G'olibi",
      desc: "Kursantlarimiz qo'l jangi bo'yicha Osiyo chempionatida 1-o'rinni egallashdi.",
      icon: <FaStar className="text-white text-6xl" />,
      color: "from-green-600 to-teal-900",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Raqamli Kriminalistika Laboratoriyasi",
      desc: "Yangi avlod texnologiyalari bilan jihozlangan zamonaviy laboratoriya ishga tushirildi.",
      icon: <FaMedal className="text-cyan-400 text-6xl" />,
      color: "from-indigo-600 to-purple-900",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  // Avtomatik aylanish (5 sekundda)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none">
      
      {/* Orqa fon rasmi (xira) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-30 blur-sm scale-105"
        style={{ backgroundImage: `url(${achievements[currentIndex].image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/90"></div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-4xl font-black text-white uppercase tracking-wider flex items-center gap-4">
          <FaTrophy className="text-yellow-400 animate-bounce" /> 
          AKADEMIYA YUTUQLARI
        </h1>
      </div>

      {/* ASOSIY SLAYDER QISMI */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-10">
        
        {/* Chap tugma */}
        <button onClick={prevSlide} className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl transition-all hover:scale-110 active:scale-95 absolute left-10 z-50">
          <FaChevronLeft />
        </button>

        {/* O'ng tugma */}
        <button onClick={nextSlide} className="p-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl transition-all hover:scale-110 active:scale-95 absolute right-10 z-50">
          <FaChevronRight />
        </button>

        {/* KARTA */}
        <div className="w-full max-w-5xl h-[60vh] relative flex items-center">
          
          {/* Asosiy Katta Rasm va Matn */}
          <div className={`w-full h-full bg-gradient-to-br ${achievements[currentIndex].color} rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20 flex overflow-hidden relative animate-fade-in transition-all duration-500`}>
            
            {/* Chap tomon: Matn */}
            <div className="w-1/2 p-12 flex flex-col justify-center relative z-20">
              <div className="mb-6">{achievements[currentIndex].icon}</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                {achievements[currentIndex].title}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed border-l-4 border-white/30 pl-6">
                {achievements[currentIndex].desc}
              </p>
              
              <div className="mt-10 flex gap-2">
                 {achievements.map((_, idx) => (
                   <div 
                     key={idx} 
                     className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/30'}`}
                   />
                 ))}
              </div>
            </div>

            {/* O'ng tomon: Rasm */}
            <div className="w-1/2 h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
              <img 
                src={achievements[currentIndex].image} 
                alt="Achievement" 
                className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[2s]"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Achievements;