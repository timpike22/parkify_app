import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    driverID: {
        type: Schema.Types.ObjectId,
        ref: "Owner"
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
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('ParkingSpace', Schema);