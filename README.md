# API (Back-End) com Node.js e Express + Formulário de cadastro e Listagem de usuários em React (Front-End)

- Cadastro de Usuários via formulário.

- Armazenamento dos dados em um arquivo JSON.

- Listagem de Usuários cadastrados em uma segunda página.



## 1. Back-End (Node.js + Express)

### 1.1. Criar o projeto Node.js e abrir no VSCode

Abra o **cmd** e digite:
```
// Crie a pasta do projeto
mkdir api

// Entre na pasta api
cd api

// Abra o projeto no VSCode
code .
```

### 1.2. Criar o package.json e adicionar "type module"

Crie o arquivo package.json
```
npm init -y
```

Abra o arquivo package.json e adicione
```json
"type": "module",
"scripts": {
    "dev": "node --watch server.js"
},
```

### 1.3. Instalar as dependências
```
npm i express
npm i cors
npm i fs
```

#### Express
- Framework que facilita criar o servidor com Node.js.

#### CORS
- (Cross-origin Resource Sharing) mecanismo que permite o navegador acessar recursos de uma origem diferente da página que está solicitando.

#### FS (File System)
 - Módulo para manipulação de arquivos e pastas.

#### Middlewares
 - Funções que interceptam e processam requisições HTTP antes ou depois de elas serem processadas.

### 1.4. Criar o servidor Express

Crie um arquivo chamado **server.js** e adicione o código:

```js
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

const USERS_FILE = "usuarios.json";

// Funções auxiliares
const lerUsuarios = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
};

const salvarUsuarios = (usuarios) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
};

// Rota para cadastrar usuários
app.post('/cadastro/usuario', (request, response) => {
    const { nome, email } = request.body;
    const usuarios = lerUsuarios();
    const novoUsuario = { id: usuarios.length + 1, nome, email };
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    response.json({ mensagem: `Usuário ${nome} cadastrado com sucesso!` });
});

// Rota para listar usuários
app.get('/usuarios', (request, response) => {
    const usuarios = lerUsuarios();
    response.json(usuarios);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
```

Quando um usuário for cadastrado, ele será salvo em **usuarios.json**, e o endpoint /usuarios retornará todos os usuários cadastrados.

### 1.5. Rodar o servidor
```
npm run dev
```

Agora a API estará rodando em http://localhost:3000/  
.  
.  
.  

## 2. Front-End (React)

### 2.1. Criar o projeto React

Abra o **cmd** e digite:
```
// Crie o projeto em React
npm create vite@latest crud

// Entre na pasta do projeto
cd crud

// Abra o projeto no VSCode
code .
```

Instale o módulo React Router DOM
```
npm i react-router-dom
```



### 2.2. Criar o componente de Cadastro

No arquivo src/App.jsx, substituir o código por:
```jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Usuarios from "./Usuarios";

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

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
```



### 2.3. Criar o componente de Listagem de Usuários

Criar o arquivo src/Usuarios.jsx e adicionar:
```jsx
import { useState, useEffect } from "react";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const carregarUsuarios = async () => {
            const response = await fetch("http://localhost:3000/usuarios");
            const data = await response.json();
            setUsuarios(data);
        };
        carregarUsuarios();
    }, []);

    return (
        <div className="container">
            <h2>Lista de Usuários</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <strong>Nome:</strong> {usuario.nome} - <strong>Email:</strong> {usuario.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Usuarios;
```



### 2.4. Estilizar a aplicação

No arquivo src/App.css, adicionar:
```css
nav {
    background: #007bff;
    padding: 10px;
    text-align: center;
}

nav a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-weight: bold;
}

nav a:hover {
    text-decoration: underline;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #f8f8f8;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
}
```



### 2.5 Rodar o Front-End
```
npm run dev
```
