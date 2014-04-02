var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResumeSchema = new Schema({
  dateCreated: {type:Date, 'default':Date.now},
  text: String
});


module.exports.ResumeSchema = ResumeSchema;