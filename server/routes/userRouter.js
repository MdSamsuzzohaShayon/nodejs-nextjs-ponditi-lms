const router = require('express').Router();
const { check } = require('express-validator');
const {
  registerUser,
  verifyUser,
  resendOTP,
  getAllUsers,
  login,
  sendOTP,
  getSingleUser,
  updateUser,
  logout,
} = require('../controllers/user.controller');
const { ensureAuth } = require('../middleware/auth');

router.put(
  '/register',
  check('firstname').notEmpty(),
  check('lastname').notEmpty(),
  check('phone').notEmpty(),
  check('email').isEmail().notEmpty(),
  check('age').notEmpty(),
  check('profession').notEmpty(),
  check('institution').notEmpty(),
  // check('subjects').notEmpty(), // In update section
  check('experience').notEmpty(),
  check('location').notEmpty(),
  check('password').notEmpty().isLength({ min: 6 }),
  // Relational
  // check('classTypeId').notEmpty(), // In update section
  // check('subjectId').notEmpty(), // In update section
  registerUser,
);

router.put('/update/:id', ensureAuth, updateUser);

router.post('/login', check('password').notEmpty().isLength({ min: 6 }), login);
router.post(
  '/sendotp',
  check('phone').notEmpty(),
  check('cc').notEmpty(),
  sendOTP,
);

router.put('/resendotp', check('phone').notEmpty(), resendOTP);
router.put(
  '/verifyotp',
  check('otp').notEmpty(),
  check('phone').notEmpty(),
  verifyUser,
);

router.post('/logout', logout);

router.get('/all', getAllUsers);
router.get('/single/:id', getSingleUser);

module.exports = router;
