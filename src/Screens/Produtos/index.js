import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Supondo que você tenha um contexto para gerenciar a autenticação e dados
import supabase from "../../servers/SupabaseConect";
import '../../App.css';
import './styles.css';

const categorias = ['Tradicionais', 'Detox', 'Maromba', 'Frutas congeladas','Açaí', 'Cremosinho','Produtos naturais', 'Congelados','Outros'];

export default function CadastroProduto() {
    const { cadastrarProduto, produtos, handleProdutos, } = useAuth(); // Função para cadastrar o produto no contexto
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [precoi, setPrecoi] = useState("");
    const [precoii, setPrecoii] = useState("");
    const [precoiii, setPrecoiii] = useState("");
    const [medida, setMedida] = useState("kg");
    const [curta_descricao, setCurtaDescricao] = useState("");
    const [longa_descricao, setLongaDescricao] = useState("");
    const [imagem, setImagem] = useState(null); // Armazena a imagem selecionada
    const [imagemUrl, setImagemUrl] = useState(""); // URL da imagem após upload
    const [categoria, setCategoria] = useState("");
   
    useEffect(() => {
      handleProdutos(); // Busca o usuário quando o provedor é montado
    }, []);


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setImagem(file);
          const imageUrl = URL.createObjectURL(file); // Cria uma URL temporária
          setImagemUrl(imageUrl); // Atualiza o estado com a URL
      }
  };

    const uploadImagem = async () => {
      if (!imagem) return "";
  
      const fileName = `${Date.now()}_${imagem.name}`;
      const { data, error } = await supabase.storage
          .from("products")
          .upload(`produtos/${fileName}`, imagem);
          if (data) {
            console.log("Upload bem-sucedido:", data);
        }
  
      if (error) {
          console.error("Erro ao fazer upload da imagem:", error.message);
          throw new Error(error.message);
      }
  
      console.log("Upload bem-sucedido:", data); // Verifique se o upload foi bem-sucedido
  
      // Construindo a URL pública manualmente
      const publicURL = `https://pjifjlzafxoiyrjzgipd.supabase.co/storage/v1/object/public/products/${data.path}`;
      
      console.log("URL pública gerada:", publicURL); // Verifique a URL gerada
      return publicURL; // Retorna a URL pública da imagem
  };
  
  
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = await uploadImagem(); // Aguarda o upload da imagem
            console.log("URL da imagem:", url);

            // Verifica se a URL é válida antes de cadastrar o produto
            if (url) {
                await cadastrarProduto({ 
                    nome, 
                    preco,
                    precoi, 
                    precoii, 
                    precoiii, 
                    medida, 
                    curta_descricao, 
                    longa_descricao, 
                    imagem_url: url, 
                    categoria 
                });
                
                // Limpa os campos após o cadastro
                setNome("");
                setPreco("");
                setPrecoi("");
                setPrecoii("");
                setPrecoiii("");
                setMedida("kg");
                setCurtaDescricao("");
                setLongaDescricao("");
                setImagem(null);
                setCategoria("");
                setImagemUrl(""); // Limpa o estado da URL
            } else {
                console.error("URL da imagem é inválida.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error.message);
        }
    };

    return (
        <div className="main">
          <div className="container"> 
            <h2>Cadastro de Produtos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Imagem:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} required />
                {imagemUrl && <img src={imagemUrl} alt="Imagem do produto" style={{ width: '100px', marginTop: '10px' }} />} {/* Exibe a imagem */}
                 </div>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Preço:</label>
                    <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                </div>
                <div>
                    <label>Desconto % - 1:</label>
                    <input type="number" value={precoi} onChange={(e) => setPrecoi(e.target.value)} />
                </div>
                <div>
                    <label>Desconto % - 2:</label>
                    <input type="number" value={precoii} onChange={(e) => setPrecoii(e.target.value)} />
                </div>
                <div>
                    <label>Desconto % - 3:</label>
                    <input type="number" value={precoiii} onChange={(e) => setPrecoiii(e.target.value)} />
                </div>
              
                <div>
                    <label>Descrição Curta:</label>
                    <input type="text" value={curta_descricao} onChange={(e) => setCurtaDescricao(e.target.value)} required />
                </div>
                <div>
                    <label>Descrição Longa:</label>
                    <textarea value={longa_descricao} onChange={(e) => setLongaDescricao(e.target.value)} required />
                </div>


              


                <div>
                    <label>Categoria:</label>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Cadastrar Produto</button>
            </form>
            </div>
            <div className="produtos-container">
                <h3>Produtos Cadastrados</h3>
                <div className="produtos-grid">
                    {produtos && produtos.length > 0 ? (
                        produtos.map((produto) => (
                            <div key={produto.id} className="produto-card">
                                <img src={produto.imagem_url} alt={produto.nome} style={{ width: '100px' }} />
                                <h4>{produto.nome}</h4>
                                <p>Preço: R$ {parseFloat(produto.preco).toFixed(2)}</p>
                                <p>Categoria: {produto.categoria}</p>
                            </div>
                        ))
                    ) : (
                        <p>Não há produtos cadastrados.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
