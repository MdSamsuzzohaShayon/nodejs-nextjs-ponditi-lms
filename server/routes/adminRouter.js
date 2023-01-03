const router = require('express').Router();
const { check } = require('express-validator');
const { addAdmin, loginAdmin } = require('../controllers/admin.controller');
const { ensureAuth } = require('../middleware/auth');
const { changePassword } = require('../controllers/common.controller');

// const { ensureGuest, ensureTeacher, ensureAdmin } = require('../middleware/auth');
/**
 * @route
 * Register an admin, later for production this route will be disabled
 */
router.post(
  '/add',
  check('name').notEmpty(),
  check('phone').notEmpty(),
  check('email').isEmail().notEmpty(),
  check('age').notEmpty(),
  check('profession').notEmpty(),
  check('institution').notEmpty(),
  check('experience').notEmpty(),
  check('location').notEmpty(),
  check('password').notEmpty().isLength({ min: 6 }),
  addAdmin
);

/**
 * @route
 * Login as admin
 */
router.post('/login', check('password').notEmpty(), loginAdmin);
router.put('/changepassword', ensureAuth, check('current').notEmpty(), check('password').notEmpty(), changePassword);
// make relationship with class and subjects [many-to-many]

// make relationship with admin and subjects [one-to-many ]

module.exports = router;
