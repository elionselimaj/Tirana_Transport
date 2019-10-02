const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stationRoutes = require('./api/routes/station');
const locationRoutes = require('./api/routes/location');

mongoose.connect('mongodb+srv://elionselimaj:'+process.env.MONGO_ATLAS_PW+'@cluster0-dkm4i.mongodb.net/test?retryWrites=true&w=majority',{
    useUnifiedTopology: true , 
    useNewUrlParser : true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res,next) => {

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

// Routes wich should handle requests
app.use('/station', stationRoutes);
app.use('/location', locationRoutes);

app.use((req,res,next) => {

    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) => {

    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;