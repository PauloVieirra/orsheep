import React from "react";
import { useAuth } from "../../context/AuthContext";
import { MenuVoltarB } from "../../Components/Menutop";
import { IconClose } from "../../Components/Icons";
import "./style.css";

export function Cartpage() {
    const { cart, setCart } = useAuth();

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
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <span>{item.nome_produto}</span>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantidade(item.id, item.quantidade - 1)}>-</button>
                                    <span>{item.quantidade}</span>
                                    <button onClick={() => updateQuantidade(item.id, item.quantidade + 1)}>+</button>
                                </div>
                                <span>R$ {(item.quantidade * item.valor).toFixed(2)}</span>
                                <button onClick={() => removerItem(item.id)} className="remove-item">X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="cart-total">
                <h3>Total: R$ {totalPedidos.toFixed(2)}</h3>
            </div>
        </div>
    );
}
