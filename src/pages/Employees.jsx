import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaSearch, FaUserTie, FaPhoneAlt, FaBuilding, FaLayerGroup, FaIdBadge, FaUniversity, FaChalkboardTeacher, FaBalanceScale, FaLaptopCode } from 'react-icons/fa';

const Employees = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // STATE: Qidiruv, Filter turi (Qavat yoki Bo'lim), va Tanlangan qiymat
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('floor'); // 'floor' (Qavat) yoki 'dept' (Bo'lim)
  const [activeFilter, setActiveFilter] = useState('all'); // Tanlangan qavat yoki bo'lim IDsi

  // 📂 BO'LIMLAR RO'YXATI (Kategoriyalar)
  const departmentsList = [
    { id: 'rahbariyat', name: "Rahbariyat", icon: <FaUniversity /> },
    { id: 'til_kafedra', name: "Til o'rgatish kafedrasi", icon: <FaChalkboardTeacher /> },
    { id: 'it_dept', name: "Axborot texnologiyalari", icon: <FaLaptopCode /> },
    { id: 'tergov', name: "Tergov faoliyati", icon: <FaBalanceScale /> },
    { id: 'devonxona', name: "Devonxona va Arxiv", icon: <FaLayerGroup /> },
  ];

  // 👥 XODIMLAR BAZASI (Namuna)
  const employeesData = [
    // RAHBARIYAT
    { id: 1, name: "Akademiya Boshlig'i", position: "General-mayor", deptId: "rahbariyat", dept: "Rahbariyat", room: "401", tel: "40-00", floor: "4" },
    { id: 2, name: "O'quv ishlari prorektori", position: "Prorektor", deptId: "rahbariyat", dept: "Rahbariyat", room: "402", tel: "40-02", floor: "4" },

    // TIL O'RGATISH KAFEDRASI (Siz so'ragan misol)
    { id: 3, name: "Karimov Anvar", position: "Kafedra boshlig'i", deptId: "til_kafedra", dept: "Til o'rgatish kafedrasi", room: "305", tel: "30-10", floor: "3" },
    { id: 4, name: "Ivanova Elena", position: "Rus tili o'qituvchisi", deptId: "til_kafedra", dept: "Til o'rgatish kafedrasi", room: "306", tel: "30-12", floor: "3" },
    { id: 5, name: "Smith John", position: "Ingliz tili o'qituvchisi", deptId: "til_kafedra", dept: "Til o'rgatish kafedrasi", room: "306", tel: "30-13", floor: "3" },

    // IT BO'LIMI
    { id: 6, name: "Abdullayev Jamshid", position: "Bo'lim boshlig'i", deptId: "it_dept", dept: "Axborot texnologiyalari", room: "310", tel: "31-00", floor: "3" },
    { id: 7, name: "Server xonasi", position: "Adminlar", deptId: "it_dept", dept: "Axborot texnologiyalari", room: "312", tel: "31-05", floor: "3" },

    // TERGOV
    { id: 8, name: "Tergov kafedrasi", position: "Kafedra mudiri", deptId: "tergov", dept: "Tergov faoliyati", room: "205", tel: "20-50", floor: "2" },

    // DEVONXONA (Podval va 1-qavat)
    { id: 9, name: "Devonxona", position: "Qabul bo'limi", deptId: "devonxona", dept: "Devonxona", room: "101", tel: "10-00", floor: "1" },
    { id: 10, name: "Arxiv", position: "Arxiv mudiri", deptId: "devonxona", dept: "Arxiv", room: "P-04", tel: "00-15", floor: "0" },
  ];

  // 🔍 FILTRLASH MANTIG'I
  const filteredEmployees = employeesData.filter(emp => {
    // 1. Agar qidiruv yozilgan bo'lsa, faqat qidiruv bo'yicha top (kategoriyani unut)
    if (searchTerm) {
      return (
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.room.includes(searchTerm)
      );
    }

    // 2. Agar "Hamma xodimlar" tanlangan bo'lsa
    if (activeFilter === 'all') return true;

    // 3. Agar "Qavat" bo'yicha filtrlanayotgan bo'lsa
    if (filterType === 'floor') {
      return emp.floor === activeFilter;
    }

    // 4. Agar "Bo'lim" bo'yicha filtrlanayotgan bo'lsa
    if (filterType === 'dept') {
      return emp.deptId === activeFilter;
    }

    return true;
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
        
        {/* KATTA QIDIRUV */}
        <div className="flex-1 mx-8 relative max-w-2xl">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
          <input 
            type="text" 
            placeholder="Xodim ismi, lavozimi yoki xona raqamini yozing..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/50 text-white border-2 border-white/10 rounded-2xl py-4 pl-16 pr-6 text-2xl focus:outline-none focus:border-blue-400 focus:bg-slate-800 transition-all placeholder-gray-500 shadow-inner"
          />
        </div>

        <h1 className="text-3xl font-black text-white uppercase tracking-wider hidden xl:block">
          XODIMLAR
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-6 flex gap-6 overflow-hidden">
        
        {/* 1. CHAP TOMON - FILTRLASH MENYUSI */}
        <div className="w-80 flex flex-col bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* TEPADAGI TAB (O'TKAZGICH) */}
          <div className="flex p-2 bg-black/20 m-2 rounded-2xl">
            <button 
              onClick={() => { setFilterType('floor'); setActiveFilter('all'); }}
              className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase transition-all flex items-center justify-center gap-2 ${filterType === 'floor' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <FaBuilding /> Qavatlar
            </button>
            <button 
              onClick={() => { setFilterType('dept'); setActiveFilter('all'); }}
              className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase transition-all flex items-center justify-center gap-2 ${filterType === 'dept' ? 'bg-amber-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <FaLayerGroup /> Bo'limlar
            </button>
          </div>

          {/* RO'YXAT (Scroll bo'ladi) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            
            {/* "HAMMASINI KO'RSATISH" TUGMASI */}
            <button 
              onClick={() => setActiveFilter('all')}
              className={`w-full p-4 rounded-xl text-left font-bold transition-all border border-transparent flex items-center gap-3 ${activeFilter === 'all' ? 'bg-white/10 border-white/20 text-white' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">A</div>
              Barcha xodimlar
            </button>

            {/* AGAR "QAVAT" TANLANGAN BO'LSA */}
            {filterType === 'floor' && (
              ['5', '4', '3', '2', '1', '0'].map(floor => (
                <button
                  key={floor}
                  onClick={() => setActiveFilter(floor)}
                  className={`w-full p-4 rounded-xl flex items-center justify-between transition-all border border-transparent group ${
                    activeFilter === floor 
                      ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black opacity-50">{floor === '0' ? 'P' : floor}</span>
                    <span className="font-bold uppercase text-sm">{floor === '0' ? 'Podval' : `${floor}-Qavat`}</span>
                  </div>
                  <FaBuilding className={`opacity-0 group-hover:opacity-50 ${activeFilter === floor ? 'opacity-100' : ''}`} />
                </button>
              ))
            )}

            {/* AGAR "BO'LIM" TANLANGAN BO'LSA */}
            {filterType === 'dept' && (
              departmentsList.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setActiveFilter(dept.deptId || dept.id)} // ID mosligini tekshirish
                  className={`w-full p-4 rounded-xl text-left transition-all border border-transparent group ${
                    activeFilter === dept.id 
                      ? 'bg-amber-500 text-black shadow-lg scale-[1.02]' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{dept.icon}</span>
                    <span className="font-bold text-sm leading-tight">{dept.name}</span>
                  </div>
                </button>
              ))
            )}

          </div>
        </div>

        {/* 2. O'NG TOMON - NATIJALAR KARTOCHKASI */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-y-auto custom-scrollbar">
          
          {/* Sarlavha */}
          <h2 className="text-xl text-white font-bold mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
             {searchTerm ? (
               <>🔍 Qidiruv natijalari</>
             ) : (
               filterType === 'floor' 
                 ? (activeFilter === 'all' ? "Barcha qavatlar" : (activeFilter === '0' ? "Podval xodimlari" : `${activeFilter}-qavat xodimlari`))
                 : (activeFilter === 'all' ? "Barcha bo'limlar" : departmentsList.find(d => d.id === activeFilter)?.name || "Bo'lim xodimlari")
             )}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <div key={emp.id} className="bg-slate-800/80 p-5 rounded-2xl border border-white/5 hover:border-blue-500/50 hover:bg-slate-700 transition-all group relative overflow-hidden animate-fade-in">
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shrink-0">
                      <FaUserTie />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight mb-1">{emp.name}</h3>
                      <p className="text-sm text-blue-400 font-medium mb-2">{emp.position}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300 font-medium">
                          {emp.dept}
                        </span>
                        <span className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded text-xs font-bold border border-amber-500/20">
                          {emp.room}-xona
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pastki qism: Telefon va Qavat */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase">
                        <FaBuilding /> {emp.floor === '0' ? 'Podval' : `${emp.floor}-qavat`}
                     </div>
                     <div className="flex items-center gap-2 text-xl font-black text-green-400">
                        <FaPhoneAlt className="text-sm" /> {emp.tel}
                     </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50 text-center">
                <FaSearch className="text-6xl mb-4 text-gray-600" />
                <p className="text-xl text-white font-bold">Hech kim topilmadi</p>
                <p className="text-sm text-gray-400">Boshqa bo'lim yoki qavatni tanlab ko'ring</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Employees;