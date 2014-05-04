/*==================================
=            Application Model            =
==================================*/

var mongoose = require('mongoose');

/*==========  User Schema  ==========*/
var applicationSchema = mongoose.Schema({
  cover_letter: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  timestamps: {
    created: {type: Date, default: Date.now}
  }
});

/* Export module */
module.exports.Schema = applicationSchema
module.exports.Model = mongoose.model('Application', applicationSchema);
