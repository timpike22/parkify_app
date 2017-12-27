const express = require("express");
const route = express.Router();
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const Driver = require("../Models/driver.js");
const Vehicle = require("../Models/vehicle.js");

module.exports = {
    create: function(req, res) {
        //create temporary object of request body
        //then create address variable from temp objects address
        //then remove whitespace from address variable
        //then instantiate latitude and longitude properties of the temp object
        let tempObject = req.body;
        const address = tempObject.street + tempObject.city + tempObject.state + tempObject.zip;
        address.replace(/ /g,'');
        tempObject.lat = 0;
        tempObject.lng = 0;

        //use axios to pass address into google to return coordinates 
        //then add those coordinates to the temp object
        //then add that temp object into the db as a driver
        axios
            .get("https://maps.google.com/maps/api/geocode/json?key=AIzaSyDu3uARDgsUWZTKOQ_CItX7_grlIU11Ieo&address=" + address)
            .then(response => {
                const coords = response.data.results[0].geometry.location;
                tempObject.lat = coords.lat;
                tempObject.lng = coords.lng;
            })
            .then(() => {
            // Create a new user using req.body
                Driver
                    .create(tempObject)
                    .then(dbDriver => res.json(dbDriver))
                    .catch(err => res.json(err));
            });
    },
    findAll: function(req, res) {
        Driver
            .find({})
            .populate("vehicles")
            .then(dbDriver => res.json(dbDriver))
            .catch(err => res.json(err));
    },
    findById: function(req, res) {
        Driver
            .find({_id: req.params.id})
            .populate("vehicles")
            .then(dbDriver => res.json(dbDriver))
            .catch(err => res.json(err));
    },
    update: function(req, res) {
        //create temporary object of request body
        //then create address variable from temp objects address
        //then remove whitespace from address variable
        //then instantiate latitude and longitude properties of the temp object
        let tempObject = req.body;
        const address = tempObject.street + tempObject.city + tempObject.state + tempObject.zip;
        address.replace(/ /g,'');
        tempObject.lat = 0;
        tempObject.lng = 0;

        //use axios to pass address into google to return coordinates 
        //then add those coordinates to the temp object
        //then add that temp object into the db as an parking spot
        axios
            .get("https://maps.google.com/maps/api/geocode/json?key=AIzaSyDu3uARDgsUWZTKOQ_CItX7_grlIU11Ieo&address=" + address)
            .then(response => {
                const coords = response.data.results[0].geometry.location;
                tempObject.lat = coords.lat;
                tempObject.lng = coords.lng;
            })
            .then(() => {
                // Update parking spot using the temp object
                Driver
                    .update({_id:req.body._id}, {
                        $set: {
                            firstName: tempObject.firstName,
                            lastName: tempObject.lastName,
                            email: tempObject.email,
                            phoneNumber: tempObject.phoneNumber,
                            street: tempObject.street,
                            city: tempObject.city,
                            state: tempObject.state,
                            zip: tempObject.zip,
                            lat: tempObject.lat,
                            lng: tempObject.lng
                        }
                    })
                    .then(dbDriver => res.json(dbDriver))
                    .catch(err => res.json(err));
            });
    },
    remove: function(req, res) {
        //find the owner via id
        Driver
            .findOne({_id: req.params.id})
            .then(dbDriver => {
                //for each vehicle the driver has
                dbDriver.vehicles.forEach(vehicleID => {
                    //delete the actual vehicles
                    Vehicle.remove({_id: vehicleID}, (err, removed) => {
                        // Log any errors from mongojs
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });
                });
            })
            //then clear the vehicles from the drdiver array
            .then(() => {
                Driver
                    .update({_id: req.params.id}, {
                        $set: {
                            vehicles: []
                        }
                    }, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });
            })
            //then delete the actual driver
            .then(() => {
                Driver
                    .remove({_id: req.params.id}, (err, removed) => {
                        if (err) {
                            console.log(err); res.send(err);
                        }
                        else {
                            res.send(removed);
                        }
                    });
            });
    }
};