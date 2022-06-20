import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { isEmail } from "validator";
import { get } from 'lodash'
import * as actions from '../../store/modules/auth/actions'
import { ContainerForm } from "./styled";

export default function Register(props) {
  const id = useSelector(state => state.auth.user.id);
  const nomeStored = useSelector(state => state.auth.user.nome);
  const emailStored = useSelector(state => state.auth.user.email);

  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector(state => state.auth.isLoading);
  const [textButton, setTextButton] = useState("")
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored)
    setEmail(emailStored)
  }, [emailStored, id, nomeStored])

  const formErrors = [];
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
      dispatch(actions.registerRequest({ nome, email, password, id, prevPath, emailStored}))
    }
  }

  function validateInputs() {
    if (!id && (nome === "" || email === "" || password === "")) {
      if (formErrors.length > 0) {
        const novoErro = "Todos os campos precisam ser preenchidos!";
        if (!formErrors.find(element => element === "Todos os campos precisam ser preenchidos!")) {
          formErrors.push(novoErro);
        }
      } else {
        formErrors.push("Todos os campos precisam ser preenchidos!");
      }
      
      return;
    }

    if (!isEmail(email)) {
      formErrors.push("Insira um endereço de email válido!");
      return;
    }

    if (!id && (password.length < 6 || password.length > 255)) {
      formErrors.push(
        "A senha precisa ter entre 6 e 255 caracteres, inclusos."
      );
      return;
    }
  }

  return (
    <>
      <ContainerForm>
        <h1>{id ? "Edite sua conta" : "Crie sua conta"}</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              autoFocus
              type="name"
              placeholder="Digite seu nome..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              {id ? 'Caso altere o email, você precisará fazer login novamente.' : ''}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Password">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              {id ? 'Caso altere a senha, você precisará fazer login novamente.' : ''}
            </Form.Text>
          </Form.Group>
          <Button disabled={isLoading} variant="danger" type="submit">
            {isLoading ? 'Aguarde...' : (id ? "Editar conta" : "Criar conta")}
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}
