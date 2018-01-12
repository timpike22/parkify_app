import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { driverAuthentication } from '../reducers'
import { driverService } from '../services'
import { driverActions } from '../actions'
import { loginSuccess, loginFailure } from '../actions/driver-actions';
import { history } from '../helpers';
import axios from 'axios';

class DriverLoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(driverActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/driver/authenticate')
            .then(res => console.log(res))
            .catch(e => console.log(e));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log([name]);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        const driver = {
            email: email,
            password: password
        }
        if (email && password) {
            driverService.login(driver).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(loginSuccess(response.data))
                    localStorage.setItem("driver", response.data.driverID);
                    //   dispatch(loginSuccess(driver))
                    // localStorage.setItem("driver", driver);
                    history.push('/DriverHomePage')
                } else {
                    dispatch(loginFailure())
                    this.setState({
                        email: '',
                        password: '',
                        submitted: false

                    })
                }
            })
            // dispatch(driverActions.login(email, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/register/driver" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.driverAuthentication;
    return {
        loggingIn
    };
}

const connectedDriverLoginPage = connect(mapStateToProps)(DriverLoginPage);
export { connectedDriverLoginPage as DriverLoginPage };