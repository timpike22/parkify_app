import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props =>
    <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                    Parkify
        </Link>
            </div>
            <ul className="nav navbar-nav">
                <li
                    className={
                        window.location.pathname === "/" ||
                            window.location.pathname === "/"
                            ? "active"
                            : ""
                    }
                >
                    <Link to="/">About</Link>
                </li>
                <li
                    className={window.location.pathname === "/" ? "active" : ""}
                >
                    <Link to="/discover">Discover</Link>
                </li>
                <li className={window.location.pathname === "/search" ? "active" : ""}>
                    <Link to="/search">Search</Link>
                </li>
            </ul>
        </div>
    </nav>;

export default Navbar;
