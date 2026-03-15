import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  FaArrowLeft, FaSearch, FaUserTie, FaPhoneAlt,
  FaBuilding, FaLayerGroup, FaSpinner, FaTimes, FaDoorOpen
} from 'react-icons/fa';

// ─────────────────────────────────────────────
// MODAL — createPortal (overflow:hidden muammosi hal qilindi)
// ─────────────────────────────────────────────
const EmployeeModal = ({ employee, onClose, language }) => {
  if (!employee) return null;

  const name     = employee.full_name      || employee.full_name_uz || "Noma'lum";
  const pos      = employee.position       || employee.position_uz  || '';
  const deptName = employee.department_name || '';

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md bg-slate-800 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        style={{ zIndex: 10000 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Yopish */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-red-500/30 border border-white/10 rounded-xl flex items-center justify-center transition-all cursor-pointer"
          style={{ zIndex: 10001 }}
        >
          <FaTimes className="text-white" />
        </button>

        {/* Yuqori — rasm + ism */}
        <div className="bg-gradient-to-br from-blue-900/50 to-slate-900 px-6 pt-8 pb-6 flex flex-col items-center text-center border-b border-white/10">
          <div className="w-24 h-24 rounded-full border-2 border-blue-500/40 overflow-hidden bg-slate-700 flex items-center justify-center shadow-xl mb-4">
            {employee.image
              ? <img src={employee.image} alt={name} className="w-full h-full object-cover" />
              : <FaUserTie className="text-5xl text-slate-400" />
            }
          </div>
          <h2 className="text-xl font-black text-white leading-tight mb-2">{name}</h2>
          <p className="text-sm text-blue-300 font-semibold leading-snug max-w-xs">{pos}</p>
        </div>

        {/* Pastki — ma'lumotlar */}
        <div className="px-6 py-5 space-y-3">
          {deptName && (
            <div className="flex items-center gap-3 bg-slate-700/50 border border-white/5 rounded-2xl px-4 py-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <FaLayerGroup className="text-amber-400 text-sm" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  {language === 'ru' ? 'Отдел' : language === 'en' ? 'Department' : "Bo'lim"}
                </p>
                <p className="text-white font-bold text-sm leading-snug">{deptName}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {employee.floor && (
              <div className="flex items-center gap-3 bg-slate-700/50 border border-white/5 rounded-2xl px-4 py-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <FaBuilding className="text-blue-400 text-sm" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    {language === 'ru' ? 'Этаж' : language === 'en' ? 'Floor' : 'Qavat'}
                  </p>
                  <p className="text-white font-black text-lg">{employee.floor}</p>
                </div>
              </div>
            )}
            {employee.room && (
              <div className="flex items-center gap-3 bg-slate-700/50 border border-white/5 rounded-2xl px-4 py-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <FaDoorOpen className="text-green-400 text-sm" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    {language === 'ru' ? 'Кабинет' : language === 'en' ? 'Room' : 'Xona'}
                  </p>
                  <p className="text-white font-black text-lg">{employee.room}</p>
                </div>
              </div>
            )}
          </div>

          {employee.phone && (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <FaPhoneAlt className="text-emerald-400 text-sm" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  {language === 'ru' ? 'Внутренний номер' : language === 'en' ? 'Extension' : 'Ichki raqam'}
                </p>
                <p className="text-emerald-400 font-black text-2xl font-mono">{employee.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// ─────────────────────────────────────────────
// ASOSIY EMPLOYEES
// ─────────────────────────────────────────────
const Employees = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [employees,   setEmployees]   = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading,   setIsLoading]   = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm,  setSearchTerm]  = useState('');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedDept,  setSelectedDept]  = useState('all');

  // Til o'zgarganda hammasini reset
  useEffect(() => {
    setSelectedFloor('all');
    setSelectedDept('all');
    setSearchTerm('');
  }, [language]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const base = "https://web-production-8dce.up.railway.app";
        const [eRes, dRes] = await Promise.all([
          fetch(`${base}/api/employees/?lang=${language}`),
          fetch(`${base}/api/departments/?lang=${language}`)
        ]);
        if (!eRes.ok || !dRes.ok) throw new Error("Server xatosi");
        const eData = await eRes.json();
        const rawEmployees = Array.isArray(eData) ? eData : (eData.results || []);
const sortedByOrder = [...rawEmployees].sort((a, b) => (a.order || 0) - (b.order || 0));
setEmployees(sortedByOrder);
        setDepartments(Array.isArray(dData) ? dData : (dData.results || []));
      } catch (err) {
        console.error("API xatoligi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [language]);

  // Tanlangan qavatda mavjud bo'limlar (department_name orqali)
  const deptsOnFloor = departments.filter(dept =>
    selectedFloor === 'all'
      ? true
      : employees.some(e =>
          String(e.floor) === String(selectedFloor) &&
          (e.department_name === dept.name ||
           String(e.department) === String(dept.id))
        )
  );

  // Asosiy filter
  const filteredEmployees = employees.filter(emp => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const floorOk = selectedFloor === 'all' || String(emp.floor) === String(selectedFloor);
      const deptOk  = selectedDept  === 'all' || emp.department_name === selectedDept || String(emp.department) === String(selectedDept);
      const textOk  = (
        (emp.full_name       || '').toLowerCase().includes(term) ||
        (emp.position        || '').toLowerCase().includes(term) ||
        (emp.department_name || '').toLowerCase().includes(term) ||
        (emp.room && String(emp.room).includes(term))
      );
      return floorOk && deptOk && textOk;
    }
    const floorOk = selectedFloor === 'all' || String(emp.floor) === String(selectedFloor);
    const deptOk  = selectedDept  === 'all' ||
                    emp.department_name === selectedDept ||
                    String(emp.department) === String(selectedDept);
    return floorOk && deptOk;
  });

  const handleFloorClick = (floor) => {
    setSelectedFloor(floor);
    setSelectedDept('all'); // qavat o'zgarganda bo'limni reset qil
  };

  const floorLabel = (f) => {
    if (language === 'ru') return `${f} этаж`;
    if (language === 'en') return `Floor ${f}`;
    return `${f}-qavat`;
  };

  const getTitle = () => {
    if (searchTerm) return `🔍 ${t('results') || 'Natijalar'}`;
    if (selectedFloor !== 'all' && selectedDept !== 'all') return selectedDept;
    if (selectedFloor !== 'all') return floorLabel(selectedFloor);
    if (selectedDept  !== 'all') return selectedDept;
    return t('all_employees') || 'Barcha xodimlar';
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0 pointer-events-none" />

      {/* MODAL */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          language={language}
        />
      )}

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-4 md:p-5 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all font-bold uppercase text-sm cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn')}
        </button>

        <div className="flex-1 mx-4 md:mx-8 relative max-w-3xl">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/50 text-white border-2 border-white/10 rounded-2xl py-3 pl-14 pr-5 text-base md:text-lg focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400"
          />
        </div>

        <h1 className="text-lg md:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2 shrink-0">
          <FaUserTie className="text-blue-400" /> {t('menu_employees')}
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 flex gap-4 p-4 md:p-5 overflow-hidden">

        {/* ── YON PANEL ── */}
        <div className="w-60 md:w-68 flex flex-col bg-slate-800/50 border border-white/10 rounded-2xl shrink-0 overflow-hidden h-full">

          {/* QAVATLAR — gorizontal tugmalar */}
          <div className="p-3 border-b border-white/10 shrink-0">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
              <FaBuilding className="text-blue-400" />
              {language === 'ru' ? 'Этаж' : language === 'en' ? 'Floor' : 'Qavat'}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => handleFloorClick('all')}
                className={`flex-1 py-2 rounded-lg font-black text-[11px] transition-all cursor-pointer ${selectedFloor === 'all' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                {language === 'ru' ? 'Все' : language === 'en' ? 'All' : 'Bari'}
              </button>
              {['5','4','3','2','1'].map(f => (
                <button
                  key={f}
                  onClick={() => handleFloorClick(f)}
                  className={`flex-1 py-2 rounded-lg font-black text-sm transition-all cursor-pointer ${selectedFloor === f ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* BO'LIMLAR ro'yxati */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            <div className="flex items-center justify-between px-2 py-1.5 sticky top-0 bg-slate-800/80">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <FaLayerGroup className="text-amber-400" />
                {language === 'ru' ? 'Отдел' : language === 'en' ? 'Dept' : "Bo'lim"}
              </p>
              {selectedFloor !== 'all' && (
                <span className="text-[10px] text-blue-400 font-bold">{floorLabel(selectedFloor)}</span>
              )}
            </div>

            <button
              onClick={() => setSelectedDept('all')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${selectedDept === 'all' ? 'bg-amber-500 text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            >
              {language === 'ru' ? 'Все отделы' : language === 'en' ? 'All depts' : "Barchasi"}
            </button>

            {deptsOnFloor.map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.name)}
                className={`w-full px-3 py-2.5 rounded-xl text-left text-xs leading-snug transition-all cursor-pointer ${selectedDept === dept.name ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10 font-medium'}`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── XODIMLAR ── */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
          {/* Sarlavha */}
          <div className="p-4 border-b border-white/10 bg-slate-800/80 shrink-0 flex items-center justify-between">
            <h2 className="text-base md:text-lg text-white font-bold truncate max-w-xs">{getTitle()}</h2>
            <span className="text-xs font-black text-blue-300 bg-blue-900/50 border border-blue-500/30 px-3 py-1.5 rounded-full shrink-0 ml-2">
              {filteredEmployees.length} {language === 'ru' ? 'чел.' : language === 'en' ? 'emp.' : 'ta'}
            </span>
          </div>

          {/* Kartochkalar */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-blue-400">
                <FaSpinner className="animate-spin text-5xl mb-4" />
                <p className="font-bold tracking-widest uppercase text-sm">{t('loading')}</p>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-40">
                <FaUserTie className="text-6xl mb-4 text-gray-600" />
                <p className="text-xl text-white font-black uppercase tracking-widest">{t('no_results')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-10">
                {filteredEmployees.map((e, i) => {
                  const name     = e.full_name      || "Noma'lum xodim";
                  const pos      = e.position       || '';
                  const deptName = e.department_name || '';
                  return (
                    <div
                      key={e.id || i}
                      onClick={() => setSelectedEmployee(e)}
                      className="bg-slate-800/90 p-4 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:bg-slate-700/80 transition-all shadow-lg flex flex-col justify-between cursor-pointer active:scale-95"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-14 h-14 rounded-xl bg-slate-700 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                          {e.image
                            ? <img src={e.image} alt={name} className="w-full h-full object-cover" />
                            : <FaUserTie className="text-2xl text-slate-500" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-black text-white leading-tight mb-1 line-clamp-2">{name}</h3>
                          <p className="text-xs text-blue-400 font-semibold line-clamp-2 leading-snug mb-1.5">{pos}</p>
                          <span className="text-[10px] text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md line-clamp-1">{deptName}</span>
                        </div>
                      </div>
                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                          {e.floor && <><FaBuilding className="text-slate-500 text-[10px]" /> {e.floor}{t('floor')}</>}
                          {e.room  && <><span className="mx-1 opacity-30">·</span><FaDoorOpen className="text-slate-500 text-[10px]" /> {e.room}</>}
                        </div>
                        {e.phone && (
                          <div className="flex items-center gap-1 text-emerald-400 font-mono font-black text-sm">
                            <FaPhoneAlt className="text-[10px] text-emerald-500" /> {e.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;