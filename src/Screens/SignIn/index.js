import React, { useState, useContext } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SigninScreen() {
  const { login } = useAuth(); // Desestrutura a função de login do contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      await login(email, password); // Chama a função de login com email e senha
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente."); // Define mensagem de erro
    }
  };

  return (
    <div>
      <h2>Tela de Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
