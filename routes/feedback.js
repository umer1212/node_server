const express = require('express');
const mongoose = require('mongoose');
const FeedBack = require('../models/FeedBack');
const router = express.Router();
var cloudinary = require("cloudinary");
require("../config/cloudinaryConfig");
const upload = require("../config/multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/feedback')
    },
    filename: function (req, file, cb) {
      cb(null,  file.originalname)
    }
  });
var upload = multer({ storage: storage,limits:{fileSize:12582912} })

router.post("/", upload.single("profileImage"), setpermission, async function (
  req,
  res,
  next
){
	try{
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      console.log(result);
      if (result) {
        e.picturePath = result.url;
      }
    }
	}
	catch(e){
		res.status(500).json({
			'read':false,
			'err':e
		})
		console.log(e);
	}
});

router.post('/',(req,res,next)=>{
  console.log(req.body)
  var Fd = new FeedBack({
    _id:mongoose.Types.ObjectId(),
    Farmer:req.body.Farmer,
    DatePublished:req.body.DatePublished,
    Detected:req.body.Detected,
    ImageURL:req.body.ImageURL,
    FeedBack:req.body.FeedBack
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