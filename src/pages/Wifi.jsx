import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaWifi, FaLock, FaUserGraduate, FaUserTie, FaUsers } from 'react-icons/fa';
import qrPlaceholder from '../assets/logo.png'; // Agar tayyor QR rasm bo'lmasa, hozircha logo turadi

const Wifi = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Wi-Fi tarmoqlari ro'yxati (o'zingizning ma'lumotlaringiz bilan almashtirishingiz mumkin)
  const wifiNetworks = [
    { 
      id: 'staff', 
      name: 'XODIMLAR', 
      desc: 'Akademiya xodimlari uchun',
      icon: <FaUserTie />, 
      password: 'staff_password_1',
      qr: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=WIFI:S:Akademiya_Xodim;T:WPA;P:staff_password_1;;' 
    },
    { 
      id: 'conference', 
      name: 'KONFERENSIYA', 
      desc: 'Mehmonlar va qatnashuvchilar uchun',
      icon: <FaUsers />, 
      password: 'guest_password_2',
      qr: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=WIFI:S:Conference;T:WPA;P:guest_password_2;;' 
    },
    { 
      id: 'students', 
      name: 'TALABALAR', 
      desc: 'Bakalavr va magistrlar uchun',
      icon: <FaUserGraduate />, 
      password: 'student_password_3',
      qr: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=WIFI:S:Talabalar;T:WPA;P:student_password_3;;' 
    },
  ];

  const [activeWifi, setActiveWifi] = useState(wifiNetworks[0]);

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      
      {/* ORQA FON */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 z-0 pointer-events-none"></div>

      {/* HEADER QISMI */}
      <div className="relative z-50 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg shrink-0">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ASOSIY MENYU"}
        </button>
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-3 mt-4 md:mt-0">
          <FaWifi className="text-blue-400 text-2xl md:text-4xl" /> WI-FI TARMOQLARI
        </h1>
      </div>

      {/* ASOSIY KONTENT */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* 1. CHAP TOMON - TARMOQLAR RO'YXATI */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-slate-900/50 backdrop-blur-md border-r border-white/10 p-4 md:p-8 flex flex-col gap-4 overflow-y-auto custom-scrollbar shrink-0">
          
          <h2 className="text-gray-400 font-bold uppercase tracking-widest mb-2 text-sm md:text-base px-2">
            Tarmoqni tanlang
          </h2>

          {wifiNetworks.map((wifi) => {
            const isActive = activeWifi.id === wifi.id;
            return (
              <button
                key={wifi.id}
                onClick={() => setActiveWifi(wifi)}
                // MUHIM O'ZGARISH: Bu yerda p-4 va rounded-2xl orqali chap tomon ham chiroyli yopiladi
                className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  isActive 
                    ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                    : 'bg-slate-800/50 border-white/5 hover:bg-slate-700/50 hover:border-white/20'
                }`}
              >
                {/* Ikonka */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'
                }`}>
                  {wifi.icon}
                </div>
                
                {/* Matn */}
                <div className="flex flex-col">
                  <span className={`font-black text-lg md:text-xl uppercase tracking-wider ${isActive ? 'text-blue-400' : 'text-gray-200'}`}>
                    {wifi.name}
                  </span>
                  <span className="text-xs md:text-sm text-gray-400 font-medium">
                    {wifi.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. O'NG TOMON - QR KOD VA MA'LUMOT */}
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          
          <div className="absolute inset-0 bg-slate-900/80"></div>

          <div className="relative z-10 w-full max-w-lg flex flex-col items-center animate-fade-in-up">
            
            {/* Oq fonli QR kod kartochkasi */}
            <div className="bg-white p-6 md:p-8 rounded-[40px] shadow-2xl flex flex-col items-center w-full">
              
              <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner">
                <FaWifi />
              </div>

              {/* QR Code rasmi (API orqali avtomatik yasaladi) */}
              <div className="w-56 h-56 md:w-64 md:h-64 bg-gray-100 rounded-2xl p-2 mb-6 border-4 border-gray-100 shadow-md">
                <img 
                  src={activeWifi.qr} 
                  alt="QR Code" 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-wider text-center mb-2">
                {activeWifi.name}
              </h2>
              <p className="text-gray-500 font-medium text-center mb-8">
                {activeWifi.desc}
              </p>

              {/* Parol ko'rsatiladigan qism */}
              <div className="w-full bg-slate-100 rounded-2xl p-4 flex items-center justify-between border border-slate-200">
                <div className="flex items-center gap-3 text-slate-500">
                  <FaLock className="text-xl" />
                  <span className="font-bold uppercase text-xs tracking-widest">Parol</span>
                </div>
                <span className="font-mono text-lg md:text-xl font-bold text-slate-800 tracking-wider">
                  {activeWifi.password}
                </span>
              </div>
              
              <div className="mt-6 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                Ulanish uchun kamerani qarating
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wifi;