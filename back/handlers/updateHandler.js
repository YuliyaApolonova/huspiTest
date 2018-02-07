require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const url = require('url');

module.exports = {

    updatePost: (req, res) => {
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
                        let index = url.parse(req.url, true).query.index;
                        console.log('Index of post: ' + index);
                        let updatedPost = req.body;
                        console.log(updatedPost);

                        User.findById(id, function(err, doc){
                            if(err){
                                console.log(err);
                            }
                            else{
                                doc.posts[index].name = updatedPost.name;
                                doc.posts[index].dateNow = updatedPost.dateNow;
                                doc.markModified('posts');
                                doc.save(function(err, user){
                                    if(err){
                                        console.log(err);
                                        res.status(501).json({
                                            "data": "",
                                            "message": "Updating element failed",
                                            "type": false
                                        })
                                    }
                                    else{
                                        console.log(user);
                                        console.log('data updated successfully');
                                        res.status(200).json({
                                            "data": "",
                                            "message": "data updated successfully",
                                            "type": "true"
                                        })
                                    }
                                });
                            }
                        });

                    }
                }
            })
        }
    }
}
