var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var axios = require("axios");

var PORT = 3001;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/parkify", {
    useMongoClient: true
});

//Temporary Objects
let loggedInOwner = {};
let loggedInDriver = {};

//Routes
var indexRoute = require("./Controller/index.js");
app.use("/", indexRoute);
var ownerRoute = require("./Controller/owner.js");
app.use("/", ownerRoute);
var driverRoute = require("./Controller/driver.js");
app.use("/", driverRoute);
var parkingSpotRoute = require("./Controller/parkingSpot.js");
app.use("/", parkingSpotRoute);
var vehicleRoute = require("./Controller/vehicle.js");
app.use("/", vehicleRoute);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
