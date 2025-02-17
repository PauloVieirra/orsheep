import React,{useState} from "react";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";

export function Grid({ produto, onAdd }) {
    const { produtos, handleProdutos, cliente, setQuantidade, quantidade, setSelectedProduct, toggleConfirmModal, isModalOpen, confirmarPedido, selectedProduct } = useAuth();
      
    const handleConfirmarPedido = () =>{
        confirmarPedido();
      }

     const handlePedirClick = (produto) => {
        setSelectedProduct(produto);
        toggleConfirmModal();
      };

  return (
    <div className="cardGrid">
       <div className="cont-imggrid"> 
      <img src={produto.imagem_url} alt={produto.nome} className="imggrid"/>
      </div>
      
      <div className="gridContent">
        <h3 className="gridTitle">{produto.nome}</h3>
        <p className="gridDescription">{produto.curta_descricao}</p>

        {/* Botão de adicionar */}
        <button className="gridButton" onClick={() => handlePedirClick(produto)}>
          Pedir
        </button>
        

        {isModalOpen && selectedProduct?.id === produto.id && (
          <div className="modallay">
            <div className="modalent">
              <h3>Confirmar Pedido</h3>
              <p>Deseja pedir {selectedProduct.nome}?</p>
              <div className="cont-quantidade">
                <button onClick={() => setQuantidade((q) => Math.max(1, q - 1))}>-</button>
                <span>{quantidade}</span>
                <button onClick={() => setQuantidade((q) => q + 1)}>+</button>
              </div>
              <button onClick={() => handleConfirmarPedido(quantidade)}>Confirmar</button>

              <button onClick={toggleConfirmModal}>Cancelar</button>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
