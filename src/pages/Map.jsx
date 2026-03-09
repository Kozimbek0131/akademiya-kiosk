import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaMapMarkerAlt, FaDirections, FaCopy, FaCheck } from 'react-icons/fa';

const ACADEMY = {
  lat: 41.374849,
  lng: 69.272909,
  name_uz: "Huquqni muhofaza qilish akademiyasi",
  name_ru: "Академия правоохранительных органов",
  name_en: "Law Enforcement Academy",
  address_uz: "Toshkent shahri, O'zbekiston Respublikasi",
  address_ru: "г. Ташкент, Республика Узбекистан",
  address_en: "Tashkent city, Republic of Uzbekistan",
};

const Map = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const name    = ACADEMY[`name_${language}`]    || ACADEMY.name_uz;
  const address = ACADEMY[`address_${language}`] || ACADEMY.address_uz;

  const googleMapsUrl = `https://www.google.com/maps?q=${ACADEMY.lat},${ACADEMY.lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${ACADEMY.lat},${ACADEMY.lng}&z=17&output=embed&hl=${language === 'ru' ? 'ru' : language === 'en' ? 'en' : 'uz'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${ACADEMY.lat}, ${ACADEMY.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden select-none text-white relative">

      {/* Orqa fon */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"></div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-lg shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all font-bold uppercase text-sm cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>

        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-widest flex items-center gap-3">
          <FaMapMarkerAlt className="text-red-400" />
          {t('menu_map') || "MANZIL"}
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* CHAP — Xarita */}
        <div className="flex-1 relative">
          <iframe
            title="Akademiya xaritasi"
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'brightness(0.95) contrast(1.05)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
          {/* Xarita ustidagi gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
          </div>
        </div>

        {/* O'NG — Ma'lumot paneli */}
        <div className="w-full md:w-80 lg:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 flex flex-col shrink-0 p-6 gap-5 overflow-y-auto">

          {/* Akademiya nomi */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/30 rounded-3xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <FaMapMarkerAlt className="text-red-400 text-lg" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-black text-white leading-tight mb-1">
                  {name}
                </h2>
                <p className="text-sm text-blue-300 font-medium">
                  {address}
                </p>
              </div>
            </div>
          </div>

          {/* Koordinatalar */}
          <div className="bg-slate-800/60 border border-white/10 rounded-3xl p-5">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">
              📍 Koordinatalar
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm text-green-400 font-bold">
                {ACADEMY.lat}, {ACADEMY.lng}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                {copied ? <FaCheck className="text-green-400" /> : <FaCopy className="text-slate-300" />}
                {copied ? 'Nusxalandi!' : 'Nusxala'}
              </button>
            </div>
          </div>

          {/* Yo'l ko'rsatish tugmasi */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-base px-6 py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <FaDirections className="text-xl" />
            {language === 'ru' ? 'Открыть в Google Maps' : language === 'en' ? 'Open in Google Maps' : "Google Maps da ochish"}
          </a>

          {/* Ish vaqti */}
          <div className="bg-slate-800/60 border border-white/10 rounded-3xl p-5">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">
              🕐 {language === 'ru' ? 'Режим работы' : language === 'en' ? 'Working hours' : 'Ish vaqti'}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">
                  {language === 'ru' ? 'Пн — Пт' : language === 'en' ? 'Mon — Fri' : 'Du — Ju'}
                </span>
                <span className="text-white font-bold">09:00 — 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">
                  {language === 'ru' ? 'Суббота' : language === 'en' ? 'Saturday' : 'Shanba'}
                </span>
                <span className="text-white font-bold">09:00 — 13:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">
                  {language === 'ru' ? 'Воскресенье' : language === 'en' ? 'Sunday' : 'Yakshanba'}
                </span>
                <span className="text-red-400 font-bold">
                  {language === 'ru' ? 'Выходной' : language === 'en' ? 'Day off' : 'Dam olish kuni'}
                </span>
              </div>
            </div>
          </div>

          {/* Telefon */}
          <div className="bg-slate-800/60 border border-white/10 rounded-3xl p-5">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">
              📞 {language === 'ru' ? 'Телефон' : language === 'en' ? 'Phone' : 'Telefon'}
            </p>
            <p className="font-mono text-lg text-green-400 font-black">+998 71 202-04-96</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Map;