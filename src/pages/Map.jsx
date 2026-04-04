import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { createPortal } from 'react-dom';
import { 
  FaArrowLeft, FaMapMarkedAlt, FaBuilding, FaBed, 
  FaUtensils, FaUserTie, FaTimes, FaLayerGroup, FaTools,
  FaExpand, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

// ─────────────────────────────────────────────
// 1. STATIC MA'LUMOTLAR
// ─────────────────────────────────────────────
const sampleImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600",
  "https://images.unsplash.com/photo-1557426165-276709f4e2f3?q=80&w=600",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600",
];

const academyBuildings = [
  {
    id: 'study_b',
    name_uz: "O'quv binosi (B-blok)",
    name_ru: "Учебный корпус (Блок Б)",
    name_en: "Study Building (Block B)",
    type: 'study',
    floors: 2,
    desc_uz: "Amaliy mashg'ulotlar va laboratoriya xonalari.",
    desc_ru: "Помещения для практических занятий и лабораторий.",
    desc_en: "Rooms for practical classes and laboratories.",
    images: [sampleImages[0]],
    top: '62%', 
    left: '15%'
  },
  {
    id: 'study_a',
    name_uz: "O'quv binosi (A-blok)",
    name_ru: "Учебный корпус (Блок А)",
    name_en: "Study Building (Block A)",
    type: 'study',
    floors: 4,
    desc_uz: "Asosiy ma'ruzalar zallari va kafedralar joylashgan bino.",
    desc_ru: "Здание, где расположены основные лекционные залы и кафедры.",
    desc_en: "Building housing main lecture halls and departments.",
    // DIQQAT: Sinab ko'rish uchun bu yerga 5 ta rasm kiritildi
    images: [sampleImages[0], sampleImages[1], sampleImages[2], sampleImages[0], sampleImages[1]], 
    top: '60%', 
    left: '32%'
  },
  {
    id: 'staff',
    name_uz: "Xodimlar binosi",
    name_ru: "Здание для сотрудников",
    name_en: "Staff Building",
    type: 'staff',
    floors: 5,
    desc_uz: "Ma'muriy xodimlar va o'qituvchilar uchun xizmat binosi.",
    desc_ru: "Служебное здание для административного персонала и преподавателей.",
    desc_en: "Service building for administrative staff and teachers.",
    images: [sampleImages[0]],
    top: '48%', 
    left: '28%'
  },
  {
    id: 'canteen',
    name_uz: "Oshxona binosi",
    name_ru: "Столовая",
    name_en: "Canteen",
    type: 'canteen',
    floors: 1,
    desc_uz: "Akademiya xodimlari va talabalari uchun markaziy oshxona.",
    desc_ru: "Центральная столовая для сотрудников и студентов академии.",
    desc_en: "Central canteen for academy staff and students.",
    images: [sampleImages[2], sampleImages[0]],
    top: '32%', 
    left: '50%'
  },
  {
    id: 'construction',
    name_uz: "Qurilish jarayonida",
    name_ru: "В процессе строительства",
    name_en: "Under Construction",
    type: 'construction',
    floors: 0,
    desc_uz: "Ushbu hududda yangi o'quv va sport majmuasi qurilishi olib borilmoqda.",
    desc_ru: "На этой территории ведется строительство нового учебного и спортивного комплекса.",
    desc_en: "Construction of a new educational and sports complex is underway in this area.",
    images: [], 
    top: '48%', 
    left: '58%'
  },
  {
    id: 'dorm_2',
    name_uz: "2-yotoqxona",
    name_ru: "Общежитие №2",
    name_en: "Dormitory №2",
    type: 'dorm',
    floors: 4,
    desc_uz: "Tinglovchilar va talabalar uchun qo'shimcha yashash binosi.",
    desc_ru: "Дополнительное жилое здание для слушателей и студентов.",
    desc_en: "Additional residential building for trainees and students.",
    images: [sampleImages[1]],
    top: '32%', 
    left: '74%'
  },
  {
    id: 'dorm_1',
    name_uz: "1-yotoqxona",
    name_ru: "Общежитие №1",
    name_en: "Dormitory №1",
    type: 'dorm',
    floors: 4,
    desc_uz: "Tinglovchilar va talabalar uchun asosiy yashash binosi.",
    desc_ru: "Основное жилое здание для слушателей и студентов.",
    desc_en: "Main residential building for trainees and students.",
    images: [sampleImages[1], sampleImages[2]],
    top: '22%', 
    left: '82%'
  },
];

const getBuildingIcon = (type) => {
  switch (type) {
    case 'study': return <FaBuilding className="text-amber-400" />;
    case 'dorm': return <FaBed className="text-blue-400" />;
    case 'canteen': return <FaUtensils className="text-emerald-400" />;
    case 'staff': return <FaUserTie className="text-purple-400" />;
    case 'construction': return <FaTools className="text-slate-400" />;
    default: return <FaBuilding className="text-gray-400" />;
  }
};

// ─────────────────────────────────────────────
// 2. MODAL OYNASI (MUKAMMAL GALEREYA BILAN)
// ─────────────────────────────────────────────
const BuildingModal = ({ building, onClose, language }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Boshqa binoga o'tilganda rasm indeksini nolga tushirish
  useEffect(() => {
    setActiveIndex(0);
    setIsFullscreen(false);
  }, [building]);

  if (!building) return null;

  const name = building[`name_${language}`] || building.name_uz;
  const desc = building[`desc_${language}`] || building.desc_uz;
  const floorText = language === 'ru' ? 'этажей' : language === 'en' ? 'floors' : 'qavat';
  const images = building.images || [];

  // Keyingi va oldingi rasmga o'tish funksiyalari
  const nextImage = () => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-[10000]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* TO'LIQ EKRAN (FULLSCREEN) RASM REJIMI */}
      {isFullscreen ? (
        <div 
          className="fixed inset-0 z-[10001] bg-black flex items-center justify-center"
          onClick={() => setIsFullscreen(false)} // Ekranni bosganda yopiladi
        >
          {/* Yopish tugmasi */}
          <button 
            className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-red-500/50 rounded-2xl flex items-center justify-center transition-all text-white z-50 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Chapga o'tish */}
          {images.length > 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all cursor-pointer z-50"
            >
              <FaChevronLeft className="text-3xl pr-1" />
            </button>
          )}

          {/* Asosiy Rasm (Kesilmasligi uchun object-contain qilingan) */}
          <img 
            src={images[activeIndex]} 
            alt={name} 
            className="w-full h-full object-contain p-4 md:p-12 animate-fade-in"
            onClick={(e) => e.stopPropagation()} // Rasmni o'zini bosganda yopilib ketmasligi uchun
          />

          {/* O'ngga o'tish */}
          {images.length > 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all cursor-pointer z-50"
            >
              <FaChevronRight className="text-3xl pl-1" />
            </button>
          )}
          
          {/* Rasm sanog'i */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-6 py-2 rounded-full text-white font-bold tracking-widest">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      ) : (

      /* STANDART MODAL OYNASI */
      <div 
        className="relative w-full max-w-6xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-red-500/30 border border-white/10 rounded-2xl flex items-center justify-center transition-all cursor-pointer z-50"
        >
          <FaTimes className="text-white text-xl" />
        </button>

        {/* CHAP QISM: Rasmlar galereyasi */}
        <div className="w-full md:w-2/3 p-3 flex flex-col gap-3 h-[45vh] md:h-auto overflow-hidden">
          {images.length > 0 ? (
            <>
              {/* Asosiy ko'rinib turgan rasm */}
              <div 
                className="flex-1 rounded-2xl overflow-hidden relative bg-slate-800 cursor-pointer group"
                onClick={() => setIsFullscreen(true)}
              >
                <img 
                  src={images[activeIndex]} 
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Kattalashtirish effekti (Hover bo'lganda) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-blue-600/90 p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                    <FaExpand className="text-white text-3xl" />
                  </div>
                </div>
              </div>

              {/* Gorizontal skroll bo'ladigan kichik rasmlar ro'yxati */}
              {images.length > 1 && (
                <div className="flex gap-2.5 h-24 md:h-28 shrink-0 overflow-x-auto custom-scrollbar pb-2 px-1">
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveIndex(idx)}
                      className={`rounded-xl overflow-hidden relative bg-slate-800 cursor-pointer shrink-0 w-32 md:w-40 border-2 transition-all duration-300 ${
                        activeIndex === idx 
                        ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-105' 
                        : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                       <img 
                        src={img} 
                        alt={`thumbnail ${idx}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 flex-col gap-4 border border-white/5">
              {getBuildingIcon(building.type)}
              <span className="font-bold text-sm uppercase tracking-widest text-slate-400">Rasm mavjud emas</span>
            </div>
          )}
        </div>

        {/* O'NG QISM: Ma'lumotlar */}
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar border-t md:border-t-0 md:border-l border-white/10 bg-slate-950/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-3xl shadow-inner">
              {getBuildingIcon(building.type)}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider leading-tight">{name}</h2>
              {building.floors > 0 && (
                <div className="flex items-center gap-2 mt-2 text-blue-300 font-bold bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded-full text-xs w-fit">
                  <FaLayerGroup /> {building.floors} {floorText}
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

          <h3 className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-3">Bino haqida ma'lumot</h3>
          <p className="text-base text-gray-200 leading-relaxed font-medium">{desc}</p>
        </div>
      </div>
      )}
    </div>,
    document.body
  );
};

// ─────────────────────────────────────────────
// 3. ASOSIY XARITA
// ─────────────────────────────────────────────
const Map = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const mapTitle = language === 'ru' ? 'Интерактивная карта' : language === 'en' ? 'Interactive Map' : 'Interaktiv xarita';

  return (
    <div className="h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white font-sans">
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#010309] z-0 pointer-events-none" />

      <BuildingModal 
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
        language={language}
      />

      <div className="relative z-10 flex items-center justify-between p-4 md:p-5 bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-lg shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 bg-white/10 border border-white/20 text-white px-5 py-3.5 rounded-2xl hover:bg-white/20 active:scale-95 transition-all font-bold uppercase text-sm cursor-pointer shadow-md"
        >
          <FaArrowLeft className="text-base" /> {t('back_btn')}
        </button>

        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-widest flex items-center gap-3 shrink-0 drop-shadow-md">
          <FaMapMarkedAlt className="text-blue-400 text-3xl" /> {mapTitle}
        </h1>
      </div>

      <div className="relative z-0 flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden w-full">
        
        <div className="relative w-full max-w-7xl aspect-[16/10] bg-slate-800 rounded-3xl border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <img 
            src="/academy_map.jpg" 
            alt="Academy Map"
            className="absolute inset-0 w-full h-full object-cover" 
          />
          
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0px] pointer-events-none"></div>

          {academyBuildings.map(building => (
            <div
              key={building.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
              style={{ top: building.top, left: building.left }}
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/50 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <button
                onClick={() => setSelectedBuilding(building)}
                className="relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-900/90 border-2 border-white/30 hover:border-blue-400 hover:bg-blue-600/90 transition-all duration-300 flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.6)] group-hover:scale-110 active:scale-95 cursor-pointer z-30"
              >
                <div className="text-lg md:text-2xl group-hover:text-white transition-colors">
                  {getBuildingIcon(building.type)}
                </div>
              </button>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2.5 bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 shadow-2xl pointer-events-none z-40">
                <p className="text-xs md:text-sm font-black text-white uppercase tracking-wider drop-shadow-md">
                  {building[`name_${language}`] || building.name_uz}
                </p>
                {building.floors > 0 && (
                  <p className="text-[10px] md:text-xs text-blue-300 font-bold text-center mt-1">
                    {building.floors} qavat
                  </p>
                )}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-x-6 border-x-transparent border-t-6 border-t-white/20"></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-x-6 border-x-transparent border-t-6 border-t-slate-800/95"></div>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Map;