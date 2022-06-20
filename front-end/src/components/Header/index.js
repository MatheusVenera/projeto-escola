import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { IoIosSchool} from "react-icons/io";
import { Link } from "react-router-dom";
import { Nav } from "./styled";
import { Container, Navbar } from 'react-bootstrap';
export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <IoIosSchool size={30} />{" "}
          Projeto escola
        </Navbar.Brand>
      </Container>
    </Navbar>
    // <Nav>
    //     <Link to="/"><FaHome size={24} /></Link>
    //     <Link to="/"><IoIosSchoolOutline size={24} /></Link>
    //     <Link to="/register"><FaUserAlt size={24} /></Link>
    //     <Link to="/login"><FaSignInAlt size={24} /></Link>

    // </Nav>
  );
}
