/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { check } = require('express-validator');
const {
  initiateScheduledClass,
  getAllScheduledClass,
  getAllScheduledClassofAMember,
  acceptRequestedScheduledClass,
  rejectRequestedScheduledClass,
  getSingleScheduledClass,
  startScheduledClass,
  completeRequestedScheduledClass,
  updateScheduledClass,
} = require('../controllers/scheduledclass.controller');

const { ensureAuth, ensureStudent, ensureAdmin, ensureTeacher } = require('../middleware/auth');

/** *
 * @route to get server timezone
 */
/**
 * @route add class type
 * Teacher and student both can initiate scheduled class
 */
router.post(
  '/initiate',
  ensureAuth,
  //   check('senderId').notEmpty().isDecimal(), // get from jwt token
  check('receiverId').notEmpty().isDecimal(),
  check('ClassTypeId').notEmpty().isDecimal(),
  check('SubjectId').notEmpty().isDecimal(),
  check('start').notEmpty().isISO8601().toDate(),
  check('tutionplace').notEmpty().isString(),
  // check('hours').notEmpty().isDecimal(),
  initiateScheduledClass
);

router.get('/all', getAllScheduledClass);
router.get('/single/:scheduledclassId', ensureAuth, getSingleScheduledClass);
router.get('/member/:memberId', ensureAuth, getAllScheduledClassofAMember);
router.put('/accept/:scheduledclassId', ensureTeacher, acceptRequestedScheduledClass);
router.put('/reject/:scheduledclassId', ensureTeacher, rejectRequestedScheduledClass);

router.put('/start/:scheduledclassId', ensureTeacher, startScheduledClass);

router.put('/update/:scheduledclassId', ensureAuth, check('meetlink').notEmpty().isURL(), updateScheduledClass);

// Complete request
router.put(
  '/finishclass/:scheduledclassId',
  ensureTeacher,
  // check('stars').notEmpty().isDecimal(),
  // check('comment').notEmpty().isLength({ min: 10 }),
  completeRequestedScheduledClass,
);

// after completation

module.exports = router;
