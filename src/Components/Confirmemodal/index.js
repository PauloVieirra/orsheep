import React from "react";
import './styles.css'; // Importe seu CSS

const ModalConfirme = ({ isOpen, onConfirm, onCancel, texto }) => {
    if (!isOpen) return null; // Não renderiza se o modal não estiver aberto

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{texto}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirme;
