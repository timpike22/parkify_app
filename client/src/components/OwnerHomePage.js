import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ownerActions } from '../actions';

class OwnerHomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(ownerActions.getAll());
    }

    handleDeleteOwner(id) {
        return (e) => this.props.dispatch(ownerActions.delete(id));
    }

    render() {
        const { owner, owners } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {owner.firstName}!</h1>
                <p>Are you looking for a spot or here to rent your spot?</p>
                
                <h3>All registered owners:</h3>
                {owners.loading && <em>Loading owners...</em>}
                {owners.error && <span className="text-danger">ERROR: {owners.error}</span>}
                {owners.items &&
                    <ul>
                        {owners.items.map((owner, index) =>
                            <li key={owner.id}>
                                {owner.firstName + ' ' + owner.lastName}
                                {
                                    owner.deleting ? <em> - Deleting...</em>
                                        : owner.deleteError ? <span className="text-danger"> - ERROR: {owner.deleteError}</span>
                                            : <span> - <a onClick={this.handleDeleteOwner(owner.id)}>Delete</a></span>
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
    const { owners, authentication } = state;
    const { owner } = authentication;
    return {
        owner,
        owners
    };
}

const connectedOwnerHomePage = connect(mapStateToProps)(OwnerHomePage);
export { connectedOwnerHomePage as OwnerHomePage };