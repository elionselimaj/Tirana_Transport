const express = require('express');
const location = express.Router();
const mongoose = require('mongoose');

const LatitudeLongitude = require('../models/latitudelongitude');

location.get('/',(req,res,next) =>{

    LatitudeLongitude.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {

        console.log(err);
        res.status(500).json({error:err});
    });
});

location.post('/',(req,res,next) =>{

    const location = new LatitudeLongitude({
        reference : req.body.reference,
        rank : req.body.rank,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        description : req.body.description
    });
    location
    .save()
    .then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    
    res.status(201).json({
        message: 'Handling POST requests to /locations',
        stations: location
    });
});

location.get('/:routeId',(req,res,next) => {

    const id = req.params.routeId;
    LatitudeLongitude.find().where({reference:id})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:'No valid entry found for provided ID'})
        }
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});


module.exports = location;