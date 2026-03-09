import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaTrophy, FaMedal, FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const achievementsData = [
  {
    id: 1,
    title: { uz: "Xalqaro Sifat Sertifikati", ru: "Международный сертификат качества", en: "International Quality Certificate" },
    desc:  { uz: "Akademiyamiz ta'lim sifati bo'yicha ISO 9001 xalqaro sertifikatiga ega bo'ldi.", ru: "Академия получила международный сертификат ISO 9001 по качеству образования.", en: "The Academy received the ISO 9001 international certificate for education quality." },
    icon: 'medal-yellow', color: "from-blue-700 to-slate-900",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: { uz: "Yilning eng yaxshi huquq maktabi", ru: "Лучшая юридическая школа года", en: "Best Law School of the Year" },
    desc:  { uz: "2025-yil yakunlariga ko'ra innovatsion huquqni muhofaza qilish o'quv dargohi deb topildi.", ru: "По итогам 2025 года признана инновационным учебным заведением в сфере охраны правопорядка.", en: "Recognized as the most innovative law enforcement educational institution of 2025." },
    icon: 'trophy', color: "from-amber-600 to-slate-900",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: { uz: "Sport Musobaqasi G'olibi", ru: "Победитель спортивных соревнований", en: "Sports Competition Winner" },
    desc:  { uz: "Kursantlarimiz qo'l jangi bo'yicha Osiyo chempionatida 1-o'rinni egallashdi.", ru: "Наши курсанты заняли 1-е место на чемпионате Азии по рукопашному бою.", en: "Our cadets won 1st place at the Asian Hand-to-Hand Combat Championship." },
    icon: 'star', color: "from-green-600 to-slate-900",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: { uz: "Raqamli Kriminalistika Laboratoriyasi", ru: "Лаборатория цифровой криминалистики", en: "Digital Forensics Laboratory" },
    desc:  { uz: "Yangi avlod texnologiyalari bilan jihozlangan zamonaviy laboratoriya ishga tushirildi.", ru: "Запущена современная лаборатория, оснащённая технологиями нового поколения.", en: "A modern laboratory equipped with next-generation technologies was launched." },
    icon: 'medal-cyan', color: "from-indigo-600 to-slate-900",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  }
];

const IconComp = ({ type }) => {
  if (type === 'trophy')     return <FaTrophy className="text-amber-400 text-5xl md:text-7xl drop-shadow-lg" />;
  if (type === 'star')       return <FaStar   className="text-white   text-5xl md:text-7xl drop-shadow-lg" />;
  if (type === 'medal-cyan') return <FaMedal  className="text-cyan-400 text-5xl md:text-7xl drop-shadow-lg" />;
  return                            <FaMedal  className="text-yellow-400 text-5xl md:text-7xl drop-shadow-lg" />;
};

const Achievements = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex(p => (p === achievementsData.length - 1 ? 0 : p + 1)), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setCurrentIndex(p => (p === achievementsData.length - 1 ? 0 : p + 1));
      else if (e.key === 'ArrowLeft') setCurrentIndex(p => (p === 0 ? achievementsData.length - 1 : p - 1));
      else if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const cur = achievementsData[currentIndex];
  const title = cur.title[language] || cur.title.uz;
  const desc  = cur.desc[language]  || cur.desc.uz;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white">
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-20 blur-xl scale-110 pointer-events-none" style={{ backgroundImage: `url(${cur.image})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/90 to-slate-950 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 border-b border-white/10 gap-4 shrink-0 bg-slate-900/50 backdrop-blur-md">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-lg font-bold uppercase w-fit cursor-pointer">
          <FaArrowLeft /> {t('back_btn')}
        </button>
        <h1 className="text-2xl md:text-4xl font-black text-center uppercase tracking-wider flex items-center gap-4">
          <FaTrophy className="text-yellow-400 text-3xl md:text-5xl drop-shadow-md" /> {t('menu_achievements')}
        </h1>
      </div>

      {/* SLAYDER */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 w-full max-w-4xl mx-auto pb-10">
        <div className={`w-full h-[75vh] min-h-[700px] bg-gradient-to-br ${cur.color} rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col overflow-hidden relative`}>
          <div className="w-full h-[45%] relative shrink-0 bg-black/50">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img src={cur.image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/1e293b/ffffff?text=Rasm'; }} />
            <div className="absolute bottom-6 right-6 z-20 bg-black/40 p-5 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
              <IconComp type={cur.icon} />
            </div>
          </div>
          <div className="w-full h-[55%] p-8 md:p-10 flex flex-col justify-between relative z-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">{title}</h2>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed border-l-4 border-amber-500 pl-6 bg-black/10 py-2 rounded-r-xl">{desc}</p>
            </div>
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
              <button onClick={() => setCurrentIndex(p => (p === 0 ? achievementsData.length - 1 : p - 1))} className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 text-3xl text-white active:scale-90 cursor-pointer backdrop-blur-md border border-white/20 transition-all shadow-lg"><FaChevronLeft /></button>
              <div className="flex gap-3 px-4">
                {achievementsData.map((_, idx) => (
                  <div key={idx} onClick={() => setCurrentIndex(idx)}
                    className={`h-3 rounded-full transition-all duration-500 cursor-pointer ${idx === currentIndex ? 'w-16 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'w-4 bg-white/30 hover:bg-white/50'}`} />
                ))}
              </div>
              <button onClick={() => setCurrentIndex(p => (p === achievementsData.length - 1 ? 0 : p + 1))} className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 text-3xl text-white active:scale-90 cursor-pointer backdrop-blur-md border border-white/20 transition-all shadow-lg"><FaChevronRight /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;