import React, { createContext, useState, useContext, useEffect } from 'react';
import localforage from 'localforage'; // Importe localforage
import supabase from '../servers/SupabaseConect';
import { useNavigate } from 'react-router-dom';

// Criando o contexto de autenticação
const AuthContext = createContext();

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor de contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Inicialize como falso até verificar o usuário
  const [user, setUser] = useState(null);
  const [pedidos, setPedidos] = useState(null);
  const [produtos, setProdutos] =useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
 
  const[isMenuOpen, setIsMenuOpen] = useState(true)
  const navigate = useNavigate();
 

  useEffect(() => {
    fetchUser();
  }, []);

  // Função para buscar o usuário localmente ou na sessão do Supabase
  const fetchUser = async () => {
    try {
      const storedUser = await localforage.getItem('user');
      if (storedUser) {
        setIsLoggedIn(true);
        setUser(storedUser);
        console.log('Usuário logado:', storedUser);
      } else {
        const { data: session, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (session && session.user) {
          setIsLoggedIn(true);
          setUser(session.user);
          await saveUserLocally(session.user);
          console.log('Usuário logado:', session.user);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error.message);
    }
  };
  
 
  // Salvar o usuário localmente
  const saveUserLocally = async (user) => {
    await localforage.setItem('user', user);
  };

  // Função de login
  const login = async (email, password) => {
    try {
      setLoading(true); // Ativa o loading antes do login

      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw new Error("Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.");
      }

      console.log('Login bem-sucedido:', user);
      setIsLoggedIn(true);
      setUser(user);

      await saveUserLocally(user); // Salvar o usuário localmente com localforage
      navigate('/'); // Redirecionar para a tela inicial

      return user;
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      throw error;
    } finally {
      setLoading(false); // Desativa o loading após o login
    }
  };

  // Função para obter os dados do usuário atual
  const getUserData = async () => {
    if (!user) {
      throw new Error("Nenhum usuário logado.");
    }
    return user;
  };

  const signUp = async (email, password) => {
    try {
        setLoading(true); // Ativa o loading antes do cadastro

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
            sendEmailVerification: false// O envio de verificação de e-mail pode ser configurado aqui
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log('Cadastro bem-sucedido:', user);
        // Aqui você pode salvar o usuário localmente ou em algum estado

        return user;
    } catch (error) {
        console.error('Erro ao fazer cadastro:', error.message);
        throw error; // Lançar o erro para ser tratado no componente
    } finally {
        setLoading(false); // Desativa o loading após o cadastro
    }
};

  // Função de logout
  const logout = async () => {
    try {
      // Fazer logout do usuário do Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }

      // Limpar o estado do usuário
      setUser(null);
      setIsLoggedIn(false);
      await localforage.removeItem('user'); // Remover o usuário localmente com localforage
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
      throw error;
    }
  };

  // Função para lidar com o estado de loading
  const handleLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  const handleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);

    try {
        const { data, error: fetchError } = await supabase
            .from('pedidos')
            .select('*')
            .order('data_pedido', { ascending: false }); // Ordena pelos pedidos mais recentes

        if (fetchError) {
            throw new Error(fetchError.message);
        }

        setPedidos(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

const fetchItensPedido = async (pedidoId) => {
  try {
      const { data: itens, error: itensError } = await supabase
          .from('itens_pedido')
          .select('*')
          .eq('pedido_id', pedidoId);

      if (itensError) throw new Error(itensError.message);

      // Para cada item, busca os detalhes do produto
      const itensComDetalhes = await Promise.all(itens.map(async (item) => {
          const { data: produto, error: produtoError } = await supabase
              .from('produtos')
              .select('nome, preco, imagem_url')
              .eq('id', item.produto_id)
              .single();

          if (produtoError) throw new Error(produtoError.message);
          
          return {
              ...item,
              nome: produto.nome,
              preco_unitario: parseFloat(produto.preco), // Converte para número
              image_url: produto.imagem_url,
          };
      }));

      return itensComDetalhes;
  } catch (err) {
      console.error('Erro ao buscar itens do pedido:', err.message);
      return [];
  }
};

const cadastrarProduto = async (produto) => {
  try {
      const { error } = await supabase
          .from('produtos')
          .insert([{
              nome: produto.nome,
              preco: produto.preco,
              precoi: produto.precoi,
              precoii: produto.precoii,
              precoiii: produto.precoiii,
              medida: produto.medida,
              curta_descricao: produto.curta_descricao,
              longa_descricao: produto.longa_descricao,
              imagem_url: produto.imagem_url, // Certifique-se de que está sendo gravado
              categoria: produto.categoria,
          }]);

      if (error) throw new Error(error.message);

      console.log("Produto cadastrado com sucesso!");
  } catch (err) {
      console.error("Erro ao cadastrar produto:", err.message);
  }
};

const fetchProdutos = async () => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*');

    if (error) {
      console.error('Erro ao buscar produtos:', error.message);
      return;
    }

    setProdutos(data);
  } catch (err) {
    console.error('Erro inesperado ao buscar produtos:', err);
  }
};

const handleProdutos = () => {
  fetchProdutos();
}


const updatePedidoStatus = async (id, newStatus) => {
  try {
    const { error } = await supabase
      .from('pedidos')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) throw new Error(error.message);

    // Recarrega os pedidos após a atualização
    await fetchPedidos();
  } catch (err) {
    console.error('Erro ao atualizar status:', err.message);
    throw err;
  }
};

useEffect(() => {
  fetchPedidos();
}, []);

useEffect(() => {
    fetchPedidos(); // Chama a função diretamente, sem depender do clienteId
}, []); // O array de dependências agora está vazio


  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isLoading, isMenuOpen, pedidos,error, modalOpen, produtos,handleProdutos,setModalOpen,cadastrarProduto,fetchItensPedido,updatePedidoStatus,handleMenu,login, logout, signUp, getUserData, handleLoading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
