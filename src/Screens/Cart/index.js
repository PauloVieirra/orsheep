import React from "react";
import { useAuth } from "../../context/AuthContext";
import { MenuVoltarB } from "../../Components/Menutop";
import { IconClose } from "../../Components/Icons";
import "./style.css";

export function Cartpage() {
    const { cart, setCart } = useAuth();
    console.log(cart);

    // Atualiza a quantidade de um item no carrinho
    const updateQuantidade = (id, novaQuantidade) => {
        if (novaQuantidade < 1) return;

        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantidade: novaQuantidade } : item
            )
        );
    };

    // Remove um item do carrinho
    const removerItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Calcula o total dos pedidos
    const totalPedidos = cart.reduce((acc, item) => acc + item.quantidade * item.valor, 0);

    return (
        <div className="cart-container">

            <MenuVoltarB />
            <h2>Meu Carrinho</h2>

            {cart.length === 0 ? (
                <div className="cart-empty">
                    <p>Seu carrinho está vazio.</p>
                </div>
            ) : (
                <div className="cart-items">
                    <div className="cart-cont">
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-card">
                                <img
                                    src={item.imagem}
                                    alt={item.nome_produto}
                                    className="cart-image"
                                />
                                <div className="cart-details">
                                    <span className="cart-item-name">{item.nome_produto}</span>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantidade(item.id, item.quantidade - 1)}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{item.quantidade}</span>
                                        <button
                                            onClick={() => updateQuantidade(item.id, item.quantidade + 1)}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="cart-price">
                                        R$ {(item.quantidade * item.valor).toFixed(2)}
                                    </span>
                                </div>
                                <button onClick={() => removerItem(item.id)} className="remove-item">
                                    <IconClose />
                                </button>
                            </li>
                        ))}
                    </ul>
                    </div>

                    <div className="cart-total">
                    <h4>Total: R$ {totalPedidos.toFixed(2)}</h4>
                    <div className="cont-btnenviar">
                        <button>
                            Enviar pedido
                        </button>
                    </div>
                   </div>

                

                  
                </div>
            )}

          
        </div>
    );
}
