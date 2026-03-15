import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz'); // Default: O'zbek

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
      test_mode_warning: "Ushbu axborot kioski hozirda test sinovida ishlamoqda",
suggestions_text: "Taklif va mulohazalar uchun Telegram: @akhatov0131",

      // --- ASOSIY MENYU (HOME) ---
      menu_employees: "XODIMLAR",
      menu_leadership: "RAHBARIYAT",
      menu_achievements: "YUTUQLAR",
      menu_documents: "HUJJATLAR",
      menu_transport: "TRANSPORT",
      menu_wifi: "WI-FI",
      menu_map: "XARITA",
      menu_faq: "MA'LUMOTNOOMA",
      
      desc_employees: "Professor va o'qituvchilar",
      desc_leadership: "Akademiya rahbariyati",
      desc_achievements: "Akademiya yutuqlari",
      desc_documents: "Qonunlar va buyruqlar",
      desc_transport: "Yo'nalishlar",
      desc_wifi: "Bepul internet",
      desc_map: "Bino rejasi",
      desc_faq: "Savol-javoblar",

      // --- XODIMLAR ---
      filter_floors: "Qavatlar",
      filter_depts: "Bo'limlar",
      all_employees: "Barcha xodimlar",
      floor: "-Qavat",
      room: "-xona",

      // --- RAHBARIYAT ---
      page_leadership: "AKADEMIYA RAHBARIYATI",

      // --- HUJJATLAR ---
      page_documents: "ME'YORIY HUJJATLAR",
      cat_laws: "QONUNLAR",
      cat_decrees: "PREZIDENT FARMONLARI",
      cat_orders: "AKADEMIYA BUYRUQLARI",
      label_date: "Sana",
      label_size: "Hajmi",
      btn_read: "O'QISH",
      doc_close: "YOPISH",
      doc_viewing: "Hujjat ko'rilmoqda...",
      no_docs: "Bu bo'limda hozircha hujjatlar yo'q",

      // --- TRANSPORT ---
      page_transport: "YO'NALISHNI IZLASH",
      label_where: "Qayerga borasiz?",
      placeholder_location: "Joy nomini yozing...",
      quick_routes: "Tezkor yo'nalishlar",
      map_academy_loc: "Akademiya joylashuvi",

      // --- WI-FI ---
      page_wifi: "WI-FI TARMOQLARI",
      wifi_staff: "XODIMLAR",
      wifi_guest: "KONFERENSIYA",
      wifi_student: "TALABALAR",
      wifi_staff_desc: "Akademiya xodimlari uchun",
      wifi_guest_desc: "Mehmonlar uchun",
      wifi_student_desc: "Bakalavr va magistrlar",
      scan_qr: "Skaner qiling",
      password: "Tarmoq paroli:",
      which_network: "Qaysi tarmoqqa ulanmoqchisiz?",

      // --- XARITA ---
      page_map: "BINO XARITASI",
      map_coming_soon: "TEZ KUNDA...",
      map_desc: "Akademiya binosining interaktiv 3D xaritasi va xonalar joylashuvi hozirda ishlab chiqilmoqda. Tez orada ushbu bo'lim orqali kerakli xonani oson topishingiz mumkin bo'ladi!",
      map_progress: "Ish jarayonida",

      // --- MA'LUMOTNOMA (FAQ) ---
      faq_hotline: "Ishonch telefoni",
      faq_worktime: "Ish tartibi",
    },
    
    ru: {
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
      test_mode_warning: "Данный информационный киоск работает в тестовом режиме",
suggestions_text: "Для предложений и замечаний Telegram: @akhatov0131",

      menu_employees: "СОТРУДНИКИ",
      menu_leadership: "РУКОВОДСТВО",
      menu_achievements: "ДОСТИЖЕНИЯ",
      menu_documents: "ДОКУМЕНТЫ",
      menu_transport: "ТРАНСПОРТ",
      menu_wifi: "WI-FI",
      menu_map: "КАРТА",
      menu_faq: "ИНФОРМАЦИЯ",
      
      desc_employees: "Профессора и преподаватели",
      desc_leadership: "Руководство Академии",
      desc_achievements: "Достижения Академии",
      desc_documents: "Законы и приказы",
      desc_transport: "Маршруты",
      desc_wifi: "Бесплатный интернет",
      desc_map: "План здания",
      desc_faq: "Вопросы и ответы",

      filter_floors: "Этажи",
      filter_depts: "Отделы",
      all_employees: "Все сотрудники",
      floor: "-Этаж",
      room: "-каб.",

      page_leadership: "РУКОВОДСТВО АКАДЕМИИ",

      page_documents: "НОРМАТИВНЫЕ ДОКУМЕНТЫ",
      cat_laws: "ЗАКОНЫ",
      cat_decrees: "УКАЗЫ ПРЕЗИДЕНТА",
      cat_orders: "ПРИКАЗЫ АКАДЕМИИ",
      label_date: "Дата",
      label_size: "Размер",
      btn_read: "ЧИТАТЬ",
      doc_close: "ЗАКРЫТЬ",
      doc_viewing: "Просмотр документа...",
      no_docs: "В этом разделе пока нет документов",

      page_transport: "ПОИСК МАРШРУТА",
      label_where: "Куда поедете?",
      placeholder_location: "Введите название места...",
      quick_routes: "Быстрые маршруты",
      map_academy_loc: "Локация Академии",

      page_wifi: "WI-FI СЕТИ",
      wifi_staff: "СОТРУДНИКИ",
      wifi_guest: "КОНФЕРЕНЦИЯ",
      wifi_student: "СТУДЕНТЫ",
      wifi_staff_desc: "Для сотрудников академии",
      wifi_guest_desc: "Для гостей",
      wifi_student_desc: "Для бакалавров и магистров",
      scan_qr: "Сканируйте",
      password: "Пароль сети:",
      which_network: "К какой сети хотите подключиться?",

      page_map: "КАРТА ЗДАНИЯ",
      map_coming_soon: "СКОРО...",
      map_desc: "Интерактивная 3D-карта здания академии и расположение кабинетов в настоящее время находятся в разработке. Вскоре через этот раздел вы сможете легко найти нужный кабинет!",
      map_progress: "В процессе",

      faq_hotline: "Телефон доверия",
      faq_worktime: "Режим работы",
    },

    en: {
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
      test_mode_warning: "This information kiosk is currently operating in test mode",
suggestions_text: "For suggestions and feedback Telegram: @akhatov0131",

      menu_employees: "EMPLOYEES",
      menu_leadership: "LEADERSHIP",
      menu_achievements: "ACHIEVEMENTS",
      menu_documents: "DOCUMENTS",
      menu_transport: "TRANSPORT",
      menu_wifi: "WI-FI",
      menu_map: "MAP",
      menu_faq: "INFORMATION",
      
      desc_employees: "Professors and teachers",
      desc_leadership: "Academy Leadership",
      desc_achievements: "Academy Achievements",
      desc_documents: "Laws and orders",
      desc_transport: "Routes",
      desc_wifi: "Free internet",
      desc_map: "Building plan",
      desc_faq: "Q&A",

      filter_floors: "Floors",
      filter_depts: "Departments",
      all_employees: "All Employees",
      floor: "-Floor",
      room: "-room",

      page_leadership: "ACADEMY LEADERSHIP",

      page_documents: "REGULATORY DOCUMENTS",
      cat_laws: "LAWS",
      cat_decrees: "PRESIDENTIAL DECREES",
      cat_orders: "ACADEMY ORDERS",
      label_date: "Date",
      label_size: "Size",
      btn_read: "READ",
      doc_close: "CLOSE",
      doc_viewing: "Viewing document...",
      no_docs: "There are currently no documents in this section",

      page_transport: "FIND ROUTE",
      label_where: "Where are you going?",
      placeholder_location: "Enter location name...",
      quick_routes: "Quick Routes",
      map_academy_loc: "Academy Location",

      page_wifi: "WI-FI NETWORKS",
      wifi_staff: "STAFF",
      wifi_guest: "CONFERENCE",
      wifi_student: "STUDENTS",
      wifi_staff_desc: "For academy staff",
      wifi_guest_desc: "For guests",
      wifi_student_desc: "For bachelor and master students",
      scan_qr: "Scan this",
      password: "Network Password:",
      which_network: "Which network do you want to connect to?",

      page_map: "BUILDING MAP",
      map_coming_soon: "COMING SOON...",
      map_desc: "The interactive 3D map of the academy building and room locations is currently under development. Soon, you will be able to easily find the room you need through this section!",
      map_progress: "In progress",

      faq_hotline: "Hotline",
      faq_worktime: "Working hours",
    }
  };

  const t = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);