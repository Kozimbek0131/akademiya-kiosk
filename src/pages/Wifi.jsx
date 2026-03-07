import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaWifi, FaLock, FaUserGraduate, FaUserTie, FaUsers, FaQrcode } from 'react-icons/fa';

const Wifi = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Wi-Fi tarmoqlari ro'yxati
  const wifiNetworks = [
    { 
      id: 'staff', 
      name: 'XODIMLAR', 
      desc: 'Akademiya xodimlari uchun',
      icon: <FaUserTie />, 
      password: 'staff_password_1',
      qr: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WIFI:S:Akademiya_Xodim;T:WPA;P:staff_password_1;;' 
    },
    { 
      id: 'conference', 
      name: 'KONFERENSIYA', 
      desc: 'Mehmonlar uchun',
      icon: <FaUsers />, 
      password: 'guest_password_2',
      qr: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WIFI:S:Conference;T:WPA;P:guest_password_2;;' 
    },
    { 
      id: 'students', 
      name: 'TALABALAR', 
      desc: 'Bakalavr va magistrlar',
      icon: <FaUserGraduate />, 
      password: 'student_password_3',
      qr: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WIFI:S:Talabalar;T:WPA;P:student_password_3;;' 
    },
  ];

  const [activeWifi, setActiveWifi] = useState(wifiNetworks[0]);

  return (
    <div className="h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white font-sans">
      
      {/* ORQA FON */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-950 z-0 pointer-events-none"></div>
      
      {/* Orqa fonda katta xira Wi-Fi belgisi */}
      <FaWifi className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] text-blue-500/5 z-0 pointer-events-none" />

      {/* 1. HEADER QISMI */}
      <div className="relative z-50 flex items-center justify-between p-6 bg-slate-900/50 backdrop-blur-xl border-b border-white/10 shadow-lg shrink-0">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-lg font-bold uppercase cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ASOSIY MENYU"}
        </button>
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <FaWifi className="text-blue-400" /> WI-FI TARMOQLARI
        </h1>
      </div>

      {/* 2. O'RTA QISM - QR KOD VA MA'LUMOT (Ekranning asosiy qismini egallaydi) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 w-full max-w-2xl mx-auto h-full pb-10">
        
        {/* Oq fonli QR kod kartochkasi */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col items-center w-full animate-fade-in-up border border-white/20">
          
          <div className="bg-blue-50 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner ring-8 ring-blue-50/50">
            <FaQrcode />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-800 uppercase tracking-wider text-center mb-3">
            {activeWifi.name}
          </h2>
          <p className="text-gray-500 font-bold text-lg md:text-xl text-center mb-10">
            {activeWifi.desc}
          </p>

          {/* QR Code rasmi (API orqali avtomatik yasaladi) */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-3xl p-4 mb-10 border-4 border-slate-100 shadow-xl relative group">
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl group-hover:bg-blue-500/0 transition-colors"></div>
            <img 
              src={activeWifi.qr} 
              alt="QR Code" 
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Skaner chizig'i (animatsiya) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan"></div>
          </div>

          {/* Parol ko'rsatiladigan qism */}
          <div className="w-full bg-slate-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between border-2 border-slate-200 gap-4">
            <div className="flex items-center gap-3 text-slate-500">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                 <FaLock className="text-xl text-slate-400" />
              </div>
              <span className="font-bold uppercase text-sm tracking-widest">Tarmoq paroli:</span>
            </div>
            <span className="font-mono text-2xl md:text-3xl font-black text-blue-600 tracking-wider bg-white px-6 py-2 rounded-2xl shadow-sm">
              {activeWifi.password}
            </span>
          </div>
          
          <div className="mt-8 text-center text-gray-400 text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
             <span className="w-8 h-[1px] bg-gray-300"></span>
             Ulanish uchun kamerani qarating
             <span className="w-8 h-[1px] bg-gray-300"></span>
          </div>

        </div>
      </div>

      {/* 3. PASTKI QISM - TARMOQLARNI TANLASH (Qo'l yetadigan joyda) */}
      <div className="relative z-20 w-full bg-slate-900 border-t border-white/10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col p-6 md:p-8">
        
        <h2 className="text-gray-400 font-bold uppercase tracking-[0.2em] mb-6 text-sm md:text-base text-center w-full">
          Qaysi tarmoqqa ulanmoqchisiz?
        </h2>

        {/* 3 ta tugmani yonma-yon (Grid) qilib joylashtiramiz */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl mx-auto pb-4">
          {wifiNetworks.map((wifi) => {
            const isActive = activeWifi.id === wifi.id;
            return (
              <button
                key={wifi.id}
                onClick={() => setActiveWifi(wifi)}
                className={`flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-[2rem] border-2 transition-all cursor-pointer text-center group active:scale-95 ${
                  isActive 
                    ? 'bg-blue-600 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.4)] transform -translate-y-2' 
                    : 'bg-slate-800/80 border-white/5 hover:bg-slate-700 hover:border-white/20'
                }`}
              >
                {/* Ikonka */}
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shrink-0 transition-colors shadow-lg ${
                  isActive ? 'bg-white text-blue-600' : 'bg-slate-900 text-gray-400 group-hover:text-white group-hover:bg-slate-600'
                }`}>
                  {wifi.icon}
                </div>
                
                {/* Matn */}
                <div className="flex flex-col mt-2">
                  <span className={`font-black text-lg md:text-2xl uppercase tracking-wider mb-1 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {wifi.name}
                  </span>
                  <span className={`text-[10px] md:text-sm font-medium px-2 leading-tight line-clamp-2 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                    {wifi.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Wifi;