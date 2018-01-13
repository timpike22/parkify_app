import React from "react";
import { Link } from "react-router-dom";
import "./ProtectedNavbar.css";
import logo from "./logo.png"


// Depending on the current path, this component sets the "active" className on the appropriate navigation link item
const PNavbar = props =>
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
                <button className="btn btn-warning my-2 owner-login" type="submit">Log Out</button>
            </form>
        </div>
    </nav>;

    

export default PNavbar;

