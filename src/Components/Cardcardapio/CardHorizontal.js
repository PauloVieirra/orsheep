import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BotaoPedir } from "../Botoes";
import { FaStar } from "react-icons/fa6";
import './style.css';

export function Card({ produto }) {

  const { theme } = useAuth();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDetalhes = () => {
    navigate('/ItemDetalhes', { state: { produto } });
  };


  return (
    <div className="card-horizontal" style={{ background: theme.backgroundCard, boxShadow:theme.sombraCardSimple }} onClick={handleDetalhes}>

      <div>
        {!imageLoaded && (
          <div className="skeleton-img"></div>
        )}
        <div> 
        <img
          src={produto?.imagem_url}
          className={`cards-img ${imageLoaded ? "show" : "hide"}`}
          onLoad={() => setImageLoaded(true)}
          alt={produto?.nome}
        />
      </div>
      </div>
      <section className="card-into">
        <section className="text-card-titulos" style={{color:theme.textGeral}}>
          {produto?.nome} <div><FaStar className="icon-start" /> 4.5</div>
        </section>
        <section className="dados" style={{color:theme.textLeitura}}>
          {produto?.curta_descricao}
        </section>
        <section className="card-price" style={{color:theme.textGeral}}>
          {produto?.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          <BotaoPedir />
        </section>

      </section>


    </div>
  );
}

export function CardA({ produtos = [], limite = 5 }) {
  return (
    <div className="scroll-horizontal">
      {produtos.slice(0, limite).map((produto) => (
        <div key={produto.id}>
          <Card produto={produto} />
        </div>
      ))}
    </div>
  );
}
