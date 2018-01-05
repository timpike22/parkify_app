const express = require("express");
const route = express.Router();
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const Test = require("../models/test.js");

module.exports = {
    create: function(req, res) {
        // Create a new test using req.body
        Test
            .create(req.body)
            .then(dbTest => res.json(dbTest))
            .catch(err => {res.json(err)});
    },
    findAll: function(req, res) {
        Test
            .find({})
            .then(dbTest => res.json(dbTest))
            .catch(err => res.json(err)); 
    },
    findById: function(req, res) {
        Test
            .find({_id: req.params.id})
            .then(dbTest => res.json(dbTest))
            .catch(err => res.json(err));  
    },
    update: function(req, res) {
        // Update parking spot using the temp object
        Test
            .update({_id:req.body._id}, {
                $set: {
                    body: req.body.body,
                }
            })
            .then(dbTest => res.json(dbTest))
            .catch(err => res.json(err));
    },
    remove: function(req, res) {
        //find the vehicle via id to get the driverID
        Test
            .findOne({_id: req.params.id})
            //then delete the vehicle
            .then(() => {
                Test
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