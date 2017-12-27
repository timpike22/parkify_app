const express = require("express");
const app = express.Router();
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = app;