import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  FaArrowLeft, FaSearch, FaUserTie, FaPhoneAlt,
  FaBuilding, FaLayerGroup, FaSpinner, FaTimes, FaDoorOpen
} from 'react-icons/fa';

// ─────────────────────────────────────────────
// MODAL — Xodim to'liq ma'lumotlari
// ─────────────────────────────────────────────
const EmployeeModal = ({ employee, onClose, t, language }) => {
  if (!employee) return null;

  const name     = employee.full_name     || employee.full_name_uz || "Noma'lum";
  const pos      = employee.position      || employee.position_uz  || '';
  const deptName = employee.department_name || '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

      {/* Modal karta */}
      <div
        className="relative z-10 w-full max-w-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Yopish tugmasi */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <FaTimes className="text-white text-lg" />
        </button>

        {/* Yuqori qism — rasm + ism */}
        <div className="relative bg-gradient-to-br from-blue-900/40 to-slate-900 px-8 pt-10 pb-6 flex flex-col items-center text-center border-b border-white/10">
          {/* Dekorativ doira */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Rasm */}
          <div className="relative mb-4">
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 to-slate-500/10 rounded-full blur-md"></div>
            <div className="relative w-28 h-28 rounded-full border-2 border-blue-500/30 overflow-hidden bg-slate-700 flex items-center justify-center shadow-2xl">
              {employee.image ? (
                <img src={employee.image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <FaUserTie className="text-5xl text-slate-400" />
              )}
            </div>
          </div>

          {/* Ism */}
          <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-2">
            {name}
          </h2>

          {/* Lavozim */}
          <p className="text-sm md:text-base text-blue-300 font-semibold leading-snug max-w-sm">
            {pos}
          </p>
        </div>

        {/* Pastki qism — ma'lumotlar */}
        <div className="px-8 py-6 space-y-3">

          {/* Bo'lim */}
          {deptName && (
            <div className="flex items-center gap-4 bg-slate-700/40 border border-white/5 rounded-2xl px-5 py-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <FaLayerGroup className="text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-0.5">
                  {language === 'ru' ? 'Отдел' : language === 'en' ? 'Department' : "Bo'lim"}
                </p>
                <p className="text-white font-bold text-sm leading-snug">{deptName}</p>
              </div>
            </div>
          )}

          {/* Qavat va Xona */}
          <div className="grid grid-cols-2 gap-3">
            {employee.floor && (
              <div className="flex items-center gap-3 bg-slate-700/40 border border-white/5 rounded-2xl px-4 py-4">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <FaBuilding className="text-blue-400 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-0.5">
                    {language === 'ru' ? 'Этаж' : language === 'en' ? 'Floor' : 'Qavat'}
                  </p>
                  <p className="text-white font-black text-base">{employee.floor}</p>
                </div>
              </div>
            )}

            {employee.room && (
              <div className="flex items-center gap-3 bg-slate-700/40 border border-white/5 rounded-2xl px-4 py-4">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <FaDoorOpen className="text-green-400 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-0.5">
                    {language === 'ru' ? 'Кабинет' : language === 'en' ? 'Room' : 'Xona'}
                  </p>
                  <p className="text-white font-black text-base">{employee.room}</p>
                </div>
              </div>
            )}
          </div>

          {/* Telefon */}
          {employee.phone && (
            <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <FaPhoneAlt className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-0.5">
                  {language === 'ru' ? 'Внутренний номер' : language === 'en' ? 'Extension' : 'Ichki raqam'}
                </p>
                <p className="text-emerald-400 font-black text-xl font-mono">{employee.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ASOSIY EMPLOYEES KOMPONENTI
// ─────────────────────────────────────────────
const Employees = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('floor');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const baseUrl = "https://web-production-ba75.up.railway.app";
        const [empRes, deptRes] = await Promise.all([
          fetch(`${baseUrl}/api/employees/?lang=${language}`),
          fetch(`${baseUrl}/api/departments/?lang=${language}`)
        ]);
        if (!empRes.ok || !deptRes.ok) throw new Error("Server xatosi");
        const empData  = await empRes.json();
        const deptData = await deptRes.json();
        setEmployees(empData.results   ? empData.results   : (Array.isArray(empData)  ? empData  : []));
        setDepartments(deptData.results ? deptData.results : (Array.isArray(deptData) ? deptData : []));
      } catch (error) {
        console.error("API xatoligi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [language]);

  const filteredEmployees = employees.filter(emp => {
    const empName    = emp.full_name      || '';
    const empPos     = emp.position       || '';
    const empDeptName = emp.department_name || '';

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        empName.toLowerCase().includes(term)     ||
        empPos.toLowerCase().includes(term)      ||
        empDeptName.toLowerCase().includes(term) ||
        (emp.room && String(emp.room).includes(term))
      );
    }
    if (activeFilter === 'all') return true;
    if (filterType === 'floor') return String(emp.floor) === String(activeFilter);
    if (filterType === 'dept')  return String(emp.department) === String(activeFilter);
    return true;
  });

  const getFilterTitle = () => {
    if (searchTerm) return `🔍 ${t('results') || 'Natijalar'}`;
    if (activeFilter === 'all') return t('all_employees') || 'Barcha xodimlar';
    if (filterType === 'floor') return `${activeFilter}${t('floor') || '-qavat'}`;
    if (filterType === 'dept') {
      const found = departments.find(d => String(d.id) === String(activeFilter));
      return found ? found.name : activeFilter;
    }
    return activeFilter;
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0 pointer-events-none"></div>

      {/* MODAL */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          t={t}
          language={language}
        />
      )}

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg shrink-0">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-base md:text-xl font-bold uppercase cursor-pointer">
          <FaArrowLeft /> {t('back_btn')}
        </button>

        <div className="flex-1 mx-8 relative max-w-3xl">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/50 text-white border-2 border-white/10 rounded-2xl py-4 pl-16 pr-6 text-lg md:text-xl focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400 shadow-inner"
          />
        </div>

        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <FaUserTie className="text-blue-400" /> {t('menu_employees')}
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 flex gap-6 p-6 overflow-hidden">

        {/* YON PANEL */}
        <div className="w-[350px] flex flex-col bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl shrink-0 overflow-hidden h-full">
          <div className="flex p-2 bg-black/20 m-3 rounded-2xl shrink-0">
            <button onClick={() => { setFilterType('floor'); setActiveFilter('all'); }} className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${filterType === 'floor' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>
              <FaBuilding /> {t('filter_floors')}
            </button>
            <button onClick={() => { setFilterType('dept'); setActiveFilter('all'); }} className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${filterType === 'dept' ? 'bg-amber-500 text-black shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>
              <FaLayerGroup /> {t('filter_depts')}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            <button onClick={() => setActiveFilter('all')} className={`w-full p-4 rounded-2xl text-left font-bold transition-all border border-transparent flex items-center gap-4 text-base cursor-pointer ${activeFilter === 'all' ? 'bg-white/10 border-white/20 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm">A</div>
              {t('all_employees')}
            </button>

            {filterType === 'floor' ? (
              ['5','4','3','2','1'].map(floor => (
                <button key={floor} onClick={() => setActiveFilter(floor)} className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border border-transparent text-base cursor-pointer ${activeFilter === floor ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>
                  <div className="flex items-center gap-4"><span className="font-bold">{floor}{t('floor')}</span></div>
                  <FaBuilding className="opacity-50" />
                </button>
              ))
            ) : (
              departments.map(dept => (
                <button key={dept.id} onClick={() => setActiveFilter(dept.id)} className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all border border-transparent text-sm leading-tight cursor-pointer ${String(activeFilter) === String(dept.id) ? 'bg-amber-500 text-black shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>
                  <span className="font-bold text-left break-words">{dept.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* XODIMLAR KARTOCHKALARI */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden flex flex-col h-full shadow-inner">
          <div className="p-6 border-b border-white/10 bg-slate-800/80 shrink-0 z-20 flex items-center justify-between">
            <h2 className="text-xl text-white font-bold flex items-center gap-3">
              {getFilterTitle()}
            </h2>
            <span className="text-sm font-black text-blue-300 bg-blue-900/50 border border-blue-500/30 px-4 py-1.5 rounded-full">
              {filteredEmployees.length} ta xodim
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 relative">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-400">
                <FaSpinner className="animate-spin text-5xl mb-4" />
                <p className="font-bold tracking-widest uppercase">{t('loading')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((e, index) => {
                    const name     = e.full_name     || "Noma'lum xodim";
                    const pos      = e.position      || 'Lavozim kiritilmagan';
                    const deptName = e.department_name || "Bo'lim kiritilmagan";

                    return (
                      <div
                        key={e.id || index}
                        onClick={() => setSelectedEmployee(e)}
                        className="bg-slate-800/90 p-5 md:p-6 rounded-[2rem] border border-white/10 hover:border-blue-500/50 transition-all hover:bg-slate-700/80 shadow-xl flex flex-col justify-between cursor-pointer active:scale-95"
                      >
                        <div className="flex items-start gap-5 mb-4">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-white/10 flex items-center justify-center text-white text-3xl shadow-inner shrink-0 overflow-hidden">
                            {e.image ? (
                              <img src={e.image} alt={name} className="w-full h-full object-cover" />
                            ) : (
                              <FaUserTie className="text-gray-400 opacity-50" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg md:text-xl font-black text-white leading-tight mb-2 line-clamp-2 break-words" title={name}>
                              {name}
                            </h3>
                            <p className="text-sm text-blue-400 font-bold mb-3 line-clamp-3 break-words leading-snug" title={pos}>
                              {pos}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-white/10 border border-white/5 px-2 py-1 rounded-lg text-[10px] md:text-xs text-gray-300 break-words line-clamp-2">
                                {deptName}
                              </span>
                              {e.room && (
                                <span className="bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-lg text-xs font-black shrink-0">
                                  {e.room}{t('room')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider">
                            {e.floor && <><FaBuilding className="text-gray-500" /> {e.floor}{t('floor')}</>}
                          </div>
                          <div className="flex items-center gap-2 text-xl md:text-2xl font-black text-emerald-400 font-mono">
                            {e.phone && <><FaPhoneAlt className="text-sm text-emerald-500" /> {e.phone}</>}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-20 opacity-50 text-center flex flex-col items-center">
                    <FaUserTie className="text-7xl mb-6 text-gray-600" />
                    <p className="text-2xl text-white font-black uppercase tracking-widest">{t('no_results')}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;