const express = require('express');
const mongoose = require('mongoose');
const FeedBack = require('../models/FeedBack');
const router = express.Router();
var cloudinary = require("cloudinary");
const upload = require("../config/multer");
require("../config/cloudinaryConfig");

var setpermission = function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};


router.post('/uploadPhoto',upload.single("photo"),setpermission,async function(
  req,
  res,
  next
){
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  
  if(result){
    res.status(200).json({
      'read':true,
      'ImageURL':result.url
    });
  }
});

router.post('/',upload.single("photo"), setpermission, async (req,res,next)=>{
  console.log(req.body)
  var Fd = new FeedBack({
    _id:mongoose.Types.ObjectId(),
    Farmer:req.body.Farmer,
    DatePublished:req.body.DatePublished,
    Detected:req.body.Detected,
    Prediction:req.body.Prediction,
    // ImageURL:req.body.ImageURL,
    FeedBack:req.body.FeedBack
  });
  console.log(req.file);
  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path)
  if(result){
      Fd.ImageURL = result.url
    }
  }
  Fd.save().then(result=>{
      res.status(200).json({
          'success':true,
          'result':result
      });
  }).catch(err=>{
      res.status(500).json({
          'success':false,
          'err':err
      });
  });
});

router.get('/',(req,res,next)=>{
    FeedBack.find().exec().then(results=>{
        res.status(200).json({
            'success':true,
            'results':results
        });
    }).catch(err=>{
        res.status(500).json({
            'success':false,
            'err':err
        });
    });
});

router.get('/plantreport',(req,res,next)=>{
	const aggregatorOpts = [
		{
			$group: {
				_id: "$Prediction",
				count: { $sum: 1 },
			},
		},
	];
	FeedBack.aggregate(aggregatorOpts)
		.exec()
		.then((food) => res.json(food))
		.catch((err) => next(err));
});

module.exports = router;
