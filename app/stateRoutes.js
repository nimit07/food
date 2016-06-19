//required modules
var express = require('express');
var router = express.Router();
var State = require('./stateModel');
router.route('/state')
    //add new State (accessed at POST http://localhost:3030/api/states)
    .post(function (req, res) {

        var state = new State();		// create a new instance of the State model
        console.log(req.body);
        state.name = req.body.name;  // set the state name (comes from the request)
        state.save(function (err,_state) {
            if (err)
                res.send(err);
            console.log(_state);
            res.json({success:true,state:_state});
        });
    })

    // get all the states (accessed at GET http://localhost:3030/api/states)
    .get(function (req, res) {
        State.find(function (err, states) {
            if (err)
                res.send(err);
            console.log(states);
            res.json(states);
        });
    });

// on routes that end in /states/:id
// ----------------------------------------------------
router.route('/state/:id')
    // get the state with that id
    .get(function (req, res) {
        State.findById(req.params.id, function (err, state) {
            if (err)
                res.send(err);
            console.log(state);
            res.json(state);
        });
    })
    // update the state with this id
    .put(function (req, res) {
        State.findById(req.params.id, function (err, state) {
            if (err)
                res.send(err);
            if (req.body.name)
                state.name = req.body.name;
            state.save(function (err,_state) {
                if (err)
                    res.send(err);
                console.log(state);
                res.json({success:true,state:_state});
            });

        });
    })
    // delete the state with this id
    .delete(function (req, res) {
        State.remove({
            _id: req.params.id
        }, function (err, state) {
            if (err)
                res.send(err);

            res.json({sucess:true});
        });
    });

module.exports = router;

