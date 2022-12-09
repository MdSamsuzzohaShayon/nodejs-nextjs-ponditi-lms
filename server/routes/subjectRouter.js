/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { check } = require('express-validator');
const { addSubject, getAllSubjectsWithClassType, deleteASubject } = require('../controllers/subject.controller');

const { ensureGuest, ensureTeacher, ensureAdmin } = require('../middleware/auth');
/**
 * @route add subject
 * Check admin before this
 * after adding subject make relationship with classtype
 */
router.post('/add', ensureAdmin, check('name').notEmpty(), check('classTypeId').notEmpty(), addSubject);
/**
 * @route to get all subjects along with relational class type
 */
router.get('/all', getAllSubjectsWithClassType);
/**
 * @route to delete a subject
 */
router.delete('/delete/:id', ensureAdmin, deleteASubject);

module.exports = router;
