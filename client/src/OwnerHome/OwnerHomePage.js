import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { ownerActions, parkingSpotActions } from '../actions';
import { CreateParkingSpotForm } from '../ParkingSpotForms/CreateParkingSpotForm';
import ParkingSpaceDetail from '../containers/ParkingSpaceDetail';
import ParkingSpaceList from '../containers/ParkingSpaceList';
import PNavbar from "../components/ProtectedNavbar";
import Jumbotron from "../components/Jumbotron";
import "./OwnerHome.css";

class OwnerHomePage extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          ownerParkingSpots: []
        };
    }

    componentDidMount() {
        this.props.dispatch(ownerActions.getAll());

        axios.get("/owner/id/" + localStorage.getItem("owner"))
        .then(response => {
            const ownerParkingSpots = response.data[0].parkingSpots;
            console.log("parking spots");
            console.log(ownerParkingSpots);
            this.setState({ ownerParkingSpots });
            //console.log(response.data[0].parkingSpots);
            return ;
        });
    }
    render() {
        const { owner, owners } = this.props;
        return (
            <div>
                <PNavbar />
                <div className="container-fluid">
                    <Jumbotron>
                        <div className="owner-cards row">
                            <CreateParkingSpotForm />
                                {this.state.ownerParkingSpots.map(ownerParkingSpot =>
                                    <div className="card parking-cards col-sm-12 col-md-3">
                                        <div className="parking-card-info">
                                            <p key={ownerParkingSpot.availability}>Availability: {ownerParkingSpot.availability}</p>
                                            <p key={ownerParkingSpot.street}>Street: {ownerParkingSpot.street}</p>
                                            <p key={ownerParkingSpot.city}>City: {ownerParkingSpot.city}</p>
                                            <p key={ownerParkingSpot.state}>State: {ownerParkingSpot.state}</p>
                                            <p key={ownerParkingSpot.zip}>Zip: {ownerParkingSpot.zip}</p>
                                        </div>
                                    </div>
                            )}
                        </div>
                    </Jumbotron>
                </div>
            </div>
        )
    };
};

function mapStateToProps(state) {
    const { owners, ownerAuthentication } = state;
    const { owner } = ownerAuthentication;
    return {
        owner,
        owners
    };
}

const connectedOwnerHomePage = connect(mapStateToProps)(OwnerHomePage);
export { connectedOwnerHomePage as OwnerHomePage };