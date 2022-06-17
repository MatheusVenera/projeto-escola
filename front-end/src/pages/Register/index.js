import React, { useState } from "react";
import { ContainerForm } from "./styled";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";
import axios from "../../services/axios";
import history from "../../services/history";

export default function Register() {
  const [textButton, setTextButton] = useState("")
  const [disabled, setDisabled] = useState("")
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const toastEnviando = toast.loading("Enviando dados...");
      try {
        setDisabled(true);
        await axios.post("/users/criarUsuario", {
          nome,
          password,
          email,
        });
        toast.update(toastEnviando, {
          render: "Cadastro realizado com sucesso!",
          type: "success",
          isLoading: false,
          closeButton: true,
          closeOnClick: true,
          draggable: true,
          autoClose: 3000,
        });
        const toastRedirecionando = toast.loading("Você será redirecionado...", {
          closeButton: false,
          closeOnClick: false,
          draggable: false,
        });
        setTimeout(() => {
          toast.dismiss(toastRedirecionando);
          history.push("/login");
        }, 3000)
      } catch (e) {
        setTimeout(() => {
          const errors = get(e, "response.data.errors", []);
          if (errors.length > 0) {
            errors.map((err) => {
              toast.update(toastEnviando, {
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
            toast.update(toastEnviando, {
              render: `Erro ao cadastrar seus dados :( ${e.response.status} ${e.response.statusText}`,
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
  }

  function validateInputs() {
    if (nome === "" || email === "" || password === "") {
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
        <h1>Crie sua conta</h1>

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
            {textButton ? textButton : "Criar conta"}
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}
