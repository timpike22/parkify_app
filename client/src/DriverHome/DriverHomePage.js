import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { driverActions } from '../actions';
import ParkingSpace_List from '../containers/ParkingSpaceList';
import ParkingSpaceDetail from '../containers/ParkingSpaceDetail';
import SearchBar from '../containers/SearchBar';
import React from 'react';
import "./DriverHomePage.css";
import PNavbar from "../components/ProtectedNavbar";

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
                    <div className="row">
                        <div className="container-fluid">
                            <div className="col-md-6">
                                <SearchBar />
                                <ParkingSpace_List />
                                <ParkingSpaceDetail />
                            </div>
                            <p>
                                <Link to="/login">Logout</Link>
                            </p>
                        </div>
                    </div>
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