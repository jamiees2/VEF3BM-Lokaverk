var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResumeDef = {
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
}

var ResumeSchema = new Schema(ResumeDef);

module.exports.ResumeSchema = ResumeSchema;
module.exports.ResumeDef = ResumeDef;
// module.exports.ResumeModel = mongoose.model('Resume',ResumeSchema);