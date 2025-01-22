import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const host = 'localhost';
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

const USERS_FILE = 'usuarios.json';
let auto_increment = 1;

// Functions
function lerUsuarios() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')); 
}

function salvarUsuarios(usuarios) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
}

// Rota para listar usuários
app.get('/usuarios', (request, response) => {
    const usuarios = lerUsuarios();
    response.json(usuarios);
});

// Rota para cadastrar usuário
app.post('/cadastro/usuario', (request, response) => {
    // Recebe os dados do corpo da requisição
    const { nome, email } = request.body;
    const usuarios = lerUsuarios();
    // const novoUsuario = { id: usuarios.length +1, nome, email};
    const novoUsuario = { id: auto_increment++, nome, email};
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    response.json({ mensagem: `Usuário ${nome} cadastrado com sucesso!` });
});

// Iniciar o servidor da API
app.listen(port, host, () => {
    // console.log(`Servidor rodando em http://localhost:3000/`);
    console.log(`Servidor rodando em http://${host}:${port}/`);
})
