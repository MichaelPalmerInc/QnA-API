const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3001;
const queries = require('../db/Queries');
const bodyParser = require('body-parser');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB!')
});

//body parser
app.use(bodyParser.urlencoded({
  extended: true
}))
.use(bodyParser.json());

//routes

//get questions list
app.get('/questions', (req, res) => {
  console.log(req.query.count);
  queries.findQuestions(req.query.product_id, req.query.count, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(results);
    }
  })
})

//get answers list
app.get('/questions/:question_id/answers', (req, res) => {
  queries.findAnswers(req.params.question_id, req.query.count, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(results);
    }
  })
})

//post a questions
app.post('/qa/questions', (req, res) => {
  queries.postQuestion(req.body.product_id, req.body.body, req.body.name, req.body.email, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send();
    }
  })
})

app.listen(PORT, () => {
  console.log(`server is running and listening on port ${PORT}`);
});