import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaArrowLeft, FaSearch, FaUserTie, FaPhoneAlt, 
  FaBuilding, FaLayerGroup, FaUniversity, FaIdBadge,
  FaHandshake, FaChalkboardTeacher, FaBalanceScale, 
  FaLaptopCode, FaShieldAlt
} from 'react-icons/fa';

// Ixchamlashtirish funksiyasi (baza qisqa bo'lishi uchun)
const emp = (id, floor, deptId, tel, nameUz, posUz, nameRu, posRu, nameEn, posEn) => ({
  id, floor, deptId, room: `${floor}0${id % 9 + 1}`, tel: tel || `${floor}0-${id % 9 + 1}`,
  name: { uz: nameUz, ru: nameRu, en: nameEn },
  position: { uz: posUz, ru: posRu, en: posEn }
});

const Employees = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('floor'); 
  const [activeFilter, setActiveFilter] = useState('all');

  const departmentsList = [
    { id: 'rahbariyat', name: t('d_rahbariyat'), icon: <FaUniversity /> },
    { id: 'kadrlar', name: t('d_kadrlar'), icon: <FaIdBadge /> },
    { id: 'tashkiliy', name: t('d_tashkiliy'), icon: <FaLayerGroup /> },
    { id: 'shaxsiy', name: t('d_shaxsiy'), icon: <FaShieldAlt /> },
    { id: 'jamoatchilik', name: t('d_jamoatchilik'), icon: <FaUserTie /> },
    { id: 'uslubiy', name: t('d_uslubiy'), icon: <FaBuilding /> },
    { id: 'elektron', name: t('d_elektron'), icon: <FaLaptopCode /> },
    { id: 'bakalavr', name: t('d_bakalavr'), icon: <FaChalkboardTeacher /> },
    { id: 'magistratura', name: t('d_magistratura'), icon: <FaChalkboardTeacher /> },
    { id: 'ilmiy_innovatsion', name: t('d_ilmiy_innovatsion'), icon: <FaUniversity /> },
    { id: 'antikorrupsiya', name: t('d_antikorrupsiya'), icon: <FaShieldAlt /> },
    { id: 'akt', name: t('d_akt'), icon: <FaLaptopCode /> },
    { id: 'xalqaro', name: t('d_xalqaro'), icon: <FaHandshake /> },
    { id: 'jinoyat', name: t('d_jinoyat'), icon: <FaBalanceScale /> },
    { id: 'tergov', name: t('d_tergov'), icon: <FaBalanceScale /> },
    { id: 'kriminalistika', name: t('d_kriminalistika'), icon: <FaBalanceScale /> },
    { id: 'tillar', name: t('d_tillar'), icon: <FaChalkboardTeacher /> },
  ];

  // BARCHA XODIMLAR BAZASI (125 nafar)
  const employeesDatabase = [
    // --- 5-QAVAT ---
    emp(1, '5', 'rahbariyat', '50-01', "Kolenko Yevgeniy Vyacheslavovich", "Akademiya boshlig'ining birinchi o'rinbosari", "Коленко Евгений Вячеславович", "Первый заместитель начальника Академии", "Kolenko Evgeniy Vyacheslavovich", "First Deputy Head of the Academy"),
    emp(2, '5', 'rahbariyat', '50-02', "Turaxonov Durbek Lermonovich", "Akademiya boshlig'i o'rinbosari", "Турахонов Дурбек Лермонович", "Заместитель начальника Академии", "Turakhonov Durbek Lermonovich", "Deputy Head of the Academy"),
    emp(3, '5', 'rahbariyat', '50-03', "Odinayev Adham Sa'dulloyevich", "Akademiya boshlig'i o'rinbosari", "Одинаев Адхам Саъдуллоевич", "Заместитель начальника Академии", "Odinaev Adham Sadulloevich", "Deputy Head of the Academy"),
    emp(4, '5', 'rahbariyat', '50-04', "Nigmadjanov Uyg'un Uchqunovich", "Akademiya boshlig'i o'rinbosari", "Нигмаджанов Уйгун Учкунович", "Заместитель начальника Академии", "Nigmadjanov Uygun Uchkunovich", "Deputy Head of the Academy"),
    emp(5, '5', 'rahbariyat', '50-05', "Xabiljonov Sheroz Xabiljon o'g'li", "Boshliq yordamchisi", "Хабилжонов Шероз Хабилжон ўғли", "Помощник начальника", "Khabiljonov Sheroz Xabiljon ugli", "Assistant to the Head"),
    emp(10, '5', 'kadrlar', '51-01', "Xolmatov Muxtor Muxamedovich", "Kadrlar bo'limi boshlig'i", "Холматов Мухтор Мухамедович", "Начальник отдела кадров", "Kholmatov Mukhtor Mukhamedovich", "Head of HR Department"),
    emp(11, '5', 'kadrlar', '51-02', "Gafurov Rustam Baxtiyarovich", "Kadrlar bo'limi katta prokurori", "Гафуров Рустам Бахтиярович", "Старший прокурор отдела кадров", "Gafurov Rustam Bakhtiyarovich", "Senior Prosecutor of HR"),
    emp(13, '5', 'tashkiliy', '52-01', "Hamidov Azizbek Olimjonovich", "Tashkiliy-nazorat bo'limi boshlig'i", "Ҳамидов Азизбек Олимжонович", "Начальник организационно-контрольного отдела", "Khamidov Azizbek Olimjonovich", "Head of Organizational Control"),
    
    // --- 4-QAVAT ---
    emp(81, '4', 'xalqaro', '40-01', "Akbutayev Abror Abdurahmanovich", "Xalqaro hamkorlik bo'limi boshlig'i", "Акбутаев Аброр Абдурахманович", "Начальник отдела международного сотрудничества", "Akbutayev Abror Abdurakhmanovich", "Head of International Cooperation"),
    emp(82, '4', 'xalqaro', '40-02', "Turdiyev Bobir Sobirovich", "Xalqaro hamkorlik bo'limi katta prokurori", "Турдиев Бобир Собирович", "Старший прокурор отдела", "Turdiyev Bobir Sobirovich", "Senior Prosecutor of the Dept"),
    emp(100, '4', 'kriminalistika', '41-01', "Astanov Istam Rustamovich", "Kriminalistika kafedrasi boshlig'i", "Астанов Истам Рустамович", "Начальник кафедры криминалистики", "Astanov Istam Rustamovich", "Head of Criminalistics Dept"),
    emp(101, '4', 'kriminalistika', '41-02', "Mirzaxodjayev Davron Atxamovich", "Kafedra katta o'qituvchisi", "Мирзаходжаев Даврон Атхамович", "Старший преподаватель", "Mirzakhodjayev Davron Atkhamovich", "Senior Lecturer"),
    emp(122, '4', 'tillar', '42-01', "Mirzoqulova Xursanoy Ne'matjonovna", "Til o'rgatish kafedrasi katta o'qituvchisi", "Мирзокулова Хурсаной Нематжоновна", "Старший преподаватель кафедры", "Mirzokulova Khursanoy Nematjonovna", "Senior Lecturer"),

    // --- 3-QAVAT ---
    emp(84, '3', 'jinoyat', '30-01', "Karimov Xurshid Akramovich", "Jinoyat huquqi kafedrasi boshlig'i", "Каримов Хуршид Акрамович", "Начальник кафедры уголовного права", "Karimov Khurshid Akramovich", "Head of Criminal Law Dept"),
    emp(85, '3', 'jinoyat', '30-02', "Abduraxmanov Azizbek Uralovich", "Kafedra katta o'qituvchisi", "Абдурахманов Азизбек Уралович", "Старший преподаватель", "Abdurakhmanov Azizbek Uralovich", "Senior Lecturer"),
    emp(91, '3', 'tergov', '31-01', "Xikmatov Aziz Bobonarovich", "Dastlabki tergov kafedrasi boshlig'i", "Хикматов Азиз Бобонарович", "Начальник кафедры", "Khikmatov Aziz Bobonarovich", "Head of Dept"),
    emp(109, '3', 'prokurorlik', '32-01', "Komilov Avazbek Bokijonovich", "Prokurorlik faoliyati kafedrasi boshlig'i", "Комилов Авазбек Бокижонович", "Начальник кафедры", "Komilov Avazbek Bokijonovich", "Head of Dept"),
    emp(115, '3', 'sud_vakolat', '33-01', "Qandahorova Dilnoza Sattorovna", "Kafedra katta o'qituvchisi", "Қандаҳорова Дилноза Сатторовна", "Старший преподаватель", "Kandakhorova Dilnoza Sattorovna", "Senior Lecturer"),

    // --- 2-QAVAT ---
    emp(16, '2', 'shaxsiy', '20-01', "Sheraliyev Ulug'bek Bekmirzayevich", "Shaxsiy xavfsizlik bo'limi boshlig'i", "Шералиев Улуғбек Бекмирзаевич", "Начальник отдела личной безопасности", "Sheraliyev Ulugbek Bekmirzayevich", "Head of Internal Security"),
    emp(53, '2', 'antikorrupsiya', '21-01', "Tursunbekov Xudayberdi", "Antikorrupsiya markazi boshlig'i", "Турсунбеков Худайберди", "Начальник антикоррупционного центра", "Tursunbekov Khudayberdi", "Head of Anti-Corruption Center"),
    emp(54, '2', 'antikorrupsiya', '21-02', "Safarov Temur Uktamovich", "Markaz katta prokurori", "Сафаров Темур Уктамович", "Старший прокурор", "Safarov Temur Uktamovich", "Senior Prosecutor"),
    emp(59, '2', 'buxgalteriya', '22-01', "Xakimov Nodir Nazarovich", "Buxgalteriya bo'limi boshlig'i", "Хакимов Нодир Назарович", "Начальник бухгалтерии", "Khakimov Nodir Nazarovich", "Head of Accounting"),

    // --- 1-QAVAT ---
    emp(21, '1', 'uslubiy', '10-01', "Palvanov Marat Biyembetovich", "O'quv-uslubiy boshqarma boshlig'i", "Палванов Марат Биембетович", "Начальник учебно-методического управления", "Palvanov Marat Biyembetovich", "Head of Educational-Methodological Dept"),
    emp(28, '1', 'elektron', '11-01', "Ibraymov Askar Yesbosinovich", "Elektron ta'lim bo'limi boshlig'i", "Ибраймов Аскар Есбосинович", "Начальник отдела электронного обучения", "Ibraymov Askar Yesbosinovich", "Head of E-Learning Dept"),
    emp(34, '1', 'bakalavr', '12-01', "Qayumov Baxtiyor Erkinjonovich", "Bakalavriat fakulteti boshlig'i", "Каюмов Бахтиёр Эркинжонович", "Начальник факультета бакалавриата", "Kayumov Bakhtiyor Erkinjonovich", "Head of Undergraduate Faculty"),
    emp(38, '1', 'magistratura', '13-01', "Xidoyatullayev Alisher Toirovich", "Magistratura fakulteti boshlig'i", "Хидоятуллаев Алишер Тоирович", "Начальник факультета магистратуры", "Khidoyatullayev Alisher Toirovich", "Head of Master's Faculty"),
    emp(67, '1', 'akt', '14-01', "G'iyosov Bilolbek Jumazoda", "AKT bo'limi boshlig'i", "Ғиёсов Билолбек Жумазода", "Начальник отдела ИКТ", "Giyosov Bilolbek Jumazoda", "Head of ICT Dept"),
    emp(72, '1', 'yoshlar', '15-01', "Azimov Akmal Atxamovich", "Yoshlar bilan ishlash bo'limi boshlig'i", "Азимов Акмал Атхамович", "Начальник отдела по работе с молодежью", "Azimov Akmal Atkhamovich", "Head of Youth Affairs"),
  ];

  const filteredEmployees = employeesDatabase.filter(emp => {
    const empName = emp.name[language] || emp.name['uz'];
    const empPos = emp.position[language] || emp.position['uz'];
    const empDept = t(`d_${emp.deptId}`);
    
    if (searchTerm) {
      return (
        empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empPos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        empDept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.room.includes(searchTerm)
      );
    }
    if (activeFilter === 'all') return true;
    if (filterType === 'floor') return emp.floor === activeFilter;
    if (filterType === 'dept') return emp.deptId === activeFilter;
    return true;
  });

  const getFilterTitle = () => {
    if (searchTerm) return `🔍 ${t('results')}`;
    if (activeFilter === 'all') return t('all_employees');
    if (filterType === 'floor') return `${activeFilter}${t('floor')}`;
    const dept = departmentsList.find(d => d.id === activeFilter);
    return dept ? dept.name : activeFilter;
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10 shadow-lg gap-4 shrink-0">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-sm md:text-xl font-bold uppercase w-fit self-start md:self-auto cursor-pointer">
          <FaArrowLeft /> {t('back_btn')}
        </button>
        <div className="w-full md:flex-1 md:mx-8 relative max-w-2xl">
          <FaSearch className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-2xl" />
          <input type="text" placeholder={t('search_placeholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-700/50 text-white border-2 border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 md:pl-16 pr-4 text-base md:text-2xl focus:outline-none focus:border-blue-400 transition-all placeholder-gray-500 shadow-inner" />
        </div>
        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider hidden md:block">
          {t('menu_employees')}
        </h1>
      </div>

      {/* MAIN */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-6 overflow-hidden">
        
        {/* SIDEBAR */}
        <div className="w-full md:w-80 flex flex-col bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl shrink-0 overflow-hidden h-fit md:h-full">
          <div className="flex p-1.5 bg-black/20 m-2 rounded-xl shrink-0">
            <button onClick={() => { setFilterType('floor'); setActiveFilter('all'); }} className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${filterType === 'floor' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}><FaBuilding /> {t('filter_floors')}</button>
            <button onClick={() => { setFilterType('dept'); setActiveFilter('all'); }} className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${filterType === 'dept' ? 'bg-amber-500 text-black shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}><FaLayerGroup /> {t('filter_depts')}</button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-3 space-y-1.5 md:space-y-2 max-h-[150px] md:max-h-full">
            <button onClick={() => setActiveFilter('all')} className={`w-full p-3 md:p-4 rounded-xl text-left font-bold transition-all border border-transparent flex items-center gap-3 text-sm md:text-base cursor-pointer ${activeFilter === 'all' ? 'bg-white/10 border-white/20 text-white' : 'text-gray-400 hover:bg-white/5'}`}><div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">A</div>{t('all_employees')}</button>
            {filterType === 'floor' ? (
              ['5', '4', '3', '2', '1'].map(floor => (
                <button key={floor} onClick={() => setActiveFilter(floor)} className={`w-full p-3 md:p-4 rounded-xl flex items-center justify-between transition-all border border-transparent text-sm md:text-base cursor-pointer ${activeFilter === floor ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>
                  <div className="flex items-center gap-4"><span className="font-bold">{floor}{t('floor')}</span></div><FaBuilding className="opacity-50" />
                </button>
              ))
            ) : (
              departmentsList.map(dept => (
                <button key={dept.id} onClick={() => setActiveFilter(dept.id)} className={`w-full p-3 md:p-4 rounded-xl flex items-center gap-3 transition-all border border-transparent text-xs md:text-sm leading-tight cursor-pointer ${activeFilter === dept.id ? 'bg-amber-500 text-black shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>
                  <span className="shrink-0">{dept.icon}</span><span className="font-bold text-left">{dept.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* RESULTS */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col h-full shadow-inner">
          <div className="p-4 md:p-6 border-b border-white/10 bg-white/5 shrink-0 z-20">
             <h2 className="text-lg md:text-xl text-white font-bold flex items-center gap-2">
                {getFilterTitle()} <span className="ml-auto text-xs md:text-sm font-normal text-gray-400 bg-black/20 px-3 py-1 rounded-full">{filteredEmployees.length}</span>
             </h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-24 md:pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((e) => {
                  const name = e.name[language] || e.name['uz'];
                  const pos = e.position[language] || e.position['uz'];
                  return (
                  <div key={e.id} className="bg-slate-800/80 p-4 md:p-5 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-all hover:bg-slate-800 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl md:text-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform"><FaUserTie /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-white leading-tight mb-1 truncate" title={name}>{name}</h3>
                        <p className="text-xs md:text-sm text-blue-400 font-medium mb-2 line-clamp-2" title={pos}>{pos}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] md:text-xs text-gray-300">{t(`d_${e.deptId}`)}</span>
                          <span className="bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold">{e.room}{t('room')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs font-bold uppercase"><FaBuilding /> {e.floor}{t('floor')}</div>
                        <div className="flex items-center gap-1 text-lg md:text-xl font-black text-green-400"><FaPhoneAlt className="text-xs" /> {e.tel}</div>
                    </div>
                  </div>
                )})
              ) : (
                <div className="col-span-full py-10 opacity-50 text-center flex flex-col items-center"><FaUserTie className="text-6xl mb-4 text-gray-600" /><p className="text-lg text-white font-bold">{t('no_results')}</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;