import React from "react";
import './index.css'
import { Container } from "../../styles/GlobalStyles";

export default function LandingPage() {
  return (
    <>
      <img src={require('./illustration.jpg')} alt="School teacher" className="illustration"></img>
      <p className="credits">
      <a href='https://www.freepik.com/vectors/school-teacher'>School teacher vector created by storyset - www.freepik.com</a>
      </p>
      <section className="information">
        <p className="text"><span className="title">Simplicidade</span> para gerenciar seus alunos, é disso que você precisa! E é aqui que você encontra.
        
        </p>
      </section>
    </>
  );
}