import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz'); // Boshlang'ich til: O'zbek

  // 📖 LUG'AT (Hamma sahifalar uchun)
  const translations = {
    uz: {
      app_name: "HUQUQNI MUHOFAZA QILISH AKADEMIYASI",
      subtitle: "AXBOROT-RESURS KIOSKI",
      back_btn: "ORQAGA",
      touch_to_start: "BOSHLASH UCHUN EKRANGA TEGING",
      
      // Menyu tugmalari
      menu_employees: "XODIMLAR",
      menu_achievements: "YUTUQLAR",
      menu_documents: "HUJJATLAR",
      menu_transport: "TRANSPORT",
      menu_wifi: "WI-FI",
      menu_map: "XARITA",

      // Sana va Vaqt
      date_format: "uz-UZ", // Sana formati
    },
    ru: {
      app_name: "ПРАВООХРАНИТЕЛЬНАЯ АКАДЕМИЯ",
      subtitle: "ИНФОРМАЦИОННО-РЕСУРСНЫЙ КИОСК",
      back_btn: "НАЗАД",
      touch_to_start: "КОСНИТЕСЬ ЭКРАНА, ЧТОБЫ НАЧАТЬ",

      // Меню
      menu_employees: "СОТРУДНИКИ",
      menu_achievements: "ДОСТИЖЕНИЯ",
      menu_documents: "ДОКУМЕНТЫ",
      menu_transport: "ТРАНСПОРТ",
      menu_wifi: "WI-FI",
      menu_map: "КАРТА",

      // Дата
      date_format: "ru-RU",
    },
    en: {
      app_name: "LAW ENFORCEMENT ACADEMY",
      subtitle: "INFORMATION RESOURCE KIOSK",
      back_btn: "GO BACK",
      touch_to_start: "TOUCH SCREEN TO START",

      // Menu
      menu_employees: "EMPLOYEES",
      menu_achievements: "ACHIEVEMENTS",
      menu_documents: "DOCUMENTS",
      menu_transport: "TRANSPORT",
      menu_wifi: "WI-FI",
      menu_map: "MAP",

      // Date
      date_format: "en-US",
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