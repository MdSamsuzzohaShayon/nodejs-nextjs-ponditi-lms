/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { check } = require('express-validator');

const { ensureAuth } = require('../middleware/auth');
const { getAllMessageOfARoom, getAllRoomsOfAUser, getAllUnseenMessageOfARoom, seenAllMessageOfARoom } = require('../controllers/message.controller');

// Get all message of a room
router.get('/all', ensureAuth, getAllMessageOfARoom);

// Get all unseen messages of a room
router.get('/all/unseen', ensureAuth, getAllUnseenMessageOfARoom);

// Get all unseen messages of a room
router.put('/seen', ensureAuth, seenAllMessageOfARoom);

// Get all message of a room
router.get('/rooms', ensureAuth, getAllRoomsOfAUser);

// after completation

module.exports = router;
