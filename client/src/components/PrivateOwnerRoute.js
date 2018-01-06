import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateOwnerRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('owner')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/owner', state: { from: props.location } }} />
    )} />
)