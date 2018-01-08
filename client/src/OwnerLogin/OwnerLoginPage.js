import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ownerAuthentication } from '../reducers'
import { ownerService } from '../services'
import { ownerActions } from '../actions'
import { loginSuccess, loginFailure } from '../actions/owner-actions';
import { history } from '../helpers';
import axios from 'axios';

class OwnerLoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(ownerActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/owner/authenticate')
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
        if (email && password) {
            ownerService.login({email,password}).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(loginSuccess(response.data))
                    localStorage.setItem("owner", response.data);
                    history.push('/OwnerHomePage')
                } else {
                    dispatch(loginFailure())
                    this.setState({
                            email: '',
                            password: '',
                            submitted: false
                        
                    })
                }
            })
           // dispatch(ownerActions.login(email, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
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
                        <Link to="/register/owner" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.ownerAuthentication;
    return {
        loggingIn
    };
}

const connectedOwnerLoginPage = connect(mapStateToProps)(OwnerLoginPage);
export { connectedOwnerLoginPage as OwnerLoginPage };