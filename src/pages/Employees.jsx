import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  FaArrowLeft, FaSearch, FaUserTie, FaPhoneAlt,
  FaBuilding, FaLayerGroup, FaSpinner, FaTimes, FaDoorOpen
} from 'react-icons/fa';

// ─────────────────────────────────────────────
/// ... (importlar o'zgarishsiz qoladi)

// ─────────────────────────────────────────────
// YANGILANGAN MODAL — KATTAROQ VA INTERAKTIV
// ─────────────────────────────────────────────
const EmployeeModal = ({ employee, onClose, language }) => {
  if (!employee) return null;

  const name     = employee.full_name     || employee.full_name_uz || "Noma'lum";
  const pos      = employee.position      || employee.position_uz  || '';
  const deptName = employee.department_name || '';

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4 md:p-10"
      style={{ zIndex: 9999 }}
    >
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-white/20 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300"
        style={{ zIndex: 10000 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Yopish tugmasi */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg border border-white/10"
          style={{ zIndex: 10001 }}
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* CHAP TOMON: KATTA RASM */}
        <div className="w-full md:w-5/12 h-80 md:h-auto bg-slate-800 relative">
          {employee.image ? (
            <img src={employee.image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <FaUserTie className="text-9xl text-slate-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden"></div>
        </div>

        {/* O'NG TOMON: MA'LUMOTLAR */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-slate-900">
          <div className="mb-8">
            <span className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs md:text-sm mb-2 block">
               {language === 'ru' ? 'Сотрудник' : language === 'en' ? 'Employee' : 'Akademiya xodimi'}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              {name}
            </h1>
            <p className="text-blue-300 text-lg md:text-2xl font-bold uppercase border-l-4 border-blue-500 pl-4">
              {pos}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bo'lim */}
            <div className="col-span-1 md:col-span-2 flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <FaLayerGroup className="text-amber-400 text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">{language === 'ru' ? 'Отдел' : language === 'en' ? 'Department' : "Bo'lim"}</p>
                <p className="text-white font-bold text-base md:text-lg">{deptName}</p>
              </div>
            </div>

            {/* Qavat */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <FaBuilding className="text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">{language === 'ru' ? 'Этаж' : language === 'en' ? 'Floor' : 'Qavat'}</p>
                <p className="text-white font-black text-2xl">{employee.floor || '—'}</p>
              </div>
            </div>

            {/* Xona */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <FaDoorOpen className="text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">{language === 'ru' ? 'Кабинет' : language === 'en' ? 'Room' : 'Xona'}</p>
                <p className="text-white font-black text-2xl">{employee.room || '—'}</p>
              </div>
            </div>

            {/* Telefon */}
            <div className="col-span-1 md:col-span-2 flex items-center gap-4 bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 shadow-lg">
                <FaPhoneAlt className="text-emerald-400 text-2xl" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{language === 'ru' ? 'Внутренний номер' : language === 'en' ? 'Extension' : 'Ichki raqam'}</p>
                <p className="text-emerald-400 font-black text-3xl md:text-4xl font-mono leading-none mt-1">
                  {employee.phone || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ... (Employees komponentining qolgan qismi o'zgarishsiz qoladi)

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
          fetch(`${base}/api/departments/`)
        ]);

        if (!eRes.ok || !dRes.ok) throw new Error("Server xatosi");

        const eData = await eRes.json();
        const dData = await dRes.json();

        setEmployees(Array.isArray(eData) ? eData : (eData.results || []));
        setDepartments(Array.isArray(dData) ? dData : (dData.results || []));

      } catch (err) {
        console.error("API xatoligi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [language]);

  // BO'LIMLARNI QAVATGA QARAB FILTRLASH
  const deptsOnFloor = departments.filter(dept => {
    if (selectedFloor === 'all') return true;
    return employees.some(emp => 
      String(emp.floor) === String(selectedFloor) && (
        emp.department_name === (language === 'ru' ? dept.name_ru : language === 'en' ? dept.name_en : dept.name_uz) ||
        String(emp.department) === String(dept.id)
      )
    );
  }).sort((a, b) => Number(a.order || 0) - Number(b.order || 0));

  // YAXSHILANGAN QIDIRUV VA FILTRLASH
  const filteredEmployees = employees.filter(emp => {
    const floorOk = selectedFloor === 'all' || String(emp.floor) === String(selectedFloor);
    const deptOk  = selectedDept  === 'all' || emp.department_name === selectedDept || String(emp.department) === String(selectedDept);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      // Ism, lavozim, bo'lim nomi, xona yoki tel bo'yicha qidiruv
      return floorOk && (
        (emp.full_name || '').toLowerCase().includes(term) ||
        (emp.position || '').toLowerCase().includes(term) ||
        (emp.department_name || '').toLowerCase().includes(term) ||
        (emp.room && String(emp.room).includes(term)) ||
        (emp.phone && String(emp.phone).includes(term))
      );
    }
    return floorOk && deptOk;
  });

  const handleFloorClick = (floor) => {
    setSelectedFloor(floor);
    setSelectedDept('all');
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

      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          language={language}
        />
      )}

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

      <div className="relative z-10 flex-1 flex gap-4 p-4 md:p-5 overflow-hidden">
        <div className="w-60 md:w-68 flex flex-col bg-slate-800/50 border border-white/10 rounded-2xl shrink-0 overflow-hidden h-full">
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

            {deptsOnFloor.map(dept => {
              const deptName = language === 'ru' ? dept.name_ru : language === 'en' ? dept.name_en : dept.name_uz;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(deptName)}
                  className={`w-full px-3 py-2.5 rounded-xl text-left text-xs leading-snug transition-all cursor-pointer ${selectedDept === deptName ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10 font-medium'}`}
                >
                  {deptName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
          <div className="p-4 border-b border-white/10 bg-slate-800/80 shrink-0 flex items-center justify-between">
            <h2 className="text-base md:text-lg text-white font-bold truncate max-w-xs">{getTitle()}</h2>
            <span className="text-xs font-black text-blue-300 bg-blue-900/50 border border-blue-500/30 px-3 py-1.5 rounded-full shrink-0 ml-2">
              {filteredEmployees.length} {language === 'ru' ? 'чел.' : language === 'en' ? 'emp.' : 'ta'}
            </span>
          </div>

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
                {filteredEmployees
                  .sort((a, b) => {
                    // 1. Bo'lim tartibi (order) bo'yicha bog'lash
                    // Xodimning bo'limini uning nomi yoki ID-si orqali topamiz
                    const deptA = departments.find(d => 
                      String(d.id) === String(a.department) || 
                      d.name_uz === a.department_name || 
                      d.name_ru === a.department_name
                    );
                    const deptB = departments.find(d => 
                      String(d.id) === String(b.department) || 
                      d.name_uz === b.department_name || 
                      d.name_ru === b.department_name
                    );

                    const orderA = deptA ? (deptA.order || 999) : 999;
                    const orderB = deptB ? (deptB.order || 999) : 999;

                    // Agar bo'limlar har xil bo'lsa, bo'lim tartibi bo'yicha saralaymiz
                    if (orderA !== orderB) return orderA - orderB;

                    // 2. Bo'limlari bir xil bo'lsa, xodimning o'zini tartibi (order) bo'yicha
                    return Number(a.order || 0) - Number(b.order || 0);
                  })
                  .map((e, i) => (
                    <div
                      key={e.id || i}
                      onClick={() => setSelectedEmployee(e)}
                      className="bg-slate-800/90 p-4 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:bg-slate-700/80 transition-all shadow-lg flex flex-col justify-between cursor-pointer active:scale-95"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-14 h-14 rounded-xl bg-slate-700 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                          {e.image ? <img src={e.image} alt={e.full_name} className="w-full h-full object-cover" /> : <FaUserTie className="text-2xl text-slate-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-black text-white leading-tight mb-1 line-clamp-2">{e.full_name || "Noma'lum"}</h3>
                          <p className="text-xs text-blue-400 font-semibold line-clamp-2 leading-snug mb-1.5">{e.position || ''}</p>
                          <span className="text-[10px] text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md line-clamp-1">{e.department_name || ''}</span>
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
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;