const { addToWaitlist, getAllSubscribers, addSubscriber, getAllWaitlist, getAllPartner, addPartner } = require('../controllers/subscriber.controller.js');
const { body, check } = require('express-validator');
// const { upload } = require('../config/s3-config');
const upload = require('../config/multer-config');
const ensureAuth = require('../middleware/auth.js');


const router = require('express').Router();




router.get('/all', ensureAuth, getAllSubscribers);
router.get('/all-waitlist', ensureAuth, getAllWaitlist);
router.get('/all-partner', ensureAuth, getAllPartner);


router.post('/add-subscriber',
    body('email').isEmail(),
    addSubscriber);

router.post('/add-to-waitlist',
    upload.single('resume'),
    check('email').isEmail(),
    check('name').notEmpty().isLength({ min: 2 }).withMessage("Your name should more than 2 charecter long."),
    check('animation').notEmpty(),
    check('screen').notEmpty(),
    addToWaitlist);

router.post('/add-partner',
    check('firstName').notEmpty(),
    check('businessEmail').isEmail(),
    addPartner
);












module.exports = router;