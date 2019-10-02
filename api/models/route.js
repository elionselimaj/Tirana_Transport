const mongoose = require('mongoose');

const routeSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    station : String
});

module.exports = mongoose.model('Route',routeSchema);