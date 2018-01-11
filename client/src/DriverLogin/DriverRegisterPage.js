import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { driverService } from '../services'
import { registerSuccess, registerFailure } from '../actions/driver-actions';
import { history } from '../helpers';
import Jumbotron from '../components/Jumbotron';

import axios from 'axios';


class DriverRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            driver: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/driver')
            .then(res => console.log(res))
            .catch(e => console.log(e));
    }

    setdriver(event) {
        console.log(event.target.value);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { driver } = this.state;
        this.setState({
            driver: {
                ...driver,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { driver } = this.state;
        const { dispatch } = this.props;
        if (driver.firstName && driver.lastName && driver.email && driver.password) {
            driverService.register(driver).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(registerSuccess(response.data))
                    localStorage.setItem("driver", response.data);
                    history.push('/DriverHomePage')
                } else {
                    dispatch(registerFailure())
                    this.setState({
                        driver: {
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: ''
                        },
                        submitted: false
                    })
                }
            })
            //  dispatch(driverActions.register(driver));
        }
    }

    render() {
        const { registering } = this.props;
        const { driver, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <Jumbotron>
                    <h2>Register to Rent Your Space</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !driver.firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={driver.firstName} onChange={this.handleChange} />
                            {submitted && !driver.firstName &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !driver.lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={driver.lastName} onChange={this.handleChange} />
                            {submitted && !driver.lastName &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !driver.email ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" value={driver.email} onChange={this.handleChange} />
                            {submitted && !driver.email &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !driver.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={driver.password} onChange={this.handleChange} />
                            {submitted && !driver.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>


                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>

                            <Link to="/DriverLoginPage" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </Jumbotron>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.driverRegistration;
    return {
        registering
    };
}

const connectedDriverRegisterPage = connect(mapStateToProps)(DriverRegisterPage);
export { connectedDriverRegisterPage as DriverRegisterPage };