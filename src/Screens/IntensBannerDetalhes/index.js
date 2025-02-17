import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { Menuvoltar } from "../../Components/Menutop";
import { useAuth } from "../../context/AuthContext";
import "./style.css";

export default function ItemBannerDetalhes() {
    const { setSelectedProduct, setQuantidade, quantidade, confirmarPedido } = useAuth();
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
        <div className="container-detalhes-Banner">
           <Menuvoltar/>
            
            <div className="bannercont-imagedetalhe">

                <img src={produto.imagem_url} alt={produto.nome} style={{ margin: "0px" }} />

                <div className="cont-dados-img">
                    
                    <span>{produto.nome}</span>
                   
                </div>
            </div>

            <div className="container-detalhes">
               <div className="banner-price">
                R$ {produto.preco.toFixed(2)}
                <div style={{ display: "flex", paddingTop: "8px", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                            <FaStar className="icon-start" />
                            <FaStar className="icon-start" />
                            <FaStar className="icon-start" />
                            <FaRegStarHalfStroke className="icon-start" />
                            <FaRegStar className="icon-start" />
                            <div style={{ fontSize: "18px", marginLeft: "8px" }}>3.5</div>
                        </div>
                </div>
                </div>

                <div className="description">
                    {produto.longa_descricao}
                </div>

                <section className="bottoms-detalhes">


                    <div className="cont-btnscount">

                       <div className="cont-valortotal"> 
                        <span><strong>R$ {(produto.preco * quantidade).toFixed(2)}</strong></span>
                       </div>
                       
                       <div className="cont-btnsomar">
                            <button 
                                className="btnsomar" 
                                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                            >
                                -
                            </button>
                            <div className="cont-bannerquantidade">{quantidade}</div>
                            <button 
                                className="btnsomar" 
                                onClick={() => setQuantidade((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                       
                    </div>

                    <div className="cont-btnpedir"> 
                    <button alt="Pedir" className="btnpedir" onClick={handlePedirClick}>
                        Pedir
                    </button>
                    </div>

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
