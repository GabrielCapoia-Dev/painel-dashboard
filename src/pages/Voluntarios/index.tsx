import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { useEffect, useState, useRef } from "react";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { Loading } from "../../components/Loading";
import axios from "axios";
import { FaUserPlus, FaEdit, FaTrash, FaFilter, FaSearch } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

interface IUsuarios {
    id: number;
    nome: string;
    email: string;
    permissoes: string;
}

export default function Voluntarios() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dadosUsuarios, setDadosUsuarios] = useState<Array<IUsuarios>>([]);
    const [selecionaUsuario, setSelecionaUsuario] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const tableRef = useRef<HTMLTableElement>(null); // Referência para a tabela

    // Inicio, Update State, Destruir
    useEffect(() => {
        const lsStorage = localStorage.getItem("casaDaPaz.token");
        let token: IToken | null = null;

        if (typeof lsStorage === "string") {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
        }

        if (!validaPermissao(["admin", "secretarios"], token?.user.permissoes)) {
            navigate("/dashboard");
        }

        setLoading(true);
        axios
            .get("http://localhost:3001/users")
            .then((res) => {
                setDadosUsuarios(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [navigate]);

    const filteredUsers = dadosUsuarios.filter((usuario) => {
        const matchesSearchTerm = usuario.nome
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesFilter = filter ? usuario.permissoes === filter : true;
        return matchesSearchTerm && matchesFilter;
    });

    const handleUserClick = (usuarioId: number) => {
        setSelecionaUsuario(usuarioId);
    };

    const handleEditClick = () => {
        if (selecionaUsuario) {
            navigate(`/usuarios/${selecionaUsuario}`);
        }
    };

    const handleDeleteClick = () => {
        if (selecionaUsuario) {
            setModalMessage(`Deseja realmente excluir o usuário com ID: ${selecionaUsuario}?`);
            setShowModal(true);
        }
    };

    const handleUserDoubleClick = (usuarioId: number) => {
        navigate(`/usuarios/${usuarioId}`);
    };

    const handleDeleteConfirm = () => {
        if (selecionaUsuario) {
            axios.delete(`http://localhost:3001/users/${selecionaUsuario}`).then(() => {
                setDadosUsuarios(dadosUsuarios.filter((user) => user.id !== selecionaUsuario));
                setSelecionaUsuario(null);
                setShowModal(false);
            });
        }
    };

    // Função para remover a seleção do usuário
    const clearSelection = () => {
        setSelecionaUsuario(null);
    };

    // Função para lidar com a tecla 'ESC'
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            clearSelection();
        }
    };

    // Adiciona o evento de teclado
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    return (
        <>
            <Loading visible={loading} />
            <LayoutDashboard>
                <div className="d-flex justify-content-between mt-3">
                    <h1 className="h2">Usuários</h1>
                    <div className="d-flex align-items-center">
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={() => {
                                navigate("/usuarios/criar");
                            }}
                        >
                            <FaUserPlus className="text-success" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={handleEditClick}
                            disabled={!selecionaUsuario}
                        >
                            <FaEdit
                                className={selecionaUsuario ? "text-warning" : "text-muted"} // Amarelo se selecionado
                            />
                        </button>
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={handleDeleteClick}
                            disabled={!selecionaUsuario}
                        >
                            <FaTrash
                                className={selecionaUsuario ? "text-danger" : "text-muted"} // Vermelho se selecionado
                            />
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => setIsFilterVisible(!isFilterVisible)}
                        >
                            <FaFilter className="text-info" />
                        </button>
                    </div>
                </div>

                {isFilterVisible && (
                    <div className="mb-3">
                        <label className="form-label">Filtrar por Permissão:</label>
                        <select
                            className="form-select"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="">Todas</option>
                            <option value="admin">Admin</option>
                            <option value="colaborador">Colaborador</option>
                        </select>
                    </div>
                )}

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar usuário"
                        aria-label="Buscar usuário"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                        <FaSearch />
                    </button>
                </div>

                <table className="table table-striped" ref={tableRef}>
                    <thead>
                        <tr>
                            <th scope="col">
                                #
                            </th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Permissões</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((usuario) => (
                            <tr
                                key={usuario.id}
                                onClick={() => handleUserClick(usuario.id)}
                                onDoubleClick={() => handleUserDoubleClick(usuario.id)}
                                style={{
                                    backgroundColor:
                                        selecionaUsuario === usuario.id
                                            ? "lightgreen"
                                            : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <th scope="row">
                                    <input
                                        type="checkbox"
                                        checked={selecionaUsuario === usuario.id}
                                        onChange={() => handleUserClick(usuario.id)}
                                    />{" "}
                                    {usuario.id}
                                </th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.permissoes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmação de Exclusão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </LayoutDashboard>
        </>
    );
}
