import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from '../Screens/Home';
import Mesas from '../Screens/Mesas';
import Configuracoes from '../Screens/Configuracoes';
import Produtos from '../Screens/Produtos';
import Menus from '../Components/Menu';
import { CadastroAdm } from '../Screens/SignUpAdm';

const AdminRoutes = () => {
  return (
    <div style={{display:'flex'}}>
    <Menus/>
    <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path='/CadastroAdm' element={<CadastroAdm/>} />
        <Route path="/Mesas" element={<Mesas/>} />
        <Route path="/Configuracoes" element={<Configuracoes/>} />
        <Route path="/Produtos" element={<Produtos/>} />
    </Routes>
    </div>
  );
};

export default AdminRoutes;
