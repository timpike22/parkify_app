import React from "react";

const Jumbotron = props =>
    <div className={`jumbotron${props.fluid ? "-fluid" : ""}`} {...props} />;

export default Jumbotron;
