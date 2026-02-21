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

  // Bo'limlar ro'yxati (Tarjima qilingan)
  const departmentsList = [
    { id: 'rahbariyat', name: t('dept_rahbariyat'), icon: <FaUniversity /> },
    { id: 'kadrlar', name: t('dept_kadrlar'), icon: <FaIdBadge /> },
    { id: 'xalqaro', name: t('dept_xalqaro'), icon: <FaHandshake /> },
    { id: 'tillar', name: t('dept_tillar'), icon: <FaChalkboardTeacher /> },
    { id: 'sud', name: t('dept_sud'), icon: <FaBalanceScale /> },
    { id: 'korrupsiya', name: t('dept_korrupsiya'), icon: <FaShieldAlt /> },
    { id: 'it_dept', name: t('dept_it'), icon: <FaLaptopCode /> },
  ];

  // Xodimlar ro'yxati (Tarjima qilingan)
  const employeesData = [
    { id: 1, name: t('emp_1_name'), position: t('emp_1_position'), deptId: "rahbariyat", dept: t('dept_rahbariyat'), room: "501", tel: "50-01", floor: "5" },
    { id: 2, name: t('emp_2_name'), position: t('emp_2_position'), deptId: "rahbariyat", dept: t('dept_rahbariyat'), room: "502", tel: "50-02", floor: "5" },
    { id: 3, name: t('emp_3_name'), position: t('emp_3_position'), deptId: "rahbariyat", dept: t('dept_rahbariyat'), room: "503", tel: "50-03", floor: "5" },
    { id: 4, name: t('emp_4_name'), position: t('emp_4_position'), deptId: "rahbariyat", dept: t('dept_rahbariyat'), room: "504", tel: "50-04", floor: "5" },
    { id: 14, name: t('emp_14_name'), position: t('emp_14_position'), deptId: "xalqaro", dept: t('dept_xalqaro'), room: "401", tel: "40-01", floor: "4" },
    { id: 16, name: t('emp_16_name'), position: t('emp_16_position'), deptId: "tillar", dept: t('dept_tillar'), room: "410", tel: "41-10", floor: "4" },
    { id: 18, name: t('emp_18_name'), position: t('emp_18_position'), deptId: "sud", dept: t('dept_sud'), room: "301", tel: "30-01", floor: "3" },
    { id: 22, name: t('emp_22_name'), position: t('emp_22_position'), deptId: "korrupsiya", dept: t('dept_korrupsiya'), room: "201", tel: "20-01", floor: "2" },
    { id: 28, name: t('emp_28_name'), position: t('emp_28_position'), deptId: "it_dept", dept: t('dept_it'), room: "101", tel: "10-01", floor: "1" },
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

  // Natija sarlavhasini avtomatik chiqarish
  const getFilterTitle = () => {
    if (searchTerm) return `🔍 ${t('results')}`;
    if (activeFilter === 'all') return t('all_employees');
    if (filterType === 'floor') return `${activeFilter}${t('floor')}`;
    const dept = departmentsList.find(d => d.id === activeFilter);
    return dept ? dept.name : activeFilter;
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      
      {/* FON */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg gap-4 shrink-0">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn')}
        </button>
        
        <div className="w-full md:flex-1 md:mx-8 relative max-w-2xl">
          <FaSearch className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-2xl" />
          <input 
            type="text" 
            placeholder={t('search_placeholder')} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/50 text-white border-2 border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 md:pl-16 pr-4 text-base md:text-2xl focus:outline-none focus:border-blue-400 transition-all placeholder-gray-500 shadow-inner"
          />
        </div>

        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider hidden md:block">
          {t('menu_employees')}
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-6 overflow-hidden">
        
        {/* 1. CHAP TOMON - FILTRLASH MENYUSI */}
        <div className="w-full md:w-80 flex flex-col bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl shrink-0 overflow-hidden h-fit md:h-full">
          
          <div className="flex p-1.5 bg-black/20 m-2 rounded-xl shrink-0">
            <button 
              onClick={() => { setFilterType('floor'); setActiveFilter('all'); }}
              className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${filterType === 'floor' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <FaBuilding /> {t('filter_floors')}
            </button>
            <button 
              onClick={() => { setFilterType('dept'); setActiveFilter('all'); }}
              className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${filterType === 'dept' ? 'bg-amber-500 text-black shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <FaLayerGroup /> {t('filter_depts')}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-3 space-y-1.5 md:space-y-2 max-h-[150px] md:max-h-full">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`w-full p-3 md:p-4 rounded-xl text-left font-bold transition-all border border-transparent flex items-center gap-3 text-sm md:text-base cursor-pointer ${activeFilter === 'all' ? 'bg-white/10 border-white/20 text-white' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">A</div>
              {t('all_employees')}
            </button>

            {filterType === 'floor' ? (
              ['5', '4', '3', '2', '1'].map(floor => (
                <button
                  key={floor}
                  onClick={() => setActiveFilter(floor)}
                  className={`w-full p-3 md:p-4 rounded-xl flex items-center justify-between transition-all border border-transparent text-sm md:text-base cursor-pointer ${
                    activeFilter === floor ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold">{floor}{t('floor')}</span>
                  </div>
                  <FaBuilding className="opacity-50" />
                </button>
              ))
            ) : (
              departmentsList.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setActiveFilter(dept.id)}
                  className={`w-full p-3 md:p-4 rounded-xl flex items-center gap-3 transition-all border border-transparent text-xs md:text-sm leading-tight cursor-pointer ${
                    activeFilter === dept.id ? 'bg-amber-500 text-black shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="shrink-0">{dept.icon}</span>
                  <span className="font-bold text-left">{dept.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* 2. O'NG TOMON - NATIJALAR KARTOCHKASI */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col h-full shadow-inner">
          
          <div className="p-4 md:p-6 border-b border-white/10 bg-white/5 shrink-0 z-20">
             <h2 className="text-lg md:text-xl text-white font-bold flex items-center gap-2">
                {getFilterTitle()}
                <span className="ml-auto text-xs md:text-sm font-normal text-gray-400 bg-black/20 px-3 py-1 rounded-full">
                   {filteredEmployees.length}
                </span>
             </h2>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-24 md:pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <div key={emp.id} className="bg-slate-800/80 p-4 md:p-5 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all hover:bg-slate-800 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl md:text-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                        <FaUserTie />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-white leading-tight mb-1 truncate" title={emp.name}>{emp.name}</h3>
                        <p className="text-xs md:text-sm text-blue-400 font-medium mb-2 line-clamp-2" title={emp.position}>{emp.position}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] md:text-xs text-gray-300">{emp.dept}</span>
                          <span className="bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold">{emp.room}{t('room')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs font-bold uppercase">
                          <FaBuilding /> {emp.floor}{t('floor')}
                        </div>
                        <div className="flex items-center gap-1 text-lg md:text-xl font-black text-green-400">
                          <FaPhoneAlt className="text-xs" /> {emp.tel}
                        </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-10 opacity-50 text-center flex flex-col items-center">
                  <FaUserTie className="text-6xl mb-4 text-gray-600" />
                  <p className="text-lg text-white font-bold">{t('no_results')}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Employees;