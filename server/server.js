const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const routes = require("./routes");
const PORT = 3001;
const cors = require('cors');

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/parkify",
  {
    useMongoClient: true
  }
);
app.use(routes);

/*
//Temporary Objects
let loggedInOwner = {};
let loggedInDriver = {};
*/

/*
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
*/

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");  
});
