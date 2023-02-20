/**
 * @search teacher and students
 */
const router = require('express').Router();
const { searchTeacher } = require('../controllers/search.controller');
const { ensureStudent } = require('../middleware/auth');

router.get('/teacher', ensureStudent, searchTeacher);

module.exports = router;
