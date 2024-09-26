import React,{useContext} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomeScreen from '../Screens/Home';
import Promocoes from '../Screens/Promocoes';
import Configuracoes from '../Screens/Configuracoes';
import Produtos from '../Screens/Produtos';
import { useAuth } from '../context/AuthContext';
import Menus from '../Components/Menu';


function AppRoutes  () {
  const {user} = useAuth();
  
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
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

export default AppRoutes;
