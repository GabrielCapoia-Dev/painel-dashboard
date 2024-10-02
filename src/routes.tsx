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
                    // Pagina de Voluntarios
                    path='/valuntarios'
                    element={<Voluntarios />}
                />

            </Routes>
        </BrowserRouter>
    )
}