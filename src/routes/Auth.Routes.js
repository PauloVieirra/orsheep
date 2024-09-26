import React, { useContext }  from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import SigninScreen from '../Screens/SignIn';
import SignnupScreen from '../Screens/SignUp';


function AuthRoutes  () {
  return (
      <div>
      <Routes>
        <Route path="/" element={<SigninScreen/>} />
        <Route path="/SignUp" element={<SignnupScreen/>} />
      </Routes> 
  
    </div>
  );
};

export default AuthRoutes;
