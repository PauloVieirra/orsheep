import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { BotaoPedir } from "../Botoes";
import { FaStar } from "react-icons/fa6";
import './style.css';

export function Card({ produto }) {

    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleDetalhes = () => {
        navigate('/ItemDetalhes', { state: { produto } });
    };


  return (
    <div className="card-horizontal" onClick={handleDetalhes}>
    
    <div> 
        {!imageLoaded && (
                    <div className="skeleton-img"></div>
        )}
             <img 
              src={produto?.imagem_url}
              className={`cards-img ${imageLoaded ? "show" : "hide"}`}
              onLoad={() => setImageLoaded(true)}
              alt={produto?.nome}
             />
   </div>
     <section className="card-into"> 
      <section className="text-card-titulos">
           {produto?.nome} <div><FaStar className="icon-start"/> 4.5</div>
      </section>
      <section className="dados">
           {produto?.curta_descricao}
      </section>
      <section className="card-price">
        {produto?.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        <BotaoPedir/>
    </section>

    </section>

    
    </div>
  );
}

export function CardA({ produtos = [], limite = 5}) {
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
