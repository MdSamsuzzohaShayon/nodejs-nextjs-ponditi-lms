const { Op } = require('sequelize');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// bcryptjs
const db = require('../models');

const { ClassType, Subject } = db;

const keys = require('../config/keys');

const { ADMIN, TEACHER } = keys.roles;
/**
 * @add class type
 */
const addClassType = async (req, res, next) => {
  try {
    const { name } = req.body;
    const classTypeExist = await ClassType.findOne({ where: { name } });
    if (classTypeExist) {
      return res
        .status(406)
        .json({ msg: 'this class already exist in our database' });
    }

    const newClassType = await ClassType.create(req.body);
    return res
      .status(201)
      .json({ msg: 'Class created successfully', classType: newClassType });
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
