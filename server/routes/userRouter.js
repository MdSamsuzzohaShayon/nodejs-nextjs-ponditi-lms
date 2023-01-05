/* eslint-disable global-require */
const router = require('express').Router();
const { check } = require('express-validator');
const {
  registerUser,
  rejectUser,
  acceptUser,
  verifyUser,
  resendOTP,
  getAllUsersTemp,
  getAllUsers,
  login,
  sendOTP,
  getSingleUser,
  updateUser,
  logout,
  notificationSeen,
  seedUsers,
  updateExamUser,
  updateImageUser,
  forgetPassword,
  resetPassword,
} = require('../controllers/user.controller');
const { changePassword } = require('../controllers/common.controller');
const { ensureAuth, ensureAdmin } = require('../middleware/auth');

const { upload } = require('../config/s3-config');
// if (process.env.NODE_ENV === 'development') {
//   upload = require('../config/multer-config');
// } else {
//   upload = require('../config/s3-config')(upload);
// }

/**
 * @openapi
 * /api/user/sendotp:
 *   get:
 *     description: Official documentation of ponditi API
 *     responses:
 *       200:
 *         description: Just for testing perpuse that API is working or not
 *       406:
 *         description: Not acceptable
 */
router.post('/sendotp', check('phone').notEmpty(), check('cc').notEmpty(), sendOTP);

/**
 * @step 1 - regestration process
 * same step in case,  he has forgotten
 */
router.put('/resendotp', check('phone').notEmpty(), resendOTP);

/**
 * @step 2 - regestration process
 */
router.put('/verifyotp', check('otp').notEmpty(), check('phone').notEmpty(), verifyUser);

/**
 * @step 3 - regestration process
 */
router.put(
  '/register/:userId',
  check('name').notEmpty().isString().isLength({ min: 2 }),
  // check('phone').notEmpty().isString(),
  check('role').notEmpty().isString(),
  check('email').isEmail().notEmpty(),
  // check('age').notEmpty(),
  // check('profession').notEmpty().isString(),
  // check('institution').notEmpty().isString(),
  // check('subjects').notEmpty(), // In update section
  // check('experience').notEmpty(),
  check('presentaddress').notEmpty().isString(),
  // check('district').notEmpty().isString(),
  // check('password').notEmpty().isLength({ min: 6 }),
  // Relational
  // check('classTypeId').notEmpty(), // In update section
  // check('subjectId').notEmpty(), // In update section
  registerUser
);

/**
 * @step 4 - regestration process
 */
router.put('/reject/:userId', ensureAdmin, rejectUser);
router.put('/accept/:userId', ensureAdmin, acceptUser);

router.put('/update/:id', ensureAuth, updateUser);
router.put('/updateexam/:id', ensureAuth, check('examlist').isArray(), updateExamUser);
router.put('/updateimage/:id', ensureAuth, upload.single('image'), updateImageUser);

router.post('/login', check('phone').notEmpty().isString(), check('password').notEmpty().isLength({ min: 6 }), login);
router.post('/logout', logout);
router.post('/forgetpassword', forgetPassword);
router.put('/resetpassword', check('otp').notEmpty(), check('password').notEmpty().isLength({ min: 6 }), resetPassword);
router.put('/changepassword', ensureAuth, check('current').notEmpty(), check('password').notEmpty(), changePassword);

router.get('/all', ensureAdmin, getAllUsers);
router.get('/single/:id', getSingleUser);

// Notification seen
router.put('/notification/seen', ensureAuth, notificationSeen);
// disable on production
router.get('/temp/all', getAllUsersTemp);
router.post('/seed', seedUsers);

module.exports = router;
