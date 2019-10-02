const mongoose = require('mongoose');

const latitudelongitude = mongoose.Schema({

    referenceID: String,
    rank : Number,
    latitude : String,
    longitude : String,
    description : String
});

module.exports = mongoose.model('LatitudeLongitude',latitudelongitude);