import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Table from "react-bootstrap/Table";
import { FaUserCircle, FaEdit, FaPlusCircle, FaSortAlphaDown, FaSortAlphaUp, FaSearch } from 'react-icons/fa'
import { AiFillDelete, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsQuestionLg } from 'react-icons/bs'
import { FiUserX } from 'react-icons/fi'
import { IoMdRefreshCircle } from 'react-icons/io'
import { get } from 'lodash'
import axios from "../../services/axios";
import { ActionsButtons, Container, ImageAluno } from './styled'
import './index.css'
import { Form, FormControl } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';

export default function TableAluno() {
    const [alunos, setAlunos] = useState(['']);
    const [id, setId] = useState("");
    const [confirm, setConfirm] = useState("");
    const [procurando, setProcurando] = useState("");
    const [order, setOrder] = useState("DESC")
    const [classBtnRefresh, setClassBtnRefresh] = useState("")

    async function getData() {
        const toastCarregando = toast.loading('Carregando dados...');
        try {
            const response = await axios.get("/alunos/listAlunos");
            const dadosCorrigidos = ajustarDados(response.data)
            setAlunos(dadosCorrigidos);
            toast.update(toastCarregando, {
                render: 'Dados carregados com sucesso!',
                type: 'success',
                isLoading: false,
                closeButton: true,
                closeOnClick: true,
                autoClose: 3000,
            })
        } catch (error) {
            setTimeout(() => {
                const errors = get(error, "response.data.errors", []);
                if (errors.length > 0) {
                    errors.map((err) => {
                        toast.update(toastCarregando, {
                            render: `${err}`,
                            type: "error",
                            isLoading: false,
                            closeButton: true,
                            closeOnClick: true,
                            draggable: true,
                            autoClose: 3000,
                        });
                    });
                } else {
                    toast.update(toastCarregando, {
                        render: `Erro ao carregar seus dados :( ${error.response.status} ${error.response.statusText}`,
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        closeOnClick: true,
                        autoClose: 3000,
                    });
                }
            }, 100);
        }
    }
    async function deleteAluno(id) {
        if (confirm) {
            const toastCarregando = toast.loading('Deletando aluno...');
            try {
                await axios.delete(`/alunos/deleteAluno/${id}`);
                {alunos.filter(aluno => {
                    if (aluno.id === id) {
                        alunos.splice(alunos.indexOf(aluno), 1);
                    }
                })}
                setTimeout(() => {
                    toast.update(toastCarregando, {
                        render: 'Aluno excluído com sucesso!',
                        type: 'success',
                        isLoading: false,
                        closeButton: true,
                        closeOnClick: true,
                        autoClose: 3000,
                    })
                }, 100)
                setConfirm(false)
            } catch (error) {
                setTimeout(() => {
                    const errors = get(error, "response.data.errors", []);
                    if (errors.length > 0) {
                        errors.map((err) => {
                            toast.update(toastCarregando, {
                                render: `${err}`,
                                type: "error",
                                isLoading: false,
                                closeButton: true,
                                closeOnClick: true,
                                draggable: true,
                                autoClose: 3000,
                            });
                        });
                    } else {
                        toast.update(toastCarregando, {
                            render: `Erro desconhecido ao deletar aluno :( ${error.response.status} ${error.response.statusText}`,
                            type: "error",
                            isLoading: false,
                            closeButton: true,
                            closeOnClick: true,
                            autoClose: 3000,
                        });
                    }
                }, 100);
            }
        } else {
            setConfirm(true);
        }
    };

    //Função que converte a primeira letra para maiúscula do nome e do sobrenome
    function ajustarDados(data) {
        data.forEach(aluno => {
            aluno.nome = aluno.nome[0].toLocaleUpperCase() + aluno.nome.substring(1);
            aluno.sobrenome = aluno.sobrenome[0].toLocaleUpperCase() + aluno.sobrenome.substring(1);
        });
        return data;
    }

    //Função que ordena os dados de acordo com a coluna
    function ordenarDados(data, coluna) {
        //Ordenação descrescente
        if (order === "DESC") {
            setOrder("ASC")
            switch (coluna) {
                case "id":
                    data.sort((a, b) => {
                        if (a.id > b.id) return 1;
                        if (a.id < b.id) return -1
                        if (a.id === b.id) return 0;
                    });
                    break;
                case "nome":
                    data.sort((a, b) => {
                        const nomeCompletoA = a.nome + " " + a.sobrenome;
                        const nomeCompletoB = b.nome + " " + b.sobrenome;
                        return nomeCompletoA.localeCompare(nomeCompletoB)
                    });
                    break;
                case "email":
                    data.sort((a, b) => a.email.localeCompare(b.email));
                    break;
                default:
                    return;
            }
        //Ordenação crescente
        } else if (order === "ASC") {
            setOrder("DESC")
            switch (coluna) {
                case "id": 
                    data.sort((a, b) => {
                        if (a.id > b.id) return -1;
                        if (a.id < b.id) return 1
                        if (a.id === b.id) return 0;
                    });
                    break;
                case "nome": 
                    data.sort((a, b) => {
                        const nomeCompletoA = a.nome + " " + a.sobrenome;
                        const nomeCompletoB = b.nome + " " + b.sobrenome;
                        return nomeCompletoB.localeCompare(nomeCompletoA)
                    });
                    break;
                case "email": 
                    data.sort((a, b) => b.email.localeCompare(a.email));
                    break;
                default:
                    return;
            }
        }
        return data;
    }

    async function encontrarAluno(e) {
        e.preventDefault();
        if (id !== "") {
            try {
                setProcurando(true);
                const response = await axios.get(`/alunos/findAluno/${id}`);
                setProcurando(false);
                setAlunos([response.data])
            } catch (error) {
                setTimeout(() => {
                    const errors = get(error, "response.data.errors", []);
                    if (errors.length > 0) {
                        errors.map((err) => {
                            toast.error(`${err}`, {
                                closeButton: true,
                                closeOnClick: true,
                                draggable: true,
                                autoClose: 3000,
                            });
                        });
                    } else {
                        toast.error(`Erro ao carregar seus dados :( ${error.response.status} ${error.response.statusText}`, {
                            closeButton: true,
                            closeOnClick: true,
                            autoClose: 3000,
                        });
                    }
                }, 100);
            }
            setProcurando(false);
        }
        
    }

        useEffect(() => {
            setConfirm(false)
            setProcurando(false);
            getData();
        }, []);
    if (alunos.length === 0) {
        return (
            <>
            <h1><FiUserX size={32}/> Nenhum aluno cadastrado</h1>
            <Link to={`/aluno/createAluno`}><FaPlusCircle size={32} /></Link>
            </>
        )
    } else if (alunos[0] !== '') {
        return (
            <>
                <Container>
                    <Navbar className="nav-search" bg="light" expand="lg">
                        <Link to="/alunos">
                            <IoMdRefreshCircle onClick={async () => {
                                setClassBtnRefresh("btn-refresh")
                                await getData()
                                setClassBtnRefresh("");
                            }} size={40} className={classBtnRefresh}/>
                        </Link>
                        <Link to={`/aluno/createAluno`}><FaPlusCircle size={33} /></Link>
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                        </Nav>
                        <Form className="d-flex" onSubmit={encontrarAluno}>
                            <FormControl
                            type="number"
                            min={1}
                            placeholder="Procurar por id..."
                            className="me-2"
                            aria-label="Search"
                            value={id}
                            onChange={async (e) => {
                                setId(e.target.value)
                                if(e.target.value === "" && alunos.length === 1) {
                                    await getData();
                                }
                            }}
                            />
                            <Button type="submit" variant="outline-secondary">
                                {!procurando ? (<FaSearch />) : (<AiOutlineLoading3Quarters className={procurando}/>)}
                            </Button>
                        </Form>
                    </Navbar>

                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>ID{" "}
                                    {order === 'DESC' ? (
                                        <FaSortAlphaUp onClick={() => ordenarDados(alunos, "id")} size={20} className="btn-order"/>
                                    ) : (
                                        <FaSortAlphaDown onClick={() => ordenarDados(alunos, "id")} size={20} className="btn-order"/>
                                    )}
                                </th>
                                <th>Nome{" "}
                                    {order === 'DESC' ? (
                                        <FaSortAlphaUp onClick={() => ordenarDados(alunos, "nome")} size={20} className="btn-order"/>
                                    ) : (
                                        <FaSortAlphaDown onClick={() => ordenarDados(alunos, "nome")} size={20} className="btn-order"/>
                                    )}</th>
                                <th>Sobrenome</th>
                                <th>Email{" "}
                                    {order === 'DESC' ? (
                                        <FaSortAlphaUp onClick={() => ordenarDados(alunos, "email")} size={20} className="btn-order"/>
                                    ) : (
                                        <FaSortAlphaDown onClick={() => ordenarDados(alunos, "email")} size={20} className="btn-order"/>
                                    )}</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno) => (
                                <tr key={String(aluno.id)}>
                                    {get(aluno, 'Fotos[0].url', false) ? (
                                        <td><ImageAluno src={`http://127.0.0.1:8887/${aluno.Fotos[0].filename}`} /></td>
                                    ) : (
                                        <td><FaUserCircle size={32} /></td>
                                    )}
                                    <td>{aluno.id}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.sobrenome}</td>
                                    <td><a href={`mailto:${aluno.email}`}>{aluno.email}</a></td>
                                    <td>
                                        <ActionsButtons>
                                            <Link to={`/aluno/editAluno/${aluno.id}`}><FaEdit /></Link>
                                            {!confirm ? (
                                                <Link to="/alunos" onClick={() => deleteAluno(aluno.id)}><AiFillDelete /></Link>
                                            ) : (
                                                <Link to="/alunos" onClick={() => deleteAluno(aluno.id)}><BsQuestionLg /></Link>
                                            )}
                                        </ActionsButtons>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </>
        )

    }
}