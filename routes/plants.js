var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Plants = require('../models/Plants');

router.post('/',(req,res,next)=>{
	console.log(req.body)
	var plant = new Plants({
		// _id:mongoose.Types.ObjectId(),
		plantName:req.body.name,
		description:req.body.description,
		plantImages:req.body.images,
		diseases:req.body.diseases
	});
	plant.save()
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>{
		res.status(500).json(err);
		console.log(err);
	});
});
router.get('/',(req,res,next)=>{
	Plants.find().populate('diseases causedBy','diseaseName symptoms pestName')
	.exec()
	.then(docs=>{
		res.status(200).json(docs);
	})
	.catch(err=>{
		res.status(500).json(err);
	});
});

router.get('/plantreport',(req,res,next)=>{
	const aggregatorOpts = [
		{
			$group: {
				_id: "$plantName",
				count: { $sum: 1 },
			},
		},
	];
	Plants.aggregate(aggregatorOpts)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
});
module.exports = router;
