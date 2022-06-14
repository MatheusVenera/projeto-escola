import styled, { createGlobalStyle } from 'styled-components'
import { primaryColor, primaryDarkColor } from '../config/colors'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    body {
        font-family: sans-serif;
        background: ${primaryDarkColor};
        color: ${primaryColor}
    }


    html, body, #root {
        height: 100%;
    }

    button {
        background: ${primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
        cursor: pointer;
    }

    a {
        color: ${primaryColor};
        text-decoration: none;
    }

    ul {
        list-style: none;
    }
`;


export const Container = styled.section`
    text-align: center;
    max-width: 360px;
    background: #fff;
    margin: 30px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`