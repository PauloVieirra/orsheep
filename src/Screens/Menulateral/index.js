import React from "react";
import { useAuth } from "../../context/AuthContext";
import './style.css';

export function MenuSide(){

    const {theme, themeName,toggleTheme,handleMenu,isMenuOpen}= useAuth();

   
    const handleOpenMenu =() =>{
        handleMenu();
    }

    const handleChangeTheme = () => {
        toggleTheme();
    }
    
  return (
    <div className={`cont-menuSide ${isMenuOpen ? "open" : "closed"}`}>
    {/* Fundo escuro clicável */}
    <div className="menu-overlay" />

    {/* Conteúdo do Menu */}
    <section className="cont-content-menuSide" style={{ background: theme.background }} >

        <button className="menu-close" onClick={handleOpenMenu}>
            Fechar
        </button>
        <h3>Menu Lateral</h3>
        <button onClick={handleChangeTheme}>
            Mudar
        </button>
     
    </section>
    
</div>
  );
}
