import React from "react";
import { Link } from "react-router-dom";
import "./ProtectedNavbar.css";
import logo from "./logo.png";
import {driverActions} from "../../actions/driver-actions";
import {ownerActions} from "../../actions/owner-actions";

class PNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        localStorage.removeItem("owner");
        localStorage.removeItem("driver");
        this.props.dispatch(driverActions.logout());
        this.props.dispatch(ownerActions.logout());
    }
    
    // Depending on the current path, this component sets the "active" className on the appropriate navigation link item
    
    render() {    
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a className="navbar-brand brand" href="#">
                    <img src={logo} width="30" height="30" alt="" />
                    -tween The Lines
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbars" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbars" id="navbars">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <form className="form-inline my-2 my-md-0">
                        <Link to="/" className="btn btn-warning my-2 owner-login" type="submit" onClick={(e) => this.handleChange()}>Log Out</Link>
                    </form>
                </div>
            </nav>
        );
    
    }
}

export default PNavbar;

