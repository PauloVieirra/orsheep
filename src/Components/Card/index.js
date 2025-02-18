import React from 'react';
import './styles.css'; // Certifique-se de criar um arquivo CSS para estilos


const Card = ({ pedido, onClick }) => {

    const statusColors = {
        'pendente': 'rgba(191, 191, 191, 0.5)', // Amarelo
        'aceito': 'rgba(101, 199, 130, 0.5)',    // Verde
        'entrega': '#2196f3',   // Azul
        'finalizado': 'rgba(255, 203, 68, 0.5)', // Roxo
        'cancelado': 'rgba(235, 119, 115, 0.5)',  // Vermelho
    };

    return (
        <div className="card-pedidoadm" onClick={onClick}>
           
            <div className='cont-cardpedidos'>
                {pedido.quantidade} {pedido.nome_produto}
            </div>
             <h4>Mesa {pedido.mesa}</h4>
            <p>Comanda: {pedido.comanda}</p>

        </div>
    );
};

export default Card;
