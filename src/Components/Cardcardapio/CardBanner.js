import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BotaoPriceBanner } from "../Botoes";
import "./style.css";

export function Card({ produto }) {
    const { theme } = useAuth();
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleDetalhes = () => {
        navigate("/IntensBannerDetalhes", { state: { produto } });
    };


    return (
        <div className="card-banner" onClick={handleDetalhes} >
            {!imageLoaded && (
                <div className="skeleton-img"></div>
            )}
            <div className="newbbaner" style={{ background: theme.backgroundCard, boxShadow: theme.sombraCardSimple }}>
                <img src={produto?.imagem_url}
                    alt={produto?.nome}
                    className={`cards-img ${imageLoaded ? "show" : "hide"}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <div className="into-banner">
                {imageLoaded &&
                    <span style={{ color: theme.textGeral }}>{produto.nome}</span>
                }
                <BotaoPriceBanner text={produto?.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
            </div>


        </div>
    );
}

export function Banner({ produtos = [], limite = 100 }) {
    const [indexAtual, setIndexAtual] = useState(0);
    const bannerRef = useRef(null);

    useEffect(() => {
        if (bannerRef.current) {
            bannerRef.current.scrollTo({
                left: indexAtual * bannerRef.current.clientWidth,
                behavior: "smooth",
            });
        }
    }, [indexAtual]);

    const handleScroll = () => {
        if (bannerRef.current) {
            const scrollLeft = bannerRef.current.scrollLeft;
            const itemWidth = bannerRef.current.clientWidth;
            const novoIndex = Math.round(scrollLeft / itemWidth);
            setIndexAtual(novoIndex);
        }
    };

    const totalItens = Math.min(produtos.length, limite);

    return (
        <div className="banner-container">
            {/* Container do Banner */}
            <div className="scroll-banner" ref={bannerRef} onScroll={handleScroll}>
                {produtos.slice(0, limite).map((produto) => (
                    <Card key={produto.id} produto={produto} />
                ))}
            </div>

            {/* Bolinhas de Navegação */}
            <div className="dots-container">
                {Array.from({ length: totalItens }).map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === indexAtual ? "active" : ""}`}
                        onClick={() => setIndexAtual(index)}
                    />
                ))}
            </div>
        </div>
    );
}
