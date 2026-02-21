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
      
      // Xodimlar ro'yxati (O'zbek tilida)
      emp_1_name: "Ahmadjonov Alisher",
      emp_1_position: "Kafedra mudiri",
      emp_1_dept: "Jinoyat huquqi kafedrasi",

      emp_2_name: "Rahimova Malika",
      emp_2_position: "Katta o'qituvchi",
      emp_2_dept: "Kriminalistika kafedrasi",
      
      // ... (boshqa xodimlarni shu yerga qo'shib ketasiz)

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

      // Список сотрудников (На русском)
      emp_1_name: "Ахмаджонов Алишер",
      emp_1_position: "Заведующий кафедрой",
      emp_1_dept: "Кафедра уголовного права",

      emp_2_name: "Рахимова Малика",
      emp_2_position: "Старший преподаватель",
      emp_2_dept: "Кафедра криминалистики",

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

      // Employees List (In English)
      emp_1_name: "Akhmadjonov Alisher",
      emp_1_position: "Head of Department",
      emp_1_dept: "Department of Criminal Law",

      emp_2_name: "Rakhimova Malika",
      emp_2_position: "Senior Lecturer",
      emp_2_dept: "Department of Criminalistics",

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