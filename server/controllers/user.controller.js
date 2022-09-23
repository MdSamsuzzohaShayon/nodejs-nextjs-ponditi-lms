const { validationResult } = require('express-validator');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const jwt = require('jsonwebtoken');
const sendSMS = require('../utils/sendSMS');
// bcryptjs
const db = require('../models');

const { User } = db;

const keys = require('../config/keys.js');

const { SUPER, TEACHER, STUDENT } = keys.roles;

// Initialize
const sendOTP = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  const { phone, cc } = req.body;
  const phoneWithSufix = cc.substring(cc.length - 1) + phone;
  const phoneForMSG = cc + phone;

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const msg = await sendSMS(phoneForMSG, `Your OTP code is: ${otp}`);
  // console.log(msg);
  if (!msg) return res.status(406).json({ msg: 'Invalid phone number' });

  const findByPhone = await User.findOne({ where: { phone: phoneWithSufix } });
  if (findByPhone) {
    // update code from database
    await User.update({ otp }, { where: { id: findByPhone.dataValues.id } });
    return res.status(208).json({
      msg: 'User is already registred with this phone number, we are sending code once again',
    });
  }

  await User.create({
    phone: phoneWithSufix,
    cc,
    otp,
  });

  res.status(201).json({
    msg: 'If the number you is correct a verification OTP code will be sent there',
  });
};

const verifyUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  const findByPhone = await User.findOne({ where: { phone: req.body.phone } });
  if (!findByPhone) {
    return res
      .status(404)
      .json({ msg: 'No user found, register yourself first' });
  }

  if (findByPhone.dataValues.otp !== req.body.otp) {
    return res.status(406).json({ msg: 'Invalid OTP' });
  }
  await User.update(
    { isActive: true },
    { where: { id: findByPhone.dataValues.id } }
  ); // isActive

  return res.status(200).json({ msg: 'Validated OTP successfully' });
};

const getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({ msg: 'Getting all users', users });
};

const login = async (req, res, next) => {
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

    if (
      userExist.dataValues.role !== TEACHER
      || userExist.dataValues.role !== TEACHER
    ) {
      return res.status(406).json({ msg: 'You are not teacher or admin' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userExist.dataValues.password
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
    // const newUser = {
    //   name: userExist.name,
    //   email: userExist.email,
    //   role: userExist.role,
    //   id: userExist.id,
    // };
    res.cookie('token', token);
    res
      .status(200)
      .json({ msg: 'Logged in successfully', user: userDetailResponse });
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

const logout = async (req, res) => {
  const options = {
    maxAge: 0,
  };
  // if (process.env.NODE_ENV !== 'development') {
  //   options.sameSite = 'none';
  //   options.secure = true;
  // }
  res.cookie('token', '', options); // Remove cookie
  return res.status(200).json({ msg: 'Logout success' });
}


const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  const userObj = Object.assign(req.body);
  if (userObj.role === TEACHER) {
    userObj.role = TEACHER;
  } else {
    userObj.role = STUDENT;
  }

  if (userObj.classes) {
    userObj.classes = userObj.classes.toLowerCase();
  }

  try {
    const userFindByPhone = await User.findOne({
      where: { phone: userObj.phone },
    });
    if (userFindByPhone === null) {
      return res
        .status(404)
        .json({ msg: 'This phone number is not validated' });
    }
    if (userFindByPhone.dataValues.isActive === false) {
      return res
        .status(406)
        .json({ msg: 'Your phone number is not verified to register' });
    }

    // ONLY SUPER USER CAN CREATE A NEW USER
    const userEmailExist = await User.findOne({
      where: { email: userObj.email },
    });
    if (userEmailExist !== null) {
      return res.status(406).json({
        msg: 'User already exist with this email address, you can now login',
      });
    }
    userObj.isActive = false;
    userObj.password = await bcrypt.hash(userObj.password, 10);
    const result = await User.update(userObj, {
      where: { phone: req.body.phone },
    });

    res.status(201).json({
      msg: 'Registered user successfully, Now you can login',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong', error });
  }
};

const resendOTP = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }
  //   const result = await Waitlist.update(
  //     { resume: req.file.filename },
  //     { where: { id: waitlistExist.dataValues.id } }
  // );
  // resendotp
  const findByPhone = await User.findOne({ where: { phone: req.body.phone } });
  if (!findByPhone) {
    return res
      .status(406)
      .json({ msg: 'User is not registred with this phone number' });
  }
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const updateOtp = await User.update(
    { otp },
    { where: { id: findByPhone.dataValues.id } }
  ); // isActive
  const sms = await sendSMS(
    findByPhone.dataValues.phone,
    `Your OTP code is: ${otp}`
  );
  return res.status(201).json({
    msg: 'Updated OTP you should get new OTP via your phone',
  });
};

const updateUser = (req, res, next) => {};

module.exports = {
  login,
  registerUser,
  verifyUser,
  resendOTP,
  getAllUsers,
  sendOTP,
  updateUser,
  logout
};
