import React, { useEffect, useState } from "react";
import { FaUserCircle } from 'react-icons/fa'
import { GrUploadOption } from 'react-icons/gr'
import './index.css'
import { get } from 'lodash';
import axios from "../../services/axios";
export default function SendFoto(props) {
    const id = get(props, 'match.params.id', 0);
    
    function sendFoto() {
        let input = document.querySelector('.input');
        input.click();
    }
    useEffect(() => {
        if (id === 0) return;
        async function getFoto() {
            try {
                const response = await axios.get(`/alunos/findAluno/${id}`);
                console.log("response" + response)
            } catch (error) {
                
            }
        }
    })
    

    return (
        <div className="main">
            <FaUserCircle className="userIcon"/>
            <GrUploadOption className="addIcon" onClick={sendFoto}/>
            <input type="file" className="input"></input>
        </div>
    );
}
