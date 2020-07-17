const express = require('express');
const mongoose = require('mongoose');
const FeedBack = require('../models/FeedBack');
const router = express.Router();
const multer = require('multer');
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
  console.log(result)
  if(result){
    res.status(200).json({
      'read':true,
      'ImageURL':result.url
    });
  }
});

router.post('/',(req,res,next)=>{
  var Fd = new FeedBack({
    _id:mongoose.Types.ObjectId(),
    Farmer:req.body.Farmer,
    DatePublished:req.body.DatePublished,
    Detected:req.body.Detected,
    ImageURL:req.body.ImageURL,
    FeedBack:req.body.FeedBack,
    Prediction:req.body.Prediction

  }); 
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

module.exports = router;