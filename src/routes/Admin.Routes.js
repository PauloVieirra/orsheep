import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from '../Screens/Home';
import Promocoes from '../Screens/Promocoes';
import Configuracoes from '../Screens/Configuracoes';
import Produtos from '../Screens/Produtos';
import Menus from '../Components/Menu';

const AdminRoutes = () => {
  return (
    <div style={{display:'flex'}}>
    <Menus/>
    <Routes>

        <Route path="/" element={<HomeScreen/>} />
        <Route path="/Promocoes" element={<Promocoes/>} />
        <Route path="/Configuracoes" element={<Configuracoes/>} />
        <Route path="/Produtos" element={<Produtos/>} />
    </Routes>
    </div>
  );
};

export default AdminRoutes;
