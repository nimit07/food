//required modules
var express = require('express');
var router = express.Router();
var Event = require('./eventModel');
router.route('/event')
    //add new Event (accessed at POST http://localhost:3030/api/events)
    .post(function (req, res) {

        var event = new Event();		// create a new instance of the Event model
        console.log(req.body);
        event.organiser = req.body.organiser;
        event.name = req.body.name;// set the event name (comes from the request)
        event.category=req.body.foodCategory;
        event.maxCapacity=req.body.maxCapacity;
        event.timing=req.body.timing;
        event.address=req.body.address;
        event.dishes=req.body.dishes;
        event.save(function (err,_event) {
            if (err)
                res.send(err);
            console.log(_event);
            res.json({success:true,event:_event});
        });
    })

    // get all the events (accessed at GET http://localhost:3030/api/events)
    .get(function (req, res) {
        Event.find(function (err, events) {
            if (err)
                res.send(err);
            console.log(events);
            res.json(events);
        });
    });

// on routes that end in /events/:id
// ----------------------------------------------------
router.route('/event/:id')
    // get the event with that id
    .get(function (req, res) {
        Event.findById(req.params.id, function (err, event) {
            if (err)
                res.send(err);
            console.log(event);
            res.json(event);
        });
    })
    // update the event with this id
    .put(function (req, res) {
        Event.findById(req.params.id, function (err, event) {
            if (err)
                res.send(err);
            if(req.body.organiser)
            event.organiser = req.body.organiser;
            if(req.body.name)
            event.name = req.body.name;// set the event name (comes from the request)
            if(req.body.foodCategory)
            event.category=req.body.foodCategory;
            if(req.body.maxCapacity)
            event.maxCapacity=req.body.maxCapacity;
            if(req.body.timing)
            event.timing=req.body.timing;
            if(req.body.address)
            event.address=req.body.address;
            if(req.body.dishes)
            event.dishes=req.body.dishes;
            event.save(function (err,_event) {
                if (err)
                    res.send(err);
                console.log(event);
                res.json({success:true,event:_event});
            });

        });
    })
    // delete the event with this id
    .delete(function (req, res) {
        Event.remove({
            _id: req.params.id
        }, function (err, event) {
            if (err)
                res.send(err);

            res.json({sucess:true});
        });
    });

module.exports = router;

