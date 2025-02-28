import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BotaoPedirIcon, BotaoAddToCart } from "../Botoes";
import { FaStar } from "react-icons/fa6";
import './style.css';

export function CardCart({ produto }) {

  const { theme, cliente, configuracao } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Função para tratar o clique (caso seja necessário para navegação, por exemplo)
  const handleDetalhes = () => {
    // Lógica para mostrar detalhes, por exemplo, navegação para a página do produto
  };

  return (
    <div className="card-horizontal" style={{ background: theme.backgroundCard, boxShadow: theme.sombraCardSimple }} onClick={handleDetalhes}>

      <div>
        {!imageLoaded && (
          <div className="skeleton-img"></div>
        )}
        <div>
          <img
            src={produto?.imagem_url}
            className={`cards-img ${imageLoaded ? "show" : "hide"}`}
            onLoad={() => setImageLoaded(true)}
            style={{ margin: '0px' }}
            alt={produto?.nome}
          />
        </div>
      </div>
      <section className="card-into">
        <section className="text-card-titulos" style={{ color: theme.textGeral }}>
          {produto?.nome} <div><FaStar className="icon-start" /></div>
        </section>
        <section className="dados" style={{ color: theme.textLeitura }}>
          {produto?.curta_descricao}
        </section>

        <section className="card-price" style={{ color: theme.textGeral }}>
          {produto?.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}

          {cliente?.mesa && cliente?.comanda && configuracao.status_mesa &&
            <BotaoPedirIcon />
          }

          {configuracao?.status_delivery && !cliente?.mesa && !cliente?.comanda &&
            <div>
              <BotaoAddToCart alt="Pedir" className="btnpedir" />
            </div>
          }
        </section>
      </section>

    </div>
  );
}

