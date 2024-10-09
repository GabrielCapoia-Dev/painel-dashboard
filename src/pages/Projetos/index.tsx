import React, { useEffect, useState } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import axios from "axios";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaTrash, FaEdit, FaSearch } from "react-icons/fa"; // Importando ícones

interface IGaleriaItem {
    id: number;
    titulo: string;
    descricao: string;
    imagemUrl: string;
}

export default function Projetos() {
    const navigate = useNavigate();
    const [galeria, setGaleria] = useState<IGaleriaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selecionaImagem, setSelecionaImagem] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar o modal
    const [newImage, setNewImage] = useState<File | null>(null); // Estado para a nova imagem
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        const lsStorage = localStorage.getItem('casaDaPaz.token');
        let token: IToken | null = null;

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate('/');
        } else {
            // Fetch os itens da galeria
            axios.get(import.meta.env.VITE_URL + '/galeria')
                .then(res => {
                    setGaleria(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Erro ao buscar galeria:', err);
                    setLoading(false);
                });
        }
    }, [navigate]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = () => {
        // Lógica para deletar os itens selecionados
    };

    const handleImport = () => {
        if (newImage && titulo && descricao) {
            const formData = new FormData();
            formData.append('imagem', newImage); // Certifique-se de que o nome corresponde ao que o multer espera
            formData.append('titulo', titulo);
            formData.append('descricao', descricao);

            // Enviar a requisição para o seu servidor
            axios.post(import.meta.env.VITE_URL + '/upload', formData)
                .then(response => {
                    console.log('Imagem importada com sucesso:', response.data);
                    // Atualize a galeria após a importação se necessário
                    setGaleria(prevGaleria => [...prevGaleria, response.data.galleryItem]);
                    setShowModal(false); // Fecha o modal
                    setTitulo("");
                    setDescricao("");
                    setNewImage(null);
                })
                .catch(error => {
                    console.error('Erro ao importar imagem:', error);
                });
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    const handleImageSelect = (id: number) => {
        setSelecionaImagem(!selecionaImagem);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setTitulo("");
        setDescricao("");
        setNewImage(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <LayoutDashboard>
            <div className="container">
                <div className="d-flex justify-content-between mt-3">
                    <h1 className="h2">Galeria</h1>
                    <div className="d-flex align-items-center">
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={() => setShowModal(true)} // Abre o modal
                        >
                            <FaUpload className="text-success" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={handleDelete}
                            disabled={!selecionaImagem}
                        >
                            <FaTrash className={selecionaImagem ? "text-danger" : "text-muted"} />
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <span className="input-group-text">
                            <FaSearch />
                        </span>
                    </div>
                </div>

                <div className="row">
                    {galeria.map(item => (
                        <div key={item.id} className="col-md-2 mb-3">
                            <div className="card">
                                <img src={item.imagemUrl} alt={item.titulo} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-between align-items-center">
                                        {item.titulo}
                                        <FaEdit className="text-warning" onClick={() => {/* Lógica para editar */ }} />
                                    </h5>
                                    <p className="card-text">{item.descricao}</p>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleImageSelect(item.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal de Importação */}
                {showModal && (
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Importar Imagem</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleModalClose}
                                    />
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descrição</label>
                                        <textarea
                                            className="form-control"
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Selecionar Imagem</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setNewImage(e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Fechar</button>
                                    <button type="button" className="btn btn-primary" onClick={handleImport}>Importar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LayoutDashboard>
    );
}
