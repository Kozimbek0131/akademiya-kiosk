import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { createPortal } from 'react-dom';
import { 
  FaArrowLeft, FaMapMarkedAlt, FaBuilding, FaBed, 
  FaUtensils, FaUserTie, FaTimes, FaLayerGroup, FaTools,
  FaExpand, FaChevronLeft, FaChevronRight, FaMapMarkerAlt,
  FaPlus, FaMinus, FaCloudSun, FaRoute, FaTimesCircle
} from 'react-icons/fa';

// ─────────────────────────────────────────────
// 1. KIOSK LOKATSIYASI VA BINOLAR BAZASI
// ─────────────────────────────────────────────
// Diqqat: Siz ko'rsatgan qizil aylanaga asosan joylandi!
const KIOSK_LOCATION = { top: '59%', left: '28%' }; 

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
    top: '74%', left: '14%'  
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
    images: [sampleImages[0], sampleImages[1], sampleImages[2], sampleImages[0], sampleImages[1]], 
    top: '68%', left: '30%'  
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
    top: '51%', left: '25%'  
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
    top: '33%', left: '49%'  
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
    top: '50%', left: '57%'  
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
    top: '37%', left: '71%'  
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
    top: '24%', left: '81%'  
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
// 2. MODAL OYNASI (Yo'nalish chizish funksiyasi bilan)
// ─────────────────────────────────────────────
const BuildingModal = ({ building, onClose, language, onDrawRoute }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setIsFullscreen(false);
  }, [building]);

  if (!building) return null;

  const name = building[`name_${language}`] || building.name_uz;
  const desc = building[`desc_${language}`] || building.desc_uz;
  const floorText = language === 'ru' ? 'этажей' : language === 'en' ? 'floors' : 'qavat';
  const images = building.images || [];

  const nextImage = () => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[10000]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {isFullscreen ? (
        <div className="fixed inset-0 z-[10001] bg-black flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
          <button className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-red-500/50 rounded-2xl flex items-center justify-center transition-all text-white z-50 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}>
            <FaTimes className="text-2xl" />
          </button>
          {images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all cursor-pointer z-50">
              <FaChevronLeft className="text-3xl pr-1" />
            </button>
          )}
          <img src={images[activeIndex]} alt={name} className="w-full h-full object-contain p-4 md:p-12 animate-fade-in" onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all cursor-pointer z-50">
              <FaChevronRight className="text-3xl pl-1" />
            </button>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-6 py-2 rounded-full text-white font-bold tracking-widest">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      ) : (
      <div className="relative w-full max-w-6xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-red-500/30 border border-white/10 rounded-2xl flex items-center justify-center transition-all cursor-pointer z-50">
          <FaTimes className="text-white text-xl" />
        </button>

        <div className="w-full md:w-2/3 p-3 flex flex-col gap-3 h-[45vh] md:h-auto overflow-hidden">
          {images.length > 0 ? (
            <>
              <div className="flex-1 rounded-2xl overflow-hidden relative bg-slate-800 cursor-pointer group" onClick={() => setIsFullscreen(true)}>
                <img src={images[activeIndex]} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-blue-600/90 p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform"><FaExpand className="text-white text-3xl" /></div>
                </div>
              </div>
              {images.length > 1 && (
                <div className="flex gap-2.5 h-24 md:h-28 shrink-0 overflow-x-auto custom-scrollbar pb-2 px-1">
                  {images.map((img, idx) => (
                    <div key={idx} onClick={() => setActiveIndex(idx)} className={`rounded-xl overflow-hidden relative bg-slate-800 cursor-pointer shrink-0 w-32 md:w-40 border-2 transition-all duration-300 ${activeIndex === idx ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                       <img src={img} alt={`thumbnail ${idx}`} className="absolute inset-0 w-full h-full object-cover" />
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

        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar border-t md:border-t-0 md:border-l border-white/10 bg-slate-950/30">
          <div className="flex items-center gap-4 mb-6 pr-10">
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
          <p className="text-base text-gray-200 leading-relaxed font-medium mb-6">{desc}</p>
          
          <div className="mt-auto pt-4">
             <button 
                onClick={() => onDrawRoute(building)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 cursor-pointer"
             >
                <FaRoute className="text-2xl" /> Yo'nalishni ko'rsatish
             </button>
          </div>
        </div>
      </div>
      )}
    </div>,
    document.body
  );
};

// ─────────────────────────────────────────────
// 3. ASOSIY XARITA COMPONENTI
// ─────────────────────────────────────────────
const Map = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [destination, setDestination] = useState(null);

  // Drag-to-pan (sudrash) uchun state va ref'lar
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  const mapTitle = language === 'ru' ? 'Интерактивная карта' : language === 'en' ? 'Interactive Map' : 'Interaktiv xarita';

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes dash { to { stroke-dashoffset: -20; } }
      .route-line { stroke-dasharray: 10; animation: dash 1s linear infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 1));

  const drawRoute = (building) => {
    setDestination(building);
    setSelectedBuilding(null); 
  };

  // ──────── SUDRASH (PAN) FUNKSIYALARI ────────
  const startDrag = (e) => {
    setIsDragging(true);
    const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const pageY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
    setStartPos({
      x: pageX,
      y: pageY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
    });
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const pageY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
    
    const walkX = (pageX - startPos.x) * 1.5; // Sudrash tezligi
    const walkY = (pageY - startPos.y) * 1.5;
    
    containerRef.current.scrollLeft = startPos.scrollLeft - walkX;
    containerRef.current.scrollTop = startPos.scrollTop - walkY;
  };

  return (
    <div className="w-screen h-screen relative bg-slate-950 overflow-hidden select-none text-white font-sans">
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#010309] z-0 pointer-events-none" />

      <BuildingModal 
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
        language={language}
        onDrawRoute={drawRoute}
      />

      {/* OVERLAYS (Tugmalar va Vidjetlar) - Z-index baland tushishi uchun tepada turibdi */}
      <div className="absolute top-0 left-0 right-0 p-5 md:p-8 flex justify-between items-start z-50 pointer-events-none">
        <button
          onClick={() => navigate('/')}
          className="pointer-events-auto flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-white/20 text-white px-5 py-3.5 rounded-2xl hover:bg-white/20 active:scale-95 transition-all font-bold uppercase text-sm cursor-pointer shadow-xl"
        >
          <FaArrowLeft className="text-base" /> {t('back_btn')}
        </button>

        {destination && (
           <button
             onClick={() => setDestination(null)}
             className="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-600/90 backdrop-blur-md border border-red-400 text-white px-6 py-3.5 rounded-2xl hover:bg-red-500 active:scale-95 transition-all font-black uppercase text-sm cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-fade-in-down"
           >
             <FaTimesCircle className="text-lg" /> Yo'nalishni bekor qilish
           </button>
        )}
      </div>

      <div className="absolute top-5 md:top-8 right-5 md:right-8 z-50 pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-xl">
         <FaCloudSun className="text-amber-400 text-3xl md:text-4xl drop-shadow-md" />
         <div className="flex flex-col">
            <span className="text-[10px] md:text-xs text-slate-300 font-bold uppercase tracking-wider">Toshkent</span>
            <span className="text-base md:text-lg font-black text-white">+18°C</span>
         </div>
      </div>

      <div className="absolute bottom-5 md:bottom-8 left-5 md:left-8 z-50 pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-white/20 p-4 md:p-5 rounded-2xl shadow-xl flex flex-col gap-3 w-48 md:w-56">
         <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 border-b border-white/10 pb-2">Shartli belgilar</p>
         <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-300"><FaBuilding className="text-amber-400 text-lg" /> O'quv binolari</div>
         <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-300"><FaBed className="text-blue-400 text-lg" /> Yotoqxonalar</div>
         <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-300"><FaUtensils className="text-emerald-400 text-lg" /> Oshxona</div>
         <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-gray-300"><FaUserTie className="text-purple-400 text-lg" /> Xodimlar binosi</div>
      </div>

      <div className="absolute bottom-5 md:bottom-8 right-5 md:right-8 z-50 pointer-events-auto flex flex-col gap-2">
         <button onClick={handleZoomIn} className="w-12 h-12 md:w-14 md:h-14 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-400 transition-all shadow-xl cursor-pointer active:scale-95">
            <FaPlus className="text-xl" />
         </button>
         <button onClick={handleZoomOut} className="w-12 h-12 md:w-14 md:h-14 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-400 transition-all shadow-xl cursor-pointer active:scale-95">
            <FaMinus className="text-xl" />
         </button>
      </div>


      {/* ─────────────────────────────────────────────
          SUDRALADIGAN (DRAG/PAN) XARITA KONTEYNERI
          ───────────────────────────────────────────── */}
      <div 
        ref={containerRef}
        className={`absolute inset-0 z-10 overflow-auto custom-scrollbar flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={startDrag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={onDrag}
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        onTouchMove={onDrag}
      >
        {/* Rasmni haqiqiy o'lchami bo'yicha kattalashtiruvchi div */}
        <div 
          className="relative transition-all duration-300 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden bg-slate-800 rounded-3xl shrink-0"
          style={{
            width: `${100 * zoom}%`,      // Zoom bo'yicha foizda kattalashadi
            minWidth: `${1400 * zoom}px`, // Eng kamida 1400px bo'ladi
            aspectRatio: '16/10',
          }}
        >
          <img 
            src="/academy_map.jpg" 
            alt="Academy Map"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          />
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0px] pointer-events-none"></div>

          {/* 📍 "SIZ SHU YERDASIZ" PINI */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none" style={KIOSK_LOCATION}>
             <div className="absolute inset-0 rounded-full bg-red-500/60 animate-ping"></div>
             <div className="relative bg-gradient-to-b from-red-500 to-red-700 border-2 border-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.8)]">
                <FaMapMarkerAlt className="text-white text-xl md:text-2xl drop-shadow-md" />
             </div>
             <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] md:text-xs font-black uppercase px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                Siz shu yerdasiz
             </div>
          </div>

          {/* 🚶‍♂️ YO'NALISH CHIZIG'I (Marshrut) */}
          {destination && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-80">
              <line 
                x1={KIOSK_LOCATION.left} 
                y1={KIOSK_LOCATION.top} 
                x2={destination.left} 
                y2={destination.top} 
                stroke="#3b82f6" 
                strokeWidth="6" 
                strokeLinecap="round"
                className="route-line drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
              />
            </svg>
          )}

          {/* BINOLAR IKONKALARI (Hotspots) */}
          {academyBuildings.map(building => (
            <div
              key={building.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-50 pointer-events-auto"
              style={{ top: building.top, left: building.left }}
              // Drag qilinayotganda tasodifiy bosilib ketmasligi uchun:
              onClick={(e) => { if (isDragging) e.stopPropagation(); }} 
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/50 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <button
                onClick={() => !isDragging && setSelectedBuilding(building)}
                className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-900/90 border-2 hover:bg-blue-600/90 transition-all duration-300 flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.6)] group-hover:scale-110 active:scale-95 cursor-pointer ${destination?.id === building.id ? 'border-blue-400 bg-blue-700 animate-pulse' : 'border-white/30 hover:border-blue-400'}`}
              >
                <div className="text-lg md:text-2xl group-hover:text-white transition-colors">
                  {getBuildingIcon(building.type)}
                </div>
              </button>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2.5 bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 shadow-2xl pointer-events-none">
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