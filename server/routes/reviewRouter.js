/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { check } = require('express-validator');
const { leaveAReview } = require('../controllers/review.controller');

const { ensureAuth } = require('../middleware/auth');
// Complete request
router.post('/leave/:scheduledclassId', ensureAuth, check('stars').notEmpty().isDecimal(), check('comment').notEmpty().isLength({ min: 10 }), leaveAReview);

// after completation

module.exports = router;
