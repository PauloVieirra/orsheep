import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconVoltar } from "../Icons";
import { IconVoltarBlack } from "../Icons";
import { IconBills } from "../Icons";
import { IconMenu } from "../Icons";
import { MenuSide } from "../../Screens/Menulateral";
import './style.css';


export function Menutop () {
    const { cliente, handleMenu,theme } = useAuth();
    const navigate = useNavigate();

    

    const handleOpenMenu =() =>{
        handleMenu();
    }
    
  
    return(
        <>
            <div className="containertop" style={{background:theme.background}}> 
                
                <h4 style={{color:theme.textGeral}}>Mesa {cliente?.mesa}</h4> 
                <h4 style={{color:theme.textGeral}}>Comanda {cliente?.comanda}</h4> 

                <div>
                <button onClick={() => navigate('/Conta')} className="btn-voltar">
                    <IconBills/>
                </button>
                
                <button className="btn-voltar" onClick={handleOpenMenu}>
                    <IconMenu/>
                </button>
                </div>

                


            </div>

           
        </>
    );
};

export function Menuvoltar () {
    const { produtos, handleProdutos, cliente, user, logout, toggleBillsModal } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    return(
        <div className="containervoltar">
           <button onClick={() => navigate(-1)} className="btn-voltar">
            <IconVoltar/> 
           </button>
            Voltar
        </div>
    );
}

export function VoltarFixo () {
    const { produtos, handleProdutos, cliente, user, logout, toggleBillsModal } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    return(
        <div className="cont-voltar-fixo">
            <section className="back"> 
           <button onClick={() => navigate(-1)} className="btn-voltar">
            <IconVoltarBlack/> 
           </button>
            Voltar
            </section>
        </div>
    );
}
