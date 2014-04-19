/*==================================
=            User Model            =
==================================*/

var mongoose = require('mongoose');

/*==========  User Schema  ==========*/
var jobSchema = mongoose.Schema({
  title: String,
  company: {
    name: String
  },
  description: {
    short: String,
    long: String
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  timestamps: {
    created: {type: Date, default: Date.now}
  }
});

/* Export module */
module.exports = mongoose.model('Job', jobSchema);
