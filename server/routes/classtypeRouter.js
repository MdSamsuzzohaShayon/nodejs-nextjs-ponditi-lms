/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { check } = require('express-validator');
const {
  addClassType,
  getAllClassWithSubjects,
  deleteAClassType,
} = require('../controllers/classtype.controller');

const {
  ensureGuest,
  ensureTeacher,
  ensureAdmin,
} = require('../middleware/auth');
/**
 * @route add class type
 * Check admin before this
 * Admin could add classes, subjects
 */
router.post('/add', ensureAdmin, check('name').notEmpty(), addClassType);

/**
 * @route to get all classes
 */
router.get('/all', getAllClassWithSubjects);
/**
 * @route to delete a class
 */
router.delete('/delete/:id', ensureAdmin, deleteAClassType);

module.exports = router;
