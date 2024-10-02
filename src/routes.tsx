import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import Voluntarios from './pages/Voluntarios'
import GerenciarUsuarios from './pages/Usuarios/Gerenciar'
import Galeria from './pages/Galeria'



export const Rotas = () => {

    return (
        <BrowserRouter>
            <Routes>

                <Route
                    // Pagina de login
                    path='/'
                    element={<Login />}
                />

                <Route
                    // Pagina de Menu
                    path='/dashboard'
                    element={<Dashboard />}
                />


                <Route
                    // Pagina de Menu
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



            </Routes>
        </BrowserRouter>
    )
}