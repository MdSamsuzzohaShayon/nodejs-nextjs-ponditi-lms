/* eslint-disable global-require */
const router = require('express').Router();
const { check } = require('express-validator');
const {
  registerUser,
  rejectUser,
  acceptUser,
  verifyUser,
  resendOTP,
  getAllUsers,
  login,
  sendOTP,
  getSingleUser,
  updateUser,
  updatePersonalInfoUser,
  logout,
  notificationSeen,
  seedUsers,
  updateExamUser,
  updateImageUser,
  forgetPassword,
  resetPassword,
} = require('../controllers/user.controller');
const { changePassword } = require('../controllers/common.controller');
const { ensureAuth, ensureAdmin, ensureTeacher } = require('../middleware/auth');
// const { upload } = require('../config/s3-config');
const upload = require('../config/multer-config');


/**
 * @step 1 - regestration process
 * same step in case,  he has forgotten
 */
router.post('/sendotp', check('phone').notEmpty(), check('cc').notEmpty(), sendOTP);
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
  check('role').notEmpty().isString(),
  // check('email').isEmail().notEmpty(),
  check('gender').notEmpty().isString(),
  check('presentaddress').notEmpty().isString(),
  registerUser,
);

/**
 * @step 4 - regestration process
 */
router.put('/reject/:userId', ensureAdmin, rejectUser);
router.put('/accept/:userId', ensureAdmin, acceptUser);

router.put('/update/:id', ensureAuth, updateUser);
router.put('/updateexam/:id', ensureAuth, check('examlist').isArray(), updateExamUser);
router.put('/updateimage/:id', ensureAuth, upload.single('image'), updateImageUser);
router.put('/updatepersonalinfo/:id', ensureTeacher, upload.single('nid_proof'), updatePersonalInfoUser);

router.post('/login', check('phone').notEmpty().isString(), check('password').notEmpty().isLength({ min: 6 }), login);
router.post('/logout', logout);
router.post('/forgetpassword', forgetPassword);
router.put('/resetpassword', check('otp').notEmpty(), check('password').notEmpty().isLength({ min: 6 }), resetPassword);
router.put('/changepassword', ensureAuth, check('current').notEmpty(), check('password').notEmpty(), changePassword);

router.get('/all', ensureAdmin, getAllUsers);
router.get('/single/:id', getSingleUser);

// Notification seen // Something went wrong while updating database
router.put('/notification/seen', ensureAuth, notificationSeen);
// disable on production

router.post('/seed', seedUsers);

module.exports = router;
