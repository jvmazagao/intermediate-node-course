const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User')
const port = 8000;
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/userData')

app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users', (req, res) => { User.create({...req.body.newData}, (err, data) => sendResponse(res, err, data))});

app.route('/users/:id')
  .get((req, res) => { User.findById(req.params.id, (err, data) => sendResponse(res, err, data))})
  .put((req, res) => { User.findByIdAndUpdate(req.params.id, {...req.body.newData}, { new: true }, (err, data) => sendResponse(res, err, data))})
  .delete((req, res) => { User.findByIdAndDelete(req.params.id, (err, data) => sendResponse(res, err, data))});


const sendResponse = (res, err, data) => {
  if (err) {
    res.json({
      success: false,
      data: err
    })
  } else if (!data) {
    res.json({
      success: false, 
      data: err
    })
  } else {
    res.json({
      success: true, 
      data: data
    })
  }
}