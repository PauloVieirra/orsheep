import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BotaoAddToCart, BotaoPedirIcon } from "../Botoes";
import { FaStar } from "react-icons/fa6";
import './style.css';

export function Card({ produto }) {
    const { theme, cliente, configuracao } = useAuth();
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleDetalhes = () => {
        navigate('/ItemDetalhes', { state: { produto } });
    };

    return (
        <div className="card-Grid" onClick={handleDetalhes} style={{ background: theme.backgroundCard }}>
            <div className="img-nome-grid">

                {!imageLoaded && (
                    <div className="skeleton-img"></div>
                )}

                <img
                    src={produto?.imagem_url}
                    className={`cards-img ${imageLoaded ? "show" : "hide"}`}
                    onLoad={() => setImageLoaded(true)}
                    style={{ margin: '0px' }}
                    alt={produto?.nome}
                />
                <div className="img-titulogrid">
                    {produto?.nome}
                </div>
            </div>
            <section>
                <div className="cont-pricegrid" style={{ color: theme.textGeral }}>
                    {produto?.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
                <div className="dados-grid" style={{ color: theme.textLeitura }}>
                    {produto?.curta_descricao}
                </div>
                <div className="cont-gridbtn">
                {cliente?.mesa && cliente?.comanda && configuracao.status_mesa && 
                    <BotaoPedirIcon />
                }
                  {configuracao?.status_delivery && !cliente?.mesa && !cliente?.comanda && 
                                      <div> 
                                        <BotaoAddToCart alt="Pedir" className="btnpedir"/>
                                      </div>
                }
                </div>
            </section>
        </div>
    );
}

export function CardGrid({ produtos = [], limite = 20 }) {
    return (
        <div className="scroll-container-grid">
            {produtos.slice(0, limite).map((produto) => (
                <Card key={produto.id} produto={produto} />
            ))}
        </div>
    );
}