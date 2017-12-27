const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new VehicleSchema object
// This is similar to a Sequelize model
const VehicleSchema = new Schema({
    driverID: {
        type: Schema.Types.ObjectId,
        ref: "Driver"
    },
    make: {
        type: String,
        trim: true,
        required: "Make is Required",
    },
    model: {
        type: String,
        trim: true,
        required: "Model is Required",
    },
    year: {
        type: Number,
        trim: true,
        required: "Year is Required"
    },
    color: {
        type: String,
        trim: true,
        required: "Color is Required"    
    },
    // `date` must be of type Date. The default value is the current date
    vehicleCreated: {
        type: Date,
        default: Date.now
    }
});

// This creates our model from the above schema, using mongoose's model method
const Vehicle = mongoose.model("Vehicle", VehicleSchema);

// Export the Vehicle model
module.exports = Vehicle;
