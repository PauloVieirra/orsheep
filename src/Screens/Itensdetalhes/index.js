import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MenuVoltarF } from "../../Components/Menutop";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { BotaoPedirIcon, BotaoAddToCart } from "../../Components/Botoes";
import { useAuth } from "../../context/AuthContext";
import "./style.css";

export default function ItemDetalhes() {
    const { setSelectedProduct, setQuantidade, quantidade, confirmarPedido, theme, statusPedido, cliente, configuracao, adicionarAoCarrinho  } = useAuth();

    const location = useLocation();
    const { produto } = location.state || {};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCartOpen, setIsModalCartOpen] = useState(false);

    if (!produto) {
        return <p>Produto não encontrado.</p>;
    }

   
    const hanldeAddToCart = () => {
        setSelectedProduct(produto);
        setIsModalCartOpen(true); // Abre o modal
    }


    const handlePedirClick = () => {
        setSelectedProduct(produto);
        setIsModalOpen(true); // Abre o modal
    };



    const handleConfirmarPedido = () => {
        confirmarPedido();
        setIsModalOpen(false); // Fecha o modal após confirmar
    };

    const handleConfirmarAdd = () => {
        adicionarAoCarrinho();
        setIsModalCartOpen(false); // Fecha o modal após confirmar
    };

    return (
        <div className="container-detalhes" style={{ background: theme.background }}>
            <MenuVoltarF />
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
                            <div style={{ fontSize: "18px", marginLeft: "8px" }}>{produto.avaliacao}</div>
                        </div>
                        <>R$ {produto.preco.toFixed(2)}</>
                    </div>
                </div>
            </div>

            <div className="cont-detalhesproduto">
                <section className="description" style={{ color: theme.textLeitura }}>{produto.longa_descricao}</section>

                <section className="bottoms-detalhes">
                    <div className="cont-btns-count">
                        <div className="cont-valortotal" style={{ background: theme.backgroundCard }}>
                            <span style={{ color: theme.textGeral }}><strong>R$ {(produto.preco * quantidade).toFixed(2)}</strong></span>
                        </div>
                        <div className="cont-btnconunt">
                            <button
                                className="btnsomar"
                                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                                style={{background:theme.btnPedirDetalheBack}}
                            >
                                -
                            </button>
                            <span style={{ color: theme.textGeral }}>{quantidade}</span>
                            <button
                                className="btnsomar"
                                onClick={() => setQuantidade((q) => q + 1)}
                                style={{background:theme.btnPedirDetalheBack}}
                            >
                                +
                            </button>
                        </div>

                    </div>
                    
                    {cliente?.mesa && cliente?.comanda && configuracao.status_mesa && 
                    <div onClick={handlePedirClick}> 
                    <BotaoPedirIcon alt="Pedir" className="btnpedir" >
                        Pedir
                    </BotaoPedirIcon>
                    </div>
                    }

                   {configuracao?.status_delivery && !cliente && 
                   
                    <div onClick={hanldeAddToCart}> 
                    <BotaoAddToCart alt="Pedir" className="btnpedir"/>
                    </div>
                    }


                </section>
            </div>

            {/* MODAL DE CONFIRMAÇÃO */}



            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Pedido</h2>
                        <p>
                            Você está pedindo <strong>{quantidade}</strong>x <strong>{produto.nome}</strong>.
                        </p>
                        <p>
                            Valor total: <strong>R$ {(produto.preco * quantidade).toFixed(2)}</strong>
                        </p>

                        <div className="modal-buttons">
                            <button className="btncancelar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            <button className="btnconfirmar" onClick={handleConfirmarPedido}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}

{isModalCartOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Pedido</h2>
                        <p>
                            Você está pedindo <strong>{quantidade}</strong>x <strong>{produto.nome}</strong>.
                        </p>
                        <p>
                            Valor total: <strong>R$ {(produto.preco * quantidade).toFixed(2)}</strong>
                        </p>

                        <div className="modal-buttons">
                            <button className="btncancelar" onClick={() => setIsModalCartOpen(false)}>Cancelar</button>
                            <button className="btnconfirmar" onClick={handleConfirmarAdd}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}





            {statusPedido && (
                <div className="modal-enviado">
                    <div className="pedido-enviado">
                      <span>  Pedido enviado com sucesso!  </span>
                    </div>
                </div>
            )}








        </div>
    );
}
