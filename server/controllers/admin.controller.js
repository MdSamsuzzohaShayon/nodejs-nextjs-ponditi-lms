const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const cookieOptions = require('../config/cookie-config');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
// bcryptjs
const db = require('../models');

const { User, ClassType } = db;

const keys = require('../config/keys');

const { ADMIN, TEACHER } = keys.roles;

/**
 * @add admin
 * Disable this in production
 * Check admin before this
 */
const addAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(406)
      .json({ msg: 'Input validation error', error: errors.array() });
  }

  const userObj = Object.assign(req.body);
  userObj.role = ADMIN;

  try {
    // ONLY SUPER USER CAN CREATE A NEW USER
    const userEmailExist = await User.findOne({
      where: {
        [Op.or]: [{ email: userObj.email }, { phone: userObj.phone }],
      },
    });
    if (userEmailExist !== null) {
      return res.status(406).json({
        msg: 'User already exist with this email address or phone number, you can now login',
      });
    }
    userObj.isActive = true;
    userObj.password = await bcrypt.hash(userObj.password, 10);

    // create
    const newUser = await User.create(userObj);
    return res.status(201).json({
      msg: 'Registered admin successfully, Now you can login as admin',
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Something went wrong', error });
  }
};

/**
 * @login admin
 */
const loginAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  // const { email, password } = req.body;

  try {
    let userExist = null;
    if (req.body.email) {
      userExist = await User.findOne({ where: { email: req.body.email } });
    } else if (req.body.phone) {
      userExist = await User.findOne({ where: { phone: req.body.phone } });
    } else {
      return res
        .status(406)
        .json({ msg: 'Email and phone both can not be empty' });
    }

    // console.log({userExist});
    if (!userExist) return res.status(404).json({ msg: "User doesn't exist" });

    if (userExist.dataValues.role !== ADMIN) {
      return res.status(406).json({ msg: 'You are not teacher or admin' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userExist.dataValues.password,
    );
    if (!isPasswordCorrect) {
      return res.status(406).json({ msg: 'Invalid credentials' });
    }

    const userDetailResponse = {
      email: userExist.dataValues.email,
      id: userExist.dataValues.id,
      role: userExist.dataValues.role,
    };
    const token = jwt.sign(userDetailResponse, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('token', token, cookieOptions);
    res
      .status(200)
      .json({ msg: 'Logged in successfully', user: userDetailResponse });
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

module.exports = {
  addAdmin,
  loginAdmin,
};
