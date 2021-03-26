const mongoose = require('mongoose');
const Questions = require('./Questions')
const Answers = require('./Answers');
const express = require('express');

mongoose.connect('mongodb://localhost/qna', {useNewUrlParser: true, useUnifiedTopology: true})


var findQuestions = (productID, count, cb) => {
  console.log(typeof(count));
  Questions.find({ "product_id" : `${productID}`}, (err, questions) => {
  if (err) {
    cb(err, null);
  } else {
    cb(null, questions)
  }
  }
).limit(count ? Number(count) : 5).lean()}

var findAnswers = (questionID, count, cb) => {
  Answers.find({'question_id': `${questionID}`}, (err, answers) => {
  if (err) {
    cb(err, null);
  } else {
    cb(null, answers)
  }
  }
).limit(count ? Number(count) : 5).lean()}

var postQuestion = (productID, body, name, email, cb) => {
  Questions.create({"product_id": productID, "body": body, "name": name, "email": email}, (err, results) => {
    console.log(productID);
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}

module.exports = {
  findQuestions,
  findAnswers,
  postQuestion
}