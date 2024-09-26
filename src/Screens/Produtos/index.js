import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Supondo que você tenha um contexto para gerenciar a autenticação e dados
import supabase from "../../servers/SupabaseConect";
import '../../App.css';

const categorias = ['verdura', 'hortalica', 'fruta', 'outros'];

export default function CadastroProduto() {
    const { cadastrarProduto } = useAuth(); // Função para cadastrar o produto no contexto
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [medida, setMedida] = useState("kg");
    const [curta_descricao, setCurtaDescricao] = useState("");
    const [longa_descricao, setLongaDescricao] = useState("");
    const [imagem, setImagem] = useState(null); // Armazena a imagem selecionada
    const [imagemUrl, setImagemUrl] = useState(""); // URL da imagem após upload
    const [categoria, setCategoria] = useState("");
   
    console.log("URL da imagem no estado imagem:", imagem);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagem(file);
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
                    medida, 
                    curta_descricao, 
                    longa_descricao, 
                    imagem_url: url, 
                    categoria 
                });
                
                // Limpa os campos após o cadastro
                setNome("");
                setPreco("");
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
            <h2>Cadastro de Produtos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>Preço:</label>
                    <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                </div>
                <div>
                    <label>Medida:</label>
                    <input type="text" value={medida} onChange={(e) => setMedida(e.target.value)} required />
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
                    <label>Imagem:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
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
    );
}
