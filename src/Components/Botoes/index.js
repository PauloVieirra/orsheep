import React from "react";
import { useAuth } from "../../context/AuthContext";
import { IconPedir } from "../Icons";
import './styles.css';

export function BotaoMenu({ texto, onClick, icone }) {
    const { theme } = useAuth();
    return (
        <div className="botao-menu" onClick={onClick}>
            <div className="icon-cont">
                {icone && <span className="icon">{icone}</span>}
            </div>
            <div className="textbtn">
                {texto}
            </div>
        </div>
    );
};

export function BotaoAddDetalhes() {
    return (
        <div>

        </div>
    );
}

export function BotaoPedir() {
    const { theme } = useAuth();
    return (
        <button className="btn-pedir" style={{ background: theme.buttonPedir }}>
            <>Pedir</>
        </button>
    );
}

export function BotaoPedirIcon() {
    const { theme } = useAuth();
    return (
        <button className="btn-pedir" style={{ background: theme.buttonPedir }}>
            <IconPedir /><>Pedir</>
        </button>
    );
}

export function BotaoMenuSide({ text, link }) {
    const { theme } = useAuth();
    return (
        <button className="btnMenuSide">
            <a href={link} style={{ color: theme.textGeral }} >{text}</a>
        </button>
    );
}

export function BotaoPriceBanner({ text }) {
    const { theme } = useAuth();
    return (
        <div className="btnPriceBanner"
            style={{
                color: theme.textGeral,
                background: theme.btnPriceBannerBackground,
                borderColor: theme.borderBtnPriceBanner
            }}>
            {text}
        </div>
    );
}


