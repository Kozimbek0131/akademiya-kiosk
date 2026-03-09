import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaMapMarkerAlt, FaBuilding, FaDraftingCompass, FaHardHat } from 'react-icons/fa';

// Akademiya qavatlari (placeholder ma'lumot)
const FLOORS = [
  { floor: 5, rooms: ['501','502','503','504','505','506'] },
  { floor: 4, rooms: ['401','402','403','404','405','406','407'] },
  { floor: 3, rooms: ['301','302','303','304','305','306','307','308'] },
  { floor: 2, rooms: ['201','202','203','204','205','206','207','208','209'] },
  { floor: 1, rooms: ['101','102','103','104','105','106','107','108'] },
];

const Map = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [activeFloor, setActiveFloor] = useState(1);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 800);
    return () => clearInterval(interval);
  }, []);

  const labels = {
    title:    { uz: "BINO XARITASI", ru: "КАРТА ЗДАНИЯ", en: "BUILDING MAP" },
    soon:     { uz: "Tez kunda", ru: "Скоро", en: "Coming Soon" },
    floor:    { uz: "Qavat", ru: "Этаж", en: "Floor" },
    working:  { uz: "Ichki xarita ishlab chiqilmoqda...", ru: "Внутренняя карта разрабатывается...", en: "Interior map is being developed..." },
    rooms:    { uz: "xona", ru: "каб.", en: "room" },
    progress: { uz: "Loyihalash jarayonida", ru: "В процессе проектирования", en: "Design in progress" },
  };
  const L = (key) => labels[key]?.[language] || labels[key]?.uz;

  const currentFloor = FLOORS.find(f => f.floor === activeFloor);

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden select-none text-white relative">

      {/* Orqa fon */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 30px,#06b6d4 30px,#06b6d4 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,#06b6d4 30px,#06b6d4 31px)'}}>
        </div>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all font-bold uppercase text-sm cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-widest flex items-center gap-3">
          <FaMapMarkerAlt className="text-cyan-400" />
          {L('title')}
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden p-4 md:p-6 gap-4 md:gap-6">

        {/* CHAP — Qavat tanlash */}
        <div className="w-full md:w-36 flex flex-row md:flex-col gap-2 md:gap-3 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          <p className="hidden md:block text-xs text-slate-400 uppercase tracking-widest font-bold mb-1 text-center">{L('floor')}</p>
          {FLOORS.map(f => (
            <button
              key={f.floor}
              onClick={() => setActiveFloor(f.floor)}
              className={`shrink-0 w-full py-3 md:py-4 px-2 rounded-2xl font-black text-sm md:text-base transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                activeFloor === f.floor
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-800/50 border-white/10 text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              <FaBuilding className={`text-lg ${activeFloor === f.floor ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{f.floor}</span>
              <span className="text-[10px] font-normal opacity-70">{L('floor')}</span>
            </button>
          ))}
        </div>

        {/* O'RTA — Xarita placeholder */}
        <div className="flex-1 bg-slate-800/40 border border-white/10 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center">

          {/* "Ishlanmoqda" animatsiyali overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">

            {/* Animatsiyali blueprint chizgich */}
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-32 h-32 md:w-44 md:h-44 bg-slate-900/80 border-2 border-cyan-500/40 rounded-[2rem] flex items-center justify-center shadow-2xl">
                <FaDraftingCompass className="text-5xl md:text-7xl text-cyan-400/80" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-slate-800 border border-amber-500/50 rounded-full flex items-center justify-center">
                  <FaHardHat className="text-xl text-amber-400" />
                </div>
              </div>
            </div>

            {/* Matn */}
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-white mb-3">
              {L('soon')}
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-md leading-relaxed mb-8">
              {L('working')}
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-sm">
              <div className="flex justify-between text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">
                <span>{L('progress')}</span>
                <span className="text-cyan-400">35%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden border border-white/5">
                <div className="h-full w-[35%] bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Miltillovchi status */}
            <div className="mt-6 flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full bg-cyan-400 transition-opacity duration-300 ${blink ? 'opacity-100' : 'opacity-20'}`}></div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                {language === 'ru' ? 'Разработка активна' : language === 'en' ? 'Development active' : 'Ishlanmoqda'}
              </span>
            </div>
          </div>

          {/* Qavat raqami overlay */}
          <div className="absolute top-4 left-4 bg-slate-900/80 border border-cyan-500/30 rounded-2xl px-4 py-2 flex items-center gap-2">
            <FaBuilding className="text-cyan-400 text-sm" />
            <span className="text-cyan-300 font-black text-sm">{activeFloor}-{L('floor')}</span>
          </div>

          {/* Xonalar soni */}
          <div className="absolute top-4 right-4 bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2">
            <span className="text-slate-400 text-xs font-bold">{currentFloor?.rooms.length} {L('rooms')}</span>
          </div>
        </div>

        {/* O'NG — Xonalar ro'yxati */}
        <div className="w-full md:w-48 bg-slate-800/40 border border-white/10 rounded-3xl p-4 flex flex-col shrink-0 overflow-hidden">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 text-center">
            {activeFloor}-{L('floor')} · {L('rooms')}
          </p>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
              {currentFloor?.rooms.map(room => (
                <div
                  key={room}
                  className="bg-slate-700/50 border border-white/5 rounded-xl py-2 px-1 text-center text-xs font-bold text-slate-400 opacity-60"
                >
                  {room}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-600 text-center mt-3 italic">
            {language === 'ru' ? 'Данные уточняются' : language === 'en' ? 'Data being updated' : "Ma'lumotlar aniqlanmoqda"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Map;