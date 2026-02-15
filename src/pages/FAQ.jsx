import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaQuestionCircle, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  // UMUMIY SAVOL-JAVOBLAR (Hamma uchun)
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
    <div className="h-screen flex flex-col bg-slate-900 relative overflow-hidden select-none">
      
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-slate-800/80 backdrop-blur-md border-b border-white/10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/20 active:scale-95 transition-all text-xl font-bold uppercase"
        >
          <FaArrowLeft /> {t('back_btn') || "ORQAGA"}
        </button>
        
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider flex items-center gap-4">
          <FaQuestionCircle className="text-cyan-400" /> 
          MA'LUMOTNOOMA (SAVOL-JAVOB)
        </h1>
      </div>

      {/* ASOSIY QISM */}
      <div className="relative z-10 flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-4">
          
          {questions.map((item, index) => (
            <div 
              key={item.id}
              className={`bg-slate-800/50 border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-cyan-900/20 border-cyan-500/50 shadow-lg' : 'hover:bg-white/5'}`}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-colors ${openIndex === index ? 'bg-cyan-500 text-white' : 'bg-white/5 text-gray-500 group-hover:bg-white/10'}`}>
                    ?
                  </div>
                  <h3 className={`text-xl font-bold ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {item.question}
                  </h3>
                </div>
                {openIndex === index ? <FaChevronUp className="text-cyan-400" /> : <FaChevronDown className="text-gray-500" />}
              </button>

              <div 
                className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 pl-[4.5rem] text-lg text-gray-300 leading-relaxed border-t border-white/5 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}

          {/* Qo'shimcha ma'lumot bloki */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-blue-600/20 border border-blue-500/30 p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl"><FaPhoneAlt /></div>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm">Ishonch telefoni</h4>
                  <p className="text-2xl font-mono text-blue-300 font-bold">10-02</p>
                </div>
             </div>
             <div className="bg-green-600/20 border border-green-500/30 p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl"><FaClock /></div>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm">Ish tartibi</h4>
                  <p className="text-xl font-mono text-green-300 font-bold">08:00 — 18:00</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;