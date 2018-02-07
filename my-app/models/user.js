/**
 * Created by user on 20.07.17.
 */
var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);
