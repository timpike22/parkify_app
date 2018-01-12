import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { driverActions } from '../actions';
import { driverAuthentication } from '../reducers/driver-auth-reducer';
import { CreateVehicleForm } from '../VehicleForms/CreateVehicleForm';

class DriverHomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(driverActions.getAll());
    }

    handleDeletedriver(id) {
        return (e) => this.props.dispatch(driverActions.delete(id));
    }

    render() {
        const { driver, drivers, vehicle } = this.props;
        return (
            <div>
                <CreateVehicleForm />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { drivers, authentication, vehicle } = state;
    const { driver } = driverAuthentication;
    return {
        driver,
        vehicle,
        drivers
    };
}

const connecteddriverHomePage = connect(mapStateToProps)(DriverHomePage);
export { connecteddriverHomePage as DriverHomePage };