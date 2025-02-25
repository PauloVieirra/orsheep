import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { MenuVoltarF } from "../../Components/Menutop";
import { BotaoAddToCart, BotaoPedirIcon } from "../../Components/Botoes";
import { useAuth } from "../../context/AuthContext";
import "./style.css";

export default function ItemBannerDetalhes() {
    const { setSelectedProduct, setQuantidade, quantidade, confirmarPedido, theme, statusPedido, cliente, configuracao } = useAuth();
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
        <div className="container-detalhes-Banner" style={{ background: theme.background }}>
            <MenuVoltarF />

            <div className="bannercont-imagedetalhe">

                <img src={produto.imagem_url} alt={produto.nome} style={{ margin: "0px" }} />

                <div className="cont-dados-img">

                    <span>{produto.nome}</span>

                </div>
            </div>

            <div className="container-detalhes">
                <div className="banner-price" style={{ color: theme.textGeral }}>

                    R$ {produto.preco.toFixed(2)}

                    <div style={{ display: "flex", paddingTop: "8px", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                            <FaStar className="icon-start" />
                            <FaStar className="icon-start" />
                            <FaStar className="icon-start" />
                            <FaRegStarHalfStroke className="icon-start" />
                            <FaRegStar className="icon-start" />
                            <div style={{ fontSize: "18px", marginLeft: "8px" }}>{produto.avaliacao}</div>
                        </div>
                    </div>
                </div>

                <div className="description" style={{ color: theme.textGeral }}>
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
                            <div className="cont-bannerquantidade" style={{ color: theme.textGeral }}>{quantidade}</div>
                            <button
                                className="btnsomar"
                                onClick={() => setQuantidade((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>

                    </div>

                    <div className="cont-btnpedir">

                        {cliente?.mesa && cliente?.comanda && configuracao.status_mesa &&
                            <div onClick={handlePedirClick}>
                                <BotaoPedirIcon alt="Pedir" className="btnpedir" style={{with:'100%'}} >
                                    Pedir
                                </BotaoPedirIcon>
                            </div>
                        }

                        {configuracao?.status_delivery && !cliente?.mesa && !cliente?.comanda &&
                            <div>
                                <BotaoAddToCart alt="Pedir" className="btnpedir" />
                            </div>
                        }
                    </div>

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
