var Message = require('../models/message');

var action = {
  getAll: function(req, res, next) {
    Message.find({}, function(err, messages) {
      res.json(messages);
    });
  },
  getById: function(req, res, next) {
    Message.findOne({
      _id: req.params.id
    }, function(err, messages) {
      res.json(messages);
    })
  },
  post: function(req, res, next) {
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
  },
  update: function(req, res, next) {
    res.send('Update message');
  },
  delete: function(req, res, next) {
    Message.remove({
      _id: req.params.id
    }, function(err) {
      if (err) throw err;
      res.json({
        message: "Message deleted"
      });
    });
  }
};

module.exports = action;
