import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import './style.css';

export function CadastroAdm() {
  const { signUp, user } = useAuth(); // Função SignUp que está no seu contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [role, setRole] = useState("colaborador");
  const [token, setToken] = useState(null); 
  const [loading, setLoading] = useState(false);

  console.log(token);

  useEffect(() => {
    // Atualiza o token com o uuid do usuário logado
    if (user) {
      setToken(user.user_id);
    } else {
      setToken(""); // Limpa o token se o usuário não estiver logado
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Passando o valor "colaborador" para a função SignUp
      await signUp(email, password, nome, role, token);
      alert("Colaborador cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar colaborador:", error.message);
      alert("Erro ao cadastrar colaborador.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Novo Colaborador</h2>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading || !token} className="btn-cadastrar">
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
