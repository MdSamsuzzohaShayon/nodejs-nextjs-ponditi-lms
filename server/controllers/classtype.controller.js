const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// bcryptjs
const db = require('../models');

const { ClassType, Subject, Tuitionm } = db;

const keys = require('../config/keys');

const { ADMIN, TEACHER } = keys.roles;
/**
 * @add class type
 */
const addClassType = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }
  const { name, subjectId, tuitionmId } = req.body;

  // console.log(name, subjectId);
  // console.log("Req made");

  try {
    const newName = name.toUpperCase();
    const classTypeExist = await ClassType.findOne({
      where: { name: newName },
    });
    if (classTypeExist) {
      return res.status(406).json({ msg: 'this classtype already exist in our database' });
    }

    const newClassType = await ClassType.create({ name: newName });
    if (subjectId && subjectId.length > 0) {
      const findAllSubject = await Subject.findAll({
        where: { id: subjectId },
      });
      if (findAllSubject.length > 0) {
        // set classes in subjects
        await newClassType.setSubjects(findAllSubject); // working
      }
    }
    if (tuitionmId && tuitionmId.length > 0) {
      const findAllTuitionm = await Tuitionm.findAll({
        where: { id: tuitionmId },
      });
      if (findAllTuitionm.length > 0) {
        // set classes in subjects
        await newClassType.setTuitionms(findAllTuitionm); // working
      }
    }

    return res.status(201).json({ msg: 'ClassType created successfully', classType: newClassType });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

// get all classtypes
const getAllClassWithSubjects = async (req, res) => {
  try {
    const classTypes = await ClassType.findAll({
      include: [
        {
          model: Subject,
          attributes: ['id', 'name'],
          // through: { where: { amount: 10 } }
        },
        {
          model: Tuitionm,
          attributes: ['id', 'name'],
          // through: { where: { amount: 10 } }
        },
      ],
    });
    return res.status(200).json({ classTypes });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'Something went wrong' });
};
const deleteAClassType = async (req, res) => {
  const { id } = req.params;

  try {
    await ClassType.destroy({
      where: {
        id,
      },
      force: true,
    });
    return res.status(200).json({ msg: 'Deleted a class' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

module.exports = {
  addClassType,
  getAllClassWithSubjects,
  deleteAClassType,
};
