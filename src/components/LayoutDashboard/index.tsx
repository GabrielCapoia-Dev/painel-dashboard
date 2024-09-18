import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IToken } from '../../interfaces/token';
import styles from './styles.module.css';

interface IProps {
    children: ReactNode;
    token?: IToken | null;
}

export const LayoutDashboard = (props: IProps) => {

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
                                <li className="nav-item">
                                    <Link className={styles.menuLink} to={'/usuarios'}>
                                        Usuários
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
