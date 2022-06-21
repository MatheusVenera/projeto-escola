import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { ImHome } from 'react-icons/im'
import { TbDeviceDesktopOff } from 'react-icons/tb'
import { Link } from 'react-router-dom';

export default function Page404() {
    return (
        <Container>
            <h1><TbDeviceDesktopOff size={64}/> Esta página não existe</h1>
            <br></br>
            <Link to="/">
                <ImHome size={32}/>    
                <h3>Página inicial</h3>
            </Link>
        </Container>
    )
}