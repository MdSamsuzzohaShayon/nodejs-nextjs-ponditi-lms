/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const db = require('../models');

const { scheduledClassStatus } = require('../config/keys');

const { Review, Customer, ScheduledClass } = db;
const { FINISH_CLASS } = scheduledClassStatus;
const leaveAReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }
  try {
    const reviewObj = Object.assign(req.body);
    reviewObj.publish = true;
    // finishclass
    // console.log(req.params.scheduledclassId);
    const findScheduledClass = await ScheduledClass.findOne({
      include: [{ model: Customer, as: 'Sender' }, { model: Customer, as: 'Recever' }, { model: Review }],
      where: { id: req.params.scheduledclassId, status: FINISH_CLASS },
    });
    if (!findScheduledClass) {
      return res.status(406).json({
        msg: 'No class found to reject or class may not finished yet',
      });
    }

    // Has already two review
    if (findScheduledClass.Reviews.length === 2) {
      return res.status(406).json({
        msg: 'This class already has two review',
      });
    }

    const reviewIds = [...findScheduledClass.Reviews.map((r) => r.id)];
    // Has one review but that review not on me
    // console.log(findScheduledClass.Reviews[0].dataValues.reviewerId, req.userId);
    if (findScheduledClass.Reviews.length === 1 && findScheduledClass.Reviews[0].dataValues.reviewerId === req.userId) {
      return res.status(406).json({
        msg: 'You already given the review',
      });
    }
    // tq3od@email.com

    if (req.userId === findScheduledClass.Sender.id) {
      const review = await Review.create(reviewObj);
      await Promise.all([review.setReviewer(findScheduledClass.Sender), review.setReviewtaker(findScheduledClass.Recever), review.setScheduledClass(findScheduledClass)]);
    } else if (req.userId === findScheduledClass.Recever.id) {
      const review = await Review.create(reviewObj);
      await Promise.all([review.setReviewer(findScheduledClass.Recever), review.setReviewtaker(findScheduledClass.Sender), review.setScheduledClass(findScheduledClass)]);
    } else {
      return res.status(406).json({
        msg: 'Your are not member of this class',
      });
    }

    // console.log(reviewIds.includes(findScheduledClass.Sender.id));
    // console.log(reviewIds.includes(findScheduledClass.Recever.id));

    return res.status(202).json({
      msg: 'Feedback has been given',
      reviewIds,
      findScheduledClass,
    });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'server error' });
};
module.exports = {
  leaveAReview,
};
