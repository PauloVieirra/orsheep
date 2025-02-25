import React, { createContext, useState, useContext, useEffect } from 'react';
import localforage from 'localforage'; // Importe localforage

import supabase from '../servers/SupabaseConect';
import { LightTheme, DarkTheme } from './theme';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [pedidos, setPedidos] = useState(null);
  const [produtos, setProdutos] =useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchedId, setLastFetchedId] = useState(null);
  const[isMenuOpen, setIsMenuOpen] = useState(false)
  const [billsOpen, setIsBillsOopen] = useState(null);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusPedido, setStatusPedido] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [configuracao, setConfiguracao] = useState(null);
  
  /*Thema -------------------------------------------------------------------*/
  const [themeName, setThemeName] = useState('light');

  const theme = themeName === 'light' ? LightTheme : DarkTheme; 


 
  const navigate = useNavigate();

 // 🔹 Buscar configurações do Supabase ou localforage
 useEffect(() => {
  async function fetchConfiguracao() {
    try {
      setLoading(true);
      setError(null);

      // Tenta carregar do localforage primeiro
      const cachedConfig = await localforage.getItem("configuracao");
      if (cachedConfig) {
        setConfiguracao(cachedConfig);
      }

      // Busca no Supabase
      const { data, error } = await supabase.from("configuracoes").select("*").single();

      if (error) {
        throw error;
      }

      // Atualiza o estado e salva localmente
      setConfiguracao(data);
      await localforage.setItem("configuracao", data);
    } catch (err) {
      setError("Erro ao buscar configurações.");
    } finally {
      setLoading(false);
    }
  }

  fetchConfiguracao();
}, []);

// 🔹 Atualizar configuração específica
const updateConfiguration = async (key, value) => {
  if (!configuracao) return;

  const newConfig = { ...configuracao, [key]: value };
  setConfiguracao(newConfig);
  await localforage.setItem("configuracao", newConfig);

  // Atualizar no Supabase
  const { error } = await supabase.from("configuracoes").update({ [key]: value }).eq("id", configuracao.id);
  if (error) {
    console.error("Erro ao atualizar configuração:", error);
  }
};


    useEffect(() => {
          fetchPedidos(); // Busca os pedidos iniciais
      
          // Listener para receber pedidos em tempo real
          const pedidosListener = supabase
            .channel("pedidos_realtime")
            .on(
              "postgres_changes", 
              { event: "INSERT", schema: "public", table: "pedidos" },
              (payload) => {
                console.log("Novo pedido recebido:", payload.new);
      
                // Adiciona o novo pedido ao estado
                setPedidos((prevPedidos) => [payload.new, ...prevPedidos]);
      
                
              }
            )
            .subscribe();
      
          return () => {
              supabase.removeChannel(pedidosListener); // Remove o listener ao desmontar
          };
      }, []);
 
 useEffect(() => {
  fetchUser();
}, []);

const fetchUser = async () => {
  try {
    const storedUser = await localforage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      console.log('Usuário restaurado do armazenamento local:', storedUser);
      return;
    }

    // Caso não esteja salvo localmente, tenta buscar do Supabase
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;

    if (session?.user) {
      setUser(session.user);
      setIsLoggedIn(true);
      await saveUserLocally(session.user);
      console.log('Usuário restaurado do Supabase:', session.user);
    }
  } catch (error) {
    console.error('Erro ao recuperar usuário:', error.message);
  }
};

const saveUserLocally = async (user) => {
  try {
    if (!user) return;
    await localforage.setItem('user', {
      id: user.id,
      email: user.email,
      role: user.role || null, // Caso o usuário tenha um papel (admin, user)
    });
    console.log("Usuário salvo localmente:", user);
  } catch (err) {
    console.error("Erro ao salvar usuário localmente:", err.message);
  }
};

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

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // 🔹 Buscar informações adicionais do usuário na tabela "user_profiller"
    const { data: userProfile, error: profileError } = await supabase
      .from("user_profiller") // Nome da tabela onde estão as informações do usuário
      .select("*") // Pega todas as colunas
      .eq("user_id", user.id) // Filtra pelo ID do usuário
      .single(); // Retorna um único resultado

    if (profileError) {
      console.error("Erro ao buscar informações do usuário:", profileError.message);
      throw new Error("Erro ao buscar informações do usuário.");
    }

    // 🔹 Criar um novo objeto `user` contendo os dados do perfil
    const fullUser = { ...user, ...userProfile };

    console.log("Login bem-sucedido:", fullUser);

    // 🔹 Atualiza o estado do usuário
    setIsLoggedIn(true);
    setUser(fullUser);

    // 🔹 Salva o usuário localmente para persistência
    await saveUserLocally(fullUser);

    // 🔹 Redirecionamento baseado na role do usuário
    if (fullUser.role === "ADM") {
      navigate("/"); // Redireciona para a rota de Admin
    } else {
      navigate("/"); // Redireciona para a tela inicial
    }

    return fullUser;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
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

  const signUp = async (email, password, nome) => {
    try {
      setLoading(true);
  
      const { data, error } = await supabase.auth.signUp({ email, password });
  
      if (error) throw new Error(error.message);
  
      const user = data.user;
      if (!user) throw new Error("Usuário não foi criado corretamente.");
  
      // Salva o perfil na tabela `user_profiller`
      const { error: profileError } = await supabase
        .from("user_profiller")
        .insert([{ user_id: user.id, nome, email }]);
  
      if (profileError) throw new Error("Erro ao salvar perfil: " + profileError.message);
  
      // Salva o usuário localmente
      await saveUserLocally(user);
      setUser(user);
      setIsLoggedIn(true);
  
      console.log("Cadastro realizado com sucesso!");
      return user;
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
  
      setUser(null);
      setCliente(null);
      setIsLoggedIn(false);
      await localforage.removeItem('user'); // Remover os dados locais
      await localforage.removeItem( 'cliente');
      navigate("/");
      console.log('Usuário deslogado com sucesso.');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
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

        // Armazene os pedidos e o último ID
        setPedidos(data);
        if (data.length > 0) {
            setLastFetchedId(data[0].id); // Armazena o ID do último pedido
        }
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

const confirmarPedido = async () => {
  if (!selectedProduct) return;

  const novoPedido = {
    mesa: cliente.mesa,
    comanda: cliente.comanda,
    produto_id: selectedProduct.id,
    nome_produto: selectedProduct.nome,
    valor: selectedProduct.preco,
    quantidade: quantidade, // Pode ser ajustado
    observacao: "", // Pode permitir edição no modal
  };

  try {
    const { data, error } = await supabase.from("pedidos").insert([novoPedido]);

    if (error) {
      console.error("Erro ao enviar pedido:", error.message);
      return;
    }

    // Adiciona ao carrinho local
    setCart((prevCart) => [...prevCart, novoPedido]);
    setQuantidade(1);
     
   
    setIsModalOpen(false);
    setSelectedProduct(null);
    // Seta confirmar como true
    setStatusPedido(true);

    // Aguarda 3 segundos antes de fechar o modal e resetar o estado
    setTimeout(() => {
      setStatusPedido(false);
     
    }, 3000);

  } catch (err) {
    console.error("Erro inesperado ao confirmar pedido:", err);
  }
};

const adicionarAoCarrinho = () => {
  if (!selectedProduct) return;

  const novoItem = {
    id: selectedProduct.id,
    nome_produto: selectedProduct.nome,
    valor: selectedProduct.preco,
    quantidade: quantidade,
    observacao: "",
  };

  setCart((prevCart) => {
    const itemExistente = prevCart.find((item) => item.id === novoItem.id);

    if (itemExistente) {
      return prevCart.map((item) =>
        item.id === novoItem.id
          ? { ...item, quantidade: item.quantidade + novoItem.quantidade }
          : item
      );
    } else {
      return [...prevCart, novoItem];
    }
  });

  setQuantidade(1);
  setIsModalOpen(false);
  setSelectedProduct(null);
  setStatusPedido(true);

  setTimeout(() => {
    setStatusPedido(false);
  }, 3000);
};


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

 // Função para definir cliente e salvar no armazenamento local
  const setClienteHandle = async (clienteData) => {
    setCliente(clienteData);
    await localforage.setItem('cliente', clienteData);
  };

  // Recupera o cliente salvo ao carregar a aplicação
  useEffect(() => {
    const fetchCliente = async () => {
      const storedCliente = await localforage.getItem('cliente');
      if (storedCliente) {
        setCliente(storedCliente);
      }
    };
    fetchCliente();
  }, []);

  const handleDeletePedidosPorComanda = async (comanda) => {
    if (!comanda) {
      alert("Por favor, informe uma comanda.");
      return;
    }
  
    try {
      const { error } = await supabase
        .from("pedidos")
        .delete()
        .eq("comanda", comanda);
  
      if (error) {
        throw new Error(error.message);
      }
  
      // Atualiza a lista de pedidos após a exclusão
      fetchPedidos();
  
      alert(`Todos os pedidos da comanda ${comanda} foram apagados.`);
    } catch (err) {
      console.error("Erro ao excluir pedidos:", err.message);
    }
  };
  
  const toggleBillsModal = () => {
    setIsBillsOopen((prev) => !prev);
  }

  const toggleConfirmModal = () => {
    setIsModalOpen((prev) => !prev);
  }

      // 🔹 Recuperar o estado salvo ao iniciar o componente
  useEffect(() => {
    const loadSoundPreference = async () => {
      const storedValue = await localforage.getItem("canPlaySound");
      if (storedValue !== null) {
        setCanPlaySound(storedValue); // `localforage` já retorna o valor no tipo correto
      }
    };
    loadSoundPreference();
  }, []);

  // 🔹 Alternar estado e salvar no LocalForage
  const changePlaySound = async () => {
    setCanPlaySound((prev) => {
      const newValue = !prev;
      localforage.setItem("canPlaySound", newValue); // Salva o novo valor
      return newValue;
    });
  };

    // Carregar o tema salvo ao montar o componente
useEffect(() => {
  const loadTheme = async () => {
    try {
      const savedTheme = await localforage.getItem('@theme');
      if (savedTheme) {
        setThemeName(savedTheme);
      }
    } catch (error) {
      console.log('Erro ao carregar o tema:', error);
    }
  };

  loadTheme();
}, []);

const toggleTheme = async () => {
  try {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);
    await localforage.setItem('@theme', newTheme); // Salva o novo tema
  } catch (error) {
    console.log('Erro ao salvar o tema:', error);
  }
};
  

  return (
    <AuthContext.Provider 
    value={{ isLoggedIn,
    user,
    isLoading,
    isMenuOpen,
    pedidos,error,
    modalOpen,
    produtos,
    cliente,
    billsOpen,
    cart,
    selectedProduct,
    isModalOpen,
    canPlaySound,
    quantidade,
    theme,
    themeName,
    configuracao,
    statusPedido,
    updateConfiguration,
    toggleTheme,
    handleDeletePedidosPorComanda,
    setQuantidade,
    changePlaySound,
    toggleConfirmModal,
    setSelectedProduct,
    setIsMenuOpen,
    setCart,
    adicionarAoCarrinho,
    confirmarPedido,
    toggleBillsModal,
    setClienteHandle,
    setCliente,
    handleProdutos,
    setModalOpen,
    cadastrarProduto,
    fetchItensPedido,
    updatePedidoStatus,
    handleMenu,
    login,
    logout,
    signUp,
    getUserData,
    handleLoading,
    fetchUser,
    fetchPedidos
    }}>
      {children}
    </AuthContext.Provider>
  );
};
