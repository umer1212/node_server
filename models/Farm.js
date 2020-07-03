var mongoose = require('mongoose');

var FarmSchema = mongoose.Schema({
    farmId: Number,
    name:String,
    plants: [String],
    longitude: String,
    latitude: String,
    area: Number,
    username:String
});


module.exports = mongoose.model('Farm', FarmSchema);