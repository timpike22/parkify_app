import React from "react";
import { Link } from "react-router-dom";
import "./ProtectedNavbar.css";
import logo from "./logo.png";
import account from "./account.png";

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
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <form>
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown03">
                        <a class="dropdown-item" href="/settings">Settings</a>
                        <Link to="/logout" className="btn btn-warning my-2 owner-login" type="submit">Log Out</Link>
                    </div>
                </div>
            </form>
            <img src={account} width="30" height="30" alt="" />
        </div>
    </nav>;

    

export default PNavbar;
