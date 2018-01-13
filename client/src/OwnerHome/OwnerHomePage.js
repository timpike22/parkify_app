import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { ownerActions, parkingSpotActions } from '../actions';
import { CreateParkingSpotForm } from '../ParkingSpotForms/CreateParkingSpotForm';
import ParkingSpaceDetail from '../containers/ParkingSpaceDetail';
import ParkingSpaceList from '../containers/ParkingSpaceList';

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
            console.log(ownerParkingSpots);
            this.setState({ ownerParkingSpots });
            //console.log(response.data[0].parkingSpots);
            return ;
        });
    }

   // handleDeleteOwner(id) {
       // return (e) => this.props.dispatch(ownerActions.delete(id));
  // }

    render() {
        const { owner, owners } = this.props;
        return (
            <div>
                <p>Are you here to rent your spot?</p>
                <CreateParkingSpotForm />
                {this.state.ownerParkingSpots.map(ownerParkingSpot =>
                    <ul>
                    <li key={ownerParkingSpot._id}>ID: {ownerParkingSpot._id}</li>
                    <li key={ownerParkingSpot.ownerID}>Owner ID: {ownerParkingSpot.ownerID}</li>
                    <li key={ownerParkingSpot.availability}>Availability: {ownerParkingSpot.availability}</li>
                    <li key={ownerParkingSpot.street}>Street: {ownerParkingSpot.street}</li>
                    <li key={ownerParkingSpot.city}>City: {ownerParkingSpot.city}</li>
                    <li key={ownerParkingSpot.state}>State: {ownerParkingSpot.state}</li>
                    <li key={ownerParkingSpot.zip}>Zip: {ownerParkingSpot.zip}</li>
                    </ul>
                )}


                <ParkingSpaceDetail />
                <ParkingSpaceList />
            </div>
        )
    }
}

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
