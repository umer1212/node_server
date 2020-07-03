var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var DiseasesSchema = new Schema({
	_id:mongoose.Schema.Types.ObjectId,
	diseaseName:{type:String,required:true},
	description:String,
	symptoms:[String],
	diseaseImages:[String],
	cures:[{type:mongoose.Schema.Types.ObjectId,ref:'Cures'}],
	causedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'Pests',required:true}]
});
module.exports = mongoose.model('Diseases',DiseasesSchema);