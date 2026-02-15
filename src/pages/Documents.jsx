import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaFilePdf, FaFileWord, FaGavel, FaUniversity, FaBalanceScale } from 'react-icons/fa';

const Documents = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('laws');

  // Kategoriyalar
  const categories = [
    { id: 'laws', label: "QONUNLAR", icon: <FaBalanceScale /> },
    { id: 'decrees', label: "PREZIDENT FARMONLARI", icon: <FaGavel /> },
    { id: 'orders', label: "AKADEMIYA BUYRUQLARI", icon: <FaUniversity /> },
  ];

  // Hujjatlar ro'yxati (Namuna uchun)
  const documents = {
    laws: [
      { id: 1, title: "Ta'lim to'g'risidagi Qonun", date: "23.09.2020", type: "pdf", size: "2.4 MB" },
      { id: 2, title: "Korrupsiyaga qarshi kurashish to'g'risida", date: "03.01.2017", type: "pdf", size: "1.8 MB" },
      { id: 3, title: "Davlat xizmati to'g'risidagi Qonun", date: "08.08.2022", type: "word", size: "450 KB" },
    ],
    decrees: [
      { id: 4, title: "Huquqni muhofaza qilish akademiyasini tashkil etish to'g'risida", date: "28.11.2022", type: "pdf", size: "3.1 MB" },
      { id: 5, title: "Oliy ta'lim tizimini 2030 yilgacha rivojlantirish konsepsiyasi", date: "08.10.2019", type: "pdf", size: "5.5 MB" },
    ],
    orders: [
      { id: 6, title: "Akademiya ichki tartib-qoidalari", date: "15.01.2026", type: "pdf", size: "1.2 MB" },
      { id: 7, title: "2026-yilgi o'quv rejasi tasdiqlash haqida", date: "10.01.2026", type: "word", size: "890 KB" },
      { id: 8, title: "Stipendiyalar tayinlash tartibi", date: "20.12.2025", type: "pdf", size: "2.0 MB" },
    ],
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none">
      
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-4xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <FaFilePdf className="text-amber-500" /> 
          ME'YORIY HUJJATLAR
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-6 flex gap-8 overflow-hidden">
        
        {/* 1. CHAP TOMON - KATEGORIYALAR */}
        <div className="w-1/3 flex flex-col gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                activeCategory === cat.id 
                  ? 'bg-amber-500 border-amber-500 text-white shadow-[0_0_30px_rgba(245,158,11,0.4)] scale-105' 
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <span className={`text-4xl ${activeCategory === cat.id ? 'text-white' : 'text-amber-500 group-hover:scale-110 transition-transform'}`}>
                {cat.icon}
              </span>
              <span className="text-xl font-bold uppercase tracking-wider">
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* 2. O'NG TOMON - HUJJATLAR RO'YXATI */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl text-white font-bold mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
            {categories.find(c => c.id === activeCategory)?.icon}
            {categories.find(c => c.id === activeCategory)?.label}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {documents[activeCategory].map((doc) => (
              <div key={doc.id} className="bg-slate-800/50 p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-slate-700/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${doc.type === 'pdf' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {doc.type === 'pdf' ? <FaFilePdf /> : <FaFileWord />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Sana: <span className="text-gray-300">{doc.date}</span> • Hajmi: <span className="text-gray-300">{doc.size}</span>
                    </p>
                  </div>
                </div>
                
                <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-500 hover:text-black transition-all uppercase text-sm">
                  O'qish
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Documents;