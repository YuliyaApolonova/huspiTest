require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports = {
    getPost: (req,res) => {
        if(!req.headers['authorization']){
            console.log('No authorisation header');
            res.status(401).json({
                "data": "",
                "message": "No authorisation header",
                "type": false

            })
        }
        else{
            let token = req.headers['authorization'].split(' ')[1];
            jwt.verify(token, 'MY_SECRET', function(err, decoded){
                if(err){
                    console.log(err);
                    res.status(401).json({
                        "data": "",
                        "message": "Invalid token",
                        "type": false

                    })
                }
                else{
                    if(!decoded._id){
                        console.log('Unauthorised');
                        res.status(401).json({
                            "data": "",
                            "message": "Unauthorised",
                            "type": false
                        })
                    }
                    else{
                        console.log('User id ' + decoded._id);
                        console.log('Authorised successfully');
                        const id = decoded._id;
                        User.findById(id)
                            .exec((err, user) => {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    let posts = user.posts;
                                    console.log('posts: ' + posts);
                                    res.status(200).json({
                                        "data": posts,
                                        "message": "Authorised",
                                        "type": true
                                    })
                                }
                            })
                    }
                }
            })
        }
    }
}

