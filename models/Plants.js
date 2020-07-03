var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PlantsSchema = new Schema({
	// _id:mongoose.Schema.Types.ObjectId,
	plantName:{type:String,default:"",required:true},
	description:String,
	plantImages:[String],
	diseases:[{type:mongoose.Schema.Types.ObjectId,ref:'Diseases',required:true}]
});
module.exports = mongoose.model('Plants',PlantsSchema);
