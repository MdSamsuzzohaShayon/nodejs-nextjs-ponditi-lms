const router = require('express').Router();
const { check } = require('express-validator');
const {
  addAdmin,
  addClassType,
  addSubject,
  loginAdmin,
} = require('../controllers/admin.controller');

const {
  ensureGuest,
  ensureTeacher,
  ensureAdmin,
} = require('../middleware/auth');
/**
 * @route
 * Register an admin, later for production this route will be disabled
 */
router.post(
  '/add',
  ensureGuest,
  check('firstname').notEmpty(),
  check('lastname').notEmpty(),
  check('phone').notEmpty(),
  check('email').isEmail().notEmpty(),
  check('age').notEmpty(),
  check('profession').notEmpty(),
  check('institution').notEmpty(),
  check('experience').notEmpty(),
  check('location').notEmpty(),
  check('password').notEmpty().isLength({ min: 6 }),
  addAdmin,
);

/**
 * @route
 * Login as admin
 */
router.post('/login', ensureGuest, check('password').notEmpty(), loginAdmin);


// make relationship with class and subjects [many-to-many]

// make relationship with admin and subjects [one-to-many ]

module.exports = router;
