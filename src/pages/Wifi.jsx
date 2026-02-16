import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaWifi, FaUserTie, FaUserGraduate, FaChalkboardTeacher, FaLock } from 'react-icons/fa';

const Wifi = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const networks = [
    {
      id: 'staff',
      ssid: "Akadimiya",
      password: "staff_password_1", 
      label: "XODIMLAR",
      desc: "Xodimlar va o'qituvchilar uchun",
      icon: <FaUserTie />,
      color: "blue"
    },
    {
      id: 'guest',
      ssid: "CONFERENCE",
      password: "guest_password_2",
      label: "KONFERENSIYA",
      desc: "Mehmonlar va qatnashchilar uchun",
      icon: <FaChalkboardTeacher />,
      color: "amber"
    },
    {
      id: 'student',
      ssid: "talaba_student",
      password: "student_password_3",
      label: "TALABALAR",
      desc: "Kursantlar va tinglovchilar uchun",
      icon: <FaUserGraduate />,
      color: "green"
    }
  ];

  const [activeNetwork, setActiveNetwork] = useState(networks[1]);

  const qrString = `WIFI:T:WPA;S:${activeNetwork.ssid};P:${activeNetwork.password};;`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    // O'ZGARISH: h-screen (ekran bo'yi) va overflow-hidden (sahifa qotiriladi)
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      
      {/* Orqa fon (Fixed position) */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 from-slate-900 via-slate-900 to-${activeNetwork.color}-900/40 z-0 pointer-events-none`}></div>
      
      {/* HEADER (Qotirilgan - Balandligi o'zgarmaydi) */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/50 backdrop-blur-md border-b border-white/10 gap-4 shrink-0">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <FaWifi className={`text-${activeNetwork.color}-500 animate-pulse text-2xl md:text-4xl`} /> 
          WI-FI TARMOQLARI
        </h1>
      </div>

      {/* ASOSIY QISM (Aylanadigan joy) */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-8 overflow-hidden">
        
        {/* 1. CHAP TOMON - TARMOQ TANLASH RO'YXATI */}
        {/* O'ZGARISH: overflow-y-auto va h-full berildi */}
        <div className="w-full md:w-1/3 flex flex-col gap-3 md:gap-4 shrink-0 overflow-y-auto custom-scrollbar h-fit md:h-full pr-2">
          {networks.map((net) => (
            <button
              key={net.id}
              onClick={() => setActiveNetwork(net)}
              className={`group p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden cursor-pointer shrink-0 ${
                activeNetwork.id === net.id
                  ? `bg-${net.color}-600 border-${net.color}-400 shadow-xl scale-[1.02]`
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 md:gap-4 relative z-10">
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl ${
                  activeNetwork.id === net.id ? 'bg-white/20' : `bg-white/5 text-${net.color}-400`
                }`}>
                  {net.icon}
                </div>
                <div>
                  <h3 className={`text-sm md:text-xl font-black uppercase ${activeNetwork.id === net.id ? 'text-white' : 'text-gray-300'}`}>
                    {net.label}
                  </h3>
                  <p className={`text-[10px] md:text-xs font-mono ${activeNetwork.id === net.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {net.ssid}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 2. O'NG TOMON - QR KOD VA MA'LUMOT */}
        {/* O'ZGARISH: Markazlashtirildi va toshib ketsa scroll bo'ladigan qilindi */}
        <div className="flex-1 flex items-center justify-center overflow-y-auto custom-scrollbar h-full w-full">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col items-center gap-4 md:gap-6 max-w-sm md:max-w-lg w-full m-auto">
              
              {/* QR Kod */}
              <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-lg relative group shrink-0">
                <img src={qrImageUrl} alt="QR Code" className="w-48 h-48 md:w-64 md:h-64 mix-blend-multiply opacity-95" />
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 bg-${activeNetwork.color}-600 text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase shadow-lg whitespace-nowrap`}>
                  Skaner qiling
                </div>
              </div>

              {/* Matnli ma'lumotlar */}
              <div className="w-full text-center space-y-3 md:space-y-4">
                <div>
                  <h2 className="text-xl md:text-3xl font-black text-white">{activeNetwork.ssid}</h2>
                  <p className="text-gray-400 text-[10px] md:text-sm line-clamp-1">{activeNetwork.desc}</p>
                </div>

                <div className="bg-black/40 rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center justify-between border border-white/10">
                  <div className="flex items-center gap-2">
                    <FaLock className="text-gray-500 text-xs md:text-base" />
                    <span className="text-gray-400 text-[10px] md:text-xs uppercase font-bold">Parol:</span>
                  </div>
                  <span className="text-lg md:text-2xl font-mono text-white font-bold tracking-wider select-all">
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