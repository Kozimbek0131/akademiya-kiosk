import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import HeaderClock from '../components/HeaderClock'; // <-- 1. SOAT IMPORT QILINDI
import { FaArrowLeft, FaSearch, FaPhoneAlt, FaMapMarkerAlt, FaUserTie, FaBuilding, FaUniversity, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// ... (employeesData bazasi o'zgarishsiz qoladi, uni tegmang) ...
// Agar oldingi kodni saqlagan bo'lsangiz, data o'sha yerda tursin. 
// Men joyni tejash uchun datani qisqartirib yozaman, siz o'zingizdagi to'liq datani qoldiring.

const employeesData = [
  // RAHBARIYAT
  { id: 1, name: "Rustamov Anvar Ilhomovich", role: "role_boss", type: "rahbariyat", department: "dept_leadership", room: "201", phone: "71 200-01-01" },
  { id: 2, name: "Karimov Sherzod Olimovich", role: "role_deputy", type: "rahbariyat", department: "dept_leadership", room: "202", phone: "71 200-01-02" },
  // ... qolganlar ...
  { id: 3, name: "Ismoilov Botir Sobirovich", role: "role_head", type: "kafedra", department: "dept_criminal", room: "305", phone: "1234" },
  { id: 4, name: "Aliyeva Nargiza Rustamovna", role: "role_teacher", type: "kafedra", department: "dept_criminal", room: "306", phone: "1235" },
  { id: 5, name: "Tursunov Davronbek", role: "role_docent", type: "kafedra", department: "dept_civil", room: "310", phone: "1240" },
  { id: 6, name: "Qodirov Sardor", role: "role_section_head", type: "bolim", department: "dept_hr", room: "101", phone: "1100" },
  { id: 7, name: "Azimova Laylo", role: "role_accountant", type: "bolim", department: "dept_accounting", room: "102", phone: "1102" },
  { id: 8, name: "Rahimov Ulug'bek", role: "role_ict_spec", type: "bolim", department: "dept_ict", room: "105", phone: "1105" },
];

const Employees = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("rahbariyat");
  const [openDepartment, setOpenDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: 'rahbariyat', label: t('tab_leadership'), icon: <FaUniversity /> },
    { id: 'kafedra', label: t('tab_kafedra'), icon: <FaUserTie /> },
    { id: 'bolim', label: t('tab_department'), icon: <FaBuilding /> },
  ];

  const filteredData = employeesData.filter(item => {
    const translatedRole = t(item.role).toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          translatedRole.includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' ? true : item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const uniqueDepartments = [...new Set(filteredData.map(item => item.department))];

  const toggleDepartment = (deptKey) => {
      setOpenDepartment(openDepartment === deptKey ? null : deptKey);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans select-none animate-page">
      
      {/* 2. HEADER QISMI YANGILANDI */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-900 px-6 pt-6 pb-6 shadow-xl flex items-center justify-between relative z-20">
        
        {/* CHAP TOMON: Tugma va Sarlavha */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="bg-white/10 backdrop-blur-md p-3 rounded-xl text-white active:scale-95 transition-all border border-white/20 hover:bg-white/20"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider font-serif">
              {t('emp_title')}
            </h1>
            <div className="h-1 w-20 bg-amber-500 mt-2 rounded-full"></div>
          </div>
        </div>

        {/* O'NG TOMON: Soat */}
        <div>
          <HeaderClock />
        </div>

      </div>

      {/* TABLAR */}
      <div className="bg-white px-4 pt-4 shadow-sm z-10">
        <div className="flex gap-4 justify-center border-b border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveTab(cat.id); setOpenDepartment(null); }}
              className={`pb-4 px-4 flex items-center gap-2 font-bold text-lg transition-all relative ${
                activeTab === cat.id 
                  ? "text-blue-900" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {cat.icon}
              {cat.label}
              {activeTab === cat.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 rounded-t-full transition-all"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ASOSIY QISM */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-100">
         <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3 mb-4 sticky top-0 z-20">
            <FaSearch className="text-gray-400" />
            <input 
              type="text" 
              placeholder={t('search_placeholder')}
              className="w-full outline-none text-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

        {uniqueDepartments.length > 0 ? (
            uniqueDepartments.map((deptKey) => (
            <div key={deptKey} className="rounded-xl overflow-hidden shadow-md transition-all duration-300">
                <button 
                onClick={() => toggleDepartment(deptKey)}
                className={`w-full flex items-center justify-between p-5 text-left transition-all ${
                    openDepartment === deptKey ? "bg-blue-900 text-white" : "bg-white text-blue-900 hover:bg-blue-50"
                }`}
                >
                <div className="flex items-center gap-4">
                    <FaBuilding size={20}/>
                    <h2 className="text-lg font-bold uppercase tracking-wide">{t(deptKey)}</h2>
                </div>
                <div className={openDepartment === deptKey ? "text-amber-500" : "text-gray-300"}>
                    {openDepartment === deptKey ? <FaChevronUp size={18}/> : <FaChevronDown size={18}/>}
                </div>
                </button>

                {openDepartment === deptKey && (
                <div className="bg-white border-x border-b border-gray-200 p-4 space-y-4">
                    {filteredData
                    .filter(person => person.department === deptKey)
                    .map(person => (
                        <div key={person.id} className="group bg-white p-4 rounded-lg border border-gray-100 hover:border-blue-200 shadow-sm flex items-center gap-5 relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-amber-600"></div>
                          
                          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200 shadow-inner">
                              <FaUserTie className="text-2xl" />
                          </div>

                          <div className="flex-1">
                              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-0.5">
                                  {t(person.role)}
                              </p>
                              <h3 className="text-xl font-bold text-blue-950 leading-tight">{person.name}</h3>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1 rounded border border-gray-100 text-sm font-semibold">
                                <FaMapMarkerAlt className="text-red-500"/> 
                                <span>{t('room')} {person.room}</span>
                              </div>
                              <div className="flex items-center gap-2 text-blue-800 bg-blue-50 px-3 py-1 rounded border border-blue-100 text-sm font-bold">
                                <FaPhoneAlt size={12}/> 
                                <span>{person.phone}</span>
                              </div>
                          </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
            ))
        ) : (
            <div className="text-center text-gray-400 mt-10">
                <p>{t('not_found')}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Employees;