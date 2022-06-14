import React from 'react'
import { useDispatch } from 'react-redux'

import { Container } from '../../styles/GlobalStyles'
import { Title } from './styled';
import * as exampleActions from '../../store/modules/example/actions'

// import {toast} from 'react-toastify'
// import axios from '../../services/axios'

export default function Login() {
    const dispatch = useDispatch();
    // React.useEffect(() => {
    //     async function getData() {
    //         const response = await axios.get('/users/listarUsuarios');
    //         console.log(response.data);
    //     }

    //     getData();
    // }, [])


    function handleClick(e) {
        e.preventDefault();
        
        dispatch(exampleActions.clicaBotaoRequest());

    }


    return (
        // toast.info('Nosso WhatsApp', {
        //     icon: ({theme, type}) => <img style={{width: '24px'}} src='https://imagepng.org/wp-content/uploads/2017/08/whatsapp-icone-1.png'/>
        // }),
        <Container>
        <Title>
            Login
            <small>Oi</small>
        </Title>
            <p>Lorem ipsum dolor sit amet.</p>
            <button type="button" onClick={handleClick}>Enviar</button>
        </Container>
    )
}