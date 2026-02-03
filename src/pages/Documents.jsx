import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaFilePdf, FaDownload, FaQrcode } from 'react-icons/fa';

// HUJJATLAR BAZASI (Kalitlar bilan)
const documentsData = [
  { id: 1, title: "doc_nizom", category: "rules", date: "12.01.2024", size: "2.4 MB" },
  { id: 2, title: "doc_qabul", category: "rules", date: "10.01.2024", size: "1.1 MB" },
  { id: 3, title: "doc_ariza", category: "app", date: "05.01.2024", size: "0.5 MB" },
  { id: 4, title: "doc_obektivka", category: "blanks", date: "01.01.2024", size: "0.8 MB" },
];

const Documents = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("rules");

  const categories = [
    { id: 'rules', label: t('tab_rules') },
    { id: 'app', label: t('tab_app') },
    { id: 'blanks', label: t('tab_blanks') },
  ];

  const filteredDocs = documentsData.filter(doc => doc.category === activeTab);

  return (
    <div className="h-screen flex flex-col bg-slate-50 animate-page select-none">
      <div className="bg-blue-900 p-6 flex items-center gap-4 text-white shadow-xl">
        <button onClick={() => navigate('/')} className="p-3 bg-white/10 rounded-xl hover:bg-white/20">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold uppercase">{t('doc_title')}</h1>
      </div>

      <div className="bg-white p-2 flex justify-center gap-2 shadow-sm">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === cat.id ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-3xl">
              <FaFilePdf />
            </div>
            <div className="flex-1">
              {/* TARJIMA QILISH: t(doc.title) */}
              <h3 className="font-bold text-lg text-blue-900 leading-tight mb-1">{t(doc.title)}</h3>
              <p className="text-xs text-gray-400 font-bold">{doc.date} • {doc.size}</p>
            </div>
            <div className="flex flex-col gap-2">
               <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                 <FaDownload /> {t('download')}
               </button>
               <div className="text-[10px] text-center text-gray-400 uppercase font-bold flex flex-col items-center">
                 <FaQrcode className="text-xl mb-1"/> {t('scan')}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;