import React, { useState } from "react";
import { ContainerForm } from "./styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";
import * as actions from '../../store/modules/auth/actions'
import { useDispatch } from 'react-redux'
import axios from "../../services/axios";
import history from "../../services/history";

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');
  const [textButton, setTextButton] = useState("")
  const [disabled, setDisabled] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Email e senha ! vazio
  //Email precisa ser email e tem que ser entre 3 e 255 caracteres
  //Senha tem que ter entre 6 e 255 caracteres
  const formErrors = [];
  async function handleSubmit(e) {
    e.preventDefault();

    validateInputs();

    if (formErrors.length > 0) {
      setDisabled(true);
      setTextButton("Aguarde...")
      setTimeout(() => {
        setDisabled(false);
        setTextButton("Criar conta")
      }, 1000);
      toast.dismiss();
      toast.clearWaitingQueue();
      formErrors.forEach((erro) => {
        toast.error(erro);
      });
      return;
    } else {
      setDisabled(true);
      console.log(disabled)
      dispatch(actions.LoginRequest({ email, password, prevPath }))
    }
  }

  function validateInputs() {
    if (email === "" || password === "") {
      if (formErrors.length > 0) {
        console.log(formErrors)
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

    if (password.length < 6 || password.length > 255) {
      formErrors.push(
        "A senha precisa ter entre 6 e 255 caracteres, inclusos."
      );
      return;
    }
  }

  return (
    <>
      <ContainerForm>
        <h1>Faça seu login</h1>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              Nós nunca compartilharemos seu email com ninguém.
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
          </Form.Group>
          <Button disabled={disabled} variant="danger" type="submit">
            {textButton ? textButton : "Fazer Login"}
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}
