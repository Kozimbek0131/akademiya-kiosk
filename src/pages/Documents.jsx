import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaFileAlt, FaFilePdf, FaFileWord, FaGavel, FaLandmark, FaUniversity, FaTimes } from 'react-icons/fa';

const Documents = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('qonunlar');
  const [selectedDoc, setSelectedDoc] = useState(null);

  const categories = [
    { id: 'qonunlar',  name: t('cat_laws'),    icon: <FaGavel /> },
    { id: 'farmonlar', name: t('cat_decrees'),  icon: <FaLandmark /> },
    { id: 'buyruqlar', name: t('cat_orders'),   icon: <FaUniversity /> },
  ];

  const documents = [
    { id: 1, category: 'qonunlar',  title: { uz: "Ta'lim to'g'risidagi qonun", ru: "Закон об образовании", en: "Law on Education" }, date: "23.09.2020", size: "2.4 MB", type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: 2, category: 'qonunlar',  title: { uz: "Korrupsiyaga qarshi kurashish to'g'risida", ru: "О противодействии коррупции", en: "On Combating Corruption" }, date: "03.01.2017", size: "1.8 MB", type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: 3, category: 'qonunlar',  title: { uz: "Davlat xizmati to'g'risidagi qonun", ru: "Закон о государственной службе", en: "Law on Public Service" }, date: "08.08.2022", size: "450 KB", type: "word", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: 4, category: 'farmonlar', title: { uz: "Huquqni muhofaza qilish akademiyasini tashkil etish haqida", ru: "Об организации Академии правоохранительных органов", en: "On Establishment of Law Enforcement Academy" }, date: "28.11.2022", size: "3.1 MB", type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: 5, category: 'buyruqlar', title: { uz: "Ichki tartib qoidalari va odob-axloq kodeksi", ru: "Правила внутреннего распорядка и кодекс этики", en: "Internal Regulations and Code of Ethics" }, date: "15.01.2024", size: "1.2 MB", type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  ];

  const { language } = useLanguage();

  const filteredDocs = documents.filter(doc => doc.category === activeCategory);

  return (
    <div className="h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 z-0 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shrink-0">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-lg font-bold uppercase cursor-pointer">
          <FaArrowLeft /> {t('back_btn')}
        </button>
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <FaFileAlt className="text-amber-400" /> {t('page_documents')}
        </h1>
      </div>

      {/* KATEGORIYALAR */}
      <div className="relative z-10 w-full p-6 pb-0 shrink-0">
        <div className="grid grid-cols-3 gap-4 bg-slate-800/50 p-2 rounded-3xl border border-white/10 shadow-inner">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl font-bold transition-all cursor-pointer ${activeCategory === cat.id ? 'bg-amber-500 text-slate-900 shadow-[0_5px_15px_rgba(245,158,11,0.4)] transform scale-[1.02]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <div className="text-2xl">{cat.icon}</div>
              <span className="text-xs md:text-sm uppercase tracking-widest text-center">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* HUJJATLAR */}
      <div className="relative z-10 flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="space-y-4 max-w-5xl mx-auto pb-10">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-slate-800/60 backdrop-blur-md border border-white/10 p-5 md:p-6 rounded-[2rem] flex items-center justify-between gap-4 hover:border-amber-500/50 transition-all group">
                <div className="flex items-center gap-5 md:gap-6 flex-1 min-w-0">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner ${doc.type === 'pdf' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {doc.type === 'pdf' ? <FaFilePdf /> : <FaFileWord />}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 truncate group-hover:text-amber-400 transition-colors">
                      {typeof doc.title === 'object' ? (doc.title[language] || doc.title.uz) : doc.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs md:text-sm text-gray-400 font-medium">
                      <span>{t('label_date')}: {doc.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                      <span>{t('label_size')}: {doc.size}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedDoc(doc)}
                  className="bg-white/10 hover:bg-amber-500 hover:text-slate-900 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shrink-0 border border-white/20 cursor-pointer">
                  {t('btn_read')}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500 font-bold text-xl">{t('no_docs')}</div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {selectedDoc && (
        <div className="absolute inset-0 z-[100] bg-slate-950 flex flex-col">
          <div className="flex items-center justify-between p-4 md:p-6 bg-slate-900 border-b border-white/10 shadow-2xl z-20">
            <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${selectedDoc.type === 'pdf' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                {selectedDoc.type === 'pdf' ? <FaFilePdf /> : <FaFileWord />}
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="text-lg md:text-2xl font-bold text-white truncate">
                  {typeof selectedDoc.title === 'object' ? (selectedDoc.title[language] || selectedDoc.title.uz) : selectedDoc.title}
                </h2>
                <span className="text-xs text-gray-400">{t('doc_viewing')}</span>
              </div>
            </div>
            <button onClick={() => setSelectedDoc(null)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)] shrink-0 cursor-pointer">
              <FaTimes className="text-xl md:text-2xl" /> {t('doc_close')}
            </button>
          </div>
          <div className="flex-1 bg-gray-200 w-full relative z-10">
            <iframe src={`${selectedDoc.url}#toolbar=0&navpanes=0&scrollbar=0`} className="absolute inset-0 w-full h-full border-0" title="Document Viewer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;