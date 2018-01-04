const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const RentalSchema = new Schema({
  // `date` must be of type Date. The default value is the current date
    rentalCreated: {
        type: Date,
        default: Date.now
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: "Owner"
    },
    parkingSpotID: {
        type: Schema.Types.ObjectId,
        ref: "ParkingSpot"
    },
    driverID: {
        type: Schema.Types.ObjectId,
        ref: "Driver"
    },
    vehicleID: {
        type: Schema.Types.ObjectId,
        ref: "Vehicle"
    },
    status: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid status"],
    },
});

// This creates our model from the above schema, using mongoose's model method
const Rental = mongoose.model("Rental", RentalSchema);

// Export the Driver model
module.exports = Rental;
