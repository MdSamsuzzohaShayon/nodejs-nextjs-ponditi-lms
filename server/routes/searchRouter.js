/**
 * @search teacher and students
 */

const router = require('express').Router();
const { searchTeacher } = require('../controllers/search.controller');

router.get('/teachers', searchTeacher);

module.exports = router;
