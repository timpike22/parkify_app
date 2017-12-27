import mongoose from 'mongoose';

var Schema = mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Vehicle', Schema);