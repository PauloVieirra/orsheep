import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../servers/SupabaseConect";
import ModalConfirme from "../Confirmemodal";
import Card from "../Card";
import './styles.css'; // Para os estilos da lista de pedidos
import '../../App.css';

export default function Pedidos() {
    const { pedidos, loading, error, setModalOpen, modalOpen, fetchItensPedido, updatePedidoStatus } = useAuth();
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [itensPedido, setItensPedido] = useState([]);
    const [newStatus, setNewStatus] = useState("");

    const handleConfirm = () => {
        console.log("Confirmado!");
        setModalOpen(false);
    };

    const handleCancel = () => {
        console.log("Cancelado!");
        setModalOpen(false);
    };

    const handleCardClick = async (pedido) => {
        setSelectedPedido(pedido);
        setNewStatus(pedido.status);
        const itens = await fetchItensPedido(pedido.id); // Busca os itens do pedido
        setItensPedido(itens); // Atualiza os itens do pedido
    };

    const handleStatusChange = () => {
        if (selectedPedido) {
            setModalOpen(true); // Abre o modal
        }
    };

    const handleConfirmUpdate = async () => {
        if (selectedPedido) {
            try {
                await updatePedidoStatus(selectedPedido.id, newStatus);
                if (newStatus === 'finalizado' || newStatus === 'cancelado') {
                    const { error } = await supabase
                        .from('itens_pedido')
                        .delete()
                        .eq('pedido_id', selectedPedido.id);
                    if (error) throw new Error(error.message);
                }
                // Limpa a seleção após a atualização
                setSelectedPedido(null);
                setItensPedido([]);
            } catch (err) {
                console.error('Erro ao atualizar status:', err.message);
            }
        }
        setModalOpen(false); // Fecha o modal após a confirmação
    };
    

    return (
        <main> 
        <div className="container">
            <div className="pedidos-container">
                {loading && <p>Carregando pedidos...</p>}
                {error && <p>Erro: {error}</p>}
                {pedidos?.length === 0 && !loading && <p>Não há pedidos disponíveis.</p>}
                <div className="grid">
                    {pedidos?.length > 0 && pedidos.map((pedido) => (
                        <Card 
                            key={pedido.id} 
                            pedido={pedido} 
                            onClick={() => handleCardClick(pedido)}
                        />
                    ))}
                </div>
            </div>

            <div className="item-update">
                {selectedPedido ? (
                    <>
                        <h2>Atualizar Pedido: {selectedPedido.id}</h2>
                        <p>Endereço: {selectedPedido.endereco_entrega}</p>
                        <p>Telefone: {selectedPedido.telefone}</p>
                        <p>Valor Total: {selectedPedido.valor_total}</p>
                        <label htmlFor="status-select">Novo Status:</label>
                        <select 
                            id="status-select"
                            value={newStatus} 
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <option value="">Selecione o novo status</option>
                            <option value="pendente">Pendente</option>
                            <option value="aceito">Aceito</option>
                            <option value="entrega">Em Entrega</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                        <button onClick={handleStatusChange}>Atualizar Status</button>
                        
                        <h3>Itens do Pedido</h3>
                        <ul>
                            {itensPedido.length > 0 ? itensPedido.map(item => (
                                <li key={item.id}>
                                    <img src={item.image_url} alt={item.nome} style={{ width: '50px', marginRight: '10px' }} />
                                    {item.nome} - {item.quantidade} x R$ {item.preco_unitario.toFixed(2)} (Subtotal: R$ {(item.quantidade * item.preco_unitario).toFixed(2)})
                                </li>
                            )) : (
                                <p>Não há itens para este pedido.</p>
                            )}
                        </ul>
                    </>
                ) : (
                    <p>Selecione um pedido para atualizar.</p>
                )}
            </div>
            {modalOpen && 
    <ModalConfirme
        isOpen={modalOpen}
        onConfirm={handleConfirmUpdate} // Chama a nova função
        onCancel={handleCancel}
        texto={selectedPedido ? `Deseja confirmar o status do pedido ${selectedPedido.id} para '${newStatus}'?` : 'Pedido não selecionado.'}
    />
}

            

        </div>
        </main>
    );
}
