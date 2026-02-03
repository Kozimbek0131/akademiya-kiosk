import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaMedal, FaStar } from 'react-icons/fa';

const Achievements = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Yutuqlar ro'yxati (Kalit so'zlar bilan)
  const achievementsList = [
    { id: 1, title: "achieve_olymp", desc: "achieve_desc" },
    { id: 2, title: "achieve_olymp", desc: "achieve_desc" },
    { id: 3, title: "achieve_olymp", desc: "achieve_desc" },
    { id: 4, title: "achieve_olymp", desc: "achieve_desc" },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 animate-page select-none">
      <div className="bg-red-600 p-6 flex items-center gap-4 text-white shadow-xl">
        <button onClick={() => navigate('/')} className="p-3 bg-white/10 rounded-xl hover:bg-white/20">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold uppercase">{t('achieve_title')}</h1>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
         {achievementsList.map((item) => (
           <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div className="h-40 bg-gray-300 relative">
                 <img src={`https://source.unsplash.com/random/400x300?medal,sport&sig=${item.id}`} alt="Yutuq" className="w-full h-full object-cover" />
                 <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg">
                   <FaMedal size={24} />
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                 <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase mb-2">
                   {/* TARJIMA QILINADI: t(item.title) */}
                   <FaStar /> {t(item.title)}
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-2">{t(item.title)} - 1-o'rin</h3>
                 <p className="text-gray-500 text-sm">{t(item.desc)}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Achievements;