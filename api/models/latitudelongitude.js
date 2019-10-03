const mongoose = require('mongoose');

const latitudelongitude = mongoose.Schema({

    reference: String,
    rank : Number,
    latitude : String,
    longitude : String,
    description : String
});

module.exports = mongoose.model('LatitudeLongitude',latitudelongitude);
