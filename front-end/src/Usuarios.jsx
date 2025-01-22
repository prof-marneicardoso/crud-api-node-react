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
