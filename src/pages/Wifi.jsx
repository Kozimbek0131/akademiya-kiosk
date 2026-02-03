import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaWifi, FaGlobe } from 'react-icons/fa';

const Wifi = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Havolalar ro'yxatini ham tarjima kalitlari bilan yozamiz
  const links = [
    { title: 'link_hemis' },  // Hemis
    { title: 'link_lib' },    // Kutubxona
    { title: 'link_remote' }, // Masofaviy ta'lim
    { title: 'link_site' }    // Rasmiy sayt
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 animate-page select-none">
      <div className="bg-indigo-600 p-6 flex items-center gap-4 text-white shadow-xl">
        <button onClick={() => navigate('/')} className="p-3 bg-white/10 rounded-xl hover:bg-white/20">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold uppercase">{t('wifi_title')}</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto">
        {/* WIFI CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-100 flex flex-col items-center text-center mb-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>
           <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-5xl mb-6 shadow-inner">
             <FaWifi />
           </div>
           
           <div className="w-full space-y-4">
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-gray-500 font-bold uppercase text-sm">{t('wifi_name')}:</span>
                <span className="text-xl font-black text-indigo-900">Academy_Guest</span>
             </div>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="text-gray-500 font-bold uppercase text-sm">{t('wifi_pass')}:</span>
                <span className="text-xl font-black text-indigo-900 font-mono">Student2026</span>
             </div>
           </div>
        </div>

        {/* LINKS - TARJIMA QILINGAN SARLAVHA */}
        <h3 className="text-xl font-bold text-gray-700 mb-4 ml-2">{t('wifi_links_title')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 border border-gray-100 active:scale-95 transition-transform">
               <div className="bg-blue-100 p-3 rounded-full text-blue-600"><FaGlobe /></div>
               {/* TARJIMA FUNKSIYASI ISHLATILDI */}
               <span className="font-bold text-lg text-gray-800">{t(link.title)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wifi;