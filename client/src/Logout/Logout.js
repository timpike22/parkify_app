import React from 'react';
import { ownerActions } from '../actions';
import { driverActions } from '../actions';
import { connect } from 'react-redux';
import  {history} from '../helpers'


class Logout extends React.Component {
    componentWillMount() {
        this.props.dispatch(ownerActions.logout());
        this.props.dispatch(driverActions.logout());
        history.push('/')
    }

    render() {
        return null;
    }
};

export default connect()(Logout);