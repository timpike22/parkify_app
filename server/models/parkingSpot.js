const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ParkingSpotSchema object
// This is similar to a Sequelize model
const ParkingSpotSchema = new Schema({
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: "Owner"
    },
    name: {
        type: String
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    loc: {
        type: [Number], //[<longitude>, <latitude>]
        index: '2d'
    },
  // `date` must be of type Date. The default value is the current date
  parkingSpotCreated: {
    type: Date,
    default: Date.now
  },
  rentals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rental"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
const ParkingSpot = mongoose.model("ParkingSpot", ParkingSpotSchema);

// Export the ParkingSpot model
module.exports = ParkingSpot;
