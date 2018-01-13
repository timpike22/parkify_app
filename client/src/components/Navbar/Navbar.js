import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.png"


// Depending on the current path, this component sets the "active" className on the appropriate navigation link item
const Navbar = props =>
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
                <Link to="/logindriver"className="btn btn-secondary my-2 owner-login" type="submit">Driver Log In</Link>
                <Link to="/loginowner" className="btn btn-primary my-2 my-sm-0 driver-login" type="submit">Owner Log In</Link>
            </form>
        </div>
    </nav>;

export default Navbar;

