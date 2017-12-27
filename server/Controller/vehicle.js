const express = require("express");
const route = express.Router();
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const Vehicle = require("../Models/vehicle.js");
const Driver = require("../Models/driver.js");

module.exports = {
    create: function(req, res) {
        // Create a new vehicle using req.body
        Vehicle
            .create(req.body)
            .then(dbVehicle => {
                //Then retrieve the vehicle owner via the driver id from the database response
                //then push the database object id to the drivers's vehicles array.
                Driver
                    .update({_id: dbVehicle.driverID}, {
                        $push: {
                            vehicles: dbVehicle._id
                        }
                    }, function(err) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });
                    // If saved successfully, send the the new User document to the client
                    res.json(dbVehicle);
            })
            .catch(err => {res.json(err));
    },
    findAll: function(req, res) {
        Vehicle
            .find({})
            .populate("driverID")
            .then(dbVehicle => res.json(dbVehicle))
            .catch(err => res.json(err)); 
    },
    findById: function(req, res) {
        Vehicle
            .find({_id: req.params.id})
            .populate("driverID")
            .then(dbVehicle => res.json(dbVehicle))
            .catch(err => res.json(err));  
    },
    update: function(req, res) {
        // Update parking spot using the temp object
        Vehicle
            .update({_id:req.body._id}, {
                $set: {
                    make: req.body.make,
                    model: req.body.model,
                    year: req.body.year,
                    color: req.body.color,
                }
            })
            .then(dbParkingSpot => res.json(dbParkingSpot))
            .catch(err => res.json(err));
    },
    remove: function(req, res) {
        //5a39d51be4888f04988d910d
        //find the vehicle via id to get the driverID
        Vehicle
            .findOne({_id: req.params.id})
            .then(dbVehicle => {
                Driver
                    .update({_id: dbVehicle.driverID}, {
                        //then remove the vehicle id from the drivers vehicles array
                        $pull: {
                            vehicles: dbVehicle._id
                        }
                    }, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });
            })
            //then delete the vehicle
            .then(() => {
                Vehicle
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