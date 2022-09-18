const { validationResult } = require("express-validator");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const jwt = require("jsonwebtoken");
const sendSMS = require("../utils/sendSMS");
// bcryptjs
const db = require("../models");
const { User } = db;

const { SUPER, TEACHER, STUDENT } = require("../config/keys.js");

const getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({ msg: "Getting all users", users });
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
      userExist = await User.findOne({ where: { email: req.body.email} });
    } else if (req.body.phone) {
      userExist = await User.findOne({ where: { phone: req.body.phone} });
    } else {
      return res.status(406).json({ msg: "Email and phone both can not be empty" });
    }

    // console.log({userExist});
    if (!userExist) return res.status(404).json({ msg: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(req.body.password, userExist.dataValues.password);
    if (!isPasswordCorrect) return res.status(406).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ email: userExist.dataValues.email, id: userExist.dataValues.id, role: userExist.dataValues.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // const newUser = {
    //   name: userExist.name,
    //   email: userExist.email,
    //   role: userExist.role,
    //   id: userExist.id,
    // };
    res.cookie("token", token);
    res.status(200).json({ msg: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

const verifyUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  const findByOtp = await User.findOne({ where: { otp: req.body.otp } });
  if (!findByOtp) return res.status(206).json({ msg: "Invalid OTP" });

  if (findByOtp.dataValues.otp !== req.body.otp) return res.status(206).json({ msg: "Invalid OTP" });
  const validateOtp = await User.update({ isActive: true }, { where: { id: findByOtp.dataValues.id } }); // isActive

  return res.status(200).json({ msg: "Validated otp successfully" });
};

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

  // WHETHER GENERAL OR STUFF USER CAN BE CREATED
  // if (req.body.role === STUFF) role = STUFF;
  // console.log(req.userId, req.userRole);

  try {
    // ONLY SUPER USER CAN CREATE A NEW USER
    const userEmailExist = await User.findOne({ where: { email: userObj.email } });
    const userPhoneExist = await User.findOne({ where: { phone: userObj.phone } });
    // console.log("Exist user - ", userEmailExist);
    if (userEmailExist !== null || userPhoneExist !== null) return res.status(208).json({ msg: "User already exists" });

    // Generate otp
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    userObj.otp = otp;
    userObj.isActive = false;

    // // console.log(password);
    userObj.password = await bcrypt.hash(userObj.password, 10);
    // console.log(userObj);
    // console.log("hashed password - ", hashedPassword);
    // console.log("User - ", user);
    
    try {
      await sendSMS(userObj.phone, `Your OTP code is: ${userObj.otp}`);
    } catch (smsErr) {
      return res.status(406).json({ msg: "Invalid phone number" });
    }

    await User.create(userObj);
    // console.log(sms);

    // const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    // // // console.log(token);

    res.status(201).json({
      msg: "Registered user successfully, an otp code is been sent to your mobile phone, use that code to verify your account",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong", error });
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
  if (!findByPhone) return res.status(406).json({ msg: "User is not registred with this phone number" });
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  const updateOtp = await User.update({ otp }, { where: { id: findByPhone.dataValues.id } }); // isActive
  const sms = await sendSMS(findByPhone.dataValues.phone, `Your OTP code is: ${otp}`);
  res.status(201).json({
    msg: "Updated OTP you should get new OTP via your phone",
  });
};

module.exports = { login, registerUser, verifyUser, resendOTP, getAllUsers };
