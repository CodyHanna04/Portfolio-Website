// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import App from './App';
import './index.css'; // Tailwind CSS import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
