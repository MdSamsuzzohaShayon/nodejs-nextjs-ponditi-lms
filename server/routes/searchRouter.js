/**
 * @search teacher and students
 */

const router = require('express').Router();
const { searchTeacher } = require('../controllers/search.controller');

router.get('/teacherstudent', searchTeacher);

module.exports = router;
