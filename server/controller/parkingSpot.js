const express = require("express");
const route = express.Router();
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const ParkingSpot = require("../models/parkingSpot.js");
const Owner = require("../models/owner.js");
const _this = this;

module.exports = {
    create: function(req, res) {
        //create temporary object of request body
        //then create address variable from temp objects address
        //then remove whitespace from address variable
        //then instantiate latitude and longitude properties of the temp object
        let tempObject = req.body;
        const address = tempObject.street + tempObject.city + tempObject.state + tempObject.zip;
        address.replace(/ /g,'');
        tempObject.loc = [];

        //use axios to pass address into google to return coordinates 
        //then add those coordinates to the temp object
        //then add that temp object into the db as an parking spot
        axios
            .get("https://maps.google.com/maps/api/geocode/json?key=AIzaSyDu3uARDgsUWZTKOQ_CItX7_grlIU11Ieo&address=" + address)
            .then(response => {
                const coords = response.data.results[0].geometry.location;
                tempObject.loc[0] = coords.lng;
                tempObject.loc[1] = coords.lat;
            })
            .then(() => {
                // Create a new parking spot using the temp object
                ParkingSpot
                    .create(tempObject)
                    .then(dbParkingSpot => {
                        //Then retrieve the parking spots owner via the owner id from the database response
                        //then push the database object id to the owner's parking spots array.
                        Owner
                            .update({
                                _id: dbParkingSpot.ownerID
                            }, {
                                $push: {
                                    parkingSpots: dbParkingSpot._id
                                }
                            }, err => {
                                if (this.err) {
                                    console.log(err);
                                    res.send(err);
                                }
                            });
                        // If saved successfully, send the the new User document to the client
                        res.json(dbParkingSpot);
                    })
                    .catch(err => res.json(err));
            });
    },
    findAll: function(req, res) {
        ParkingSpot
            .find({})
            .populate("ownerID")
            .then(dbParkingSpot => res.json(dbParkingSpot))
            .catch(err => res.json(err));    
    },
    findById: function(req, res) {
        ParkingSpot
            .find({_id: req.params.id})
            .populate("ownerID")
            .then(dbParkingSpot => res.json(dbParkingSpot))
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
        tempObject.loc = [];

        //use axios to pass address into google to return coordinates 
        //then add those coordinates to the temp object
        //then add that temp object into the db as an parking spot
        axios
            .get("https://maps.google.com/maps/api/geocode/json?key=AIzaSyDu3uARDgsUWZTKOQ_CItX7_grlIU11Ieo&address=" + address)
            .then(response => {
                const coords = response.data.results[0].geometry.location;
                tempObject.loc[0] = coords.lng;
                tempObject.loc[1] = coords.lat;
            })
            .then(() => {
                // Update parking spot using the temp object
                ParkingSpot
                    .update({_id:req.body._id}, {
                        $set: {
                            name: tempObject.name,
                            street: tempObject.street,
                            city: tempObject.city,
                            state: tempObject.state,
                            zip: tempObject.zip,
                            loc: tempObject.loc
                        }
                    })
                    .then(dbParkingSpot => res.json(dbParkingSpot))
                    .catch(err => res.json(err));
            });   
    },
    remove: function(req, res) {
        //find the parkingspot via id to get the ownerid
        ParkingSpot
            .findOne({_id: req.params.id})
            .then(dbParkingSpot => {
                Owner
                    .update({_id: dbParkingSpot.ownerID}, {
                        //then remove the parking spot id from the owners parkingspots array
                        $pull: {
                            parkingSpots: dbParkingSpot._id
                        }
                    }, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });
            })
            //then delete the parking spot
            .then(() => {
                ParkingSpot
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
    },
    findNear: function(req, res, next) {
        let limit = req.query.limit || 10;

        // get the max distance or set it to 8 miles
        let maxDistance = req.query.distance || 10;

        // we need to convert the distance to radians
        // the radius of the Earth is approximately 3959 miles
        maxDistance /= 3959;

        // get coordinates [ <longitude> , <latitude> ]
        let coords = [];
        coords[0] = req.query.longitude;
        coords[1] = req.query.latitude;

        //find a location
        ParkingSpot
        .find({
            loc: {
                $near: coords,
                $maxDistance: maxDistance
            }
        })
        .populate("ownerID")
        .limit(limit)
        .exec((err, locations) => {
            if (err) {
                res.send(err);
            }

            res.send(locations);
        });

    }
};