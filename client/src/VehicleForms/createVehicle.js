import React from 'react';

class Vehicle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vehice: {
                driverID: "",
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
        const { user } = this.state;
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
        const { user, userType } = this.state;
        const { dispatch } = this.props;
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
                            ownerID: '',
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
        return(
            <div className="col-md-6 col-md-offset-3">
                <Jumbotron>
                    <h2>Create a Vehicle</h2>
                    <form name="createVehicleForm" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !vehicle.driverID ? ' has-error' : '')}>
                            <label htmlFor="driverID">Driver ID</label>
                            <input type="text" className="form-control" name="driverID" value={vehicle.driverID} onChange={this.handleChange} />
                            {submitted && !vehicle.driverID &&
                                <div className="help-block">Driver ID is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !vehicle.make ? ' has-error' : '')}>
                            <label htmlFor="vehicleMake">Make</label>
                            <input type="text" className="form-control" name="vehicleMake" value={vehicle.make} onChange={this.handleChange} />
                            {submitted && !vehicle.make &&
                                <div className="help-block">Vehicle make is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !vehicle.model ? ' has-error' : '')}>
                            <label htmlFor="vehicleModel">Model</label>
                            <input type="text" className="form-control" name="vehicleModel" value={vehicle.model} onChange={this.handleChange} />
                            {submitted && !vehicle.model &&
                                <div className="help-block">Vehicle model is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !vehicle.year ? ' has-error' : '')}>
                            <label htmlFor="vehicleYear">Year</label>
                            <input type="number" className="form-control" name="vehicleYear" value={vehicle.year} onChange={this.handleChange} />
                            {submitted && !vehicle.year &&
                                <div className="help-block">Vehicle year is required</div>
                            }

                        </div>
                        <div className={'form-group' + (submitted && !vehicle.color ? ' has-error' : '')}>
                            <label htmlFor="vehicleColor">Color</label>
                            <input type="number" className="form-control" name="vehicleColor" value={vehicle.color} onChange={this.handleChange} />
                            {submitted && !vehicle.color &&
                                <div className="help-block">Vehicle color is required</div>
                            }

                        </div>                        
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>

                            <Link to="/OwnerLoginPage" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </Jumbotron>    
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { creating } = state.vehicleCreation;
    return {
        creating
    };
}

const connectedVehicle = connect(mapStateToProps)(Vehicle);
export { connectedVehicle as Vehicle };