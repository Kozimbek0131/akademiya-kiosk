import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Employees = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Xodimlar ro'yxati (Keyinchalik haqiqiy ma'lumotlarga o'zgartirasiz)
  const staff = [
    {
      id: 1,
      name: "Abduvakhidov Kozimbek", // O'zingizni nomingiz :)
      role: "IT Departament Boshlig'i",
      phone: "+998 90 123 45 67",
      email: "info@academy.uz",
      img: "https://via.placeholder.com/150", // Rasm o'rniga vaqtincha
      color: "border-blue-500"
    },
    {
      id: 2,
      name: "Rahbar Familiyasi",
      role: "Akademiya Direktori",
      phone: "+998 71 200 00 00",
      email: "director@academy.uz",
      img: "https://via.placeholder.com/150",
      color: "border-green-500"
    },
    {
      id: 3,
      name: "O'rinbosar Ismi",
      role: "Direktor O'rinbosari",
      phone: "+998 71 200 00 01",
      email: "deputy@academy.uz",
      img: "https://via.placeholder.com/150",
      color: "border-amber-500"
    },
    // Yana qo'shishingiz mumkin...
  ];

  return (
    <div className="h-screen flex flex-col font-sans relative overflow-hidden">
      
      {/* ORQA FON (Video) */}
      <div className="absolute inset-0 z-0">
        <video src="/bg.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col h-full p-8">
        
        {/* Tepa qism: Sarlavha va Orqaga tugmasi */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
          >
            <FaArrowLeft /> {t('back_btn')}
          </button>
          
          <h1 className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg text-right">
            {t('menu_employees')}
          </h1>
        </div>

        {/* Xodimlar ro'yxati (Grid) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
          <div className="grid grid-cols-3 gap-6 pb-20">
            {staff.map((person) => (
              <div 
                key={person.id}
                className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 hover:bg-white/10 transition-all group hover:-translate-y-2 hover:shadow-2xl`}
              >
                {/* Rasm */}
                <div className={`w-32 h-32 rounded-full border-4 ${person.color} p-1 bg-white/10`}>
                  <img 
                    src={person.img} 
                    alt={person.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Ism va Lavozim */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                  <p className="text-blue-300 font-medium uppercase text-sm tracking-wide">{person.role}</p>
                </div>

                {/* Aloqa */}
                <div className="w-full border-t border-white/10 pt-4 mt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-gray-300 text-sm bg-black/20 p-2 rounded-xl">
                    <FaPhoneAlt className="text-green-400" /> {person.phone}
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 text-sm bg-black/20 p-2 rounded-xl">
                    <FaEnvelope className="text-amber-400" /> {person.email}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Employees;