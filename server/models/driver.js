import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    // `password` must be of type String
    // `password` will trim leading and trailing whitespace before it's saved
    // `password` is a required field and throws a custom error message if not supplied
    // `password` uses a custom validation function to only accept values 6 characters or more
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "Password should be longer."
        ]
    },
    firstName: {
        type: String,
        trim: true,
        required: "First Name is Required",
    },
    lastName: {
        type: String,
        trim: true,
        required: "Last Name is Required",
    },
    street: {
        type: String,
        required: "Address is Required"
    },
    city: {
        type: String,
        required: "City is Required"
    },
    state: {
        type: String,
        required: "State is Required"
    },
    zip: {
        type: Number,
        required: "Zip is Required"
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    phoneNumber: {
        type: String,
        /*validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },*/
        required: [true, 'User phone number required']
    },
    vehicles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Vehicle"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Driver', Schema);