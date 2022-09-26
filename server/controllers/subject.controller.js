const { Op } = require('sequelize');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// bcryptjs
const db = require('../models');

const { Subject, ClassType } = db;

const keys = require('../config/keys');

const { ADMIN, TEACHER } = keys.roles;

/**
 * @add subject with relation of classtype
 */
const addSubject = async (req, res) => {
  const { name, classTypeId } = req.body;

  try {
    const newName = name.toUpperCase();
    const subjectExist = await Subject.findOne({ where: { name: newName } });
    if (subjectExist) {
      return res
        .status(406)
        .json({ msg: 'this subject already exist in our database' });
    }

    const newSubject = await Subject.create({ name: newName });
    if (classTypeId && classTypeId.length > 0) {
      const findAllClassType = await ClassType.findAll({
        where: { id: classTypeId },
      });
      if (findAllClassType.length > 0) {
        // set classes in subjects
        await newSubject.setClassTypes(findAllClassType); // working
      }
    }
    // await Promise.all([findClassType, newSubject]);
    // console.log(newSubject);

    return res
      .status(201)
      .json({ msg: 'Subject created successfully', subject: newSubject });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

const getAllSubjectsWithClassType = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      include: [
        {
          model: ClassType,
          attributes: ['id', 'name'],
          // through: { where: { amount: 10 } }
        },
      ],
    });
    return res.status(200).json({ subjects });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'Something went wrong' });
};
const deleteASubject = async (req, res) => {
  const { id } = req.params;

  try {
    await Subject.destroy({
      where: {
        id,
      },
      force: true,
    });
    return res.status(200).json({ msg: 'Deleted a subject' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

module.exports = {
  addSubject,
  getAllSubjectsWithClassType,
  deleteASubject,
};
