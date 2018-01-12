import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ownerActions } from '../actions';
import { CreateParkingSpotForm } from '../ParkingSpotForms/CreateParkingSpotForm';

class OwnerHomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(ownerActions.getAll());
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
