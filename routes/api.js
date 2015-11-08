var express = require('express');
var router = express.Router();
var messageController = require('../controllers/message');

/**
 * API routers.
 */
// MESSAGE
// Get All
router.get('/message', messageController.getAll);
// Get By Id
router.get('/message/:id', messageController.getById);
// Message insert
router.post('/message', messageController.post);
// Message update
router.put('/message/:id', messageController.update);
// Message delete
router.delete('/message/:id', messageController.delete);

module.exports = router;
