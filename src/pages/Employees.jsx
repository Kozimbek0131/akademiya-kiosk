import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Employees = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const staff = [
    {
      id: 1,
      name: "Abduvakhidov Kozimbek",
      role: "IT Departament Boshlig'i",
      phone: "+998 90 123 45 67",
      email: "info@academy.uz",
      img: "https://via.placeholder.com/150",
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
  ];

  return (
    <div className="h-screen flex flex-col font-sans relative overflow-hidden bg-slate-900">
      
      {/* ORQA FON (Video o'rniga rang) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-80"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col h-full p-8">
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

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
          <div className="grid grid-cols-3 gap-6 pb-20">
            {staff.map((person) => (
              <div 
                key={person.id}
                className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 hover:bg-white/10 transition-all group hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className={`w-32 h-32 rounded-full border-4 ${person.color} p-1 bg-white/10`}>
                  <img src={person.img} alt={person.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                  <p className="text-blue-300 font-medium uppercase text-sm tracking-wide">{person.role}</p>
                </div>
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