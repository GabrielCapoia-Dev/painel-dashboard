import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IToken } from '../../interfaces/token';
import styles from './styles.module.css';
import { validaPermissao } from '../../services/token'


interface IProps {
    children: ReactNode;
    token?: IToken | null;
}

export const LayoutDashboard = (props: IProps) => {

    const [token, setToken] = useState<IToken>()

    useEffect(() => {
        let isToken = localStorage.getItem('casaDaPaz.token')

        let token: IToken | undefined

        if (typeof isToken === 'string') {
            token = JSON.parse(isToken)
            setToken(token)
        }
    })

    return (
        <>
            <header className={styles.header}>
                <a className={styles.brand} href="/dashboard">
                    Sistema Casa da Paz
                </a>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="w-100"></div>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <Link className="nav-link px-3" to="/">Sair</Link>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav
                        id="sidebarMenu"
                        className={`${styles.sidebar} col-md-3 col-lg-2 d-md-block bg-light sidebar collapse`}
                    >
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className={styles.menuLink} to={'/dashboard'}>
                                        Home
                                    </Link>
                                </li>
                                {
                                    validaPermissao(
                                        ['admin', 'secretario'],
                                        token?.user.permissoes
                                    ) &&
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link`}
                                            to={'/usuarios'}
                                        >
                                            Usuários
                                        </Link>
                                    </li>
                                }

                                <li className="nav-item">
                                    <Link className={`nav-link`} to={'/galeria'}>
                                        Galeria
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={`nav-link`} to={'/voluntarios'}>
                                        Voluntários
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>

                </div>
            </div>
        </>
    );
}
