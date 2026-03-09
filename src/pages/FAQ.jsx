import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaQuestionCircle, FaClock, FaPhoneAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      id: 1,
      question: { uz: "Akademiya ish vaqti qanday?", ru: "Каков режим работы Академии?", en: "What are the Academy's working hours?" },
      answer:   { uz: "Akademiya dushanbadan shanbagacha soat 08:00 dan 18:00 gacha ishlaydi. Tushlik vaqti: 13:00 dan 14:00 gacha. Yakshanba — dam olish kuni.", ru: "Академия работает с понедельника по субботу с 08:00 до 18:00. Обед: с 13:00 до 14:00. Воскресенье — выходной день.", en: "The Academy works Monday through Saturday from 08:00 to 18:00. Lunch break: 13:00–14:00. Sunday is a day off." }
    },
    {
      id: 2,
      question: { uz: "Rahbariyat qabuliga qanday yozilish mumkin?", ru: "Как записаться на приём к руководству?", en: "How to schedule an appointment with management?" },
      answer:   { uz: "Boshliq va o'rinbosarlar qabuli har hafta Chorshanba kuni 10:00 da o'tkaziladi. Ro'yxatdan o'tish uchun Devonxonaga (1-qavat, 105-xona) murojaat qiling yoki +998 71 200-00-00 raqamiga qo'ng'iroq qiling.", ru: "Приём у начальника и его заместителей проводится каждую среду в 10:00. Для записи обратитесь в Канцелярию (1-й этаж, каб. 105) или позвоните по номеру +998 71 200-00-00.", en: "Reception by the Head and deputies is held every Wednesday at 10:00. To register, contact the Secretariat (1st floor, room 105) or call +998 71 200-00-00." }
    },
    {
      id: 3,
      question: { uz: "Oshxona va Tibbiyot punkti qayerda?", ru: "Где находится столовая и медпункт?", en: "Where is the canteen and medical point?" },
      answer:   { uz: "Oshxona 1-qavatning chap qanotida joylashgan. Tibbiyot punkti esa 1-qavat, 112-xonada joylashgan (Sport zal yonida).", ru: "Столовая расположена в левом крыле 1-го этажа. Медпункт — на 1-м этаже, каб. 112 (рядом со спортзалом).", en: "The canteen is located in the left wing of the 1st floor. The medical point is on the 1st floor, room 112 (next to the gym)." }
    },
    {
      id: 4,
      question: { uz: "Wi-Fi tarmog'idan qanday foydalanaman?", ru: "Как пользоваться Wi-Fi?", en: "How do I use the Wi-Fi network?" },
      answer:   { uz: "Bosh sahifadagi 'WI-FI' tugmasini bosing. U yerda siz uchun maxsus (Mehmon yoki Xodim) tarmoqlar va ularning parollari ko'rsatilgan.", ru: "Нажмите кнопку 'WI-FI' на главной странице. Там отображены специальные сети (Гость или Сотрудник) и их пароли.", en: "Press the 'WI-FI' button on the main page. There you will find dedicated networks (Guest or Staff) and their passwords." }
    },
    {
      id: 5,
      question: { uz: "Sport zali kimlar uchun?", ru: "Для кого предназначен спортзал?", en: "Who is the gym for?" },
      answer:   { uz: "Sport majmuasi xodimlar va kursantlar uchun har kuni 18:00 dan 21:00 gacha ochiq. Mehmonlar ruxsatnoma bilan kirishi mumkin.", ru: "Спортивный комплекс открыт для сотрудников и курсантов ежедневно с 18:00 до 21:00. Гости могут войти с пропуском.", en: "The sports complex is open for staff and cadets daily from 18:00 to 21:00. Guests may enter with a pass." }
    },
    {
      id: 6,
      question: { uz: "Yo'qolgan buyumlarni qayerdan qidirish kerak?", ru: "Где искать потерянные вещи?", en: "Where to look for lost items?" },
      answer:   { uz: "Agar biror narsangizni yo'qotib qo'ysangiz, Navbatchilik qismiga (Kirishdagi post) murojaat qiling.", ru: "Если вы что-то потеряли, обратитесь в дежурную часть (пост на входе).", en: "If you have lost something, contact the Duty Unit (entrance post)." }
    }
  ];

  const toggleQuestion = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900 z-0 pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative z-50 flex items-center justify-between p-6 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shrink-0">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-lg font-bold uppercase cursor-pointer">
          <FaArrowLeft /> {t('back_btn')}
        </button>
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
            <FaQuestionCircle className="text-cyan-400 text-2xl" />
          </div>
          {t('menu_faq')}
        </h1>
      </div>

      {/* SAVOLLAR */}
      <div className="relative z-10 flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 pb-6">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const q = item.question[language] || item.question.uz;
            const a = item.answer[language]   || item.answer.uz;
            return (
              <div key={item.id} className={`bg-slate-800/60 backdrop-blur-sm border rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? 'border-cyan-500 shadow-[0_10px_30px_rgba(6,182,212,0.15)] bg-slate-800/90' : 'border-white/10 hover:border-white/30'}`}>
                <button onClick={() => toggleQuestion(index)} className="w-full flex items-center justify-between p-6 md:p-8 text-left group cursor-pointer active:scale-[0.99] transition-transform">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl font-black transition-colors shadow-inner ${isOpen ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-cyan-400 group-hover:bg-cyan-500/20'}`}>?</div>
                    <h3 className={`text-xl md:text-2xl font-bold pr-4 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white transition-colors'}`}>{q}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700 text-gray-400 group-hover:bg-slate-600'}`}>
                    {isOpen ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
                  </div>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 md:p-8 pt-0 pl-[6.5rem] md:pl-[7.5rem] text-lg md:text-xl text-cyan-100/80 leading-relaxed border-t border-white/5 mx-6">{a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-20 w-full bg-slate-900 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8 shrink-0">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-900/20 border border-blue-500/30 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 group hover:border-blue-500/50 transition-colors">
            <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500 flex items-center justify-center text-white text-3xl shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
              <FaPhoneAlt />
            </div>
            <div>
              <h4 className="text-blue-200 font-bold uppercase tracking-widest text-sm mb-1">{t('faq_hotline')}</h4>
              <p className="text-3xl md:text-4xl font-black text-white font-mono tracking-wider">10-02</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-900/20 border border-emerald-500/30 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 group hover:border-emerald-500/50 transition-colors">
            <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500 flex items-center justify-center text-white text-3xl shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">
              <FaClock />
            </div>
            <div>
              <h4 className="text-emerald-200 font-bold uppercase tracking-widest text-sm mb-1">{t('faq_worktime')}</h4>
              <p className="text-3xl md:text-4xl font-black text-white font-mono tracking-wider">08:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;