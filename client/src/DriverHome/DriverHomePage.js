import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { driverActions } from '../actions';

class DriverHomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(driverActions.getAll());
    }

    handleDeletedriver(id) {
        return (e) => this.props.dispatch(driverActions.delete(id));
    }

    render() {
        const { driver, drivers } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {driver.firstName}!</h1>
                <p>Are you looking for a spot or here to rent your spot?</p>

                <h3>All registered drivers:</h3>
                {drivers.loading && <em>Loading drivers...</em>}
                {drivers.error && <span className="text-danger">ERROR: {drivers.error}</span>}
                {drivers.items &&
                    <ul>
                        {drivers.items.map((driver, index) =>
                            <li key={driver.id}>
                                {driver.firstName + ' ' + driver.lastName}
                                {
                                    driver.deleting ? <em> - Deleting...</em>
                                        : driver.deleteError ? <span className="text-danger"> - ERROR: {driver.deleteError}</span>
                                            : <span> - <a onClick={this.handleDeletedriver(driver.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { drivers, authentication } = state;
    const { driver } = authentication;
    return {
        driver,
        drivers
    };
}

const connecteddriverHomePage = connect(mapStateToProps)(DriverHomePage);
export { connecteddriverHomePage as DriverHomePage };