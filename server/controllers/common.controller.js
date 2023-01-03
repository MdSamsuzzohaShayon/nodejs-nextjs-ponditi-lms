const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const db = require('../models');

const { User } = db;

/**
 * @param {type} req current        Current password
 * @param {type} req password       New password
 * @returns response 202            Successfully set new password
 */
const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }
  try {
    const userExist = await User.findOne({ where: { id: req.userId } });
    if (!userExist) return res.status(404).json({ msg: 'Invalid credentials, please login again' });

    const isPasswordCorrect = await bcrypt.compare(req.body.current, userExist.dataValues.password);
    if (!isPasswordCorrect) {
      return res.status(406).json({ msg: 'Incorrect current password' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.update({ password: hashedPassword }, { where: { id: req.userId } });

    return res.status(202).json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.log(err);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

module.exports = {
  changePassword,
};
