import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BotaoAddToCart, BotaoPedirIcon } from "../Botoes";
import { FaStar } from "react-icons/fa6";
import './style.css';

export function Card({ produto }) {

    const { theme, configuracao, cliente } = useAuth();
    const navigate = useNavigate();

    const handleDetalhes = () => {
        navigate('/ItemDetalhes', { state: { produto } });
    };

    return (
        <div className="card-simples" onClick={handleDetalhes} style={{ background: theme.backgroundCard, boxShadow: theme.sombraCardSimple }}>

            <img src={produto?.imagem_url} style={{ margin: '0px' }} />

            <section className="cont-card">
                <section className="text-card-titulos" style={{ color: theme.textGeral }}>
                    {produto?.nome} <div><FaStar className="icon-start" />{produto.avaliacao}</div>
                </section>
                <section className="dados" style={{ color: theme.textGeral }}>
                    {produto?.curta_descricao}
                </section>
            </section>

            <div className="cont-price-pedir">

                <section className="card-price" style={{ color: theme.textGeral }}>

                    {produto?.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}

                    {cliente?.mesa && cliente?.comanda && configuracao.status_mesa && 
                    
                      <BotaoPedirIcon /> 
                     
                    }

                     {configuracao?.status_delivery && !cliente?.mesa && !cliente?.comanda && 
                      <div> 
                        <BotaoAddToCart alt="Pedir" className="btnpedir"/>
                      </div>
                    }





                    

                </section>






            </div>
        </div>
    );
}


export function CardSimples({ produtos = [], limite = 5 }) {
    return (
        <div className="scroll-container">
            {produtos.slice(0, limite).map((produto) => (
                <Card key={produto.id} produto={produto} />
            ))}
        </div>
    );
}
