import React from 'react'
import {toast} from 'react-toastify'
import axios from '../../services/axios'
import { Container } from '../../styles/GlobalStyles'
import { Title } from './styled';

export default function Login() {
    React.useEffect(() => {
        async function getData() {
            const response = await axios.get('/users/listarUsuarios');
            console.log(response.data);
        }

        getData();
    }, [])
    return (
        toast.info('Bem-vindo'),
        <Container>
        <Title>
            Login
            <small>Oi</small>
        </Title>
            <p>Lorem ipsum dolor sit amet.</p>
            <button type="button">Enviar</button>
        </Container>
    )
}