import styled from "styled-components";
import * as colors from '../../config/colors'
export const ContainerForm = styled.section`

    h1 {
        font-size: 40px;
        font-weight: bold;
    }

    max-width: 700px;
    background: #fff;
    margin: 30px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(250, 250, 250, 0.5);
    font-weight: bolder;

    button {
        background-color: ${colors.primaryColor};
        width: 100%;
    }
    button:hover {
        background-color: #B2062E;
    }
`