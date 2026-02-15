import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaSearch, FaUserTie, FaPhoneAlt, FaBuilding, FaLayerGroup, FaIdBadge } from 'react-icons/fa';

const Employees = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFloor, setActiveFloor] = useState('all'); // 'all', '0', '1', '2', '3', '4', '5'

  // NAMUNA MA'LUMOTLAR (Keyinchalik Exceldan yuklanadi)
  const employeesData = [
    // 0-QAVAT (PODVAL)
    { id: 100, name: "Arxiv", position: "Arxiv mudiri: S.Qosimov", dept: "Arxiv", room: "P-04", tel: "00-15", floor: "0" },
    { id: 101, name: "Xo'jalik omborxonasi", position: "Omborchi", dept: "Xo'jalik bo'limi", room: "P-10", tel: "00-20", floor: "0" },
    { id: 102, name: "Bosmaxona", position: "Bosh mutaxassis", dept: "Nashriyot", room: "P-02", tel: "00-33", floor: "0" },

    // 1-QAVAT
    { id: 1, name: "Qabulxona", position: "Navbatchi qism", dept: "Xavfsizlik", room: "101", tel: "10-00", floor: "1" },
    { id: 2, name: "Fuqarolarni qabul qilish", position: "Inspektor", dept: "Devonxona", room: "105", tel: "10-45", floor: "1" },
    { id: 3, name: "Oshxona", position: "Bosh oshpaz", dept: "Ta'minot", room: "110", tel: "10-90", floor: "1" },

    // 2-QAVAT
    { id: 4, name: "Rahimov Botir", position: "Bosh hisobchi", dept: "Moliya-iqtisod", room: "204", tel: "20-45", floor: "2" },
    { id: 5, name: "Kadrlar bo'limi", position: "Bo'lim boshlig'i", dept: "HR", room: "210", tel: "21-00", floor: "2" },
    { id: 6, name: "Yuridik bo'lim", position: "Yuristkonsult", dept: "Huquq", room: "208", tel: "20-88", floor: "2" },

    // 3-QAVAT (IT va O'quv)
    { id: 7, name: "Abdullayev Jamshid", position: "Bo'lim boshlig'i", dept: "Axborot texnologiyalari (IT)", room: "305", tel: "30-55", floor: "3" },
    { id: 8, name: "Server xonasi", position: "Tizim administratori", dept: "IT", room: "308", tel: "30-80", floor: "3" },
    { id: 9, name: "O'quv bo'limi", position: "Metodistlar", dept: "O'quv-uslubiy", room: "312", tel: "31-20", floor: "3" },

    // 4-QAVAT (Rahbariyat)
    { id: 10, name: "Akademiya boshlig'i", position: "Qabulxona", dept: "Rahbariyat", room: "401", tel: "40-00", floor: "4" },
    { id: 11, name: "O'quv ishlari prorektori", position: "Prorektor", dept: "Rahbariyat", room: "402", tel: "40-02", floor: "4" },
    { id: 12, name: "Ilmiy ishlar prorektori", position: "Prorektor", dept: "Rahbariyat", room: "403", tel: "40-03", floor: "4" },

    // 5-QAVAT
    { id: 13, name: "Konferensiya zali", position: "Tadbirlar zali", dept: "Ma'muriyat", room: "500", tel: "50-00", floor: "5" },
    { id: 14, name: "Mehmonxona", position: "Administrator", dept: "Xo'jalik", room: "505", tel: "50-50", floor: "5" },
  ];

  // Qidiruv va Filtrlash
  const filteredEmployees = employeesData.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.room.includes(searchTerm) ||
      emp.tel.includes(searchTerm);

    // Agar qidiruv yozilgan bo'lsa, qavatni inobatga olma (hamma yerdan qidir), 
    // agar qidiruv bo'sh bo'lsa, tanlangan qavatni ko'rsat.
    if (searchTerm) return matchesSearch;
    return activeFloor === 'all' || emp.floor === activeFloor;
  });

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
        
        <div className="flex-1 mx-8 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input 
            type="text" 
            placeholder="Xodim, bo'lim yoki xona raqamini yozing..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/50 text-white border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xl focus:outline-none focus:border-blue-400 focus:bg-slate-700 transition-all placeholder-gray-500"
          />
        </div>

        <h1 className="text-3xl font-black text-white uppercase tracking-wider hidden md:block">
          XODIMLAR
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-6 flex gap-6 overflow-hidden">
        
        {/* CHAP TOMON - LIFT (QAVATLAR) */}
        <div className="w-24 flex flex-col gap-2 bg-slate-800/50 p-2 rounded-3xl border border-white/10 overflow-y-auto custom-scrollbar">
          <div className="text-center text-gray-400 text-xs font-bold uppercase mb-2 mt-2">Qavatlar</div>
          
          <button 
             onClick={() => setActiveFloor('all')}
             className={`w-full aspect-square rounded-2xl flex items-center justify-center text-xl font-bold transition-all ${activeFloor === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            <FaBuilding />
          </button>

          {/* Qavat tugmalari (Tepadan pastga 5,4,3,2,1,P) */}
          {['5', '4', '3', '2', '1', '0'].map(floor => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                activeFloor === floor 
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/50 scale-105' 
                  : 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-2xl font-black">{floor === '0' ? 'P' : floor}</span>
              <span className="text-[10px] uppercase font-bold opacity-60">
                {floor === '0' ? 'Podval' : 'Qavat'}
              </span>
            </button>
          ))}
        </div>

        {/* O'NG TOMON - RO'YXAT */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-xl text-white font-bold mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
             <FaLayerGroup className="text-amber-500" />
             {searchTerm ? `Qidiruv natijalari: "${searchTerm}"` : 
              (activeFloor === 'all' ? "BARCHA XODIMLAR" : 
              (activeFloor === '0' ? "PODVAL (0-QAVAT) XODIMLARI" : `${activeFloor}-QAVAT XODIMLARI`))}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <div key={emp.id} className="bg-slate-800/80 p-5 rounded-2xl border border-white/5 hover:border-blue-500/50 hover:bg-slate-700 transition-all group relative overflow-hidden">
                  
                  {/* Orqa fon bezagi */}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaIdBadge className="text-6xl text-white" />
                  </div>

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
                      <FaUserTie />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight mb-1">{emp.name}</h3>
                      <p className="text-sm text-blue-400 font-medium mb-2">{emp.position}</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <p className="flex items-center gap-2"><span className="w-16 opacity-60">Bo'lim:</span> <span className="text-white">{emp.dept}</span></p>
                        <p className="flex items-center gap-2"><span className="w-16 opacity-60">Xona:</span> <span className="text-amber-400 font-bold bg-amber-400/10 px-1 rounded">{emp.room}</span></p>
                        <p className="flex items-center gap-2"><span className="w-16 opacity-60">Qavat:</span> <span className="text-white">{emp.floor === '0' ? 'Podval' : emp.floor}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Telefon raqam */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ichki raqam</span>
                    <div className="flex items-center gap-2 text-xl font-black text-green-400">
                      <FaPhoneAlt className="text-sm" /> {emp.tel}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 opacity-50">
                <FaSearch className="text-6xl mx-auto mb-4 text-gray-600" />
                <p className="text-xl text-white">Hech narsa topilmadi</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Employees;