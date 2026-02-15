import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaArrowLeft, FaSearch, FaUserTie, FaPhoneAlt, 
  FaBuilding, FaLayerGroup, FaIdBadge, FaUniversity, 
  FaChalkboardTeacher, FaBalanceScale, FaLaptopCode, 
  FaShieldAlt, FaHandshake 
} from 'react-icons/fa';

const Employees = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('floor'); 
  const [activeFilter, setActiveFilter] = useState('all');

  const departmentsList = [
    { id: 'rahbariyat', name: "Akademiya rahbariyati", icon: <FaUniversity /> },
    { id: 'kadrlar', name: "Kadrlar va Tashkiliy-nazorat", icon: <FaIdBadge /> },
    { id: 'xalqaro', name: "Xalqaro hamkorlik", icon: <FaHandshake /> },
    { id: 'tillar', name: "Тил ўргатиш кафедраси", icon: <FaChalkboardTeacher /> },
    { id: 'sud', name: "Sud faoliyati", icon: <FaBalanceScale /> },
    { id: 'korrupsiya', name: "Antikorrupsiya markazi", icon: <FaShieldAlt /> },
    { id: 'it_dept', name: "AKT va axborot xavfsizligi", icon: <FaLaptopCode /> },
  ];

  const employeesData = [
    { id: 1, name: "Коленко Евгений Вячеславович", position: "Академия бошлиғининг биринчи ўринбосари", deptId: "rahbariyat", dept: "Rahbariyat", room: "501", tel: "50-01", floor: "5" },
    { id: 2, name: "Турахонов Дурбек Лермонович", position: "Академия бошлиғи ўринбосари", deptId: "rahbariyat", dept: "Rahbariyat", room: "502", tel: "50-02", floor: "5" },
    { id: 3, name: "Одинаев Адҳам Саъдуллоевич", position: "Академия бошлиғи ўринбосари", deptId: "rahbariyat", dept: "Rahbariyat", room: "503", tel: "50-03", floor: "5" },
    { id: 4, name: "Нигмаджанов Уйгун Учкунович", position: "Академия бошлиғи ўринбосари", deptId: "rahbariyat", dept: "Rahbariyat", room: "504", tel: "50-04", floor: "5" },
    { id: 14, name: "Акбутаев Аброр Абдурахманович", position: "Халқаро ҳамкорлик бўлими бошлиғи", deptId: "xalqaro", dept: "Xalqaro ҳамкорлик", room: "401", tel: "40-01", floor: "4" },
    { id: 16, name: "Мирзокуlova Хурсаной Нематжоновна", position: "Тил ўргатиш кафедраси катта ўқитувчи", deptId: "tillar", dept: "Тил ўргатиш кафедраси", room: "410", tel: "41-10", floor: "4" },
    { id: 18, name: "Қандаҳорова Дилноза Сатторовна", position: "Кафедра катта ўқитувчиси", deptId: "sud", dept: "Sud faoliyati", room: "301", tel: "30-01", floor: "3" },
    { id: 22, name: "Турсунбеков Худайберди", position: "Коррупцияга қарши курашиш маркази бошлиғи", deptId: "korrupsiya", dept: "Antikorrupsiya", room: "201", tel: "20-01", floor: "2" },
    { id: 28, name: "Ғиёсов Билолбек Жумазода", position: "АКТ бўлиmi бошлиғи", deptId: "it_dept", dept: "AKT бўлими", room: "101", tel: "10-01", floor: "1" },
  ];

  const filteredEmployees = employeesData.filter(emp => {
    if (searchTerm) {
      return (
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.room.includes(searchTerm)
      );
    }
    if (activeFilter === 'all') return true;
    if (filterType === 'floor') return emp.floor === activeFilter;
    if (filterType === 'dept') return emp.deptId === activeFilter;
    return true;
  });

  return (
    // Responsive: min-h-screen mobil brauzerlar uchun qulayroq
    <div className="min-h-screen flex flex-col bg-slate-900 relative overflow-x-hidden select-none text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>

      {/* HEADER (Mobil uchun flex-col) */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg gap-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <div className="w-full md:flex-1 md:mx-8 relative max-w-2xl">
          <FaSearch className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-2xl" />
          <input 
            type="text" 
            placeholder="Qidiruv..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/50 text-white border-2 border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 md:pl-16 pr-4 text-base md:text-2xl focus:outline-none focus:border-blue-400 transition-all placeholder-gray-500 shadow-inner"
          />
        </div>

        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider hidden md:block">
          XODIMLAR
        </h1>
      </div>

      {/* ASOSIY QISM (Mobil uchun flex-col) */}
      <div className="relative z-10 flex-1 p-4 md:p-6 flex flex-col md:flex-row gap-6 overflow-y-auto md:overflow-hidden">
        
        {/* 1. CHAP TOMON - FILTRLASH MENYUSI (Mobil uchun kengligi 100%) */}
        <div className="w-full md:w-80 flex flex-col bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shrink-0">
          <div className="flex p-1.5 bg-black/20 m-2 rounded-xl">
            <button 
              onClick={() => { setFilterType('floor'); setActiveFilter('all'); }}
              className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm uppercase transition-all flex items-center justify-center gap-2 ${filterType === 'floor' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400'}`}
            >
              <FaBuilding /> Qavatlar
            </button>
            <button 
              onClick={() => { setFilterType('dept'); setActiveFilter('all'); }}
              className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm uppercase transition-all flex items-center justify-center gap-2 ${filterType === 'dept' ? 'bg-amber-500 text-black shadow-lg' : 'text-gray-400'}`}
            >
              <FaLayerGroup /> Bo'limlar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[200px] md:max-h-full custom-scrollbar p-2 md:p-3 space-y-1.5 md:space-y-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`w-full p-3 md:p-4 rounded-xl text-left font-bold transition-all border border-transparent flex items-center gap-3 text-sm md:text-base ${activeFilter === 'all' ? 'bg-white/10 border-white/20 text-white' : 'text-gray-400'}`}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">A</div>
              Barcha xodimlar
            </button>

            {filterType === 'floor' ? (
              ['5', '4', '3', '2', '1'].map(floor => (
                <button
                  key={floor}
                  onClick={() => setActiveFilter(floor)}
                  className={`w-full p-3 md:p-4 rounded-xl flex items-center justify-between transition-all border border-transparent text-sm md:text-base ${
                    activeFilter === floor ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold">{floor}-Qavat</span>
                  </div>
                  <FaBuilding className="opacity-50" />
                </button>
              ))
            ) : (
              departmentsList.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setActiveFilter(dept.id)}
                  className={`w-full p-3 md:p-4 rounded-xl flex items-center gap-3 transition-all border border-transparent text-xs md:text-sm leading-tight ${
                    activeFilter === dept.id ? 'bg-amber-500 text-black shadow-lg' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  <span className="shrink-0">{dept.icon}</span>
                  <span className="font-bold">{dept.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* 2. O'NG TOMON - NATIJALAR KARTOCHKASI */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-lg md:text-xl text-white font-bold mb-4 md:mb-6 border-b border-white/10 pb-3 md:pb-4">
             {searchTerm ? "🔍 Natijalar" : (activeFilter === 'all' ? "Barcha xodimlar" : `${activeFilter}-qavat/bo'lim`)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 pb-10">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <div key={emp.id} className="bg-slate-800/80 p-4 md:p-5 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl md:text-2xl shadow-lg shrink-0">
                      <FaUserTie />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-white leading-tight mb-1 truncate">{emp.name}</h3>
                      <p className="text-xs md:text-sm text-blue-400 font-medium mb-2 line-clamp-2">{emp.position}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] md:text-xs text-gray-300">{emp.dept}</span>
                        <span className="bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold">{emp.room}-xona</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs font-bold uppercase">
                        <FaBuilding /> {emp.floor}-qavat
                     </div>
                     <div className="flex items-center gap-1 text-lg md:text-xl font-black text-green-400">
                        <FaPhoneAlt className="text-xs" /> {emp.tel}
                     </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 opacity-50 text-center">
                <p className="text-lg text-white font-bold">Hech kim topilmadi</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Employees;