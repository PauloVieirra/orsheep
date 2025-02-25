import React,{useContext} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Cardapio from '../Screens/Cardapio';
import ItemDetalhes from '../Screens/Itensdetalhes';
import { Conta } from '../Screens/Bills';
import { Pesquisar } from '../Screens/Pesquisar';
import Scan from '../Screens/Scan';
import ItemBannerDetalhes from '../Screens/IntensBannerDetalhes';



function AppRoutes  () {
  const {user} = useAuth();
  
  return (
    <div style={{display:'flex', flexDirection:'column', backgroundColor:'#131313'}}>
     
    
      <Routes>
        <Route path="/" element={<Cardapio/>} />
        <Route path="/ItemDetalhes" element={<ItemDetalhes />} />
        <Route path='/IntensBannerDetalhes' element={<ItemBannerDetalhes/>}/>
        <Route path="/Pesquisar" element={<Pesquisar/>}/>
        <Route path="/Conta" element={<Conta/>}/>
      </Routes> 
   
    </div>
  );
};

export default AppRoutes;
