import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import localforage from "localforage";
import './style.css';

const Scan = () => {
  const [searchParams] = useSearchParams();
  const mesaParam = searchParams.get("mesa");
  const [mesa, setMesa] = useState(null);
  const [comanda, setComanda] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { cliente, setCliente } = useAuth();

  const navigate = useNavigate();

  // Recupera os dados salvos ao montar o componente
  useEffect(() => {
    const fetchStoredData = async () => {
      const storedCliente = await localforage.getItem("cliente");

      if (storedCliente) {
        setMesa(storedCliente.mesa);
        setComanda(storedCliente.comanda);
        setIsLoading(false);
      } else if (mesaParam) {
        const numeroComanda = Math.floor(100 + Math.random() * 900);
        setMesa(mesaParam);
        setComanda(numeroComanda);

        const novoCliente = { mesa: mesaParam, comanda: numeroComanda };
        await setCliente(novoCliente);
        await localforage.setItem("cliente", novoCliente);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    fetchStoredData();
  }, [mesaParam, setCliente]);

  // Redirecionamento após garantir que os dados foram carregados
  useEffect(() => {
    if (mesa && comanda) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [mesa, comanda, navigate]);

  // Se os dados ainda estiverem carregando
  if (isLoading) {
    return <h3>Carregando...</h3>;
  }

  // Se não houver mesa identificada
  if (!mesa) {
    return (
      <div className="container-scan">
       <section className="sect-mansagem"> 
        <h1>Nenhuma mesa identificada</h1>
        <p>Por favor, feche essa pagina, abra sua camera e escaneie o QR Code da mesa em que está sentado.</p>
       </section>
      </div>
    );
  }

  return (
    <div>
       {cliente ? (
        <> 
            <h1>Bem-vindo ao Restaurante</h1>
            <p>Mesa: {mesa}</p>
            <p>Comanda: {comanda}</p>

            <h3>Redirecionando para o cardápio...</h3>
        </>
       ):(
        <>
        <div className="container-thanks">
          
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png" alt="Beaming Face with Smiling Eyes"/>
        
        <h3>Obrigado, volte sempre!!!</h3>
        <div className="container-despedida">
          Agradecemos imensamente por usar nosso serviço. Lembre-se, é sempre um prazer tê-lo por aqui.
        </div>
        </div>
        </>
       )}
     

    </div>
  );
};

export default Scan;
