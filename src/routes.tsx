import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Voluntarios from './pages/Voluntarios';
import GerenciarUsuarios from './pages/Usuarios/Gerenciar';
import Galeria from './pages/Galeria';
import Projetos from './pages/Projetos';
import Feedbacks from './pages/Feedbacks';

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Login />}
                />
                <Route
                    path='/dashboard'
                    element={<Dashboard />}
                />
                <Route
                    path='/usuarios'
                    element={<Usuarios />}
                />
                <Route
                    path='/usuarios/:id'
                    element={<GerenciarUsuarios />}
                />
                <Route
                    path="/voluntarios"
                    element={<Voluntarios />}
                />
                <Route
                    path="/galeria"
                    element={<Galeria />}
                />
                <Route
                    path="/projetos"
                    element={<Projetos />}
                />

                <Route
                    path="/feedbacks"
                    element={<Feedbacks />}
                />
            </Routes>
        </BrowserRouter>
    );
};
