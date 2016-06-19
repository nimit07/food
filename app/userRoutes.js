//required modules
var express = require('express');
var router = express.Router();
var User = require('./userModel');

router.route('/user')
    //add new User (accessed at POST http://localhost:3030/api/users)
    .post(function (req, res) {

        var user = new User();		// create a new instance of the User model
        console.log(req.body);
        user.name = req.body.name;  // set the user name (comes from the request)
        user.password =req.body.password;
        user.email =req.body.email;
        user.mobile=req.body.mobile;
        user.username=req.body.username;
        user.save(function (err,_user) {
            if (err)
                res.send(err);

            delete _user.password;
            console.log(_user);
            res.json({success:true,user:_user});
        });
    })

    // get all the users (accessed at GET http://localhost:3030/api/users)
    .get(function (req, res) {
        User.find().populate('User','-password').exec(function (err, users) {
            if (err)
                res.send(err);
            console.log(users);
            res.json(users);
        });
    });

// on routes that end in /users/:id
// ----------------------------------------------------
router.route('/user/:id')
    // get the user with that id
    .get(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err)
                res.send(err);
            console.log(user);
            res.json(user);
        });
    })
    // update the user with this id
    .put(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err)
                res.send(err);
            if (req.body.name)
                user.name = req.body.name;
            if (req.body.email)
                user.email =req.body.email;
            if (req.body.mobile)
                user.mobile=req.body.mobile;
            user.save(function (err,_user) {
                if (err)
                    res.send(err);
                delete _user.password;
                console.log(user);
                res.json({success:true,user:_user});
            });

        });
    })
    // delete the user with this id
    .delete(function (req, res) {
        User.remove({
            _id: req.params.id
        }, function (err, user) {
            if (err)
                res.send(err);

            res.json({sucess:true});
        });
    });

module.exports = router;

