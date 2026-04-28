import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//npm run dev

//http://127.0.0.1:8000/
//cd Backend
//uvicorn main:app --reload --port 8000

//cd Backend
// python3.13 -m uvicorn main:app --reload --port 8000

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
