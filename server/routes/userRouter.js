const router = require('express').Router();
const { check } = require('express-validator');
const { registerUser, verifyUser, resendOTP, getAllUsers, login} = require('../controllers/user.controller.js');
const ensureAuth = require('../middleware/auth.js');


router.post('/register',
    check('firstname').notEmpty(),
    check('lastname').notEmpty(),
    check('phone').notEmpty(),
    check('email').isEmail().notEmpty(),
    check('age').notEmpty(),
    check('profession').notEmpty(),
    check('institution').notEmpty(),
    check('subjects').notEmpty(),
    check('experience').notEmpty(),
    check('location').notEmpty(),
    check('password').notEmpty().isLength({ min: 6 }),
    registerUser);




router.post('/login',
    check('password').notEmpty().isLength({ min: 6 }),
    login);


router.put('/resendotp', check('phone').notEmpty(), resendOTP);
router.put('/verifyotp', check('otp').notEmpty(), verifyUser);


router.get('/all', getAllUsers);






module.exports = router;