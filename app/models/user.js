/*==================================
=            User Model            =
==================================*/

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    ResumeSchemas = require('./resume');

/*==========  User Schema  ==========*/
var userSchema = mongoose.Schema({
  profile: {
    name: String,
    imageUrl: String,
    Country: String
  },
  resume:  ResumeSchemas.ResumeDef,
  local: {
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  timestamps: {
    created: {type: Date, default: Date.now},
    loggedin: {type: Date, default: Date.now}
  }
});

/*==========  Methods  ==========*/

/* Generate Hash */
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/* Check if password is valid */
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

/* Export module */
module.exports = mongoose.model('User', userSchema);
