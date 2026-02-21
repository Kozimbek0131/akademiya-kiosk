import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz'); // Default: O'zbek

  // 📖 KATTA LUG'AT (Barcha sahifalar va MA'LUMOTLAR uchun)
  const translations = {
    uz: {
      // --- UMUMIY ---
      app_name: "HUQUQNI MUHOFAZA QILISH AKADEMIYASI",
      subtitle: "AXBOROT-RESURS KIOSKI",
      country_name: "O'ZBEKISTON RESPUBLIKASI",
      footer_text: "© 2026 Akademiya Axborot Texnologiyalari Markazi",
      back_btn: "ASOSIY MENYU",
      search_placeholder: "Qidiruv...",
      results: "Natijalar",
      no_results: "Hech kim topilmadi",
      loading: "Yuklanmoqda...",
      select_network: "Tarmoqni tanlang",
      scan_to_connect: "Ulanish uchun kamerani qarating",

      // --- ASOSIY MENYU (HOME) ---
      menu_employees: "XODIMLAR",
      menu_leadership: "RAHBARIYAT",
      menu_achievements: "YUTUQLAR",
      menu_documents: "HUJJATLAR",
      menu_transport: "TRANSPORT",
      menu_wifi: "WI-FI",
      menu_map: "XARITA",
      menu_faq: "MA'LUMOT",
      
      desc_employees: "Professor va o'qituvchilar",
      desc_leadership: "Akademiya rahbariyati",
      desc_achievements: "Akademiya yutuqlari",
      desc_documents: "Qonunlar va buyruqlar",
      desc_transport: "Yo'nalishlar",
      desc_wifi: "Bepul internet",
      desc_map: "Bino rejasi",
      desc_faq: "Savol-javoblar",

      // --- XODIMLAR (EMPLOYEES) ---
      filter_floors: "Qavatlar",
      filter_depts: "Bo'limlar",
      all_employees: "Barcha xodimlar",
      floor: "-Qavat",
      room: "-xona",

      // BO'LIMLAR (Lotin tilida)
      dept_rahbariyat: "Akademiya rahbariyati",
      dept_kadrlar: "Kadrlar va Tashkiliy-nazorat",
      dept_xalqaro: "Xalqaro hamkorlik",
      dept_tillar: "Til o'rgatish kafedrasi",
      dept_sud: "Sud faoliyati",
      dept_korrupsiya: "Antikorrupsiya markazi",
      dept_it: "AKT va axborot xavfsizligi",
      
      // XODIMLAR RO'YXATI (Lotin tilida)
      emp_1_name: "Kolenko Yevgeniy Vyacheslavovich",
      emp_1_position: "Akademiya boshlig'ining birinchi o'rinbosari",
      emp_2_name: "Turaxonov Durbek Lermonovich",
      emp_2_position: "Akademiya boshlig'i o'rinbosari",
      emp_3_name: "Odinayev Adham Sa'dulloyevich",
      emp_3_position: "Akademiya boshlig'i o'rinbosari",
      emp_4_name: "Nigmadjanov Uyg'un Uchqunovich",
      emp_4_position: "Akademiya boshlig'i o'rinbosari",
      emp_14_name: "Oqbutayev Abror Abdurahmanovich",
      emp_14_position: "Xalqaro hamkorlik bo'limi boshlig'i",
      emp_16_name: "Mirzoqulova Xursanoy Ne'matjonovna",
      emp_16_position: "Til o'rgatish kafedrasi katta o'qituvchisi",
      emp_18_name: "Qandahorova Dilnoza Sattorovna",
      emp_18_position: "Kafedra katta o'qituvchisi",
      emp_22_name: "Tursunbekov Xudayberdi",
      emp_22_position: "Korrupsiyaga qarshi kurashish markazi boshlig'i",
      emp_28_name: "G'iyosov Bilolbek Jumazoda",
      emp_28_position: "AKT bo'limi boshlig'i",

      // --- RAHBARIYAT (LEADERSHIP) ---
      page_leadership: "AKADEMIYA RAHBARIYATI",

      // --- HUJJATLAR (DOCUMENTS) ---
      page_documents: "ME'YORIY HUJJATLAR",
      cat_laws: "QONUNLAR",
      cat_decrees: "PREZIDENT FARMONLARI",
      cat_orders: "AKADEMIYA BUYRUQLARI",
      label_date: "Sana",
      label_size: "Hajmi",
      btn_read: "O'QISH",

      // --- TRANSPORT ---
      page_transport: "YO'NALISHNI IZLASH",
      label_where: "Qayerga borasiz?",
      placeholder_location: "Joy nomini yozing...",
      quick_routes: "Tezkor yo'nalishlar",
      route_airport: "Aeroport",
      route_station: "Janubiy Vokzal",
      route_market: "Chorsu Bozori",
      map_academy_loc: "Akademiya joylashuvi",

      // --- WI-FI ---
      page_wifi: "WI-FI TARMOQLARI",
      wifi_staff: "XODIMLAR",
      wifi_guest: "KONFERENSIYA",
      wifi_student: "TALABALAR",
      wifi_staff_desc: "Akademiya xodimlari uchun",
      wifi_guest_desc: "Mehmonlar va qatnashuvchilar uchun",
      wifi_student_desc: "Bakalavr va magistrlar uchun",
      scan_qr: "Skaner qiling",
      password: "Parol",
    },
    
    ru: {
      // --- ОБЩИЕ ---
      app_name: "ПРАВООХРАНИТЕЛЬНАЯ АКАДЕМИЯ",
      subtitle: "ИНФОРМАЦИОННО-РЕСУРСНЫЙ КИОСК",
      country_name: "РЕСПУБЛИКА УЗБЕКИСТАН",
      footer_text: "© 2026 Центр информационных технологий Академии",
      back_btn: "ГЛАВНОЕ МЕНЮ",
      search_placeholder: "Поиск...",
      results: "Результаты",
      no_results: "Ничего не найдено",
      loading: "Загрузка...",
      select_network: "Выберите сеть",
      scan_to_connect: "Наведите камеру для подключения",

      // --- ГЛАВНОЕ МЕНЮ ---
      menu_employees: "СОТРУДНИКИ",
      menu_leadership: "РУКОВОДСТВО",
      menu_achievements: "ДОСТИЖЕНИЯ",
      menu_documents: "ДОКУМЕНТЫ",
      menu_transport: "ТРАНСПОРТ",
      menu_wifi: "WI-FI",
      menu_map: "КАРТА",
      menu_faq: "ИНФО",

      desc_employees: "Профессора и преподаватели",
      desc_leadership: "Руководство Академии",
      desc_achievements: "Достижения Академии",
      desc_documents: "Законы и приказы",
      desc_transport: "Маршруты",
      desc_wifi: "Бесплатный интернет",
      desc_map: "План здания",
      desc_faq: "Вопросы и ответы",

      // --- СОТРУДНИКИ ---
      filter_floors: "Этажи",
      filter_depts: "Отделы",
      all_employees: "Все сотрудники",
      floor: "-Этаж",
      room: "-каб.",

      // ОТДЕЛЫ (На русском)
      dept_rahbariyat: "Руководство Академии",
      dept_kadrlar: "Кадры и орг-контроль",
      dept_xalqaro: "Международное сотрудничество",
      dept_tillar: "Кафедра обучения языкам",
      dept_sud: "Судебная деятельность",
      dept_korrupsiya: "Антикоррупционный центр",
      dept_it: "ИКТ и инф. безопасность",

      // СПИСОК СОТРУДНИКОВ (На русском / Кириллица)
      emp_1_name: "Коленко Евгений Вячеславович",
      emp_1_position: "Первый заместитель начальника Академии",
      emp_2_name: "Турахонов Дурбек Лермонович",
      emp_2_position: "Заместитель начальника Академии",
      emp_3_name: "Одинаев Адхам Саъдуллоевич",
      emp_3_position: "Заместитель начальника Академии",
      emp_4_name: "Нигмаджанов Уйгун Учкунович",
      emp_4_position: "Заместитель начальника Академии",
      emp_14_name: "Акбутаев Аброр Абдурахманович",
      emp_14_position: "Начальник отдела международного сотрудничества",
      emp_16_name: "Мирзокулова Хурсаной Нематжоновна",
      emp_16_position: "Старший преподаватель кафедры обучения языкам",
      emp_18_name: "Кандахорова Дилноза Саттаровна",
      emp_18_position: "Старший преподаватель кафедры",
      emp_22_name: "Турсунбеков Худайберди",
      emp_22_position: "Начальник Антикоррупционного центра",
      emp_28_name: "Гиясов Билолбек Жумазода",
      emp_28_position: "Начальник отдела ИКТ",

      // --- РУКОВОДСТВО ---
      page_leadership: "РУКОВОДСТВО АКАДЕМИИ",

      // --- ДОКУМЕНТЫ ---
      page_documents: "НОРМАТИВНЫЕ ДОКУМЕНТЫ",
      cat_laws: "ЗАКОНЫ",
      cat_decrees: "УКАЗЫ ПРЕЗИДЕНТА",
      cat_orders: "ПРИКАЗЫ АКАДЕМИИ",
      label_date: "Дата",
      label_size: "Размер",
      btn_read: "ЧИТАТЬ",

      // --- ТРАНСПОРТ ---
      page_transport: "ПОИСК МАРШРУТА",
      label_where: "Куда поедете?",
      placeholder_location: "Введите название места...",
      quick_routes: "Быстрые маршруты",
      route_airport: "Аэропорт",
      route_station: "Южный Вокзал",
      route_market: "Рынок Чорсу",
      map_academy_loc: "Локация Академии",

      // --- WI-FI ---
      page_wifi: "WI-FI СЕТИ",
      wifi_staff: "СОТРУДНИКИ",
      wifi_guest: "КОНФЕРЕНЦИЯ",
      wifi_student: "СТУДЕНТЫ",
      wifi_staff_desc: "Для сотрудников академии",
      wifi_guest_desc: "Для гостей и участников",
      wifi_student_desc: "Для бакалавров и магистров",
      scan_qr: "Сканируйте",
      password: "Пароль",
    },

    en: {
      // --- GENERAL ---
      app_name: "LAW ENFORCEMENT ACADEMY",
      subtitle: "INFORMATION RESOURCE KIOSK",
      country_name: "REPUBLIC OF UZBEKISTAN",
      footer_text: "© 2026 Academy Information Technology Center",
      back_btn: "MAIN MENU",
      search_placeholder: "Search...",
      results: "Results",
      no_results: "No results found",
      loading: "Loading...",
      select_network: "Select network",
      scan_to_connect: "Point camera to connect",

      // --- MAIN MENU ---
      menu_employees: "EMPLOYEES",
      menu_leadership: "LEADERSHIP",
      menu_achievements: "ACHIEVEMENTS",
      menu_documents: "DOCUMENTS",
      menu_transport: "TRANSPORT",
      menu_wifi: "WI-FI",
      menu_map: "MAP",
      menu_faq: "INFO",

      desc_employees: "Professors and teachers",
      desc_leadership: "Academy Leadership",
      desc_achievements: "Academy Achievements",
      desc_documents: "Laws and orders",
      desc_transport: "Routes",
      desc_wifi: "Free internet",
      desc_map: "Building plan",
      desc_faq: "Q&A",

      // --- EMPLOYEES ---
      filter_floors: "Floors",
      filter_depts: "Departments",
      all_employees: "All Employees",
      floor: "-Floor",
      room: "-room",

      // DEPARTMENTS (In English)
      dept_rahbariyat: "Academy Leadership",
      dept_kadrlar: "HR & Organizational Control",
      dept_xalqaro: "International Cooperation",
      dept_tillar: "Language Teaching Dept",
      dept_sud: "Judicial Activity",
      dept_korrupsiya: "Anti-Corruption Center",
      dept_it: "ICT & Info Security",

      // EMPLOYEES LIST (In English)
      emp_1_name: "Kolenko Evgeniy Vyacheslavovich",
      emp_1_position: "First Deputy Head of the Academy",
      emp_2_name: "Turakhonov Durbek Lermonovich",
      emp_2_position: "Deputy Head of the Academy",
      emp_3_name: "Odinaev Adham Sadulloevich",
      emp_3_position: "Deputy Head of the Academy",
      emp_4_name: "Nigmadjanov Uygun Uchkunovich",
      emp_4_position: "Deputy Head of the Academy",
      emp_14_name: "Akbutayev Abror Abdurakhmanovich",
      emp_14_position: "Head of International Cooperation",
      emp_16_name: "Mirzokulova Khursanoy Nematjonovna",
      emp_16_position: "Senior Lecturer of Language Teaching",
      emp_18_name: "Kandakhorova Dilnoza Sattorovna",
      emp_18_position: "Senior Lecturer of the Department",
      emp_22_name: "Tursunbekov Khudayberdi",
      emp_22_position: "Head of the Anti-Corruption Center",
      emp_28_name: "Giyosov Bilolbek Jumazoda",
      emp_28_position: "Head of the ICT Department",

      // --- LEADERSHIP ---
      page_leadership: "ACADEMY LEADERSHIP",

      // --- DOCUMENTS ---
      page_documents: "REGULATORY DOCUMENTS",
      cat_laws: "LAWS",
      cat_decrees: "PRESIDENTIAL DECREES",
      cat_orders: "ACADEMY ORDERS",
      label_date: "Date",
      label_size: "Size",
      btn_read: "READ",

      // --- TRANSPORT ---
      page_transport: "FIND ROUTE",
      label_where: "Where are you going?",
      placeholder_location: "Enter location name...",
      quick_routes: "Quick Routes",
      route_airport: "Airport",
      route_station: "South Station",
      route_market: "Chorsu Market",
      map_academy_loc: "Academy Location",

      // --- WI-FI ---
      page_wifi: "WI-FI NETWORKS",
      wifi_staff: "STAFF",
      wifi_guest: "CONFERENCE",
      wifi_student: "STUDENTS",
      wifi_staff_desc: "For academy staff",
      wifi_guest_desc: "For guests and participants",
      wifi_student_desc: "For bachelor and master students",
      scan_qr: "Scan this",
      password: "Password",
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);