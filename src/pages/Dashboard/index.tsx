import { useEffect } from "react";
import { IToken } from "../../interfaces/token";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

    const navigate = useNavigate()

    // Inicio, Update State, Destruir
    useEffect(() => {

        let lsStorage = localStorage.getItem('casaDaPaz.token')

        let token: IToken | null = null

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage)
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {

            navigate('/')
        }
        console.log('Poder desfrutar do sistema :D');


    }, [])

    return (
        <LayoutDashboard>
            <h1>Graficos</h1>
        </LayoutDashboard>
    )
}