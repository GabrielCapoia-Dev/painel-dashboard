import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { Loading } from "../../components/Loading";
import { Toast } from "../../components/Toast"; // Certifique-se de importar o Toast
import axios from "axios";

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState<{ amount: string; description: string }[]>([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [toast, setToast] = useState(false);

    // Efeito para buscar dados (por exemplo, de uma API)
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:3001/transactions") // Altere para a sua URL real
            .then((res) => {
                setTransactions(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    const addTransaction = () => {
        if (!amount || !description) {
            setToast(true);
            return;
        }
        const newTransaction = { amount, description };
        setTransactions([...transactions, newTransaction]);
        setAmount('');
        setDescription('');
    };

    return (
        <>
            <Loading visible={loading} />
            <Toast
                show={toast}
                message='Por favor, preencha todos os campos.'
                colors='danger'
                onClose={() => setToast(false)}
            />
            <LayoutDashboard>
                <div className="container mt-3">
                    <h2>Controle Financeiro</h2>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Valor"
                            className="form-control"
                        />
                    </div>
                    <button onClick={addTransaction} className="btn btn-primary mb-2">
                        Adicionar Transação
                    </button>
                    <h3>Transações</h3>
                    <ul className="list-group">
                        {transactions.map((transaction, index) => (
                            <li key={index} className="list-group-item">
                                {transaction.description}: R${transaction.amount}
                            </li>
                        ))}
                    </ul>
                </div>
            </LayoutDashboard>
        </>
    );
}
