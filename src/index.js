import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RefynProvider } from './context/RefynContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RefynProvider>
    <App />
  </RefynProvider>
);
