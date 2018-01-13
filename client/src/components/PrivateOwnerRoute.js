import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import default from 'redux-thunk';
import { connect } from "react-redux";

export const PrivateOwnerRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('owner')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

{/*const mapStateToProps = (state) => {
    console.log(state);
    return {

    }
};

export default connect(mapStateToProps)(PrivateOwnerRoute);*/}