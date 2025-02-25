import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CardSimples } from "../../Components/Cardcardapio/CardSimples";
import { CardA } from "../../Components/Cardcardapio/CardHorizontal";
import { CardGrid } from "../../Components/Cardcardapio/CardGrid";
import { Menutop } from "../../Components/Menutop";
import { MenuSide } from "../Menulateral";
import { Banner } from "../../Components/Cardcardapio/CardBanner";
import { Footer } from "../../Components/Footer";
import { IconBebiAl, IconEntrad, IconPrato, IconLanche, IconHappy, IconTudo } from "../../Components/Icons";

import "./style.css";

export default function Cardapio() {
    const [filtroCategoria, setFiltroCategoria] = useState(null);
    const { produtos, handleProdutos, logout, isMenuOpen, theme } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleProdutos(); // Carrega os produtos ao montar o componente
    }, [handleProdutos]);

    const handleVerMais = (categoria) => {
        navigate('/Pesquisar', { state: { categoria } });
    };

   
    const categorias = [
        { id: "entradas", nome: "Entradas",titulo:"Entradas", icon:<IconEntrad/> },
        { id: "pratos_principais", nome: "Pratos Principais", titulo:"Pratos",icon:<IconPrato/>  },
        { id: "lanches_sanduiches", nome: "Lanches & Sanduíches", titulo:"Lanches", icon:<IconLanche/>  },
        { id: "bebidas_alcoolicas", nome: "Bebidas Alcoólicas", titulo:"Bebidas" ,icon:<IconBebiAl/> },
        { id: "happy_hour", nome: "Happy Hour", titulo:"Happy Hour",icon:<IconHappy/>  }
    ];

    const produtosFiltrados = Array.isArray(produtos)
        ? filtroCategoria
            ? produtos.filter(p => p.categoria === filtroCategoria)
            : produtos
        : [];

    return (
        <div className="containercardapio" style={{ background: theme.background }}>

            <Menutop />

            {/* Botões de Categorias */}
            <div style={{display:'flex'}}> 
            <div className="cont-selectcat">
                  
            <button 
                    title="Limpar Filtro" 
                    onClick={() => setFiltroCategoria(null)}
                    style={{ 
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        background: "rgba(211, 211, 211, 0.06)",
                        color:theme.textGeral,
                        padding: "10px",
                        fontSize:  !filtroCategoria ? "14px" : "12px",
                        fontWeight: !filtroCategoria  ? "600" : "400",
                        borderWidth: "1px",
                        borderColor:'#000',
                        cursor: "pointer",
                        width: "60px",
                        height: "auto",
                        flexShrink: 0, /* Evita que os botões diminuam de tamanho */
                        borderRadius:'12px',
                    }}
                >
                  <IconTudo/>
                    Tudo
                </button>
                {categorias.map((cat) => (
                    <button 
                        key={cat.id} 
                        title={cat.nome} 
                        onClick={() => setFiltroCategoria(cat.nome)}
                        style={{ 
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'center',
                            background: filtroCategoria === cat.nome ? "rgba(92, 184, 92, 0)" : "rgba(211, 211, 211, 0.06)",
                            color: filtroCategoria === cat.nome ? theme.textGeral : theme.textGeral,
                            padding: "10px",
                            fontSize: filtroCategoria === cat.nome ? "14px" : "12px",
                            fontWeight: filtroCategoria === cat.nome ? "600" : "400",
                            borderWidth: "1px",
                            borderColor:'#000',
                            cursor: "pointer",
                            width: "60px",
                            height: "auto",
                            flexShrink: 0, /* Evita que os botões diminuam de tamanho */
                            borderRadius:'12px',
                        }}
                    >
                        {cat.icon}
                        {cat.titulo}
                    </button>
                ))}
              
                
            </div>
        </div>

           
           
            {/* Renderização Condicional */}
            {filtroCategoria ? (
                <div className="categoria-container">
                    <div className="categoria-titulos" style={{ color: theme.textGeral }}>
                        <span>{filtroCategoria}</span>
                        <span className="item-vermais" onClick={() => handleVerMais(filtroCategoria)}>Ver mais</span>
                    </div>
                    <div className="contoverflow-grid">
                        <CardGrid produtos={produtosFiltrados} limite={10} />
                    </div>
                </div>
            ) : (
                <>
                    {/* Banner de Ofertas */}
                    {Array.isArray(produtos) && produtos.some(p => p.categoria === "Ofertas") && (
                        <div className="categoria-container">
                            <Banner produtos={produtos.filter(p => p.categoria === "Ofertas")} limite={10} />
                        </div>
                    )}

                    {/* Bloco 1 - Entradas */}
                    {Array.isArray(produtos) && produtos.some(p => p.categoria === "Entradas") && (
                        <div className="categoria-container">
                            <div className="categoria-titulos" style={{ color: theme.textGeral }}>
                                <span>Entradas</span>
                                <span className="item-vermais" onClick={() => handleVerMais("Entradas")}>Ver mais</span>
                            </div>
                            <div className="contoverflow-simples">
                                <CardSimples produtos={produtos.filter(p => p.categoria === "Entradas")} limite={5} />
                            </div>
                        </div>
                    )}

                    {/* Bloco 2 - Bebidas Alcoólicas */}
                    {Array.isArray(produtos) && produtos.some(p => p.categoria === "Bebidas Alcoólicas") && (
                        <div className="cont-bebidas-alcoolicas">
                            <div className="categoria-titulos" style={{ color: theme.textGeral }}>
                                <span>Bebidas Alcoólicas</span>
                                <span className="item-vermais" onClick={() => handleVerMais("Bebidas Alcoólicas")}>Ver mais</span>
                            </div>
                            <div className="cont-bebidasalcolicas">
                                <CardA produtos={produtos.filter(p => p.categoria === "Bebidas Alcoólicas")} />
                            </div>
                        </div>
                    )}

                    {/* Bloco 3 - Happy Hour */}
                    {Array.isArray(produtos) && produtos.some(p => p.categoria === "Happy Hour") && (
                        <div className="categoria-container">
                            <div className="categoria-titulos" style={{ color: theme.textGeral }}>
                                <span>Happy Hour</span>
                                <span className="item-vermais" onClick={() => handleVerMais("Happy Hour")}>Ver mais</span>
                            </div>
                            <div className="contoverflow-simples">
                                <CardSimples produtos={produtos.filter(p => p.categoria === "Happy Hour")} limite={5} />
                            </div>
                        </div>
                    )}

                    {/* Bloco 4 - Pratos Principais */}
                    {Array.isArray(produtos) && produtos.some(p => p.categoria === "Pratos Principais") && (
                        <div className="categoria-container">
                            <div className="categoria-titulos" style={{ color: theme.textGeral }}>
                                <span>Pratos Principais</span>
                                <span className="item-vermais" onClick={() => handleVerMais("Pratos Principais")}>Ver mais</span>
                            </div>
                            <div className="contoverflow-simples">
                                <CardGrid produtos={produtos.filter(p => p.categoria === "Pratos Principais")} limite={5} />
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Menu Lateral */}
            {isMenuOpen && <MenuSide />}

           <Footer/>

        </div>
    );
}
