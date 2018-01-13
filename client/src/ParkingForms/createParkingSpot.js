import React from'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

 export default class ParkingSpot extends React.Component {

constructor(props) {
    super(props);
        this.state = {
          parkingSpot: {  
            ownerID: '',
            name: '',
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        submitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        if (parkingSpot.name && parkingSpot.street && parkingSpot.city && parkingSpot.state && parkingSpot.zip) {
            
            // TODO: change to the one for the driver
            return spotService.register(user).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(registerSuccess(response.data))
                    localStorage.setItem("parkingspots", response.data);
                    history.push('/ParkingForms')
                } else {
                    dispatch(registerFailure())
                    this.setState({
                        parkingSpot: {
                            ownerID: '',
                            name: '',
                            street: '',
                            city: '',
                            state: '',
                            zip: ''
                        },
                        submitted: false
                    })
                }
            })
            //  dispatch(ownerActions.register(owner));
        }
    }

render() {
    const { creating } = this.props;
    const { parkingSpot, submitted } = this.state;

    return(
        <div>
            <h3>Create a Parking Spot</h3>
            <form name="form" onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className={'form-group' + 'col-md-12' + (submitted && !parkingSpot.name ? ' has-error' : '')}>
                    <label htmlFor="name">Name</label>
                        <input type="text" required className="form-control" value={this.state.name} onChange={this.handleChange} placeholder="Email" />
                        {submitted && !parkingSpot.name &&
                            <div className="help-block">Full Name required</div>
                        }
                    </div>
                </div>
                <div className={'form-group' + 'col-md-12' + (submitted && !parkingSpot.street ? ' has-error' : '')}>
                    <label htmlFor="address">Address</label>
                    <input type="text" required className="form-control" value={this.state.street} onChange={this.handleChange} placeholder="1234 Main St" />
                    {submitted && !parkingSpot.street &&
                        <div className="help-block">Address required</div>
                    }
                </div>
                <div className="form-row">
                    <div className={'form-group' + 'col-md-6' + (submitted && !parkingSpot.city ? ' has-error' : '')}>
                        <label htmlFor="city">City</label>
                        <input type="text" required className="form-control" onChange={this.handleChange} value={this.state.city} />
                        {submitted && !parkingSpot.name &&
                            <div className="help-block">City required</div>
                        }
                    </div>
                    <div className={'form-group' + 'col-md-6' + (submitted && !parkingSpot.state ? ' has-error' : '')}>
                        <label htmlFor="state">State</label>
                        {submitted && !parkingSpot.state &&
                            <div className="help-block">State required</div>
                        }
                        <select value={this.state.state} required onChange={this.handleChange} className="form-control">
                        <option selected>Select Your State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    </div>
                    <div className={'form-group' + 'col-md-6' + (submitted && !parkingSpot.zip ? ' has-error' : '')} align="center">
                        <label htmlFor="zip">Zip</label>
                        <input type="text" required onChange={this.handleChange} className="form-control" value={this.state.zip} />
                        {submitted && !parkingSpot.zip &&
                            <div className="help-block">Zip Code required</div>
                        }
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Create Spot</button>
            </form>
        </div>
    )
  }
}


function mapStateToProps(state) {
    const { creating } = state.parkingSpotCreation;
    return {
        creating
    };
}

const connectedParkingSpots = connect(mapStateToProps)(ParkingSpot);

export { connectedParkingSpots as ParkingSpot };






