import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ownerService} from '../services'
import { driverService } from '../services'
import { driverRegisterSuccess, driverRegisterFailure } from '../actions/driver-actions';
import { ownerRegisterSuccess, ownerRegisterFailure } from '../actions/owner-actions';
import { history } from '../helpers';
import Jumbotron from '../components/Jumbotron';
import axios from 'axios';

class OwnerRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            submitted: false,
            userType: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        console.log('state:', this.state);
    }

    componentDidMount() {
        axios.get('/owner')
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
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleUserBtnChange(e) {
        console.log('E::', e.target.value);
        
        this.setState({ userType: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, userType } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.email && user.password) {
            if (userType === 'owner' ) {
                return ownerService.register(user).then(response => {
                    console.log(response);
                    console.log(response.statusText);
                    if (response.statusText === "OK") {
                        dispatch(ownerRegisterSuccess(response.data))
                        localStorage.setItem("owner", response.data);
                        history.push('/OwnerHomePage')
                    } else {
                        dispatch(ownerRegisterFailure())
                        this.setState({
                            owner: {
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: ''
                            },
                            submitted: false
                        })
                    }
                });
            }
            // TODO: change to the one for the driver
            return driverService.register(user).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(driverRegisterSuccess(response.data))
                    localStorage.setItem("driver", response.data);
                    history.push('/DriverHomePage')
                } else {
                    dispatch(driverRegisterFailure())
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
          //  dispatch(ownerActions.register(owner));
        }
    }

    render() {
        const { driverRegistering } = this.props;
        const { ownerRegistering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="container"> 
                <h2>Register to Rent Your Space</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }

                    </div>
                    <div class="form-check form-check-inline user-option">
                        <input onChange={(e) => this.handleUserBtnChange(e)} className="form-check-input" type="radio" name="user-option" id="owner option1" value="owner" checked />
                        <label className="form-check-label" for="ownerRadio">
                            Owner
                        </label>
                    </div>
                    <div class="form-check form-check-inline user-option">
                        <input onChange={(e) => this.handleUserBtnChange(e)} className="form-check-input" type="radio" name="user-option" id="driver option2" value="driver" />
                        <label className="form-check-label" for="driverRadio">
                            Driver
                        </label>
                    </div>
                    
                    
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>

                        <Link to="/LoginPage" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    const { driverRegistering } = state.driverRegistration;
    const { ownerRegistering } = state.ownerRegistration;
    return {
        driverRegistering, ownerRegistering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(OwnerRegisterPage);
export { connectedRegisterPage as OwnerRegisterPage };