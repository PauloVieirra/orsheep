import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./style.css";

export function Mesas() {
    const { adicionarMesa, removerMesa, listarMesas } = useAuth();
    const [mesas, setMesas] = useState([]);
    const [numeroMesa, setNumeroMesa] = useState("");

    useEffect(() => {
        carregarMesas();
    }, []);

    const carregarMesas = async () => {
        const mesasCadastradas = await listarMesas();
        setMesas(mesasCadastradas);
    };

    const handleAdicionar = async () => {
        if (!numeroMesa) return;
        const response = await adicionarMesa(parseInt(numeroMesa));
        if (response.success) {
            setNumeroMesa("");
            carregarMesas();
        }
    };

    const handleRemover = async (id) => {
        const response = await removerMesa(id);
        if (response.success) {
            carregarMesas();
        }
    };

    return (
        <div className="mesas-container">
            <h2>Gerenciar Mesas</h2>
            <div className="mesa-form">
                <input
                    type="number"
                    value={numeroMesa}
                    onChange={(e) => setNumeroMesa(e.target.value)}
                    placeholder="Número da mesa"
                />
                <button onClick={handleAdicionar}>Adicionar Mesa</button>
            </div>

            <div className="mesas-grid">
                {mesas.map((mesa) => (
                    <div key={mesa.id} className="mesa-card">
                        <span>Mesa {mesa.numero_mesa}</span>
                        <button onClick={() => handleRemover(mesa.id)}>❌</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Mesas;
