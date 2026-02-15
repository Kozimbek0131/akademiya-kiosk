import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaWifi, FaUserTie, FaUserGraduate, FaChalkboardTeacher, FaLock, FaCopy } from 'react-icons/fa';

const Wifi = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 📶 3 TA TARMOQ SOZLAMALARI (Parollarni o'zingiz to'g'irlab qo'ying)
  const networks = [
    {
      id: 'staff',
      ssid: "Akadimiya",       // 1. Xodimlar uchun
      password: "staff_password_1", 
      label: "XODIMLAR",
      desc: "Akademiya xodimlari va o'qituvchilar uchun",
      icon: <FaUserTie />,
      color: "blue"
    },
    {
      id: 'guest',
      ssid: "CONFERENCE",      // 2. Mehmonlar uchun
      password: "guest_password_2",
      label: "KONFERENSIYA",
      desc: "Mehmonlar va tadbir qatnashchilari uchun",
      icon: <FaChalkboardTeacher />,
      color: "amber"
    },
    {
      id: 'student',
      ssid: "talaba_student",  // 3. Talabalar uchun
      password: "student_password_3",
      label: "TALABALAR",
      desc: "Kursantlar va tinglovchilar uchun",
      icon: <FaUserGraduate />,
      color: "green"
    }
  ];

  const [activeNetwork, setActiveNetwork] = useState(networks[1]); // Boshida "CONFERENCE" turadi

  // QR Kod yaratish
  const qrString = `WIFI:T:WPA;S:${activeNetwork.ssid};P:${activeNetwork.password};;`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none">
      
      {/* Orqa fon */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 from-slate-900 via-slate-900 to-${activeNetwork.color}-900/40`}></div>
      
      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-slate-800/50 backdrop-blur-md border-b border-white/10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <FaWifi className={`text-${activeNetwork.color}-500 animate-pulse`} /> 
          WI-FI TARMOQLARI
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 flex gap-8 p-8 overflow-hidden">
        
        {/* 1. CHAP TOMON - TARMOQ TANLASH */}
        <div className="w-1/3 flex flex-col gap-4 justify-center">
          {networks.map((net) => (
            <button
              key={net.id}
              onClick={() => setActiveNetwork(net)}
              className={`group p-6 rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden ${
                activeNetwork.id === net.id
                  ? `bg-${net.color}-600 border-${net.color}-400 shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-105`
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-colors ${
                  activeNetwork.id === net.id ? 'bg-white/20 text-white' : `bg-white/5 text-${net.color}-400`
                }`}>
                  {net.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-black uppercase ${activeNetwork.id === net.id ? 'text-white' : 'text-gray-300'}`}>
                    {net.label}
                  </h3>
                  <p className={`text-xs font-mono mt-1 ${activeNetwork.id === net.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {net.ssid}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 2. O'NG TOMON - QR KOD VA MA'LUMOT */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[3rem] shadow-2xl flex flex-col items-center gap-6 max-w-lg w-full transform transition-all duration-500">
             
             {/* QR Kod */}
             <div className="bg-white p-4 rounded-3xl shadow-lg relative group">
               <img src={qrImageUrl} alt="QR Code" className="w-64 h-64 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" />
               <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 bg-${activeNetwork.color}-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase shadow-lg whitespace-nowrap`}>
                 Skaner qiling
               </div>
             </div>

             {/* Matnli ma'lumotlar */}
             <div className="w-full text-center space-y-4">
               <div>
                 <h2 className="text-3xl font-black text-white mb-1">{activeNetwork.ssid}</h2>
                 <p className="text-gray-400 text-sm">{activeNetwork.desc}</p>
               </div>

               <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between border border-white/10">
                 <div className="flex items-center gap-3">
                   <FaLock className="text-gray-500" />
                   <span className="text-gray-400 text-xs uppercase font-bold">Parol:</span>
                 </div>
                 <span className="text-2xl font-mono text-white font-bold tracking-wider select-all">
                   {activeNetwork.password}
                 </span>
               </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Wifi;