var mongoose = require('mongoose');

var Expert = mongoose.Schema({
    expertId: {
        type: Number,
        unique: true,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    dob: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    address: String,
    rating: Number,
    picturePath: String
});

module.exports = mongoose.model('Expert', Expert);