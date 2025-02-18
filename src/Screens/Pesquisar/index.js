import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { VoltarFixo } from "../../Components/Menutop";
import { CardSearch } from "../../Components/Cardcardapio/CardSearch";
import { IconSearch } from "../../Components/Icons";
import './style.css';

export function Pesquisar() {
    const location = useLocation();
    const { produtos, theme } = useAuth();

    // Pegando a categoria enviada pelo botão "Ver mais"
    const categoriaSelecionada = location.state?.categoria || "";

    // Estado para armazenar o termo digitado pelo usuário
    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);

    // Atualiza a lista de produtos conforme o usuário digita
    useEffect(() => {
        if (termoPesquisa.length >= 3) {
            const termoLower = termoPesquisa.toLowerCase();
            
            const filtrados = produtos?.filter(p => 
                (p.nome.toLowerCase().includes(termoLower) || 
                 p.curta_descricao.toLowerCase().includes(termoLower)) &&
                p.categoria === categoriaSelecionada
            ) || [];

            setProdutosFiltrados(filtrados);
        } else {
            // Se o usuário apagou o texto ou digitou menos de 3 caracteres, mostra todos os da categoria
            setProdutosFiltrados(produtos?.filter(p => p.categoria === categoriaSelecionada) || []);
        }
    }, [termoPesquisa, produtos, categoriaSelecionada]);

    return (
        <div className="pesquisar-container" style={{background:theme.background}}>
            <VoltarFixo/>
           <div className="cont-search"> 
                <section className="cont-input-search" style={{backgroundColor:theme.backgroundCard}}> 
                    <div style={{display:'flex', height:'100%', alignItems:'center'}}>
                        <IconSearch/>
                    </div>
                    <input 
                        placeholder="Pesquisar" 
                        value={termoPesquisa}
                        style={{color:theme.textGeral}}
                        onChange={(e) => setTermoPesquisa(e.target.value)}
                    />
                </section>
           </div>
            <div className="categoria-titulos" style={{color:theme.textGeral}}>
                <span>{categoriaSelecionada}</span>
            </div>
            <div className="cont-itens">
                <CardSearch produtos={produtosFiltrados} />
            </div>
        </div>
    );
}
