import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../servers/SupabaseConect";
import ModalConfirme from "../Confirmemodal";
import Card from "../Card";
import './styles.css'; 
import '../../App.css';

export default function Pedidos() {
    const { pedidos, loading, error, setModalOpen, modalOpen, fetchItensPedido, updatePedidoStatus, changePlaySound, canPlaySound, handleDeletePedidosPorComanda } = useAuth();
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [itensPedido, setItensPedido] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedStatus, setSelectedStatus] = useState("pendente"); 
    const [comandaInput, setComandaInput] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleConfirmDelete = () => {
        handleDeletePedidosPorComanda(comandaInput);
        setIsDeleteModalOpen(false);
      };
   
    
    console.log(pedidos);

    const [lastFetchedId, setLastFetchedId] = useState(null); // Para rastrear o último ID


   const handlePlay = () => {
    changePlaySound();
   }
    


    const playSound = () => {
        if (canPlaySound) {
            const audio = new Audio('./alertsound.mp3'); // Altere para o caminho do seu arquivo MP3
            audio.play().catch(error => {
                console.error("Erro ao tentar reproduzir o som:", error);
            });
        }
    };

    useEffect(() => {
        if (pedidos && pedidos.length > 0) {
            const newPedido = pedidos.find(pedido => pedido.id > lastFetchedId);
            if (newPedido) {
                playSound(); // Toca o som se houver um novo pedido
                setLastFetchedId(newPedido.id); // Atualiza o último ID
            }
        }
    }, [pedidos]); // Monitora apenas a lista de pedidos

    const handleButtonClick = () => {
       
    };

    const orderStatuses = {
        'pendente': 1,
        'aceito': 2,
        'entrega': 3,
        'finalizado': 4,
        'cancelado': 5,
    };

    const statusColors = {
        'pendente': 'rgba(191, 191, 191, 0.5)', 
        'aceito': 'rgba(101, 199, 130, 0.5)',    
        'entrega': '#2196f3',   
        'finalizado': 'rgba(255, 203, 68, 0.5)', 
        'cancelado': 'rgba(235, 119, 115, 0.5)',  
    };

    const sortedPedidos = pedidos?.sort((a, b) => {
        return orderStatuses[a.status] - orderStatuses[b.status];
    });

    const filteredPedidos = sortedPedidos?.filter((pedido) => {
        const matchesSearch = 
            (pedido.nome && pedido.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||  
            pedido.id.toString().includes(searchTerm);
        const matchesStatus = 
            selectedStatus === "todos" || pedido.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const statusCounts = {
        'todos': sortedPedidos?.length,
        'pendente': sortedPedidos?.filter(pedido => pedido.status === 'pendente').length,
        'aceito': sortedPedidos?.filter(pedido => pedido.status === 'aceito').length,
        'entrega': sortedPedidos?.filter(pedido => pedido.status === 'entrega').length,
        'finalizado': sortedPedidos?.filter(pedido => pedido.status === 'finalizado').length,
        'cancelado': sortedPedidos?.filter(pedido => pedido.status === 'cancelado').length,
    };

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
        const itens = await fetchItensPedido(pedido.id); 
        setItensPedido(itens); 
    };

    const handleStatusChange = () => {
        if (selectedPedido) {
            setModalOpen(true); 
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
                setSelectedPedido(null);
                setItensPedido([]);
            } catch (err) {
                console.error('Erro ao atualizar status:', err.message);
            }
        }
        setModalOpen(false); 
    };

    const handleStatusSelect = (status) => {
        setSelectedStatus(status);
    };

    

    return (
        <div className="containerpedidos">
            <div className="pedidos-container">
                {loading && <p>Carregando pedidos...</p>}
                {error && <p>Erro: {error}</p>}
                {filteredPedidos?.length === 0 && !loading && 
              <>
              {showModal && (
                <div className="modal-pedidos">
                  <div className="content">
                    <p>Não há pedidos disponíveis.</p>
                  </div>
                </div>
              )}
             </>
                }
                
                <div className="seashbar">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="selecteditens" style={{ display: 'flex', gap: '10px' }}>
                    {['todos', 'pendente', 'aceito', 'entrega', 'finalizado', 'cancelado'].map(status => (
                        <div 
                            key={status} 
                            className={`carditenselect ${selectedStatus === status ? 'active' : ''}`} 
                            onClick={() => handleStatusSelect(status)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                border: selectedStatus === status ? '2px solid blue' : '1px solid gray',
                                borderRadius: '5px',
                                transition: 'background-color 0.3s',
                                backgroundColor: selectedStatus === status ? '#e0f7fa' : 'white',
                                transition:'all, 1s ease'
                            }}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)} 

                            <div className="status-count" 
                                style={{
                                    backgroundColor: statusColors[status] || 'transparent',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    color: '#fff',
                                    display: 'inline-block',
                                    marginLeft: '5px',
                                    fontWeight: 'bold'
                                }}
                            >
                                ({statusCounts[status]})
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid">
                    {filteredPedidos?.map((pedido) => (
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
                                <div>
                                    <p>Não há itens para este pedido.</p> 
                                </div>
                               
                            )}
                        </ul>
                    </>
                ) : (
                    <div className="finalizar-atendimento">
                        <h3>Finalizar Atendimento</h3>
                        <p>Digite o número da comanda:</p>
                        <input
                            type="text"
                            value={comandaInput}
                            onChange={(e) => setComandaInput(e.target.value)}
                            placeholder="Número da comanda"
                        />
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            title="Liberar comanda"
                        >
                            Liberar comanda
                        </button>
                        </div>
                )}
                        {isDeleteModalOpen && (
                        <ModalConfirme
                            isOpen={isDeleteModalOpen}
                            onConfirm={handleConfirmDelete}
                            onCancel={() => setIsDeleteModalOpen(false)}
                            texto={`Tem certeza que deseja apagar todos os pedidos da comanda ${comandaInput}?`}
                        />
                        )}

                {modalOpen && 
                    <ModalConfirme
                        isOpen={modalOpen}
                        onConfirm={handleConfirmUpdate}
                        onCancel={handleCancel}
                        texto={selectedPedido ? `Deseja confirmar o status do pedido ${selectedPedido.id} para '${newStatus}'?` : 'Pedido não selecionado.'}
                    />
                }
            </div>
        </div>
    );
}