import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Usuarios from "./Usuarios";
import "./App.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    const response = await fetch("http://localhost:3000/cadastro/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    });

    const data = await response.json();
    setMensagem(data.mensagem);
  };

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>
      
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Cadastro</Link> | <Link to="/usuarios">Lista de Usuários</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}

export default App;
