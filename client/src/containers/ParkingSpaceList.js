import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectParkingSpace } from '../actions/index';
import { bindActionCreators } from 'redux';

class ParkingSpaceList extends Component {
    renderList () {
        return this.props.parkingSpace.map((spot) => {
            return (
                <li 
                onClick={() => this.props.selectParkingSpace(spot)}
                key={spot.name} 
                className="list-group-item">
                {spot.address}
                </li>
            );
        });
    }
    
    render() {
        return (
        <ul className="list-group col-sm-4">
        {this.renderList()}
        </ul>
            )
        }
}

function mapStateToProps(state){
    //whatever is returned will show up as props
    //inside ParkingSpace_List
    return {
        parkingSpace: state.parkingSpace
    };
}
// anything returned from this function will end up as props
//on the parkingSpace container
function mapDispatchToProps(dispatch) {
    //whenever selectParkingSpace is called, the result should be 
    // passed into all of our reducers
    return bindActionCreators({ selectParkingSpace: selectParkingSpace} , dispatch)
}

//Promote parkingSpace from a component to a container - it needs to know
//about the dispatch method, selectParkingSpace. make it available as a prop
export default connect (mapStateToProps, mapDispatchToProps)(ParkingSpaceList);