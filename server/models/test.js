const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TestSchema object
// This is similar to a Sequelize model
const TestSchema = new Schema({
    body: {
        type: String
    }
});

// This creates our model from the above schema, using mongoose's model method
const Test = mongoose.model("Test", TestSchema);

// Export the Test model
module.exports = Test;
