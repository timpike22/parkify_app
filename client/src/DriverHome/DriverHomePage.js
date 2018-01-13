import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { driverActions } from '../actions';
import ParkingSpace_List from '../containers/ParkingSpaceList';
import ParkingSpaceDetail from '../containers/ParkingSpaceDetail';
import SearchBar from '../containers/SearchBar';
import {CreateVehicleForm} from '../VehicleForms';
import PNavbar from '../components/ProtectedNavbar';
import Gmap from '../Google/Gmap';

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
            <div>
                <PNavbar/>
                <Gmap />
                <SearchBar />
                <ParkingSpace_List />
                <ParkingSpaceDetail />   
                <CreateVehicleForm />
                <p><Link to="/login">Logout</Link></p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { drivers, driverAuthentication } = state;
    const { driver } = driverAuthentication;
    return {
        driver,
        drivers
    };
}

const connectedDriverHomePage = connect(mapStateToProps)(DriverHomePage);
export { connectedDriverHomePage as DriverHomePage };
