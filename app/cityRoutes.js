//required modules
var express = require('express');
var router = express.Router();
var City = require('./cityModel');
router.route('/city')
    //add new City (accessed at POST http://localhost:3030/api/citys)
    .post(function (req, res) {

        var city = new City();		// create a new instance of the City model
        console.log(req.body);
        city.name = req.body.name;
        city.state = req.body.state;// set the city name (comes from the request)
        city.save(function (err,_city) {
            if (err)
                res.send(err);

            res.json({success:true,city:_city});
        });
    })

    // get all the cities (accessed at GET http://localhost:3030/api/citys)
    .get(function (req, res) {
        City.find(function (err, cities) {
            if (err)
                res.send(err);

            res.json(cities);
        });
    });

// on routes that end in /citys/:id
// ----------------------------------------------------
router.route('/city/:id')
    // get the city with that id
    .get(function (req, res) {
        City.findById(req.params.id).populate('State').exec(function (err, city) {
            if (err)
                res.send(err);
            res.json(city);
        });
    })
    // update the city with this id
    .put(function (req, res) {
        City.findById(req.params.id).populate('State').exec(function (err, city) {
            if (err)
                res.send(err);
                city.name = req.body.name;
                city.state =req.body.state;
            city.save(function (err,_city) {
                if (err)
                    res.send(err);
                console.log(city);
                res.json({success:true,city:_city});
            });

        });
    })
    // delete the city with this id
    .delete(function (req, res) {
        City.remove({
            _id: req.params.id
        }, function (err, city) {
            if (err)
                res.send(err);

            res.json({sucess:true});
        });
    });

module.exports = router;

