import React from "react";
import './styles.css';

const BotaoMenu = ({ texto, onClick, icone }) => {
    return (
        <div className="botao-menu" onClick={onClick}>
            <div className="icon-cont">
            {icone && <span className="icon">{icone}</span>}    
            </div>
            <div>
            {texto}  
            </div>
            
        </div>
    );
};

export { BotaoMenu };
