import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa'
import { GrUploadOption } from 'react-icons/gr'
import { isEmail, isInt } from 'validator';
import PropTypes from 'prop-types'
import { get } from 'lodash';
import { ContainerForm } from './styled';
import * as actions from '../../store/modules/aluno/actions'
import axios from "../../services/axios";
import history from './../../services/history';
import './index.css'

export default function Aluno(props) {
  const id = get(props, 'match.params.id', 0);
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');


  const isLoading = useSelector(state => state.aluno.isLoading);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [foto, setFoto] = useState("");
  const formErrors = [];

  useEffect(() => {
    if (!id) return;
    const toastCarregando = toast.loading('Carregando dados...');
    async function getData() {
      try {
        const response = await axios.get(`/alunos/findAluno/${id}`);
        setNome(response.data.nome);
        setSobrenome(response.data.sobrenome);
        setEmail(response.data.email);
        setIdade(response.data.idade);
        setPeso(response.data.peso);
        setAltura(response.data.altura);
        setFoto(response.data.Fotos[0]);
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
              history.push(prevPath);
              toast.info('Verifique o ID passado com parâmetro!', {
                closeButton: true,
                closeOnClick: true,
                draggable: true,
                autoClose: 3000,
              })
          } else {
              toast.update(toastCarregando, {
                  render: `Erro ao carregar os dados :( ${error.response.status} ${error.response.statusText}`,
                  type: "error",
                  isLoading: false,
                  closeButton: true,
                  closeOnClick: true,
                  autoClose: 3000,
              });
              history.push(prevPath);
          }
      }, 100);
      }
    }

    getData();

  }, [id]);

  
  function handleFiles() {
    const fileList = this.files;
    if (fileList.length > 0) {
      setFoto(fileList[0]);
      const reader = new FileReader();

      reader.onload = e => document.querySelector('.userIcon').src = e.target.result;

      reader.readAsDataURL(fileList[0]);

    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    validateInputs();

    if (formErrors.length > 0) {
      toast.dismiss();
      toast.clearWaitingQueue();
      formErrors.forEach((erro) => {
        toast.error(erro);
      });
      return;
    } else {
      if (id) {
        dispatch(actions.updateAlunoRequest({ nome, email, sobrenome, idade, peso, altura, id, foto, prevPath }));
      } else {
        dispatch(actions.cadastroAlunoRequest({ nome, email, sobrenome, idade, peso, altura, id, foto, prevPath }))
      }
    }
  }

  function validateInputs() {
    if(nome === "" || sobrenome === "" || email === "" || idade === "" || peso === "" || altura === "") {
      formErrors.push("Todos os campos precisam ser preenchidos!")
    }
    if (email) {
      if (!isEmail(email)) {
        formErrors.push("Insira um endereço de email válido!");
        return;
      }
    }
    if (idade || peso || altura) {
      if (idade === '0' || peso === '0' || altura === '0') {
        formErrors.push("Idade, peso e altura não podem ser zeros.");
        return;
      }
    }

    if (idade) {
      if(!isInt(String(idade))) {
        formErrors.push("A idade precisa ser um número inteiro!");
        return;
      }
    }

    setIdade(Number.parseInt(idade));
    setPeso(Number.parseFloat(peso));
    setAltura(Number.parseFloat(altura));

  }

  function sendFoto() {
    const input = document.querySelector('.input');
    input.addEventListener("change", handleFiles, false);
    input.click();
  }
  
  return (
    <>
      <ContainerForm>
        <h1>{id ? "Editar aluno" : "Cadastrar aluno"}</h1>

        <div className="main">
            { foto ? <img className="userIcon" src={`http://127.0.0.1:8887/${foto.filename}`}></img> : <FaUserCircle className="userIcon"/>}
            <GrUploadOption className="addIcon" onClick={sendFoto}/>
            <input type="file" accept="image/png, image/jpeg" className="input"></input>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              autoFocus
              type="name"
              placeholder="Digite o nome do aluno..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Sobrenome">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control
              autoFocus
              type="name"
              placeholder="Digite o sobrenome do aluno..."
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite o email do aluno..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Idade">
            <Form.Label>Idade</Form.Label>
            <Form.Control
              autoFocus
              type="number"
              placeholder="Digite a idade do aluno..."
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="Peso">
            <Form.Label>Peso</Form.Label>
            <Form.Control
              autoFocus
              type="number"
              step="any"
              placeholder="Digite a idade do aluno..."
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Altura">
            <Form.Label>Altura</Form.Label>
            <Form.Control
              autoFocus
              type="number"
              step="any"
              placeholder="Digite a idade do aluno..."
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
            />
          </Form.Group>
          
          <Button disabled={isLoading} variant="danger" type="submit">
            {isLoading ? 'Aguarde...' : (id ? "Editar aluno" : "Cadastrar aluno")}
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}

