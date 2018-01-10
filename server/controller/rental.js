var express = require("express");
var route = express.Router();
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var Rental = require("../models/rental.js");
var Owner = require("../models/owner.js");
var ParkingSpot = require("../models/parkingSpot.js");
var Vehicle = require("../models/vehicle.js");
var Driver = require("../models/driver.js");
const _this = this;

module.exports = {
    create: function(req, res) {
        Rental
            .create(req.body)
            .then(dbRental => {
                //Add rental ID to Owners's Rental history Array
                Owner.update({
                    "_id": dbRental.ownerID
                }, {
                    $push: {
                        rentals: dbRental._id
                    }
                }, err => {
                    if (this.err) {
                        console.log(err);
                        res.send(err);
                    }
                });

            //Add rental ID to Parking spot's Rental history Array
        ParkingSpot
            .update({
                "_id": dbRental.parkingSpotID
            }, {
                $push: {
                    rentals: dbRental._id
                }
            }, err => {
                if (this.err) {
                    console.log(err);
                    res.send(err);
                }
            });

            //Add rental ID to Driver's Rental history Array
        Driver
            .update({
                "_id": dbRental.driverID
            }, {
                $push: {
                    rentals: dbRental._id
                }
            }, err => {
                if (this.err) {
                    console.log(err);
                    res.send(err);
                }
            });

            //Add rental ID to Vehicle's Rental history Array
        Vehicle
            .update({
                "_id": dbRental.vehicleID
            }, {
                $push: {
                    rentals: dbRental._id
                }
            }, err => {
                if (this.err) {
                    console.log(err);
                    res.send(err);
                }
            });

        res
            .json(dbRental);
            })
            .catch(err => {
                // If an error occurs, send the error to the client
                res.json(err);
            });
    },
    findAll: function(req, res) {
        Rental
            .find({})
            .populate("ownerID")
            .populate("parkingSpotID")
            .populate("driverID")
            .populate("vehicleID")
            .then(dbRental => {
                res.json(dbRental);
            })
            .catch(err => {
                res.json(err);
            });
    },
    findById: function(req, res) {
        Rental
            .findOne({_id: req.params.id})
            .populate("ownerID")
            .populate("parkingSpotID")
            .populate("driverID")
            .populate("vehicleID")
            .then(dbRental => {
                res.json(dbRental);
            })
            .catch(err => {
                res.json(err);
            });  
    },
    update: function(req, res) {
        let tempRental = req.body;
        
        if (tempRental.status !== "active") {
            Rental
                .findOneAndUpdate({
                    _id:req.params.id
                }, {
                    $set: {
                        status: req.body.status,
                        rate: req.body.rate
                    }
                }, {
                    new: true
                })
                .then(dbRental => {
                    ParkingSpot
                        .update({
                            _id:dbRental.parkingSpotID
                        }, {
                            $set: {
                                availability: "available"
                            }
                        }, err => {
                            if (this.err) {
                                console.log(err);
                                res.send(err);
                            }
                        });
                })
                .catch(err => {
                    console.log("err");
                    // If an error occurs, send the error to the client
                    res.json(err);
                });
        } else {
            Rental
                .findOneAndUpdate({_id:req.params.id}, {
                    $set: {
                        status: req.body.status,
                        rate: req.body.rate
                    }
                }, {new: true})
                .then(dbRental => {
                    ParkingSpot
                        .update({_id:dbRental.parkingSpotID}, {
                            $set: {availability: "occupied"}
                        }, err => {
                            if (this.err) {
                                console.log(err);
                                res.send(err);
                            }
                        });
                })
                .catch(err => {
                    console.log("err");
                    // If an error occurs, send the error to the client
                    res.json(err);
                });
        }
    },
    remove: function(req, res) {
        //find the rental via id to get the ownerid
        Rental
            .findOne({_id: req.params.id})
            .then(dbRental => {
                Owner
                    .update({_id: dbRental.ownerID}, {
                        //then remove the parking spot id from the owners parkingspots array
                        $pull: {rentals: dbRental._id}
                    }, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                        console.log(removed);
                    });

                ParkingSpot
                    .update({_id: dbRental.parkingSpotID}, {
                        //then remove the parking spot id from the owners parkingspots array
                        $pull: {rentals: dbRental._id}
                    }, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });

                Driver
                    .update({_id: dbRental.driverID}, {
                        //then remove the parking spot id from the owners parkingspots array
                        $pull: {rentals: dbRental._id}
                    }, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });

                Vehicle
                    .update({_id: dbRental.vehicleID}, {
                        //then remove the parking spot id from the owners parkingspots array
                        $pull: {rentals: dbRental._id}
                    }, (err, removed) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });     
        })
        //then delete the rental
        .then(() => {
            Rental
                .remove({
                    _id: req.params.id
                }, (err, removed) => {
                    // Log any errors from mongojs
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    // Otherwise, send the mongojs response to the browser
                    // This will fire off the success function of the ajax request
                    else {
                        res.send(removed);
                    }
                });
        });
    }
};