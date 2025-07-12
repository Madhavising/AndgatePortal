const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create_event', authMiddleware, eventController.createEvent);

module.exports = router;
