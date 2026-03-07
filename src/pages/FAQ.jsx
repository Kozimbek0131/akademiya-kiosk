import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaQuestionCircle, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  // UMUMIY SAVOL-JAVOBLAR
  const questions = [
    {
      id: 1,
      question: "Akademiya ish vaqti qanday?",
      answer: "Akademiya dushanbadan shanbagacha soat 08:00 dan 18:00 gacha ishlaydi. Tushlik vaqti: 13:00 dan 14:00 gacha. Yakshanba — dam olish kuni."
    },
    {
      id: 2,
      question: "Rahbariyat qabuliga qanday yozilish mumkin?",
      answer: "Boshliq va o'rinbosarlar qabuli har hafta Chorshanba kuni 10:00 da o'tkaziladi. Ro'yxatdan o'tish uchun Devonxonaga (1-qavat, 105-xona) murojaat qiling yoki +998 71 200-00-00 raqamiga qo'ng'iroq qiling."
    },
    {
      id: 3,
      question: "Oshxona va Tibbiyot punkti qayerda?",
      answer: "Oshxona 1-qavatning chap qanotida joylashgan. Tibbiyot punkti esa 1-qavat, 112-xonada joylashgan (Sport zal yonida)."
    },
    {
      id: 4,
      question: "Wi-Fi tarmog'idan qanday foydalanaman?",
      answer: "Bosh sahifadagi 'WI-FI' tugmasini bosing. U yerda siz uchun maxsus (Mehmon yoki Xodim) tarmoqlar va ularning parollari ko'rsatilgan."
    },
    {
      id: 5,
      question: "Sport zali kimlar uchun?",
      answer: "Sport majmuasi xodimlar va kursantlar uchun har kuni 18:00 dan 21:00 gacha ochiq. Mehmonlar ruxsatnoma bilan kirishi mumkin."
    },
    {
      id: 6,
      question: "Yo'qolgan buyumlarni qayerdan qidirish kerak?",
      answer: "Agar biror narsangizni yo'qotib qo'ysangiz, Navbatchilik qismiga (Kirishdagi post) murojaat qiling."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none text-white font-sans">
      
      {/* ORQA FON */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900 z-0 pointer-events-none"></div>

      {/* 1. HEADER (Tepa qism) */}
      <div className="relative z-50 flex items-center justify-between p-6 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg shrink-0">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-lg font-bold uppercase cursor-pointer"
        >
          <FaArrowLeft /> {t('back_btn') || "ASOSIY MENYU"}
        </button>
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
            <FaQuestionCircle className="text-cyan-400 text-2xl" />
          </div>
          MA'LUMOTNOMA
        </h1>
      </div>

      {/* 2. SAVOL-JAVOBLAR RO'YXATI (Skrol bo'ladigan qism) */}
      <div className="relative z-10 flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 pb-6">
          
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={item.id}
                className={`bg-slate-800/60 backdrop-blur-sm border rounded-[2rem] overflow-hidden transition-all duration-300 ${isOpen ? 'border-cyan-500 shadow-[0_10px_30px_rgba(6,182,212,0.15)] bg-slate-800/90' : 'border-white/10 hover:border-white/30'}`}
              >
                {/* Savol qutisi (Bosishga qulay qilib kattalashtirildi) */}
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group cursor-pointer active:scale-[0.99] transition-transform"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl font-black transition-colors shadow-inner ${isOpen ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-cyan-400 group-hover:bg-cyan-500/20'}`}>
                      ?
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold pr-4 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white transition-colors'}`}>
                      {item.question}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700 text-gray-400 group-hover:bg-slate-600'}`}>
                    {isOpen ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
                  </div>
                </button>

                {/* Javob ochiladigan qism (Silliq animatsiya bilan) */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 md:p-8 pt-0 pl-[6.5rem] md:pl-[7.5rem] text-lg md:text-xl text-cyan-100/80 leading-relaxed border-t border-white/5 mx-6">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PASTKI QISM (Footer) - Huvillab yotgan joyni to'ldiradi */}
      <div className="relative z-20 w-full bg-slate-900 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8 shrink-0">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Telefon bloki */}
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-900/20 border border-blue-500/30 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 group hover:border-blue-500/50 transition-colors">
             <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500 flex items-center justify-center text-white text-3xl shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
               <FaPhoneAlt />
             </div>
             <div>
               <h4 className="text-blue-200 font-bold uppercase tracking-widest text-sm mb-1">Ishonch telefoni</h4>
               <p className="text-3xl md:text-4xl font-black text-white font-mono tracking-wider">10-02</p>
             </div>
          </div>

          {/* Vaqt bloki */}
          <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-900/20 border border-emerald-500/30 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 group hover:border-emerald-500/50 transition-colors">
             <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-500 flex items-center justify-center text-white text-3xl shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">
               <FaClock />
             </div>
             <div>
               <h4 className="text-emerald-200 font-bold uppercase tracking-widest text-sm mb-1">Ish tartibi</h4>
               <p className="text-3xl md:text-4xl font-black text-white font-mono tracking-wider">08:00 - 18:00</p>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default FAQ;