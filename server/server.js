const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const session = require('express-session');
const passport = require("passport");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes");
const ownerRoute = require("./routes/api/owners");
const parkingSpotRoute = require("./routes/api/parkingSpots");
const driverRoute = require("./routes/api/drivers");
const vehicleRoute = require("./routes/api/vehicles");
const rentalRoute = require("./routes/api/rentals");
const PORT = 3001;

const app = express();
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/public"));

// Initialize Express
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
var db = mongoose.connection;

//use sessions for tracking logins
app.use("/owner", session({
  name: "owner",
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

/*app.use("/driver", session({
  name: "driver",
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));*/

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/owner", ownerRoute);
app.use("/parkingSpot", parkingSpotRoute);
app.use("/driver", driverRoute);
app.use("/vehicle", vehicleRoute);
app.use("/rental", rentalRoute);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");  
});
