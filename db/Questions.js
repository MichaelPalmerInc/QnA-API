const mongoose = require('mongoose');
const { Schema } = mongoose;


const questionsSchema = new Schema({
  product_id: Number,
  results: {
      question_id: Number,
      question_body: String,
      question_date: {type: Date, default: Date.now},
      asker_name: String,
      question_helpfulness: Number,
      reported: Boolean,
      answers: {
        id: Number,
        body: String,
        date: {type: Date, default: Date.now},
        answerer_name: String,
        helpfulness: Number,
        photos: []
      }
  }
})



module.exports = mongoose.model('questions', questionsSchema)