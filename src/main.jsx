import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext.jsx' // <-- 1. Import qildik

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider> {/* <-- 2. Appni o'rab qo'ydik */}
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)