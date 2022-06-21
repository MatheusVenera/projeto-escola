import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function MyRoute({ component: Component, isClosed, ...rest }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    if(isClosed && !isLoggedIn) {
        toast.error("Você precisa fazer login para acessar esta rota!", {
            closeButton: true,
            closeOnClick: true,
            autoClose: 3000,
        })
        return (
            <Redirect
            to={{
                pathname: '/login',
                state: {
                    prevPath: rest.location.pathname
                }
            }}
            />
        );
    }

    return (
        <Route {...rest} component={Component} />
    )
}

MyRoute.defaultProps = {
    isClosed: false,
};

MyRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    isClosed: PropTypes.bool,
}