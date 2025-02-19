import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menuvoltar } from "../../Components/Menutop";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import "./style.css";

export default function ItemDetalhes() {
    const { setSelectedProduct, setQuantidade, quantidade, confirmarPedido, theme } = useAuth();
    const location = useLocation();
    const { produto } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!produto) {
        return <p>Produto não encontrado.</p>;
    }

    const handlePedirClick = () => {
        setSelectedProduct(produto);
        setIsModalOpen(true); // Abre o modal
    };

    const handleConfirmarPedido = () => {
        confirmarPedido();
        setIsModalOpen(false); // Fecha o modal após confirmar
    };

    return (
        <div className="container-detalhes" style={{background:theme.background}}>
            <Menuvoltar />
            <div className="cont-imagedetalhe">

                <img src={produto.imagem_url} alt={produto.nome} style={{ margin: "0px" }} />

                <div className="cont-dados-img">
                    <>{produto.nome}</>
                    <div style={{ display: "flex", paddingTop: "8px", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                            <FaStar className="icon-start" />
                            <FaStar className="icon-start" />
                            <FaStar className="icon-start" />
                            <FaRegStarHalfStroke className="icon-start" />
                            <FaRegStar className="icon-start" />
                            <div style={{ fontSize: "18px", marginLeft: "8px" }}>3.5</div>
                        </div>
                        <>R$ {produto.preco.toFixed(2)}</>
                    </div>
                </div>
            </div>

            <div className="cont-detalhesproduto">
                <section className="description" style={{color:theme.textLeitura}}>{produto.longa_descricao}</section>

                <section className="bottoms-detalhes">
                    <div className="cont-btns-count">
                    <div className="cont-valortotal" style={{background:theme.backgroundCard}}> 
                        <span style={{color:theme.textGeral}}><strong>R$ {(produto.preco * quantidade).toFixed(2)}</strong></span>
                    </div>
                        <div className="cont-btnconunt">
                            <button 
                                className="btnsomar" 
                                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                            >
                                -
                            </button>
                            <span style={{color:theme.textGeral}}>{quantidade}</span>
                            <button 
                                className="btnsomar" 
                                onClick={() => setQuantidade((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                       
                    </div>

                    <button alt="Pedir" className="btnpedir" onClick={handlePedirClick}>
                        Pedir
                    </button>
                </section>
            </div>

            {/* MODAL DE CONFIRMAÇÃO */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Pedido</h2>
                        <p>Você está pedindo <strong>{quantidade}</strong>x <strong>{produto.nome}</strong>.</p>
                        <p>Valor total: <strong>R$ {(produto.preco * quantidade).toFixed(2)}</strong></p>

                        <div className="modal-buttons">
                            <button className="btncancelar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            <button className="btnconfirmar" onClick={handleConfirmarPedido}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
