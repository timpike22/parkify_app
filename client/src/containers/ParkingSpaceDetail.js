import React, { Component } from 'react';
import { connect } from 'react-redux';

class ParkingSpaceDetail extends Component {
    render() {
        if(!this.props.spot) {
            return <div>Where are you headed?</div>
        }
       return (
        <div>
            <h3>Details for:</h3>
            <div>Name: {this.props.spot.name}</div>
            <div>Address: {this.props.spot.address}</div>
            <div>City & State: {this.props.spot.city}, {this.props.spot.state}</div> 
            <div>Zipcode: {this.props.spot.zipcode}</div>      
        </div>
       );
    }
}

function mapStateToProps(state) {
    return {
        spot: state.activeParkingSpace
    };
}

export default connect(mapStateToProps)(ParkingSpaceDetail);