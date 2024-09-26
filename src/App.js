// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutesControl from './routes/Index';

const App = () => {
  return (
   <BrowserRouter>
    <AuthProvider>
      <AppRoutesControl/>
    </AuthProvider>
   </BrowserRouter>
  );
};

export default App;
