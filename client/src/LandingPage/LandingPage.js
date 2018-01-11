import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { driverActions } from '../actions';

class LandingPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(driverActions.getAll());
    }

    handleDeletedriver(id) {
        return (e) => this.props.dispatch(driverActions.delete(id));
    }