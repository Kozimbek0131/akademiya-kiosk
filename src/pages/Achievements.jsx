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
      icon: <FaMedal className="text-yellow-400 text-5xl md:text-7xl drop-shadow-lg" />,
      color: "from-blue-700 to-slate-900",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Yilning eng yaxshi huquq maktabi",
      desc: "2025-yil yakunlariga ko'ra innovatsion huquqni muhofaza qilish o'quv dargohi deb topildi.",
      icon: <FaTrophy className="text-amber-400 text-5xl md:text-7xl drop-shadow-lg" />,
      color: "from-amber-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Sport Musobaqasi G'olibi",
      desc: "Kursantlarimiz qo'l jangi bo'yicha Osiyo chempionatida 1-o'rinni egallashdi.",
      icon: <FaStar className="text-white text-5xl md:text-7xl drop-shadow-lg" />,
      color: "from-green-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Raqamli Kriminalistika Laboratoriyasi",
      desc: "Yangi avlod texnologiyalari bilan jihozlangan zamonaviy laboratoriya ishga tushirildi.",
      icon: <FaMedal className="text-cyan-400 text-5xl md:text-7xl drop-shadow-lg" />,
      color: "from-indigo-600 to-slate-900",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Avtomatik aylanish
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [achievements.length]);

  // Klaviatura nazorati
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, achievements.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white">
      
      {/* FON */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-20 blur-xl scale-110 pointer-events-none"
        style={{ backgroundImage: `url(${achievements[currentIndex].image})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 border-b border-white/10 gap-4 shrink-0 bg-slate-900/50 backdrop-blur-md">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-lg font-bold uppercase w-fit cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-2xl md:text-4xl font-black text-center uppercase tracking-wider flex items-center gap-4">
          <FaTrophy className="text-yellow-400 text-3xl md:text-5xl drop-shadow-md" /> 
          AKADEMIYA YUTUQLARI
        </h1>
      </div>

      {/* ASOSIY SLAYDER KARTASI */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 w-full max-w-4xl mx-auto h-full pb-10">
        
        <div key={currentIndex} className={`w-full h-[75vh] min-h-[700px] bg-gradient-to-br ${achievements[currentIndex].color} rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col overflow-hidden relative animate-fade-in`}>
          
          {/* Tepa qism - Rasm (45%) */}
          <div className="w-full h-[45%] relative shrink-0 bg-black/50">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img 
              src={achievements[currentIndex].image} 
              alt={achievements[currentIndex].title} 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/1e293b/ffffff?text=Rasm+Yuklanmadi' }}
            />
            {/* Ikonka rasmning burchagida */}
            <div className="absolute bottom-6 right-6 z-20 bg-black/40 p-5 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
              {achievements[currentIndex].icon}
            </div>
          </div>

          {/* Pastki qism - Matn va Tugmalar (55%) */}
          <div className="w-full h-[55%] p-8 md:p-10 flex flex-col justify-between relative z-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                {achievements[currentIndex].title}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed border-l-4 border-amber-500 pl-6 bg-black/10 py-2 rounded-r-xl">
                {achievements[currentIndex].desc}
              </p>
            </div>
            
            {/* Boshqaruv paneli (Pastki qatorda) */}
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
              
              <button onClick={prevSlide} className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 text-3xl text-white active:scale-90 cursor-pointer backdrop-blur-md border border-white/20 transition-all shadow-lg">
                <FaChevronLeft />
              </button>

              {/* Indikatorlar */}
              <div className="flex gap-3 px-4">
                 {achievements.map((_, idx) => (
                   <div 
                     key={idx} 
                     onClick={() => setCurrentIndex(idx)}
                     className={`h-3 rounded-full transition-all duration-500 cursor-pointer ${idx === currentIndex ? 'w-16 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                   />
                 ))}
              </div>

              <button onClick={nextSlide} className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 text-3xl text-white active:scale-90 cursor-pointer backdrop-blur-md border border-white/20 transition-all shadow-lg">
                <FaChevronRight />
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Achievements;