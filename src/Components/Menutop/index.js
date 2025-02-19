import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconVoltar } from "../Icons";
import { IconVoltarBlack, IconVoltarWhite, IconVoltarFlex } from "../Icons";
import { IconBills } from "../Icons";
import { IconMenu } from "../Icons";
import { MenuSide } from "../../Screens/Menulateral";
import './style.css';


export function Menutop() {
    const { cliente, handleMenu, theme, themeName, toggleTheme, isMenuOpen } = useAuth();
    const navigate = useNavigate();


    const handleOpenMenu = () => {
        handleMenu();
    }

    return (
        <>
            <div className="containertop" style={{ background: theme.background }}>

                <h4 style={{ color: theme.textGeral }}>Mesa {cliente?.mesa}</h4>
                <h4 style={{ color: theme.textGeral }}>Comanda {cliente?.comanda}</h4>

                <div className="cont-bills-switch">
                    <button onClick={() => navigate('/Conta')} className="btn-voltar">
                        <IconBills />
                    </button>

                    <div className="theme-switcher">
                        <span style={{ color: theme.textGeral }}></span>
                        <label className="switch" style={{ backgroundColor: theme.liderColor }}>
                            <input type="checkbox" checked={themeName === "dark"} onChange={toggleTheme} />
                            <span className="slider" ></span>
                        </label>
                    </div>

                </div>

            </div>
        </>
    );
};

export function MenuVoltarB() {
    const { produtos, handleProdutos, cliente, user, logout, toggleBillsModal } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="containervoltarF">
            <section className="backbanner">
            <button onClick={() => navigate(-1)} className="btn-voltar">
                <IconVoltarBlack />
            </button>
            </section>
        </div>
    );
}

export function MenuVoltarW() {
    const { theme } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="containervoltarF">
            <section className="backbanner">
                <button onClick={() => navigate(-1)} className="btn-voltar">
                    <IconVoltarWhite/>
                </button>
                Voltar
            </section>
        </div>
    );
}

export function MenuVoltarF() {
    const { theme } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="containervoltarF">
            <section className="backbanner" style={{background:theme.backgroundBtnBanner}}>
                <button onClick={() => navigate(-1)} className="btn-voltar">
                    <IconVoltarFlex/>
                </button>
            </section>
        </div>
    );
}
