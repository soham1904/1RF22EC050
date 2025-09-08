import React, { createContext, useContext } from 'react';
import axios from 'axios';

const LoggerContext = createContext(() => {});

export const LoggerProvider = ({ children }) => {
  const client = axios.create({
    baseURL: process.env.REACT_APP_LOG_BASE_URL || 'http://localhost:4500',
    timeout: 4000
  });

  const log = async (event, payload = {}) => {
    try {
      await client.post('/logs', {
        event,
        payload,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
    } catch (e) {
      // intentionally swallow errors — logging must not break UX
    }
  };

  return (
    <LoggerContext.Provider value={log}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = () => useContext(LoggerContext);
