var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pests = require('../models/Pests');

router.post('/',(req,res,next)=>{
	const pests = new Pests({
		pestId:mongoose.Types.ObjectId(),
		pestName:req.body.Name,
		pestImages:req.body.Images,
		memberName:req.body.MemberName,
		type:req.body.Type,
		appearsIn:req.body.AppearsIn,
		scientificName:req.body.ScientificName,
		confirmDiagnosis:req.body.ConfirmDiagnosis,
		preventiveMeasures:req.body.PreventiveMeasures,
	});
	pests.save()
	.then(result=>{
		res.status(200).json({
			Message:"New pest information have been added",
			ID:result.pestId,
			Name:result.pestName,
			Request:{
				Type:'GET',
				Url:'http://localhost:3000/pests/'+result.pestId
			}
		});
	})
	.catch(err=>{
		res.status(500).json(err);
		console.log(err);
	});
});

router.get('/:name',(req,res,next)=>{
	Pests.findOne({pestName:req.params.name}).exec().then(doc=>{
		res.status(200).json({
			Id:doc.pestId,
			Name:doc.pestName,
			Type:doc.type,
			ScientificName:doc.scientificName,
			AppearsIn:doc.appearsIn,
			ConfirmDiagnosis:doc.confirmDiagnosis,
			PreventiveMeasures:doc.preventiveMeasures,
			Images:doc.pestImages,
			Members:doc.memberName
		});
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.get('/',(req,res,next)=>{
	Pests
	.find()
	.exec()
	.then(docs=>{
		res.status(200).json(docs);
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.get('/:ID',(req,res,next)=>{
	Pests.findOne({_id:req.params.ID}).exec().then(doc=>{
		res.status(200).json({
			Id:doc.pestId,
			Name:doc.pestName,
			Type:doc.type,
			ScientificName:doc.scientificName,
			AppearsIn:doc.appearsIn,
			ConfirmDiagnosis:doc.confirmDiagnosis,
			PreventiveMeasures:doc.preventiveMeasures,
			Images:doc.pestImages,
			Members:doc.memberName
		});
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.delete('/:ID',(req,res,next)=>{
	Pests.remove({_id:req.params.ID}).exec()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});
router.patch('/',(req,res,next)=>{
	
});
module.exports = router;