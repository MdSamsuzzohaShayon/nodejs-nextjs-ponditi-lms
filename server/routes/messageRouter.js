/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { check } = require('express-validator');

const { ensureAuth } = require('../middleware/auth');
const { getAllMessageOfARoom, getAllRoomsOfAUser } = require('../controllers/message.controller');

// Get all message of a room
router.get('/all', ensureAuth, getAllMessageOfARoom);

// Get all message of a room
router.get('/rooms', ensureAuth, getAllRoomsOfAUser);

// after completation

module.exports = router;
