const mongoose = require('mongoose');
const { Schema } = mongoose;

const answersSchema = new Schema ({
  question_id: Number,
  page: Number,
  count: Number,
  results: [{
    answer_id: Number,
    body: String,
    date: {type: Date, default: Date.now},
    answerer_name: String,
    helpfulness: Number,
    photos: []
  }]
}, {
  autoIndex: false
})

module.exports = mongoose.model('answers', answersSchema)