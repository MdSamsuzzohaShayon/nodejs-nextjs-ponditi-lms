const { validationResult } = require('express-validator');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const jwt = require('jsonwebtoken');
const sendSMS = require('../utils/sendSMS');
// bcryptjs
const db = require('../models');
const keys = require('../config/keys');

const {
 User, ClassType, Subject, Notification 
} = db;
const { ADMIN, TEACHER, STUDENT } = keys.roles;
const { PENDING, APPROVED, REJECTED } = keys.scheduledClassStatus;

// Initialize
const sendOTP = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  try {
    const { phone, cc } = req.body;
    const phoneWithSufix = cc.substring(cc.length - 1) + phone;
    const phoneForMSG = cc + phone;
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const msg = await sendSMS(phoneForMSG, `Your OTP code is: ${otp}`);
    // console.log(msg);
    if (!msg) return res.status(406).json({ msg: 'Invalid phone number' });

    const findByPhone = await User.findOne({
      where: { phone: phoneWithSufix },
    });
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
      isActive: PENDING,
    });

    return res.status(201).json({
      msg: 'If the number you is correct a verification OTP code will be sent there',
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'server error' });
};

const verifyUser = async (req, res) => {
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

  if (findByPhone.dataValues.isVerified === true) {
    return res.status(406).json({ msg: 'You already verified your otp' });
  }

  if (findByPhone.dataValues.otp !== req.body.otp) {
    return res.status(406).json({ msg: 'Invalid OTP' });
  }
  await User.update(
    { isVerified: true, otp: null },
    { where: { id: findByPhone.dataValues.id } },
  ); // isActive

  return res.status(200).json({ msg: 'Validated OTP successfully' });
};

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  const userObj = Object.assign(req.body);
  if (userObj.isActive) {
    return res
      .status(406)
      .json({ msg: 'You can not change your active status' });
  }
  if (userObj.role === TEACHER) {
    userObj.role = TEACHER;
  } else {
    userObj.role = STUDENT;
  }

  if (userObj.cgpa) {
    userObj.cgpa = parseFloat(userObj.cgpa);
  }

  if (userObj.classes) {
    userObj.classes = userObj.classes.toLowerCase();
  }

  // handle classtype id and subject id (relationship)

  try {
    const userFindByPhone = await User.findOne({
      where: { phone: userObj.phone },
    });
    if (userFindByPhone === null) {
      return res
        .status(404)
        .json({ msg: 'This phone number is not validated' });
    }
    if (userFindByPhone.dataValues.isVerified === false) {
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
    // userObj.isActive = false;
    userObj.password = await bcrypt.hash(userObj.password, 10);
    const result = await User.update(userObj, {
      where: { phone: req.body.phone },
    });
    return res.status(201).json({
      msg: 'Registered user successfully, Now you can login',
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

const rejectUser = async (req, res) => {
  try {
    const findByPhone = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!findByPhone) {
      return res
        .status(404)
        .json({ msg: 'No user found, register yourself first' });
    }
    if (findByPhone.dataValues.role === ADMIN) {
      return res
        .status(404)
        .json({ msg: 'You can not change admin active status' });
    }

    if (findByPhone.dataValues.isVerified !== true) {
      return res.status(406).json({ msg: 'User is not verified' });
    }

    await User.update(
      { isActive: REJECTED },
      { where: { id: findByPhone.dataValues.id } }
    ); // isActive

    return res.status(202).json({ msg: 'Rejected user' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Server error' });
};

const acceptUser = async (req, res) => {
  try {
    const findByPhone = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!findByPhone) {
      return res
        .status(404)
        .json({ msg: 'No user found, register yourself first' });
    }
    if (findByPhone.dataValues.role === ADMIN) {
      return res
        .status(404)
        .json({ msg: 'You can not change admin active status' });
    }

    if (findByPhone.dataValues.isVerified !== true) {
      return res.status(406).json({ msg: 'The user is not verified' });
    }

    await User.update(
      { isActive: APPROVED },
      { where: { id: findByPhone.dataValues.id } }
    ); // isActive

    return res.status(202).json({ msg: 'Accepted user' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Server error' });
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

    console.log(userExist.dataValues.role);

    if (
      userExist.dataValues.role !== TEACHER &&
      userExist.dataValues.role !== STUDENT
    ) {
      return res.status(406).json({ msg: 'You are not teacher or student' });
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
    { where: { id: findByPhone.dataValues.id } },
  ); // isActive
  const sms = await sendSMS(
    findByPhone.dataValues.phone,
    `Your OTP code is: ${otp}`,
  );
  return res.status(201).json({
    msg: 'Updated OTP you should get new OTP via your phone',
  });
};

const getAllUsersTemp = async (req, res, next) => {
  const users = await User.findAll({
    include: [
      {
        model: Subject,
        attributes: ['id', 'name'],
        // through: { where: { amount: 10 } }
      },
      {
        model: ClassType,
        attributes: ['id', 'name'],
      },
    ],
  });
  res.status(200).json({ msg: 'Getting all users', users });
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Subject,
          attributes: ['id', 'name'],
          // through: { where: { amount: 10 } }
        },
        {
          model: ClassType,
          attributes: ['id', 'name'],
        },
      ],
    });
    const userListObj = Object.assign(users);
    const newUsers = [];
    if (userListObj.length > 0) {
      let i = 0;
      while (i < userListObj.length) {
        userListObj[i].password = undefined;
        userListObj[i].otp = undefined;
        if (userListObj[i].role !== ADMIN) {
          newUsers.push(userListObj[i]);
        }
        i += 1;
      }
    }
    return res.status(200).json({ msg: 'Getting all users', users: newUsers });
  } catch (error) {
    console.log();
  }
  return res.status(500).json({ msg: 'Server error' });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = parseInt(id, 10);
    const userExist = await User.findOne({ where: { id: userId } });
    if (userExist === null) {
      return res.status(404).json({ msg: 'user not found' });
    }
    const classTypes = await userExist.getClassTypes();
    const subjects = await userExist.getSubjects();
    const notifications = await userExist.getNotifications();
    // console.log(notifications);
    const { password, otp, ...user } = userExist.dataValues;
    // console.log(user);
    return res.status(200).json({
      msg: 'Single user found',
      user,
      classTypes,
      subjects,
      notifications,
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const pId = parseInt(id, 10);
  // console.log(req.body);
  if (pId !== req.userId) {
    return res
      .status(406)
      .json({ msg: 'You can not update someonelse detail' });
  }
  try {
    const previousUser = await User.findOne({ where: { id: req.userId } });
    if (previousUser.role === ADMIN) {
      return res.status(406).json({ msg: "Admin can't be updated" });
    }
    if (previousUser === null) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const updatedObj = Object.assign(req.body);
    // console.log(updatedObj);

    // check password,
    if (updatedObj.password || updatedObj.password === '') {
      delete updatedObj.password;
    }
    // check phone
    if (updatedObj.phone || updatedObj.phone === '') {
      delete updatedObj.phone;
    }
    // check email
    if (updatedObj.email || updatedObj.email === '') {
      delete updatedObj.email;
    }
    // console.log(updatedObj.subjectId);
    // console.log(updatedObj.classTypeId);
    if (updatedObj?.SubjectId?.length > 0) {
      // set subject
      const findAllSubject = await Subject.findAll({
        where: { id: updatedObj.SubjectId },
      });
      // console.log('Setting subject');
      await previousUser.setSubjects(findAllSubject);
      delete updatedObj.SubjectId;
    }
    if (updatedObj?.ClassTypeId?.length > 0) {
      // set classtype
      const findAllClassType = await ClassType.findAll({
        where: { id: updatedObj.ClassTypeId },
      });
      await previousUser.setClassTypes(findAllClassType);
      // console.log('Setting classtype');
      delete updatedObj.ClassTypeId;
    }
    // console.log(updatedObj);
    await User.update(updatedObj, { where: { id } });
    // console.log(updatedUser);
    // console.log({updatedUser});
    // console.log(user);
    return res.status(202).json({ msg: 'A user updated', user: updatedObj });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

const notificationSeen = async (req, res) => {
  try {
    const seenNotifications = await Notification.update(
      { viewed: true },
      { where: { userId: req.userId } },
    );
    if (seenNotifications === null) {
      return res.status(404).json({ msg: 'No notification found' });
    }
    // console.log(user);
    return res.status(200).json({
      msg: 'Single user found',
      seenNotifications,
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

// disable in production
const seedUsers = async (req, res) => {
  const userList = [];

  const location = [
    'Comilla',
    'Feni',
    'Brahmanbaria',
    'Rangamati',
    'Noakhali',
    'Chandpur',
    'Lakshmipur',
    'Chattogram',
    'Coxsbazar',
    'Khagrachhari',
    'Bandarban',
    'Sirajganj',
    'Pabna',
    'Bogura',
    'Rajshahi',
    'Natore',
    'Joypurhat',
    'Chapainawabganj',
    'Naogaon',
    'Jashore',
    'Satkhira',
  ];
  const institution = [
    'Sir Salimullah Medical College',
    'Sheikh Hasina Medical College, Jamalpur',
    'Sheikh Hasina Medical College, Tangail',
    'Mugda Medical College',
    'Patuakhali Medical College',
    'Abdul Hamid Medical College',
    'Ad-din Womens Medical College',
    'AICHI Medical College',
    'Anwer Khan Modern Medical College',
    'Ashiyan Medical College',
    'Bangladesh Medical College',
    'Bashundhara Ad-din Medical College',
    'Bikrampur Bhuiyan Medical College',
    'CARe Medical College',
    'City Medical College',
    'Community Based Medical College, Bangladesh',
    'Delta Medical College',
    'Dhaka Central International',
    'Dhaka Community Medical College',
    'Dhaka National Medical College',
    'Diabetic Association Medical College',
    'Dr. Sirajul Islam Medical College',
    'East-West Medical College',
  ];
  const profession = [
    'Academic librarian',
    'Accountant',
    'Accounting technician',
    'Actuary',
    'Adult nurse',
    'Advertising account executive',
    'Advertising account planner',
    'Advertising copywriter',
    'Advice worker',
    'Advocate (Scotland)',
    'Aeronautical engineer',
    'Agricultural consultant',
    'Agricultural manager',
    'Aid worker/humanitarian worker',
    'Air traffic controller',
    'Airline cabin crew',
    'Amenity horticulturist',
    'Analytical chemist',
    'Animal nutritionist',
    'Animator',
    'Archaeologist',
    'Architect',
    'Architectural technologist',
    'Archivist',
    'Armed forces officer',
    'Aromatherapist',
    'Art therapist',
    'Arts administrator',
    'Auditor',
    'Automotive engineer',
    'Barrister',
    'Barrister’s clerk',
    'Bilingual secretary',
  ];
  let i = 0;
  const total = 20;
  const password = await bcrypt.hash('Test1234', 10);

  while (i < total) {
    const oneUser = {
      firstname: Buffer.from(Math.random().toString())
        .toString('base64')
        .substring(10, 5),
      lastname: Buffer.from(Math.random().toString())
        .toString('base64')
        .substring(10, 5),
      password,
      phone:
        Math.floor(100000000 + Math.random() * 900000000).toString()
        + i.toString(),
      cc: '+880',
      email: `${Buffer.from(Math.random().toString())
        .toString('base64')
        .substring(10, 5)
        .toLowerCase()}@email.com`,
      role: i % 2 === 0 ? TEACHER : STUDENT,
      age: total + i,
      isVerified: true,
      isActive: PENDING,
      profession: profession[i],
      institution: institution[i],
      experience: 2 + i,
      location: location[i],
      otp: Buffer.from(Math.random().toString())
        .toString('base64')
        .substring(6, 3),
      // ClassTypes
      // Subjects
    };
    userList.push(oneUser);
    i += 1;
  }

  const allUsers = await User.bulkCreate(userList);
  res.json({ msg: 'all user created', users: allUsers });
};

module.exports = {
  login,
  registerUser,
  rejectUser,
  acceptUser,
  verifyUser,
  resendOTP,
  getAllUsersTemp,
  getAllUsers,
  sendOTP,
  getSingleUser,
  updateUser,
  logout,
  notificationSeen,
  seedUsers,
};
