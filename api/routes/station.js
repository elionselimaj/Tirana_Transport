const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Route = require('../models/route');

router.get('/',(req,res,next) =>{

    Route.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {

        console.log(err);
        res.status(500).json({error:err});
    });
});

router.post('/',(req,res,next) =>{

    const route = new Route({
        _id : new mongoose.Types.ObjectId(),
        station: req.body.station
    });
    route
    .save()
    .then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    
    res.status(201).json({
        message: 'Handling POST requests to /routes',
        stations: route
    });
});

router.get('/:routeId',(req,res,next) => {

    const id = req.params.routeId;
    Route.findById(id)
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


module.exports = router;