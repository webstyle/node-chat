var express = require('express');
var router = express.Router();
var Message = require('../models/message');
/**
 * API routers.
 */
router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to NodeChat v1"
  });
});
// MESSAGE
// Get All
router.get('/message', function(req, res, next) {
  Message.find({}, function(err, messages) {
    res.json(messages);
  });
});

// Get By Id
router.get('/message/:id', function(req, res, next) {
  Message.findOne({
    _id: req.params.id
  }, function(err, messages) {
    res.json(messages);
  })
});

// Message insert
router.post('/message', function(req, res, next) {
  var timeNow = new Date();
  var message = new Message({
    content: req.body.content,
    date: timeNow,
    user: req.body.user
  });
  message.save(function(err) {
    if (err) throw err;
    res.json({
      message: "New message added"
    });
  });
});

// Message update
router.put('/message/:id', function(req, res, next) {
  res.send('Update message');
});

// Message delete
router.delete('/message/:id', function(req, res, next) {
  Message.remove({
    _id: req.params.id
  }, function(err) {
    if (err) throw err;
    res.json({
      message: "Message deleted"
    });
  });
});

module.exports = router;
