var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResumeSchema = new Schema({
	dateCreated: {type:Date, 'default':Date.now},
	additional: String,
	address: String,
	degrees: Array,
	email: String,
	experience: Array,
	name: String,
	phone: String,
	references: Array,
	title: String
});


module.exports.ResumeSchema = ResumeSchema;
module.exports.ResumeModel = mongoose.model('Resume',ResumeSchema);