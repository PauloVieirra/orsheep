import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaStar } from "react-icons/fa6";
import './style.css';

export function Card({ produto }) {
    const {theme} = useAuth();
    const navigate = useNavigate();

    const handleDetalhes = () => {
        navigate('/ItemDetalhes', { state: { produto } });
    };



    return (
        <div className="card-search" style={{boxShadow:theme.sombraCardSimple}} onClick={handleDetalhes}>

            <img src={produto?.imagem_url} style={{ margin: '0px' }} />

            <section className="cont-card">

                <section className="text-card-titulos">
                    {produto?.nome} <div><FaStar className="icon-start"/> 4.5</div>
                </section>
                <section className="dados">
                    {produto?.curta_descricao}
                </section>
                

                <div className="cont-price-pedir"> 
            <section className="card-price">
                {produto?.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}

            </section>

            <button className="card-pedir">
                <> Pedir </>
            </button>
            </div>



            </section>
           
        </div>
    );
}


export function CardSearch({ produtos = [], limite = 100  }) {
    return (
        <div className="scroll-search">
           {produtos.slice(0, limite).map((produto) => (
                <Card key={produto.id} produto={produto} />
            ))}
        </div>
    );
}
