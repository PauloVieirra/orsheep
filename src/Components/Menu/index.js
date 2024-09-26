import React from "react";
import { BotaoMenu } from "../Botoes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaHome, FaBox, FaTag, FaCog } from "react-icons/fa"; // Exemplo de ícones
import './styles.css';

export default function Menus() {
    const navigate = useNavigate();
    const { isMenuOpen, handleMenu } = useAuth();

    return (
        <div className={isMenuOpen ? "containeropen" : "containerclose"}>
            <div>
                <button onClick={handleMenu}>
                    {isMenuOpen ? "Fechar" : "Abrir"}
                </button>
            </div>
            {isMenuOpen ? (
                <>
                    <BotaoMenu texto="Início" onClick={() => navigate("/")} icone={<FaHome />} />
                    <BotaoMenu texto="Produtos" onClick={() => navigate("/Produtos")} icone={<FaBox />} />
                    <BotaoMenu texto="Promoções" onClick={() => navigate("/Promocoes")} icone={<FaTag />} />
                    <BotaoMenu texto="Configurações" onClick={() => navigate("/Configuracoes")} icone={<FaCog />} />
                </>
            ) : (
                <>
                    <BotaoMenu onClick={() => navigate("/")} icone={<FaHome />} />
                    <BotaoMenu onClick={() => navigate("/Produtos")} icone={<FaBox />} />
                    <BotaoMenu onClick={() => navigate("/Promocoes")} icone={<FaTag />} />
                    <BotaoMenu onClick={() => navigate("/Configuracoes")} icone={<FaCog />} />
                </>
            )}
        </div>
    );
}
