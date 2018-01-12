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
                <input className="form-control mr-sm-2" type="email" placeholder="Email" aria-label="E-mail" />
                <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" />
                <input className="form-control mr-sm-2" type="email" placeholder="Email" aria-label="E-mail" />
                <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" />
                <select class="form-control">
                    <option checked>Driver</option>
                    <option>Owner</option>
                </select>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log In</button>
            </form>
        </div>
    </nav>;

export default Navbar;

