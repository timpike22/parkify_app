const express = require("express");
const route = express.Router();
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const Owner = require("../Models/owner.js");
const ParkingSpot = require("../Models/parkingSpot.js");

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
        //then add that temp object into the db as an owner
        axios
            .get("https://maps.google.com/maps/api/geocode/json?key=AIzaSyDu3uARDgsUWZTKOQ_CItX7_grlIU11Ieo&address=" + address)
            .then(response => {
                const coords = response.data.results[0].geometry.location;
                tempObject.lat = coords.lat;
                tempObject.lng = coords.lng;
            })
            .then(() => {
                Owner
                    .create(tempObject)
                    .then(dbOwner => res.json(dbOwner))
                    .catch(err => res.json(err));
            });
    },
    findAll: function(req, res) {
        Owner
            .find({})
            .populate("parkingSpots")
            .then(dbOwner => res.json(dbOwner))
            .catch(err => res.json(err));       
    },
    findById: function(req, res) {
        Owner
            .find({_id: req.params.id})
            .populate("parkingSpots")
            .then(dbOwner => res.json(dbOwner))
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
                Owner
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
                    .then(dbOwner => res.json(dbOwner))
                    .catch(err => res.json(err));
            });   
    },
    remove: function(req, res) {
        //find the owner via id
        Owner
            .findOne({_id: req.params.id})
            .then(dbOwner => {
                //for each parking spot the owner has
                dbOwner.parkingSpots.forEach(parkingSpotId => {
                    //delete the actual parking spots
                    ParkingSpot
                        .remove({_id: parkingSpotId}, (err, removed) => {
                            // Log any errors from mongojs
                            if (err) {
                                console.log(err);
                                res.send(err);
                            }
                            // Otherwise, send the mongojs response to the browser
                            // This will fire off the success function of the ajax request
                        });
                });
            })
            //then clear the parking spots from the owner array
            .then(() => {
                Owner
                    .update({_id: req.params.id}, {
                        $set: {
                            parkingSpots: []
                        }
                    }, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });
            })
            //then delete the actual owner
            .then(() => {
                Owner
                    .remove({_id: req.params.id}, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                        else {
                            res.send(removed);
                        }
                    });
            });  
    }
};
