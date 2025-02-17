import React, { useContext }  from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import SigninScreen from '../Screens/SignIn';
import SignnupScreen from '../Screens/SignUp';
import Scan from '../Screens/Scan';
import Cardapio from '../Screens/Cardapio';


function AuthRoutes  () {
  return (
      <div>
      <Routes>
        <Route path="/" element={<Scan/>} />
        <Route path="/Signin" element={<SigninScreen/>} />
        <Route path="/SignUp" element={<SignnupScreen/>} />
      </Routes> 
  
    </div>
  );
};

export default AuthRoutes;
