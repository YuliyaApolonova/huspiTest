require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const url = require('url');

module.exports = {

    removePost: (req, res) => {
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
                        User.findOne({'_id' : id}, function(err, doc){
                            for(var i=0; i<=doc.posts.length; i++){
                                if (i==index){
                                    doc.posts.splice(index, 1);
                                    break;
                                }
                            }
                            doc.save(function(err, user){
                                if(err){
                                    console.log(err);
                                                res.status(501).json({
                                                    "data": "",
                                                    "message": "Deleting element failed",
                                                    "type": false
                                                })
                                }
                                else{
                                    res.status(200).json({
                                                        "data": "",
                                                        "message": "data deleted successfully",
                                                        "type": "true"
                                                    })
                                }
                            });
                        });

                    }
                }
            })
        }
    }
}
