const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Farmer:String,
    DatePublished:Date,
    Detected:String,
    ImageURL:String,
    FeedBack:Number
});

module.exports = mongoose.model('FeedBack',Schema);