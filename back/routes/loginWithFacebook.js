/**
 * Created by jull on 07.02.2018.
 */
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/loginWithFacebook', function(req, res){
   passport.authenticate('facebook', function(err, user, info){
      let token;
      // If Passport throws/catches an error
      if (err) {
         console.log('passport err:' + err);
         res.status(404).json(err);
         return;
      }
      // If a user is found
      if(user){
         token = user.generateJwt();
         // console.log('token:' + token);
         res.status(200);
         res.json({
            "token" : token
         });
      } else {
         // If user is not found
         res.status(401).json(info);
      }
   })(req, res);
})


module.exports = router;
