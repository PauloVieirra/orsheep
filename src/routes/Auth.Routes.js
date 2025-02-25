import React, { useContext }  from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import SigninScreen from '../Screens/SignIn';
import SignnupScreen from '../Screens/SignUp';
import Scan from '../Screens/Scan';
import { Pesquisar } from '../Screens/Pesquisar';
import Casehome from '../Screens/Landingpage';
import ItemDetalhes from '../Screens/Itensdetalhes';
import ItemBannerDetalhes from '../Screens/IntensBannerDetalhes';
import { Cartpage } from '../Screens/Cart';


function AuthRoutes  () {
  return (
      <div>
      <Routes>
        <Route path="/" element={<Scan/>} />
        <Route path="/Landingpage" element={<Casehome />} />
         <Route path="/ItemDetalhes" element={<ItemDetalhes />} />
          <Route path='/IntensBannerDetalhes' element={<ItemBannerDetalhes/>}/>
          <Route path="/Pesquisar" element={<Pesquisar/>}/>
          <Route path="/Cart" element={<Cartpage/>}/>
        <Route path="/Signin" element={<SigninScreen/>} />
        <Route path="/SignUp" element={<SignnupScreen/>} />
      </Routes> 
  
    </div>
  );
};

export default AuthRoutes;
