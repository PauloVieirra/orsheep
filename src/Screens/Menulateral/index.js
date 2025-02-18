import React from "react";
import { useAuth } from "../../context/AuthContext";
import { BotaoMenuSide } from "../../Components/Botoes";
import "./style.css";

export function MenuSide() {
  const { theme, themeName, toggleTheme, handleMenu, isMenuOpen } = useAuth();

  return (
    <div className={`cont-menuSide ${isMenuOpen ? "open" : "closed"}`}>
      {/* Fundo escuro clicável para fechar o menu */}
      <div className="menu-overlay" onClick={handleMenu}/>

      {/* Conteúdo do Menu */}
      <section className="cont-content-menuSide" style={{ background: theme.background, color: theme.textGeral }}>
        {/* Botão de fechar */}
        <button className="menu-close" style={{color:theme.textGeral}} onClick={handleMenu}>
          ✖ Fechar
        </button>
        <div style={{display:'flex', height:'50px'}}/>
        
        <div  style={{color:theme.textGeral, display:'flex', flexDirection:'column', height:'100%'}}>
        
            <BotaoMenuSide text="📞 Contato" link="/contato" />
            <BotaoMenuSide text="📜 Termos de Uso" link="/termos-de-uso"/>
        
       <div className="theme-switcher">
          <span style={{color:theme.textGeral}}>Modo {themeName === "dark" ? "Escuro 🌙" : "Claro ☀"}</span>
          <label className="switch" style={{backgroundColor: theme.liderColor}}>
            <input type="checkbox" checked={themeName === "dark"} onChange={toggleTheme} />
            <span className="slider" ></span>
          </label>
        </div>
   
        </div>
        
        

        {/* Rodapé do menu */}
        <footer className="menu-footer">
          <p>🔧 Criado por: Seu Nome</p>
        </footer>
      </section>
    </div>
  );
}
