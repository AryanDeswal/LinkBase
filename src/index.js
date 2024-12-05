import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AdminProvider } from './context/AdminContext.js';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
)
serviceWorkerRegistration.register();