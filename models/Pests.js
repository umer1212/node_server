var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PestsSchema = new Schema({
	_id:mongoose.Schema.Types.ObjectId,
	pestName:{type:String,required:true},
	type:{type:String,required:true},
	scientificName:String,
	appearsIn:{type:[String],required:true},
	confirmDiagnosis:[String],
	preventiveMeasures:[String],
	pestImages:[String],
	memberName:[String]
});
module.exports = mongoose.model('Pests',PestsSchema);