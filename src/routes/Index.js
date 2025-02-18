import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthRoutes from './Auth.Routes';
import AppRoutes from './App.Routes';
import AdminRoutes from './Admin.Routes';
import { useAuth } from '../context/AuthContext';

const AppRoutesControl = () => {
  const { user, isLoading, cliente } = useAuth();
  
  // Verifica se o usuário é administrador
  const isAdmin = user?.role === 'ADM';
  

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Se for admin, redireciona para AdminRoutes */}
      {isAdmin ? (
        <Route path="/*" element={<AdminRoutes />} />
      ) : (
        <Route path="/*" element={cliente ? <AppRoutes /> : <AuthRoutes />} />
      )}

      {/* Se não for admin e tentar acessar "/admin", redireciona para a home */}
      {!isAdmin && <Route path="/*" element={<Navigate to="/signin" />} />}
    </Routes>
  );
};

export default AppRoutesControl;
