// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// bcryptjs
const db = require('../models');

const { ClassType, Tuitionm, User } = db;

/**
 * @add class type
 */
const addTuitionm = async (req, res) => {
  // console.log(name, subjectId);
  // console.log("Req made");

  try {
    const newName = req.body.name.toUpperCase();
    const tuitionmExist = await Tuitionm.findOne({
      where: { name: newName },
    });
    if (tuitionmExist) {
      return res.status(406).json({ msg: 'this tuitionm already exist in our database' });
    }

    const newTuitionm = await Tuitionm.create({ name: newName });
    if (req.body.ClassTypeId && req.body.ClassTypeId.length > 0) {
      const findAllClasstype = await ClassType.findAll({ where: { id: req.body.ClassTypeId } });
      if (findAllClasstype.length > 0) {
        // set classes in subjects
        await newTuitionm.setClassTypes(findAllClasstype); // working
      }
    }

    return res.status(201).json({ msg: 'Tuitionm created successfully', tuitionm: newTuitionm });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

// get all classtypes
const getAllTuitionms = async (req, res) => {
  try {
    const tuitionms = await Tuitionm.findAll({
      include: [
        {
          model: ClassType,
          attributes: ['id', 'name'],
          // through: { where: { amount: 10 } }
        },
        {
          model: User,
          attributes: ['id', 'name'],
          // through: { where: { amount: 10 } }
        },
      ],
    });
    return res.status(200).json({ tuitionms });
  } catch (error) {
    console.log(error);
  }

  return res.status(500).json({ msg: 'Something went wrong' });
};

const deleteATuitionm = async (req, res) => {
  const { id } = req.params;

  try {
    await Tuitionm.destroy({
      where: {
        id,
      },
      force: true,
    });
    return res.status(200).json({ msg: 'Deleted a tuitionm' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

module.exports = {
  addTuitionm,
  getAllTuitionms,
  deleteATuitionm,
};
