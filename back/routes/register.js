
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const User = mongoose.model('User');

const router = express.Router();

router.post('/register', function(req, res) {
    console.log('Registered user:' + JSON.parse(req.body).username); //works
    const request = JSON.parse(req.body);
    let user = new User();
    user.username = request.username;
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.email = request.email;
    user.telephone = request.telephone;
    user.lists = [];

    user.setPassword(request.password);

    user.save(function(err){
        if(user){
            console.log('user exist');
        }
        if(err){
            console.log(err);
            console.log('Saving user error');
        }
        else{
            let token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            })
            console.log('saving user success');
        }
    });

    res.status(200);
});

module.exports = router;
