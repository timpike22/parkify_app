const router = require("express").Router();
const driverRoutes = require("./drivers");
const ownerRoutes = require("./owners");
const parkingSpotRoutes = require("./parkingSpots");
const vehicleRoutes = require("./vehicles");
const rentalRoutes = require("./rentals");

// Routes
router.use("/drivers", driverRoutes);
router.use("/owners", ownerRoutes);
router.use("/parkingSpots", parkingSpotRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/rentals", rentalRoutes);

module.exports = router;