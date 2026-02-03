import React, { createContext, useState, useContext } from 'react';

const translations = {
  uz: {
    // --- 1. MENYU VA HEADER ---
    header_title: "Huquqni Muhofaza Qilish Akademiyasi",
    menu_employees: "Tuzilma va Xodimlar",
    menu_docs: "Hujjatlar Bazasi",
    menu_transport: "Transport",
    menu_wifi: "Wi-Fi va Xizmatlar",
    menu_achievements: "Yutuqlarimiz",
    menu_map: "Interaktiv Xarita",
    welcome: "Axborot Kioski",
    back: "Orqaga",
    search_placeholder: "Qidiruv...",
    not_found: "Ma'lumot topilmadi",
    
    // --- 2. XODIMLAR (Lavozimlar) ---
    emp_title: "Xodimlar Ro'yxati",
    role_boss: "Akademiya Boshlig'i",
    role_deputy: "O'quv ishlari bo'yicha o'rinbosar",
    role_head: "Kafedra Boshlig'i",
    role_teacher: "Katta O'qituvchi",
    role_docent: "Dotsent",
    role_section_head: "Bo'lim Boshlig'i",
    role_accountant: "Bosh Hisobchi",
    role_ict_spec: "AKT Mutaxassisi",

    // --- 3. XODIMLAR (Bo'limlar) ---
    tab_leadership: "Rahbariyat",
    tab_kafedra: "Kafedralar",
    tab_department: "Bo'limlar",
    
    dept_leadership: "Rahbariyat",
    dept_criminal: "Jinoyat Huquqi",
    dept_civil: "Fuqarolik Huquqi",
    dept_hr: "Kadrlar Bo'limi",
    dept_accounting: "Buxgalteriya",
    dept_ict: "AKT Bo'limi",
    
    room: "Xona",
    phone: "Tel",

    // --- 4. HUJJATLAR ---
    doc_title: "Me'yoriy Hujjatlar",
    tab_rules: "Nizomlar",
    tab_app: "Arizalar",
    tab_blanks: "Blankalar",
    download: "Yuklash",
    scan: "Skanerlang",
    
    // Hujjat nomlari
    doc_nizom: "Akademiya Nizomi",
    doc_qabul: "O'qishga qabul qilish tartibi",
    doc_ariza: "Ariza namunasi (Rektor nomiga)",
    doc_obektivka: "Ma'lumotnoma (Obektivka)",

    // --- 5. TRANSPORT ---
    trans_title: "Transport Qatnovi",
    tab_bus: "Avtobuslar",
    tab_metro: "Metro",
    tab_taxi: "Taksi",
    
    route_center: "Akademiya — Markaz (Skver)",
    route_market: "Akademiya — Chorsu Bozori",
    interval: "Oraliq vaqt",
    min: "daq",
    
    metro_name: "Buyuk Ipak Yo'li bekati",
    metro_dist: "Akademiyadan 1.5 km masofada",
    
    taxi_name: "Yandex Go / MyTaxi",
    taxi_loc: "Lokatsiya: Akademiya Darvozasi",

    // --- 6. WIFI ---
    wifi_title: "Wi-Fi va Havolalar",
    wifi_name: "Tarmoq nomi",
    wifi_pass: "Parol",
    wifi_links_title: "Foydali Havolalar",
    
    link_hemis: "Hemis Tizimi",
    link_lib: "Kutubxona Bazasi",
    link_remote: "Masofaviy Ta'lim",
    link_site: "Rasmiy Sayt",

    // --- 7. YUTUQLAR ---
    achieve_title: "Faxrli Yutuqlarimiz",
    
    achieve_1_title: "Xalqaro Olimpiada",
    achieve_1_desc: "Kursantlarimiz huquqshunoslik fanidan 1-o'rinni egallashdi.",
    
    achieve_2_title: "Sport Musobaqasi",
    achieve_2_desc: "Dzyudo bo'yicha Osiyo chempionati g'oliblari.",
    
    achieve_3_title: "IT Tanlov",
    achieve_3_desc: "Eng yaxshi dasturiy ta'minot nominatsiyasi g'olibi.",
    
    achieve_4_title: "Zakovat O'yini",
    achieve_4_desc: "Respublika bosqichida faxrli 2-o'rin.",

    // --- 8. XARITA ---
    map_title: "Akademiya Xaritasi",
    map_select: "Ma'lumot olish uchun binoni tanlang",
    map_floor: "qavat",
    
    building_admin: "Xodimlar Binosi",
    building_edu: "Asosiy O'quv Binosi",
    building_edu_small: "Kichik O'quv Binosi",
    building_dorm: "Yotoqxona",
    building_sport: "Sport Kompleksi",
    building_lab: "Kriminalistik Poligon",
    
    building_desc_admin: "Ma'muriyat va Kafedralar",
    building_desc_edu: "Auditoriyalar va Katta zal",
    building_desc_small: "Qo'shimcha dars xonalari",
    building_desc_dorm: "Talabalar turar joyi",
    building_desc_sport: "Tez kunda...",
    building_desc_lab: "Loyiha bosqichida",
  },
  
  ru: {
    // МЕНЮ
    header_title: "Правоохранительная Академия",
    menu_employees: "Сотрудники",
    menu_docs: "Документы",
    menu_transport: "Транспорт",
    menu_wifi: "Wi-Fi и Сервисы",
    menu_achievements: "Достижения",
    menu_map: "Карта",
    welcome: "Информационный Киоск",
    back: "Назад",
    search_placeholder: "Поиск...",
    not_found: "Ничего не найдено",

    // СОТРУДНИКИ
    emp_title: "Список Сотрудников",
    role_boss: "Начальник Академии",
    role_deputy: "Зам. начальника (Учебная часть)",
    role_head: "Начальник кафедры",
    role_teacher: "Старший преподаватель",
    role_docent: "Доцент",
    role_section_head: "Начальник отдела",
    role_accountant: "Главный бухгалтер",
    role_ict_spec: "Специалист ИКТ",

    tab_leadership: "Руководство",
    tab_kafedra: "Кафедры",
    tab_department: "Отделы",
    
    dept_leadership: "Руководство",
    dept_criminal: "Уголовное право",
    dept_civil: "Гражданское право",
    dept_hr: "Отдел кадров",
    dept_accounting: "Бухгалтерия",
    dept_ict: "Отдел ИКТ",
    
    room: "Каб",
    phone: "Тел",

    // ДОКУМЕНТЫ
    doc_title: "Нормативные Документы",
    tab_rules: "Уставы",
    tab_app: "Заявления",
    tab_blanks: "Бланки",
    download: "Скачать",
    scan: "Сканировать",
    
    doc_nizom: "Устав Академии",
    doc_qabul: "Порядок приема на обучение",
    doc_ariza: "Образец заявления (Ректору)",
    doc_obektivka: "Справка (Объективка)",

    // ТРАНСПОРТ
    trans_title: "Расписание Транспорта",
    tab_bus: "Автобусы",
    tab_metro: "Метро",
    tab_taxi: "Такси",
    
    route_center: "Академия — Центр (Сквер)",
    route_market: "Академия — Рынок Чорсу",
    interval: "Интервал",
    min: "мин",
    
    metro_name: "Станция Буюк Ипак Йули",
    metro_dist: "1.5 км от Академии",
    
    taxi_name: "Yandex Go / MyTaxi",
    taxi_loc: "Локация: Ворота Академии",

    // WIFI
    wifi_title: "Wi-Fi и Ссылки",
    wifi_name: "Имя сети",
    wifi_pass: "Пароль",
    wifi_links_title: "Полезные ссылки",
    
    link_hemis: "Система Hemis",
    link_lib: "Библиотека",
    link_remote: "Дист. Обучение",
    link_site: "Офиц. Сайт",

    // ДОСТИЖЕНИЯ
    achieve_title: "Наши Достижения",
    achieve_1_title: "Международная Олимпиада",
    achieve_1_desc: "Наши курсанты заняли 1-е место по юриспруденции.",
    achieve_2_title: "Спортивное Соревнование",
    achieve_2_desc: "Победители чемпионата Азии по дзюдо.",
    achieve_3_title: "IT Конкурс",
    achieve_3_desc: "Победитель в номинации лучшее ПО.",
    achieve_4_title: "Игра Заковат",
    achieve_4_desc: "Почетное 2-е место на республиканском этапе.",

    // КАРТА
    map_title: "Карта Академии",
    map_select: "Выберите здание для информации",
    map_floor: "этаж",
    
    building_admin: "Администрация",
    building_edu: "Учебный Корпус",
    building_edu_small: "Малый Учебный Корпус",
    building_dorm: "Общежитие",
    building_sport: "Спорткомплекс",
    building_lab: "Криминалистический полигон",

    building_desc_admin: "Администрация и Кафедры",
    building_desc_edu: "Аудитории и Актовый зал",
    building_desc_small: "Доп. учебные классы",
    building_desc_dorm: "Студенческое общежитие",
    building_desc_sport: "Скоро открытие...",
    building_desc_lab: "На стадии проекта",
  },

  en: {
    // MENU
    header_title: "Law Enforcement Academy",
    menu_employees: "Staff List",
    menu_docs: "Documents",
    menu_transport: "Transport",
    menu_wifi: "Wi-Fi & Services",
    menu_achievements: "Achievements",
    menu_map: "Map",
    welcome: "Info Kiosk",
    back: "Back",
    search_placeholder: "Search...",
    not_found: "Not found",

    // EMPLOYEES
    emp_title: "Staff Members",
    role_boss: "Head of Academy",
    role_deputy: "Deputy Head (Academic)",
    role_head: "Head of Department",
    role_teacher: "Senior Lecturer",
    role_docent: "Associate Professor",
    role_section_head: "Head of Division",
    role_accountant: "Chief Accountant",
    role_ict_spec: "ICT Specialist",

    tab_leadership: "Leadership",
    tab_kafedra: "Departments",
    tab_department: "Divisions",
    
    dept_leadership: "Leadership",
    dept_criminal: "Criminal Law",
    dept_civil: "Civil Law",
    dept_hr: "HR Department",
    dept_accounting: "Accounting",
    dept_ict: "ICT Department",
    
    room: "Room",
    phone: "Tel",

    // DOCUMENTS
    doc_title: "Regulations Database",
    tab_rules: "Regulations",
    tab_app: "Applications",
    tab_blanks: "Forms",
    download: "Download",
    scan: "Scan QR",
    
    doc_nizom: "Academy Charter",
    doc_qabul: "Admission Procedures",
    doc_ariza: "Application Sample (Rector)",
    doc_obektivka: "Reference (Resume)",

    // TRANSPORT
    trans_title: "Transport Schedule",
    tab_bus: "Buses",
    tab_metro: "Subway",
    tab_taxi: "Taxi",
    
    route_center: "Academy — Center (Amir Temur Sq)",
    route_market: "Academy — Chorsu Market",
    interval: "Interval",
    min: "min",
    
    metro_name: "Buyuk Ipak Yuli Station",
    metro_dist: "1.5 km from Academy",
    
    taxi_name: "Yandex Go / MyTaxi",
    taxi_loc: "Location: Academy Gate",

    // WIFI
    wifi_title: "Wi-Fi & Links",
    wifi_name: "Network",
    wifi_pass: "Password",
    wifi_links_title: "Useful Links",
    
    link_hemis: "Hemis System",
    link_lib: "Library Base",
    link_remote: "Distance Learning",
    link_site: "Official Website",

    // ACHIEVEMENTS
    achieve_title: "Our Achievements",
    achieve_1_title: "International Olympiad",
    achieve_1_desc: "Our cadets took 1st place in law.",
    achieve_2_title: "Sports Competition",
    achieve_2_desc: "Winners of the Asian Judo Championship.",
    achieve_3_title: "IT Contest",
    achieve_3_desc: "Winner in the Best Software nomination.",
    achieve_4_title: "Zakovat Game",
    achieve_4_desc: "Honorable 2nd place at the republican stage.",

    // MAP
    map_title: "Academy Map",
    map_select: "Select building for info",
    map_floor: "floors",
    
    building_admin: "Admin Building",
    building_edu: "Main Edu Building",
    building_edu_small: "Small Edu Building",
    building_dorm: "Dormitory",
    building_sport: "Sports Complex",
    building_lab: "Criminalistic Polygon",

    building_desc_admin: "Administration & Depts",
    building_desc_edu: "Auditoriums & Hall",
    building_desc_small: "Extra Classrooms",
    building_desc_dorm: "Student Housing",
    building_desc_sport: "Coming soon...",
    building_desc_lab: "Project stage",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('uz'); 
  const t = (key) => translations[lang][key] || key; 

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);