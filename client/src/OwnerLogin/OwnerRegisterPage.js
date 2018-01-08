import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ownerService} from '../services'
import { registerSuccess, registerFailure } from '../actions/owner-actions';
import { history } from '../helpers';

import axios from 'axios';


class OwnerRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            owner: {
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
        axios.get('/owner')
            .then(res => console.log(res))
            .catch(e => console.log(e));
    }

    setowner(event) {
        console.log(event.target.value);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { owner } = this.state;
        this.setState({
            owner: {
                ...owner,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { owner } = this.state;
        const { dispatch } = this.props;
        if (owner.firstName && owner.lastName && owner.email && owner.password) {
            ownerService.register (owner).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(registerSuccess(response.data))
                    localStorage.setItem("owner", response.data);
                    history.push('/OwnerHomePage')
                } else {
                    dispatch(registerFailure())
                    this.setState({owner: {
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
        const { registering } = this.props;
        const { owner, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register to Rent Your Space</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !owner.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={owner.firstName} onChange={this.handleChange} />
                        {submitted && !owner.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !owner.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={owner.lastName} onChange={this.handleChange} />
                        {submitted && !owner.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !owner.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={owner.email} onChange={this.handleChange} />
                        {submitted && !owner.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !owner.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={owner.password} onChange={this.handleChange} />
                        {submitted && !owner.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    
                    
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>

                        <Link to="/OwnerLoginPage" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.ownerRegistration;
    return {
        registering
    };
}

const connectedOwnerRegisterPage = connect(mapStateToProps)(OwnerRegisterPage);
export { connectedOwnerRegisterPage as OwnerRegisterPage };