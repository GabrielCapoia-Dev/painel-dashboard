import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IToken } from "../../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../../services/token";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IForm {
    nome: string;
    email: string;
    password: string;
    permissoes: string;
}

export default function GerenciarUsuarios() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IForm>();

    const refForm = useRef<any>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        let lsStorage = localStorage.getItem("casaDaPaz.token");
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

        const idUser = Number(id);

        if (!isNaN(idUser)) {
            setIsEdit(true);
            axios
                .get(import.meta.env.VITE_URL + "/users?id=" + idUser)
                .then((res) => {
                    setValue("nome", res.data[0].nome);
                    setValue("email", res.data[0].email);
                    setValue("permissoes", res.data[0].permissoes);
                });
        }
    }, [id, navigate, setValue]);

    const submitForm: SubmitHandler<IForm> = useCallback(
        (data) => {
            setLoading(true);
            const request = isEdit
                ? axios.put(import.meta.env.VITE_URL + "/users/" + id, data)
                : axios.post(import.meta.env.VITE_URL + "/users", data);

            request
                .then(() => {
                    navigate("/usuarios");
                })
                .catch((err) => {
                    console.log(err);
                    setToast(true); // Exibir mensagem de erro
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [isEdit, id, navigate]
    );

    return (
        <>
            <LayoutDashboard>
                <h1>{isEdit ? "Editar Usuário" : "Adicionar Usuário"}</h1>

                <form
                    className="row g-3 needs-validation mb-3"
                    noValidate
                    style={{ alignItems: "center" }}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        refForm.current.classList.add("was-validated");
                        handleSubmit(submitForm)(event);
                    }}
                    ref={refForm}
                >
                    <div className="col-md-12">
                        <label htmlFor="nome" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            id="nome"
                            required
                            {...register("nome", {
                                required: "Nome é obrigatório!",
                            })}
                        />
                        <div className="invalid-feedback">
                            {errors.nome && errors.nome.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="exemplo@exemplo.com"
                            id="email"
                            required
                            {...register("email", {
                                required: "Email é obrigatório!",
                            })}
                        />
                        <div className="invalid-feedback">
                            {errors.email && errors.email.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="permissoes" className="form-label">
                            Perfil
                        </label>

                        <select
                            className="form-select"
                            defaultValue={""}
                            id="permissoes"
                            required
                            {...register("permissoes", { required: "Selecione" })}
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="admin">Admin</option>
                            <option value="colaborador">Colaborador</option>
                        </select>
                        <div className="invalid-feedback">
                            {errors.permissoes && errors.permissoes.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">
                            Senha
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="**************"
                            id="password"
                            required
                            {...register("password", {
                                required: "Senha é obrigatório!",
                            })}
                        />
                        <div className="invalid-feedback">
                            {errors.password && errors.password.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button type="submit" className="btn btn-success" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </form>
            </LayoutDashboard>
        </>
    );
}
