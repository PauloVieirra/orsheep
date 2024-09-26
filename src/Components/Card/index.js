import React from 'react';
import './styles.css'; // Certifique-se de criar um arquivo CSS para estilos

const Card = ({ pedido, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <h3>ID: {pedido.id}</h3>
            <p>Data: {new Date(pedido.data_pedido).toLocaleString()}</p>
            <p>Valor Total: R$ {pedido.valor_total.toFixed(2)}</p>
            <p>Status: {pedido.status}</p>
        </div>
    );
};

export default Card;
