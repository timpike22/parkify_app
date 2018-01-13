import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { parkingSpotService} from '../services'
import { createSuccess, createFailure } from '../actions/parkingSpot-actions';
import { history } from '../helpers';
import axios from 'axios';
import "./ParkingForm.css";

class CreateParkingSpotForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parkingSpot: {
                ownerID: '',
                street: '',
                city: '',
                state: '',
                zip: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        console.log('state:', this.state);
    }

    componentDidMount() {
        axios.get('/parkingSpot')
            .then(res => console.log(res))
            .catch(e => console.log(e));
    }

    setUser(event) {
        console.log(event.target.value);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { parkingSpot } = this.state;
        this.setState({
            parkingSpot: {
                ...parkingSpot,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { parkingSpot } = this.state;
        const { dispatch } = this.props;
        console.log(parkingSpot);
        if (parkingSpot.ownerID && parkingSpot.street && parkingSpot.city && parkingSpot.state && parkingSpot.zip) {
            // TODO: change to the one for the Owner
            return parkingSpotService.create(parkingSpot).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(createSuccess(response.data))
                    localStorage.setItem("parkingSpot", response.data._id);
                    history.push('/OwnerHomePage')
                } else {
                    dispatch(createFailure())
                    this.setState({
                        parkingSpot: {
                            ownerID: '',
                            street: '',
                            city: '',
                            state: '',
                            zip: ''
                        },
                        submitted: false
                    })
                }
            })
        }
    }

    render() {
        const { creating } = this.props;
        const { parkingSpot, submitted } = this.state;
        const browserOwnerID = localStorage.getItem("owner");
        parkingSpot.ownerID = localStorage.getItem("owner");
        console.log("ownerID", localStorage.owner);
        return(
            <div class="card parking-form col-sm-12 col-md-3">
                    <h2>Add a Parking Spot</h2>
                    <form name="createParkingSpotForm" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !parkingSpot.street ? ' has-error' : '')}>
                            <label htmlFor="parkingSpotStreet">Street</label>
                            <input type="text" className="form-control" name="street" value={parkingSpot.street} onChange={this.handleChange} />
                            {submitted && !parkingSpot.street &&
                                <div className="help-block">Street is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !parkingSpot.city ? ' has-error' : '')}>
                            <label htmlFor="parkingSpotCity">City</label>
                            <input type="text" className="form-control" name="city" value={parkingSpot.city} onChange={this.handleChange} />
                            {submitted && !parkingSpot.city &&
                                <div className="help-block">City is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !parkingSpot.state ? ' has-error' : '')}>
                            <label htmlFor="parkingSpotState">State</label>
                            <input type="text" className="form-control" name="state" value={parkingSpot.state} onChange={this.handleChange} />
                            {submitted && !parkingSpot.state &&
                                <div className="help-block">State is required</div>
                            }

                        </div>
                        <div className={'form-group' + (submitted && !parkingSpot.zip ? ' has-error' : '')}>
                            <label htmlFor="parkingSpotZip">Zip</label>
                            <input type="number" className="form-control" name="zip" value={parkingSpot.zip} onChange={this.handleChange} />
                            {submitted && !parkingSpot.zip &&
                                <div className="help-block">Zip is required</div>
                            }

                        </div>                        
                        <div className="form-group">
                            <button className="btn btn-primary">Create</button>

                            <Link to="/OwnerHomePage" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { creating } = state;
    return {
        creating
    };
}

const connectedParkingSpot = connect(mapStateToProps)(CreateParkingSpotForm);
export { connectedParkingSpot as CreateParkingSpotForm }; 
