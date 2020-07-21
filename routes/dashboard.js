var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Plant = require("../models/Plants");
var Disease = require("../models/Diseases");
var Pest = require("../models/Pests");
var Feedback = require("../models/FeedBack");

var setpermission = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

router.get("/getStats", setpermission, async function (req, res, next) {
  var plantCount = 0;
  var pestCount = 0;
  var diseaseCount = 0;
  var feedbackCount = 0;

  await Plant.count({}, function (err, result) {
    if (err) {
      console.log(err);
      return next(err);
    }
    plantCount = result;
  });

  await Pest.count({}, function (err, result) {
    if (err) {
      console.log(err);
      return next(err);
    }
    pestCount = result;
  });

  await Disease.count({}, function (err, result) {
    if (err) {
      console.log(err);
      return next(err);
    }
    diseaseCount = result;
  });

  await Feedback.count({}, function (err, result) {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log(result);
    feedbackCount = result;
  });

  res.status(200).json({
    plants: plantCount,
    pests: pestCount,
    diseasees: diseaseCount,
    feedbacks: feedbackCount,
  });
});

module.exports = router;
