import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {get} from 'lodash'
import { FaUserCircle, FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import axios from "../../services/axios";
import { Container } from "../../styles/GlobalStyles";
import { AlunoContainer, ImageAluno, Tbody, ActionsButtons } from "./styled";
import { toast } from 'react-toastify';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const toastCarregando = toast.loading('Carregando dados...');
    async function getData() {
      try {
        const response = await axios.get("/alunos/listAlunos");
        setTimeout(() => {
          setAlunos(response.data);
          toast.update(toastCarregando, { render: 'Dados carregados com sucesso!',
          type: 'success',
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          autoClose: 3000,
        })
        }, 3000)
      } catch (error) {
          setTimeout(() => {
            toast.update(toastCarregando, { render: `Erro ao carregar os dados :-( ${error.message}`,
            type: 'error',
            isLoading: false,
            closeButton: true,
            closeOnClick: true,
            autoClose: 3000,
            })
          }, 100)
      }
  }
    getData();
  }, []);
  return (
    <>
      <Container>
        <h1>Alunos</h1>
        <AlunoContainer>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <Tbody>
              {alunos.map((aluno) => (
                <tr key={String(aluno.id)}>
                  {get(aluno, 'Fotos[0].url', false) ? (
                    <td><ImageAluno src={`http://127.0.0.1:8887/${aluno.Fotos[0].filename}`}/></td>
                    ) : (
                    <td><FaUserCircle size={32} /></td>
                  )}
                  <td>{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.sobrenome}</td>
                  <td><a href={`mailto:${aluno.email}`}>{aluno.email}</a></td>
                  <td>
                    <ActionsButtons>
                      <Link to={`/aluno/${aluno.id}/edit`}><FaEdit /></Link>
                      <Link to={`/aluno/${aluno.id}/delete`}><AiFillDelete /></Link>
                    </ActionsButtons>
                  </td>
                </tr>
              ))}
            </Tbody>
          </Table>
          
        </AlunoContainer>
      </Container>
    </>
  );
}
