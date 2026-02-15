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
  
  // STATE: Qidiruv, Filter turi (Qavat yoki Bo'lim), va Tanlangan qiymat
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('floor'); // 'floor' (Qavat) yoki 'dept' (Bo'lim)
  const [activeFilter, setActiveFilter] = useState('all'); // Tanlangan qavat yoki bo'lim IDsi

  // 📂 BO'LIMLAR RO'YXATI (Kategoriyalar)
  const departmentsList = [
    { id: 'rahbariyat', name: "Akademiya rahbariyati", icon: <FaUniversity /> },
    { id: 'kadrlar', name: "Kadrlar va Tashkiliy-nazorat", icon: <FaIdBadge /> },
    { id: 'xalqaro', name: "Xalqaro hamkorlik", icon: <FaHandshake /> },
    { id: 'tillar', name: "Тил ўргатиш кафедраси", icon: <FaChalkboardTeacher /> },
    { id: 'sud', name: "Sud faoliyati", icon: <FaBalanceScale /> },
    { id: 'korrupsiya', name: "Antikorrupsiya markazi", icon: <FaShieldAlt /> },
    { id: 'it_dept', name: "AKT va axborot xavfsizligi", icon: <FaLaptopCode /> },
  ];

  // 👥 XODIMLAR BAZASI (1-5 qavatlar to'liq kiritildi)
  const employeesData = [
    // 5-QAVAT: RAHBARIYAT VA KADRLAR
    { id: 1, name: "Коленко Евгений Вячеславович", position: "Академия бошлиғининг биринчи ўринбосари", deptId: "rahbariyat", dept: "Rahbariyat", room: "501", tel: "50-01", floor: "5" },
    { id: 2, name: "Турахонов Дурбек Лермонович", position: "Академия бошлиғи ўринбосари", deptId: "rahbariyat", dept: "Rahbariyat", room: "502", tel: "50-02", floor: "5" },
    { id: 3, name: "Одинаев Адҳам Саъдуллоевич", position: "Академия бошлиғи ўринбосари", deptId: "rahbariyat", dept: "Rahbariyat", room: "503", tel: "50-03", floor: "5" },
    { id: 4, name: "Нигмаджанов Уйгун Учкунович", position: "Академия бошлиғи ўринбосари", deptId: "rahbariyat", dept: "Rahbariyat", room: "504", tel: "50-04", floor: "5" },
    { id: 5, name: "Хабилжонов Шероз Хабилжон ўғли", position: "Академия бошлиғи ёрдамчиcи", deptId: "rahbariyat", dept: "Rahbariyat", room: "500", tel: "50-00", floor: "5" },
    { id: 6, name: "Аҳмадқулов Диёрбек Жасуржон ўғли", position: "Котиб-иш юритувчи", deptId: "rahbariyat", dept: "Rahbariyat", room: "505", tel: "50-05", floor: "5" },
    { id: 7, name: "Маматов Достон Халил ўғли", position: "Котиб-иш юритувчи", deptId: "rahbariyat", dept: "Rahbariyat", room: "506", tel: "50-06", floor: "5" },
    { id: 8, name: "Сулаймонов Зокир Шокир ўғли", position: "Котиб-иш юритувчи", deptId: "rahbariyat", dept: "Rahbariyat", room: "507", tel: "50-07", floor: "5" },
    { id: 9, name: "Усмонов Алишер Ботиржон ўғли", position: "Котиб-иш юритувчи", deptId: "rahbariyat", dept: "Rahbariyat", room: "508", tel: "50-08", floor: "5" },
    { id: 10, name: "Холматов Мухтор Мухамедович", position: "Кадрлар бўлими бошлиғи", deptId: "kadrlar", dept: "Kadrlar бўлими", room: "510", tel: "51-10", floor: "5" },
    { id: 11, name: "Гафуров Рустам Бахтиярович", position: "Кадрлар бўлими катта прокурори", deptId: "kadrlar", dept: "Kadrlar бўлими", room: "511", tel: "51-11", floor: "5" },
    { id: 12, name: "Ҳамидов Азизбек Олимжонович", position: "Ташкилий-назорат бўлими бошлиғи", deptId: "kadrlar", dept: "Ташкилий-назорат", room: "515", tel: "51-15", floor: "5" },
    { id: 13, name: "Шарипов Зафар Умурзакович", position: "Ташкилий-назорат бўлими катта прокурори", deptId: "kadrlar", dept: "Ташкилий-назорат", room: "516", tel: "51-16", floor: "5" },

    // 4-QAVAT: XALQARO VA TILLAR
    { id: 14, name: "Акбутаев Аброр Абдурахманович", position: "Халқаро ҳамкорлик бўлими бошлиғи", deptId: "xalqaro", dept: "Xalqaro ҳамкорлик", room: "401", tel: "40-01", floor: "4" },
    { id: 15, name: "Турдиев Бобир Собирович", position: "Халқаро ҳамкорлик бўлими катта прокурори", deptId: "xalqaro", dept: "Xalqaro ҳамкорлик", room: "402", tel: "40-02", floor: "4" },
    { id: 16, name: "Мирзокуlova Хурсаной Нематжоновна", position: "Тил ўргатиш кафедраси катта ўқитувчи", deptId: "tillar", dept: "Тил ўргатиш кафедраси", room: "410", tel: "41-10", floor: "4" },
    { id: 17, name: "Нишонов Илхомджон Дилмуродович", position: "Тил ўргатиш кафедраси ўқитувчиси", deptId: "tillar", dept: "Тил ўргатиш кафедраси", room: "412", tel: "41-12", floor: "4" },

    // 3-QAVAT: SUDLARDA PROKUROR VAKOLATI
    { id: 18, name: "Қандаҳорова Дилноза Сатторовна", position: "Кафедра катта ўқитувчиси", deptId: "sud", dept: "Sud faoliyati", room: "301", tel: "30-01", floor: "3" },
    { id: 19, name: "Мирмахмудов Зоҳиджон Ирисматович", position: "Кафедра ўқитувчиси", deptId: "sud", dept: "Sud faoliyati", room: "302", tel: "30-02", floor: "3" },
    { id: 20, name: "Дусманов Санджар Абдужалолович", position: "Кафедра доценti", deptId: "sud", dept: "Sud faoliyati", room: "303", tel: "30-03", floor: "3" },
    { id: 21, name: "Ярашев Бахромбек Рустамович", position: "Кафедра катта ўқитувчиси", deptId: "sud", dept: "Sud faoliyati", room: "306", tel: "30-06", floor: "3" },

    // 2-QAVAT: KORRUPSIYAGA QARSHI KURASHISH
    { id: 22, name: "Турсунбеков Худайберди", position: "Коррупцияга қарши курашиш маркази бошлиғи", deptId: "korrupsiya", dept: "Antikorrupsiya", room: "201", tel: "20-01", floor: "2" },
    { id: 23, name: "Сафаров Темур Уктамович", position: "Марказ катта прокурори", deptId: "korrupsiya", dept: "Antikorrupsiya", room: "202", tel: "20-02", floor: "2" },
    { id: 24, name: "Борсиева Замират Хасанбековна", position: "Марказ прокурори", deptId: "korrupsiya", dept: "Antikorrupsiya", room: "203", tel: "20-03", floor: "2" },
    { id: 25, name: "Сайфулов Рустам Амирович", position: "Марказ катта прокурори", deptId: "korrupsiya", dept: "Antikorrupsiya", room: "204", tel: "20-04", floor: "2" },
    { id: 26, name: "Аҳмадов Алимардон Ахмадович", position: "Марказ прокурори", deptId: "korrupsiya", dept: "Antikorrupsiya", room: "205", tel: "20-05", floor: "2" },
    { id: 27, name: "Яздонов Ихтиёр Бахтиёрович", position: "Иш юритиш бўйича инспектор", deptId: "korrupsiya", dept: "Antikorrupsiya", room: "206", tel: "20-06", floor: "2" },

    // 1-QAVAT: AKT VA AXBOROT XAVFSIZLIGI
    { id: 28, name: "Ғиёсов Билолбек Жумазода", position: "АКТ ва ахборот хавфсизлиги бўлими бошлиғи", deptId: "it_dept", dept: "AKT бўлими", room: "101", tel: "10-01", floor: "1" },
    { id: 29, name: "Рахматов Хожиакбар Шовкат ўғли", position: "Бўлим прокурори", deptId: "it_dept", dept: "AKT бўлими", room: "102", tel: "10-02", floor: "1" },
    { id: 30, name: "Ғоффоров Сухроб Бегали ўғли", position: "Бўлим прокурори", deptId: "it_dept", dept: "AKT бўлими", room: "103", tel: "10-03", floor: "1" },
    { id: 31, name: "Алимов Жахонгир Холмамат ўғли", position: "Бўлим катта прокурори", deptId: "it_dept", dept: "AKT бўлими", room: "104", tel: "10-04", floor: "1" },
    { id: 32, name: "Нуралиев Беҳзод Музаффарович", position: "Бўлим техниги", deptId: "it_dept", dept: "AKT бўлими", room: "105", tel: "10-05", floor: "1" },
  ];

  // 🔍 FILTRLASH MANTIG'I
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
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
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

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`w-full p-4 rounded-xl text-left font-bold transition-all border border-transparent flex items-center gap-3 ${activeFilter === 'all' ? 'bg-white/10 border-white/20 text-white' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">A</div>
              Barcha xodimlar
            </button>

            {filterType === 'floor' ? (
              ['5', '4', '3', '2', '1'].map(floor => (
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
                    <span className="text-2xl font-black opacity-50">{floor}</span>
                    <span className="font-bold uppercase text-sm">{floor}-Qavat</span>
                  </div>
                  <FaBuilding className={`opacity-0 group-hover:opacity-50 ${activeFilter === floor ? 'opacity-100' : ''}`} />
                </button>
              ))
            ) : (
              departmentsList.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setActiveFilter(dept.id)}
                  className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all border border-transparent group ${
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
          <h2 className="text-xl text-white font-bold mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
             {searchTerm ? <>🔍 Qidiruv natijalari</> : (activeFilter === 'all' ? "Barcha xodimlar" : `${activeFilter}-qavat xodimlari`)}
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
                        <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300 font-medium">{emp.dept}</span>
                        <span className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded text-xs font-bold border border-amber-500/20">{emp.room}-xona</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase">
                        <FaBuilding /> {emp.floor}-qavat
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
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Employees;