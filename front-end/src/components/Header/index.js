import React from "react";
import * as actions from '../../store/modules/auth/actions'
import { FaUserAlt, FaFileUpload } from "react-icons/fa";
import { ImExit } from 'react-icons/im'
import { IoIosSchool } from "react-icons/io";
import { BiLogIn } from "react-icons/bi"
import { BsFillPeopleFill, BsSearch, BsFillPlusCircleFill, BsFillPersonPlusFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './index.css'
export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/"><Navbar.Brand><IoIosSchool size={32}/> Projeto escola</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link to="/" className="linkNav">Home</Link></Nav.Link>
            <NavDropdown title="Alunos" id="collasible-nav-dropdown">
            <NavDropdown.Item><Link to="/alunos" className="linkDropdown"><BsFillPeopleFill size={24}/> Listar alunos</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/aluno/createAluno" className="linkDropdown"><BsFillPlusCircleFill size={24}/> Cadastrar aluno</Link></NavDropdown.Item>
            <NavDropdown.Item><Link to="/aluno/findAluno" className="linkDropdown"><BsSearch size={24}/> Encontrar aluno</Link></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item><Link to="/fotos/send" className="linkDropdown"><FaFileUpload size={24}/> Enviar foto do aluno</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {isLoggedIn ? (
            <Nav>
              <Nav.Link><Link to="/register/" className="linkNav"><FaUserAlt size={18}/> Minha conta</Link></Nav.Link>
              <Nav.Link className="linkNav" onClick={() => dispatch(actions.loginFailure())}><ImExit size={18}/>  Sair</Nav.Link>
            </Nav>
            ) : (
              <Nav>
                <Nav.Link><Link to="/register/" className="linkNav"><BsFillPersonPlusFill size={18}/> Criar conta</Link></Nav.Link>
                <Nav.Link><Link to="/login/" className="linkNav"><BiLogIn size={18}/> Fazer login</Link></Nav.Link>
              </Nav>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
