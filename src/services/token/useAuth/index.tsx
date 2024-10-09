// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { verificaTokenExpirado, validaPermissao } from "../../token"; // Ajuste o caminho conforme necessário
import { IToken } from "../../../interfaces/token"; // Ajuste o caminho conforme necessário

const useAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dadosUsuarios, setDadosUsuarios] = useState<any[]>([]); // Ajuste o tipo conforme necessário

    useEffect(() => {
        const lsStorage = localStorage.getItem("casaDaPaz.token");
        let token: IToken | null = null;

        if (typeof lsStorage === "string") {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/");
            return;
        }

        if (!validaPermissao(["admin", "secretarios"], token?.user.permissoes)) {
            navigate("/dashboard");
            return;
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

    return { loading, dadosUsuarios };
};

export default useAuth;
