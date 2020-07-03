var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({
    destination: '/uploads',
});
var router = express.Router();
var Schema = mongoose.Schema;
var md5 = require('md5');


var Expert = require('../models/Expert');


var setpermission = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}



router.get('/', setpermission, function (req, res, next) {
    Expert.find().sort('expertId').exec(function (error, result) {
        if (error) {
            return error;
        }
        res.json(result);
    });
});

router.post('/add', upload.single('profileImage'), setpermission, function (req, res, next) {

    e = new Expert();

    e.expertId = req.body.expertId;
    e.name = req.body.name;
    e.email = req.body.email;
    e.dob = req.body.dob;
    e.username = req.body.username;
    e.password = md5(req.body.password);
    e.address = req.body.address;
    e.rating = req.body.rating;
    e.picturePath = req.file.filename;

    e.save(function (error, results) {
        if (error) {
            return next(error);
        }
        res.json({
            'status': 1,
            'message': 'Expert Added Successfully'
        });
    });
});

router.put('/edit', upload.single('profileImage'), setpermission, function (req, res, next) {
    var objForUpdate = {};

    if (req.body.name) objForUpdate.name = req.body.name;
    if (req.body.email) objForUpdate.email = req.body.email;
    if (req.body.dob) objForUpdate.dob = req.body.dob;
    if (req.body.password) objForUpdate.password = md5(req.body.password);
    if (req.body.rating) objForUpdate.rating = req.body.rating;
    if (req.body.profileImage) objForUpdate.profileImage = req.body.profileImage;
    if (req.body.address) objForUpdate.address = req.body.address;

    Expert.findOneAndUpdate({
            username: req.body.username
        },
        objForUpdate,
        function (error, results) {
            if (error) {
                return next(error);
            }
            res.json({
                'status': 1,
                'message': 'Expert Updated Successfully',
                'object': results
            });
        });
});

router.delete('/delete/:username', setpermission, function (req, res, next) {
    var username = req.params.username;
    Expert.deleteOne({
        username: username
    }, function (error, results) {
        if (error) {
            return next(error);
        }
        if (results.deletedCount > 0) {
            res.json({
                status: 1,
                message: 'Expert Deleted Successfully'
            });
        }else{
            res.status(404).json({
                status: 0,
                message: 'Expert Not Found'
            });
        }
    });
});

router.get('/view/:name', setpermission, function (req, res, next) {
    var name = req.params.name;
    Expert.findOne({
        username: name
    }).populate('Expert').exec(function (error, results) {
        if (error) {
            return next(error);
        }

        if (!results) {
            res.status(404).send('No Record Found');
        } else {
            res.json(results);
        }
    });
});


router.post('/login', setpermission, function (req, res, next) {
    var email = req.body.username;
    var password = md5(req.body.password);

    console.log(password);

    Expert.findOne({
        email: email
    }).populate('Expert').exec(function (error, results) {
        if (error) {
            return next(error);
        }
        if (!results) {
            res.status(404).json({
                'status': 0,
                'message': 'Username Not Found'
            });
        } else {
            // res.json(results);
            if (password === results.password) {
                res.json({
                    'status': 1,
                    'message': 'Login Successful',
                });
            } else {
                res.json({
                    'status': 0,
                    'message': 'Incorrect Password'
                });
            }
        }
    });
});


module.exports = router;