import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { VoltarFixo } from "../../Components/Menutop";
import supabase from "../../servers/SupabaseConect";
import "./style.css";

export function Conta() {
    const { cliente, configuracao } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("Configuração:", configuracao); // Para depuração

    useEffect(() => {
        async function fetchPedidos() {
            if (!cliente?.mesa || !cliente?.comanda) return;

            try {
                setLoading(true);
                setError(null);

                const { data, error } = await supabase
                    .from("pedidos")
                    .select("*")
                    .eq("mesa", cliente.mesa)
                    .eq("comanda", cliente.comanda);

                if (error) {
                    throw error;
                }

                setPedidos(data || []);
            } catch (err) {
                setError("Erro ao buscar pedidos. Tente novamente.");
            } finally {
                setLoading(false);
            }
        }

        fetchPedidos();
    }, [cliente.mesa, cliente.comanda]);

 // Calcula o total dos pedidos
const totalPedidos = pedidos.reduce((acc, item) => acc + item.quantidade * item.valor, 0);

// Usa diretamente o valor de servico, pois agora é um número no banco
const taxaServico = configuracao?.servico ? (totalPedidos * configuracao.servico) / 100 : 0;

// Taxa de cover (caso esteja ativa)
const taxaCover = configuracao?.status_cover ? (configuracao?.cover || 0) : 0;

// Total final incluindo taxas
const totalFinal = totalPedidos + taxaServico + taxaCover;

// Exibe valores no console para depuração

console.log("Serviço (%):", configuracao?.servico);

    return (
        <div className="conta-container">
            <VoltarFixo />
            <h2>Minha Conta</h2>

            {loading && <p>Carregando pedidos...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && pedidos.length === 0 ? (
                <p>Você ainda não fez nenhum pedido.</p>
            ) : (
                <div className="cont-bills">
                    <ul>
                        {pedidos.map((item, index) => (
                            <li key={index} className="conta-item">
                                <span>{item.nome_produto}</span>
                                <span>{item.quantidade}x</span>
                                <span>R$ {item.valor.toFixed(2)}</span>
                                <span>Subtotal: R$ {(item.quantidade * item.valor).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="cont-totais">

                        
                       
                    <div style={{fontSize:'18px', fontWeight:'700', marginTop:'100px'}}> Subtotal: R$ {totalPedidos.toFixed(2)} </div>
                     

                        <div> 
                        <p>+ Serviço ({configuracao?.servico}%): R$ {taxaServico.toFixed(2)}</p>
                        {configuracao?.cover && <p>+ Cover: R$ {taxaCover.toFixed(2)}</p>}
                        


                      <div style={{fontSize:'18px', fontWeight:'700', marginTop:'40px'}}> Valor Total: R$ {totalFinal.toFixed(2)} </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="cont-btn-pedirconta">
                <button>Pedir Conta</button>
            </div>
        </div>
    );
}
