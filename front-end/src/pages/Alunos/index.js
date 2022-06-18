import React from "react";
import { Container } from "../../styles/GlobalStyles";
import AlunoContainer from "../../components/TableAluno";

export default function Alunos() {
  return (
    <>
      <Container>
        <h1>Alunos</h1>
        <AlunoContainer>
        </AlunoContainer>
      </Container>
    </>
  );
}
