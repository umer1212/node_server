var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Diseases = require('../models/Diseases');
var Cures = require('../models/Cures');
var Pests = require('../models/Pests');

router.post('/',(req,res,next)=>{
	var disease = new Diseases({
		diseaseId:mongoose.Types.ObjectId(),
		diseaseName:req.body.Name,
		description:req.body.Description,
		symptoms:req.body.Symptoms,
		diseaseImages:req.body.Images,
		cures:req.body.Cures,
		causedBy:req.body.CausedBy
	});
	disease.save()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(500).json(result);
	});
});
router.get('/',(req,res,next)=>{
	Diseases.find()
	.populate('causedBy','_id pestName type')
	.exec()
	.then(docs=>{
		// res.status(200).json(docs);
		res.status(200).json({
			count:docs.length,
			DiseasesFound:docs.map(doc=>{
				return{
					ID:doc._id,
					Name:doc.name,
					Description:doc.description,
					Symptoms:doc.symptoms,
					Images:doc.images,
					Request:{
						Type:'GET',
						Url:'http:localhost:3000/diseases/'+doc._id
					},
					CausedBy:causedBy
				}
			})
		});
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.delete('/:ID',(req,res,next)=>{
	Diseases.remove({diseaseId:req.params.ID}).exec()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.put('/',(req,res,next)=>{

});
module.exports = router;