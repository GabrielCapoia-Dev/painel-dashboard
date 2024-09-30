import { useEffect } from "react";
import { IToken } from "../../interfaces/token";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";
import './styles.module.css'; // Importando o CSS modularizado

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const lsStorage = localStorage.getItem('casaDaPaz.token');
        let token: IToken | null = null;

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate('/');
        }
        console.log('Poder desfrutar do sistema :D');
    }, []);

    const galleryImages = [
        { id: 1, src: 'https://via.placeholder.com/300?text=Evento+1', description: 'Evento 1' },
        { id: 2, src: 'https://via.placeholder.com/300?text=Evento+2', description: 'Evento 2' },
        { id: 3, src: 'https://via.placeholder.com/300?text=Evento+3', description: 'Evento 3' },
    ];

    const publishedTexts = [
        { id: 1, title: 'Texto 1', description: 'Descrição do texto 1' },
        { id: 2, title: 'Texto 2', description: 'Descrição do texto 2' },
    ];

    return (
        <LayoutDashboard>
            <div className="container">
                <h1 className="my-4">Bem-vindo ao Painel Administrativo</h1>

                <section className="mb-4">
                    <h2 className="d-flex justify-content-between align-items-center">
                        Informações Principais
                    </h2>
                    <p>Aqui você pode acompanhar as principais atividades da ONG.</p>
                </section>

                <section className="mb-4">
                    <h2 className="d-flex justify-content-between align-items-center">
                        Galeria
                        <div>
                            <button className="btn btn-primary me-2">Acessar Galeria</button>
                            <button className="btn btn-success">Publicar Foto</button>
                        </div></h2>
                    <div className="row">
                        {galleryImages.map(image => (
                            <div key={image.id} className="col-md-4 mb-3">
                                <div className="card">
                                    <img src={image.src} alt={image.description} className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text">{image.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-4">
                    <h2 className="d-flex justify-content-between align-items-center">
                        Textos Publicados
                        <div>
                            <button className="btn btn-primary me-2">Editar</button>
                            <button className="btn btn-success">Publicar Texto</button>
                        </div>
                    </h2>
                    <div className="row">
                        {publishedTexts.map(text => (
                            <div key={text.id} className="col-md-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{text.title}</h5>
                                        <p className="card-text">{text.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </LayoutDashboard>
    );
}
