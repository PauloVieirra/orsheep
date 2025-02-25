import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaStar } from "react-icons/fa6";
import { BotaoPedirIcon, BotaoAddToCart } from "../Botoes";
import './style.css';

export function Card({ produto }) {
    const { theme, cliente, configuracao } = useAuth();
    const navigate = useNavigate();

    const handleDetalhes = () => {
        navigate('/ItemDetalhes', { state: { produto } });
    };



    return (
        <div className="card-search" style={{ boxShadow: theme.sombraCardSimple }} onClick={handleDetalhes}>

            <img src={produto?.imagem_url} style={{ margin: '0px' }} />

            <section className="cont-card" style={{ background: theme.backgroundCard }}>

                <section className="text-card-titulos" style={{ color: theme.textGeral }}>
                    {produto?.nome} <div><FaStar className="icon-start" />{produto.avaliacao}</div>
                </section>
                <section className="dados" style={{ color: theme.textLeitura }}>
                    {produto?.curta_descricao}
                </section>


                <div className="cont-price-pedir">
                    <section className="card-price" style={{ color: theme.textGeral }}>
                        {produto?.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}



                    </section>

                    {cliente?.mesa && cliente?.comanda && configuracao.status_mesa &&
                        <BotaoPedirIcon />
                    }


                    {configuracao?.status_delivery && !cliente?.mesa && !cliente?.comanda &&
                        <div>
                            <BotaoAddToCart alt="Pedir" className="btnpedir" />
                        </div>
                    }

                </div>



            </section>

        </div>
    );
}


export function CardSearch({ produtos = [], limite = 100 }) {
    return (
        <div className="scroll-search">
            {produtos.slice(0, limite).map((produto) => (
                <Card key={produto.id} produto={produto} />
            ))}
        </div>
    );
}
