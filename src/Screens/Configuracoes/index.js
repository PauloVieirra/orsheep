import React from "react";
import { useAuth } from "../../context/AuthContext";
import '../../App.css';

export default function Configuracoes(){
    const {logout} =useAuth();

    const handleLogout = () => {
         logout();
    }
    return(
        <div className="main">
            Tela Config
            <button onClick={handleLogout}>
                Sair
            </button>
        </div>
    );
}