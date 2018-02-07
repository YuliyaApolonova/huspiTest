require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports = {
    addPost: (req, res) => {
        console.log('response from /add');
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
                                "type": false,
                            "message": "Unauthorised",
                        })
                    }
                    else{
                        console.log('User id ' + decoded._id);
                        console.log('Authorised successfully');
                        const id = decoded._id;
                        let newPost = req.body;
                        console.log(newPost);
                        User.findByIdAndUpdate(
                            id,
                            {$push:
                                {"posts":
                                    {
                                        dateNow: newPost.dateNow,
                                        dateNow: newPost.name
                                    }
                                }
                            },
                            {new: true},
                            function(err, model){
                                if(err){
                                    console.log(err);
                                    res.status(501).json({
                                        "data": "",
                                        "message": "Creating new element failed",
                                        "type": false
                                    })
                                }
                                else{
                                    res.status(200).json({
                                        "data": newPost,
                                        "message": "data saved successfully",
                                        "type": "true"
                                    })
                                }
                            }
                        )
                    }
                }
            })
        }
    }
}
