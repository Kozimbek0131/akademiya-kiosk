import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Boshlang'ich til - O'zbek tili
  const [lang, setLang] = useState('uz');

  // Barcha so'zlar lug'ati
  const translations = {
    uz: {
      header_title: "Huquqni Muhofaza Qilish Akademiyasi",
      welcome: "Axborot Kioskiga Xush Kelibsiz",
      touch_to_start: "Boshlash uchun ekranni bosing",
      menu_employees: "Xodimlar",
      menu_docs: "Hujjatlar",
      menu_transport: "Transport",
      menu_wifi: "Wi-Fi",
      menu_achievements: "Yutuqlar",
      menu_map: "Xarita",
      back_btn: "Orqaga qaytish",
    },
    ru: {
      header_title: "Академия Правоохранительных Органов",
      welcome: "Добро пожаловать в Инфокиоск",
      touch_to_start: "Нажмите на экран, чтобы начать",
      menu_employees: "Сотрудники",
      menu_docs: "Документы",
      menu_transport: "Транспорт",
      menu_wifi: "Wi-Fi",
      menu_achievements: "Достижения",
      menu_map: "Карта",
      back_btn: "Назад",
    },
    en: {
      header_title: "Law Enforcement Academy",
      welcome: "Welcome to the Information Kiosk",
      touch_to_start: "Touch the screen to start",
      menu_employees: "Employees",
      menu_docs: "Documents",
      menu_transport: "Transport",
      menu_wifi: "Wi-Fi",
      menu_achievements: "Achievements",
      menu_map: "Map",
      back_btn: "Go Back",
    }
  };

  // Tarjima qilib beruvchi maxsus funksiya
  const t = (key) => {
    return translations[lang][key] || key; 
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);