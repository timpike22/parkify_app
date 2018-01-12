import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { vehicleService} from '../services'
import { createSuccess, createFailure } from '../actions/vehicle-actions';
import { history } from '../helpers';
import Jumbotron from '../components/Jumbotron';
import axios from 'axios';

class CreateVehicleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vehicle: {
                driverID: '',
                make: '',
                model: '',
                year: '',
                color: ''
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
        axios.get('/vehicle')
            .then(res => console.log(res))
            .catch(e => console.log(e));
    }

    setUser(event) {
        console.log(event.target.value);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { vehicle } = this.state;
        this.setState({
            vehicle: {
                ...vehicle,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { vehicle } = this.state;
        const { dispatch } = this.props;
        console.log(vehicle);
        if (vehicle.driverID && vehicle.make && vehicle.model && vehicle.year && vehicle.color) {
            // TODO: change to the one for the driver
            return vehicleService.create(vehicle).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(createSuccess(response.data))
                    localStorage.setItem("vehicle", response.data);
                    history.push('/DriverHomePage')
                } else {
                    dispatch(createFailure())
                    this.setState({
                        vehicle: {
                            driverID: '',
                            make: '',
                            model: '',
                            year: '',
                            color: ''
                        },
                        submitted: false
                    })
                }
            })
        }
    }

    render() {
        const { creating } = this.props;
        const { vehicle, submitted } = this.state;
        vehicle.driverID = localStorage.getItem("driver");
        console.log("state", localStorage.driver);
        return(
            <div className="col-md-6 col-md-offset-3">
                <Jumbotron>
                    <h2>Add a Vehicle</h2>
                    <form name="createVehicleForm" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !vehicle.make ? ' has-error' : '')}>
                            <label htmlFor="vehicleMake">Make</label>
                            <input type="text" className="form-control" name="make" value={vehicle.make} onChange={this.handleChange} />
                            {submitted && !vehicle.make &&
                                <div className="help-block">Vehicle make is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !vehicle.model ? ' has-error' : '')}>
                            <label htmlFor="vehicleModel">Model</label>
                            <input type="text" className="form-control" name="model" value={vehicle.model} onChange={this.handleChange} />
                            {submitted && !vehicle.model &&
                                <div className="help-block">Vehicle model is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !vehicle.year ? ' has-error' : '')}>
                            <label htmlFor="vehicleYear">Year</label>
                            <input type="number" className="form-control" name="year" value={vehicle.year} onChange={this.handleChange} />
                            {submitted && !vehicle.year &&
                                <div className="help-block">Vehicle year is required</div>
                            }

                        </div>
                        <div className={'form-group' + (submitted && !vehicle.color ? ' has-error' : '')}>
                            <label htmlFor="vehicleColor">Color</label>
                            <input type="text" className="form-control" name="color" value={vehicle.color} onChange={this.handleChange} />
                            {submitted && !vehicle.color &&
                                <div className="help-block">Vehicle color is required</div>
                            }

                        </div>                        
                        <div className="form-group">
                            <button className="btn btn-primary">Create</button>

                            <Link to="/DriverHomePage" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </Jumbotron>    
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

const connectedVehicle = connect(mapStateToProps)(CreateVehicleForm);
export { connectedVehicle as CreateVehicleForm }; 
