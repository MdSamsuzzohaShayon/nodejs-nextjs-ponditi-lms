/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { check } = require('express-validator');
const { addTuitionm, getAllTuitionms, deleteATuitionm } = require('../controllers/tuitionm.controller');

const { ensureAdmin } = require('../middleware/auth');
/**
 * @route add subject
 * Check admin before this
 * after adding subject make relationship with classtype
 */
router.post('/add', ensureAdmin, check('name').notEmpty(), addTuitionm);
/**
 * @route to get all subjects along with relational class type
 */
router.get('/all', getAllTuitionms);
/**
 * @route to delete a subject
 */
router.delete('/delete/:id', ensureAdmin, deleteATuitionm);

module.exports = router;
