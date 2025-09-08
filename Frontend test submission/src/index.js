import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoggerProvider } from './logging/LoggerProvider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <LoggerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoggerProvider>
  </React.StrictMode>
);
