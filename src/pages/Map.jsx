import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { createPortal } from 'react-dom';
import { 
  FaArrowLeft, FaMapMarkedAlt, FaBuilding, FaBed, 
  FaUtensils, FaUserTie, FaTimes, FaLayerGroup 
} from 'react-icons/fa';

// ─────────────────────────────────────────────
// 1. STATIC MA'LUMOTLAR (Backend yo'qligi uchun)
// ─────────────────────────────────────────────
// Bu yerda akademiyadagi binolar haqida ma'lumotlar saqlanadi.
// Kelajakda bu ma'lumotlar API orqali kelishi kerak.

const sampleImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600", // Namunaviy o'quv bino
  "https://images.unsplash.com/photo-1557426165-276709f4e2f3?q=80&w=600", // Namunaviy yotoqxona
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600", // Namunaviy oshxona
];

const academyBuildings = [
  {
    id: 'study_a',
    name_uz: "O'quv binosi (A blok)",
    name_ru: "Учебный корпус (Блок А)",
    name_en: "Study Building (Block A)",
    type: 'study',
    floors: 4,
    desc_uz: "Asosiy ma'ruzalar zallari va kafedralar joylashgan bino.",
    desc_ru: "Здание, где расположены основные лекционные залы и кафедры.",
    desc_en: "Building housing main lecture halls and departments.",
    // Rasmlar massivi. Hozircha internetdan olingan namunalar.
    // Kelajakda bular backenddan kelgan haqiqiy rasmlar URL manzili bo'ladi.
    images: [sampleImages[0], sampleImages[1]], 
    // Image Map koordinatalari (X, Y nuqtasi foizda).
    // Bu nuqtalar image_10.png loyiha rasmida taxminan qayerda joylashganini ko'rsatadi.
    top: '35%', 
    left: '28%'
  },
  {
    id: 'study_b',
    name_uz: "O'quv binosi (B blok)",
    name_ru: "Учебный корпус (Блок Б)",
    name_en: "Study Building (Block B)",
    type: 'study',
    floors: 2,
    desc_uz: "Amaliy mashg'ulotlar va laboratoriya xonalari.",
    desc_ru: "Помещения для практических занятий и лабораторий.",
    desc_en: "Rooms for practical classes and laboratories.",
    images: [sampleImages[0]],
    top: '55%', 
    left: '52%'
  },
  {
    id: 'dorm_1',
    name_uz: "Yotoqxona №1",
    name_ru: "Общежитие №1",
    name_en: "Dormitory №1",
    type: 'dorm',
    floors: 4,
    desc_uz: "Tinglovchilar va talabalar uchun yashash binosi.",
    desc_ru: "Жилое здание для слушателей и студентов.",
    desc_en: "Residential building for trainees and students.",
    images: [sampleImages[1], sampleImages[2]],
    top: '25%', 
    left: '73%'
  },
  {
    id: 'dorm_2',
    name_uz: "Yotoqxona №2",
    name_ru: "Общежитие №2",
    name_en: "Dormitory №2",
    type: 'dorm',
    floors: 4,
    desc_uz: "Qo'shimcha turar-joy binosi.",
    desc_ru: "Дополнительное жилое здание.",
    desc_en: "Additional residential building.",
    images: [sampleImages[1]],
    top: '40%', 
    left: '60%'
  },
  {
    id: 'canteen',
    name_uz: "Oshxona",
    name_ru: "Столовая",
    name_en: "Canteen",
    type: 'canteen',
    floors: 1,
    desc_uz: "Akademiya xodimlari va talabalari uchun markaziy oshxona.",
    desc_ru: "Центральная столовая для сотрудников и студентов академии.",
    desc_en: "Central canteen for academy staff and students.",
    images: [sampleImages[2], sampleImages[0]],
    top: '48%', 
    left: '42%'
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
    top: '65%', 
    left: '20%'
  },
];

const getBuildingIcon = (type) => {
  switch (type) {
    case 'study': return <FaBuilding className="text-amber-400" />;
    case 'dorm': return <FaBed className="text-blue-400" />;
    case 'canteen': return <FaUtensils className="text-emerald-400" />;
    case 'staff': return <FaUserTie className="text-purple-400" />;
    default: return <FaBuilding className="text-gray-400" />;
  }
};

// ─────────────────────────────────────────────
// 2. MODAL OYNASI (createPortal orqali)
// ─────────────────────────────────────────────
// Bino bosilganda chiqadigan ma'lumotlar oynasi.

const BuildingModal = ({ building, onClose, language }) => {
  if (!building) return null;

  // Tildan kelib chiqib matnlarni tanlash
  const name = building[`name_${language}`] || building.name_uz;
  const desc = building[`desc_${language}`] || building.desc_uz;
  const floorText = language === 'ru' ? 'этажей' : language === 'en' ? 'floors' : 'qavat';

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-[10000]"
      onClick={onClose}
    >
      {/* Orqa fonni xiralashtirish */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal konteyneri */}
      <div 
        className="relative w-full max-w-6xl bg-slate-900 border border-white/10 rounded-3xl shadow-3xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
        onClick={e => e.stopPropagation()} // Ichkarini bosganda modal yopilmasligi uchun
      >
        {/* Yopish tugmasi */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-red-500/30 border border-white/10 rounded-2xl flex items-center justify-center transition-all cursor-pointer z-50"
        >
          <FaTimes className="text-white text-xl" />
        </button>

        {/* CHAP QISM: Rasmlar galereyasi */}
        <div className="w-full md:w-2/3 p-3 flex flex-col gap-3 h-[40vh] md:h-auto overflow-hidden">
          {building.images && building.images.length > 0 ? (
            <>
              {/* Asosiy katta rasm */}
              <div className="flex-1 rounded-2xl overflow-hidden relative">
                <img 
                  src={building.images[0]} 
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {/* Kichik rasmlar (thumbnails) */}
              {building.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 h-20 md:h-28 shrink-0">
                  {building.images.slice(1).map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden relative">
                       <img 
                        src={img} 
                        alt={`${name} thumbnail`}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-600 flex-col gap-4">
              <FaBuilding className="text-9xl" />
              <span className="font-bold text-sm uppercase tracking-widest">Rasm mavjud emas</span>
            </div>
          )}
        </div>

        {/* O'NG QISM: Ma'lumotlar */}
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar border-t md:border-t-0 md:border-l border-white/10 bg-slate-950/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-3xl">
              {getBuildingIcon(building.type)}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider leading-tight">{name}</h2>
              <div className="flex items-center gap-2 mt-1.5 text-blue-300 font-bold bg-blue-900/50 px-3 py-1 rounded-full text-xs w-fit">
                <FaLayerGroup /> {building.floors} {floorText}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

          <h3 className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Bino haqida tavsif</h3>
          <p className="text-base text-gray-200 leading-relaxed font-medium">{desc}</p>
        </div>
      </div>
    </div>,
    document.body // Modalni bodyga bog'lash (overflow:hidden muammosini oldini olish)
  );
};

// ─────────────────────────────────────────────
// 3. ASOSIY XARITA COMPONENTI
// ─────────────────────────────────────────────

const Map = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  // Tildan kelib chiqib sarlavhani tanlash
  const mapTitle = language === 'ru' ? 'Интерактивная карта' : language === 'en' ? 'Interactive Map' : 'Interaktiv xarita';

  return (
    <div className="h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white font-sans">
      
      {/* 3D orqa fon effekti */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#010309] z-0 pointer-events-none" />

      {/* MODAL OYNASI */}
      <BuildingModal 
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
        language={language}
      />

      {/* HEADER (Yuqori qism) */}
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

      {/* ASOSIY QISM: XARITA TASVIRI VA NUQTALAR */}
      <div className="relative z-0 flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        
        {/* Xarita konteyneri */}
        <div className="relative w-auto h-auto max-w-full max-h-full rounded-3xl border-4 border-white/10 shadow-3xl overflow-hidden aspect-[16/10]">
          
          {/* Asosiy xarita tasviri (public papkadagi academy_map.png) */}
          <img 
            src="/academy_map.png" 
            alt="Academy Map"
            className="w-full h-full object-cover scale-100" 
          />
          
          {/* Tasvir ustidagi qoramtir effekt (nuqtalar ko'rinishi uchun) */}
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[0.5px]"></div>

          {/* BINOLARNI KO'RSATUVCHI DOIRALAR (Hotspots) */}
          {academyBuildings.map(building => (
            <div
              key={building.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
              style={{ top: building.top, left: building.left }}
            >
              {/* Pulsatsiyalanuvchi aura effekti */}
              <div className="absolute inset-0 rounded-full bg-blue-500/60 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Asosiy chiquvchi nuqta (tugma) */}
              <button
                onClick={() => setSelectedBuilding(building)}
                className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-900/90 border-4 border-white/20 hover:border-blue-500 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 active:scale-95 cursor-pointer z-30"
              >
                {/* Bino turiga qarab ikonka */}
                <div className="text-xl md:text-3xl group-hover:text-white transition-colors group-hover:animate-pulse">
                  {getBuildingIcon(building.type)}
                </div>
              </button>

              {/* Nuqta ustidagi yozuv (Bino nomi) */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-slate-800/90 backdrop-blur-sm border border-white/10 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 shadow-xl pointer-events-none z-40">
                <p className="text-sm font-black text-white uppercase tracking-wider">{building[`name_${language}`] || building.name_uz}</p>
                <p className="text-xs text-blue-300 font-bold text-center mt-1">{building.floors} qavat</p>
                {/* Pastga qaragan uchburchak effekt */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-x-8 border-x-transparent border-t-8 border-t-slate-800/90"></div>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Map;