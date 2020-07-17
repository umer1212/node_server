const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const multer = require('multer')
// const upload = multer({dest:'uploads/'})
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
    // console.log('Destination Set');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString());
    // console.log(Date.now());
  }
});
 
var uploadimage = multer({ storage: storage});

//,limits: { fieldSize: 25 * 1024 * 1024 }
router.post('/signup',async (req,res)=>{
  console.log(req.body)
   
    const {email,password,address,phone} = req.body;

    try{
      const user = new User({email,password,address,phone});
      await  user.save();
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})

    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
});

router.post('/upload',uploadimage.single('photo'),(req,res,next)=>{
  // console.log(req.file);
  console.log('Accessed');
  res.status(200).json({
      message:'Image Saved Succesfully'
  })
});

router.get('/upload',(req,res,next)=>{
  res.status(200).json({
    message:'Accessed'
  });
});
router.post('/signin',async(req,res,next)=>{

  console.log(req.body);
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error :"must provide email or password"})
    }
    try{
      await user.comparePassword(password);    
      const token = jwt.sign({userId:user._id},jwtkey)
      console.log('Response Send');
      res.status(200).send({token});
    }catch(err){
        return res.status(422).send({error :"must provide email or password"})
    }
    
  

})


module.exports = router