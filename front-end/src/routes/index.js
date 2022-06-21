import React from 'react';
import { Switch } from 'react-router-dom'

import MyRoute from './MyRoute'
import Login from '../pages/Login';
import Alunos from '../pages/Alunos';
import Aluno from '../pages/Aluno';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';
import LandingPage from '../pages/LandingPage';


export default function Routes() {
    return (
            <Switch>
                <MyRoute exact path='/' component={LandingPage} isClosed={false} />
                <MyRoute exact path='/alunos' component={Alunos} isClosed />
                <MyRoute exact path='/aluno/createAluno' component={Alunos} isClosed />
                <MyRoute exact path='/aluno/editAluno/:id' component={Aluno} isClosed />
                <MyRoute exact path='/aluno/findAluno' component={Aluno} isClosed />
                <MyRoute exact path='/fotos/send' component={Fotos} isClosed />
                <MyRoute exact path='/login/' component={Login} isClosed={false} />
                <MyRoute exact path='/register/' component={Register} isClosed={false} />
                <MyRoute path='*' component={Page404} />
            </Switch>
    );
};