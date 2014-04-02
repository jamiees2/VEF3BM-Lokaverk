var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResumeSchema = new Schema({
  dateCreated: {type:Date, 'default':Date.now},
  content: Object
});


module.exports.ResumeSchema = ResumeSchema;