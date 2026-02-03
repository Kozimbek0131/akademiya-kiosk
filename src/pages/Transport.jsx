import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaBus, FaSubway, FaTaxi, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Transport = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("bus");

  const tabs = [
    { id: 'bus', label: t('tab_bus'), icon: <FaBus /> },
    { id: 'metro', label: t('tab_metro'), icon: <FaSubway /> },
    { id: 'taxi', label: t('tab_taxi'), icon: <FaTaxi /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 animate-page select-none">
      <div className="bg-amber-500 p-6 flex items-center gap-4 text-blue-900 shadow-xl z-20">
        <button onClick={() => navigate('/')} className="p-3 bg-white/20 rounded-xl hover:bg-white/30">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-black uppercase">{t('trans_title')}</h1>
      </div>

      <div className="flex-1 flex flex-col relative">
        <div className="flex bg-white shadow-md z-10">
          {tabs.map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex-1 py-4 flex flex-col items-center gap-1 font-bold transition-all border-b-4 ${
                 activeTab === tab.id ? "border-amber-500 text-blue-900 bg-amber-50" : "border-transparent text-gray-400"
               }`}
             >
               <span className="text-2xl">{tab.icon}</span>
               {tab.label}
             </button>
          ))}
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-slate-100">
           {activeTab === 'bus' && (
             <div className="space-y-4">
               <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-500 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black text-blue-900 mb-1">24-Avtobus</h3>
                      <p className="text-gray-500 font-medium flex items-center gap-2">
                        <FaMapMarkerAlt /> {t('route_center')}
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-gray-400 uppercase">{t('interval')}</p>
                       <p className="text-xl font-bold text-green-600 flex items-center gap-1 justify-end"><FaClock className="text-sm"/> 10 min</p>
                    </div>
               </div>
               <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-500 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black text-blue-900 mb-1">51-Avtobus</h3>
                      <p className="text-gray-500 font-medium flex items-center gap-2">
                        <FaMapMarkerAlt /> {t('route_bazar')}
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-gray-400 uppercase">{t('interval')}</p>
                       <p className="text-xl font-bold text-green-600 flex items-center gap-1 justify-end"><FaClock className="text-sm"/> 15 min</p>
                    </div>
               </div>
             </div>
           )}
           
           {activeTab === 'metro' && (
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <FaSubway className="text-6xl text-red-500 mx-auto mb-4"/>
                <h3 className="text-xl font-bold">{t('metro_station')}</h3>
                <p className="text-gray-500 mt-2">{t('metro_desc')}</p>
              </div>
           )}

           {activeTab === 'taxi' && (
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                 <FaTaxi className="text-6xl text-amber-500 mx-auto mb-4"/>
                 <h3 className="text-xl font-bold">Yandex Go / MyTaxi</h3>
                 <p className="text-gray-500 mt-2">{t('taxi_desc')}</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Transport;