import React, { useEffect, useState } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import axios from "axios";

interface IVoluntario {
    id: number;
    nome: string;
    email: string;
}

export default function Voluntarios() {
    const [voluntarios, setVoluntarios] = useState<IVoluntario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVoluntarios = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_URL + "/voluntarios");
                setVoluntarios(response.data);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar a lista de voluntários.");
            } finally {
                setLoading(false);
            }
        };

        fetchVoluntarios();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <LayoutDashboard>
            <h1>Lista de Voluntários</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {voluntarios.map((voluntario) => (
                        <tr key={voluntario.id}>
                            <td>{voluntario.id}</td>
                            <td>{voluntario.nome}</td>
                            <td>{voluntario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LayoutDashboard>
    );
}
