/* eslint-disable no-restricted-globals */
/* eslint-disable operator-linebreak */
const { validationResult } = require('express-validator');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const fs = require('fs');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const jwt = require('jsonwebtoken');
const sendSMS = require('../utils/sendSMS');
// bcryptjs
const db = require('../models');
const keys = require('../config/keys');
const cookieOptions = require('../config/cookie-config');
const { s3, uploadImageToS3 } = require('../config/s3-config');
const { unlinkFile, compressImage, bufferToReadableStream } = require('../utils/fileFunctions');

// eslint-disable-next-line object-curly-newline
const { Customer, ClassType, Subject, Notification, Education, Tuitionm } = db;
const { ADMIN, TEACHER, STUDENT } = keys.roles;
const {
  PENDING, APPROVED, REJECTED, REQUEST_REGISTER
} = keys.scheduledClassStatus;
const { BANGLA, ENGLISH, ARABIC } = keys.tuitionmedums;
const { ONLINE, TL, SL } = keys.types;

/**
 * @param {type} req phone          raw phone number without any country code
 * @param {type} req cc             country code without plus
 * @returns response 201            If the number you is correct a verification OTP code will be sent there
 */
const sendOTP = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }

  try {
    // isVerified === true
    // isActive === APPROVED
    const { phone, cc } = req.body;
    const phoneWithSufix = `+${cc}${phone}`;
    // if (cc === '88') {
    //   phoneWithSufix = cc.substring(cc.length - 1) + phone; // Not for bangladesh
    // } else {
    //   phoneWithSufix = cc + phone;
    // }
    // const phoneForMSG = cc + phone;
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // It is not loging out everytime we register
    if (process.env.NODE_ENV === 'development') {
      console.log({ otp });
    }

    const findByPhone = await Customer.findOne({
      where: { phone },
    });
    // console.log({otp});
    // console.log(findByPhone);
    if (findByPhone) {
      if (findByPhone.dataValues.isActive !== REQUEST_REGISTER) {
        return res.status(406).json({ msg: 'User is already registred with this phone number' });
      }

      if (
        // eslint-disable-next-line prettier/prettier
        findByPhone.dataValues.isVerified === true &&
        // eslint-disable-next-line prettier/prettier
        findByPhone.dataValues.password
      ) {
        // show them that they are already registered
        return res.status(406).json({ msg: 'You already registered yourself with this phone number' });
      }
      // console.log(phoneWithSufix, '+8801785208590');
      // let them register
      const response = await sendSMS(phoneWithSufix, `Your Ponditi verification code is : ${otp}`);
      if (response.status !== 200) return res.status(406).json({ msg: 'Invalid phone number' });

      // update code from database
      await Customer.update({ otp }, { where: { id: findByPhone.dataValues.id } });
      return res.status(208).json({
        msg: 'Already sent an OTP, however, we are sending code once again',
      });
    }
    const response = await sendSMS(phoneWithSufix, `Your Ponditi verification code is : ${otp}`);
    if (response.status !== 200) return res.status(406).json({ msg: 'Invalid phone number' });
    await Customer.create({
      phone,
      cc,
      otp,
      isActive: REQUEST_REGISTER,
      isVerified: false,
    });

    return res.status(201).json({ msg: 'If the number you is correct, a verification code will be sent there' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'server error' });
};

/**
 *
 * @param {type} req phone          raw phone number without any country code
 * @param {type} req otp            Validate otp
 * @returns response 200            Validated OTP successfully
 */
const verifyUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }

  const findByPhone = await Customer.findOne({ where: { phone: req.body.phone } });
  if (!findByPhone) {
    return res.status(404).json({ msg: 'No user found, register yourself first' });
  }

  if (findByPhone.dataValues.isActive !== REQUEST_REGISTER) {
    return res.status(406).json({ msg: 'User is already registred with this phone number' });
  }

  // console.log(findByPhone.dataValues, req.body.otp);

  if (findByPhone.dataValues.isVerified === true) {
    return res.status(200).json({ msg: 'Validated OTP successfully', userId: findByPhone.dataValues.id });
  }
  if (findByPhone.dataValues.otp !== req.body.otp) {
    return res.status(406).json({ msg: 'Invalid OTP' });
  }
  await Customer.update({ isVerified: true }, { where: { id: findByPhone.dataValues.id } }); // isActive

  return res.status(200).json({ msg: 'Validated OTP successfully', userId: findByPhone.dataValues.id });
};

/**
 * @param {type} res name           full name
 * @param {type} res phone          raw phone number without any country code
 * @param {type} res email          A valid email address later on you can use email to register
 * @param {type} res institution    A valid email address later on you can use email to register
 * @returns response 201            Registered user successfully, Now you can register
 */
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }

  const userObj = { ...req.body };
  const userExam = {};
  if (userObj.role.toUpperCase() === TEACHER) {
    // Work wit tuition place - this is only for teacher
    if (userObj.tutionplace && userObj.tutionplace.length === 0) {
      return res.status(406).json({ msg: 'You must select atleast one tuition place' });
    }

    let newTutionplace = '';
    let i = 0;
    while (i < userObj.tutionplace.length) {
      let sep = '';
      if (i + 1 !== userObj.tutionplace.length) sep = '_';
      newTutionplace = `${newTutionplace + userObj.tutionplace[i]}${sep}`;
      i += 1;
    }
    if (newTutionplace !== '') userObj.tutionplace = newTutionplace.toUpperCase();

    // Education detail
    userExam.level = userObj.degree;
    userExam.institution = userObj.institution;
    userObj.institution = userObj.pinstitution;
    if (userObj.running_study === false) {
      userExam.passing_year = userObj.passing_year;
    }
    userExam.running_study = userObj.running_study;
    userExam.major = userObj.major;
  } else {
    userObj.role = STUDENT;
    userObj.profession = STUDENT.toLowerCase();
    delete userObj.tl_rate;
    delete userObj.sl_rate;
    delete userObj.ol_rate;
    delete userObj.tutionplace;
  }
  // Education detail
  delete userObj.degree;
  delete userObj.passing_year;
  delete userObj.running_study;
  delete userObj.major;

  userObj.otp = null;

  try {
    const userFindById = await Customer.findOne({
      where: { id: req.params.userId },
    });

    // error return
    if (userFindById === null) {
      return res.status(404).json({ msg: 'This phone number is not validated' });
    }
    if (userFindById.dataValues.isVerified === false) {
      return res.status(406).json({ msg: 'Your phone number is not verified to register' });
    }
    if (userFindById.dataValues.isActive !== REQUEST_REGISTER) {
      return res.status(406).json({ msg: 'User is already registred with this phone number' });
    }

    // Check email already exist
    const userEmailExist = await Customer.findOne({
      where: { email: userObj.email },
    });
    if (userEmailExist !== null) {
      return res.status(406).json({
        msg: 'User already exist with this email address, you can now login',
      });
    }

    // Contradict for running study - only one field of these two will have value
    if (userObj?.running_study === true) {
      userObj.passing_year = null;
    }

    // Making status pending - admin will accept or reject
    userObj.isActive = PENDING;

    // Create password
    const genPassword = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    userObj.password = await bcrypt.hash(genPassword, 10);

    // Make relationships with Subject, ClassType and Tuitionm
    if (userObj?.SubjectId?.length > 0) {
      const findAllSubject = await Subject.findAll({
        where: { id: userObj.SubjectId },
      });
      await userFindById.setSubjects(findAllSubject);
    }
    if (userObj?.ClassTypeId?.length > 0) {
      const findAllClassType = await ClassType.findAll({
        where: { id: userObj.ClassTypeId },
      });
      await userFindById.setClassTypes(findAllClassType);
    }
    if (userObj?.TuitionmId?.length > 0) {
      const findAllTuitionm = await Tuitionm.findAll({
        where: { id: userObj.TuitionmId },
      });
      await userFindById.setTuitionms(findAllTuitionm);
    }
    delete userObj.SubjectId;
    delete userObj.ClassTypeId;
    delete userObj.TuitionmId;

    // Console out in development environment
    if (process.env.NODE_ENV === 'development') {
      const newUserObj = { ...userObj };
      newUserObj.password = genPassword;
      newUserObj.phone = userFindById.dataValues.phone;
      console.log(newUserObj);
    }

    // Make relationship with education or exam only for teacher
    if (userObj.role.toUpperCase() === TEACHER) {
      const newEducation = await Education.create(userExam);
      await userFindById.setEducation(newEducation);
    }

    // Update user detail which is created previously
    await Customer.update(userObj, {
      where: { id: req.params.userId },
    });

    // Send success message that user is registered
    const phoneWithSufix = `+${userFindById.dataValues.cc}${userFindById.dataValues.phone}`;
    const msg = `Congratulations! your Ponditi account has been created successfully. \n\n Login details:\n ${process.env.FRONTEND_URL} \nusername: ${userFindById.dataValues.phone} \npassword: ${genPassword}`;
    await sendSMS(phoneWithSufix, msg);

    // Final response
    return res.status(201).json({
      msg: 'Registered user successfully, Now you can login',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Something went wrong', error });
  }
};

const rejectUser = async (req, res) => {
  try {
    const findByPhone = await Customer.findOne({
      where: { id: req.params.userId },
    });
    if (!findByPhone) {
      return res.status(404).json({ msg: 'No user found, register yourself first' });
    }
    if (findByPhone.dataValues.role === ADMIN) {
      return res.status(404).json({ msg: 'You can not change admin active status' });
    }

    if (findByPhone.dataValues.isVerified !== true) {
      return res.status(406).json({ msg: 'User is not verified' });
    }

    await Customer.update({ isActive: REJECTED }, { where: { id: findByPhone.dataValues.id } }); // isActive
    // console.log(updatedUser);

    return res.status(202).json({ msg: 'Rejected user' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Server error' });
};

const acceptUser = async (req, res) => {
  try {
    const findByPhone = await Customer.findOne({
      where: { id: req.params.userId },
    });
    if (!findByPhone) {
      return res.status(404).json({ msg: 'No user found, register yourself first' });
    }
    if (findByPhone.dataValues.role === ADMIN) {
      return res.status(404).json({ msg: 'You can not change admin active status' });
    }

    if (findByPhone.dataValues.isVerified !== true) {
      return res.status(406).json({ msg: 'The user is not verified' });
    }

    await Customer.update({ isActive: APPROVED }, { where: { id: findByPhone.dataValues.id } }); // isActive

    return res.status(202).json({ msg: 'Accepted user' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Server error' });
};

/**
 * @param {type} req phone          raw phone number without any country code
 * @returns response 200            Set a token to login and
 */
const login = async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }
  // const { email, password } = req.body;
  // console.log(req.body);
  try {
    const userExist = await Customer.findOne({ where: { phone: req.body.phone } });
    // console.log({userExist});
    if (!userExist) return res.status(404).json({ msg: 'Invalid credentials' });
    // console.log(userExist);
    if (userExist.dataValues.isActive === REQUEST_REGISTER) {
      await Customer.destroy({ where: { id: userExist.dataValues.id }, force: true });
      return res.status(406).json({ msg: 'Invalid credentials' });
    }
    if (userExist.dataValues.role !== TEACHER && userExist.dataValues.role !== STUDENT) {
      return res.status(406).json({ msg: 'You are not teacher or student' });
    }
    // if (userExist.dataValues.isActive !== APPROVED) {
    //   return res.status(406).json({ msg: 'Admin will review your profile and approve' });
    // }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, userExist.dataValues.password);
    if (!isPasswordCorrect) {
      return res.status(406).json({ msg: 'Invalid credentials' });
    }

    const userDetailResponse = {
      email: userExist.dataValues.email,
      id: userExist.dataValues.id,
      role: userExist.dataValues.role,
    };
    const token = jwt.sign(userDetailResponse, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });
    res.cookie('token', token, cookieOptions);
    userDetailResponse.name = userExist.dataValues.name;
    return res.status(200).json({ msg: 'Logged in successfully', user: userDetailResponse });
  } catch (err) {
    console.log(err);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
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

/**
 *
 * @param {type} req phone          raw phone number without any country code
 * @returns response 200            If the number you is correct a verification OTP code will be sent there
 */
const forgetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }

  try {
    let userExist = null;
    if (req.body.email) {
      userExist = await Customer.findOne({ where: { email: req.body.email } });
    } else if (req.body.phone) {
      userExist = await Customer.findOne({ where: { phone: req.body.phone } });
    } else {
      return res.status(406).json({ msg: 'Email and phone both can not be empty' });
    }

    if (!userExist) {
      return res.status(406).json({ msg: 'User is not registered yet with this phone number' });
    }

    if (userExist.dataValues.isActive !== APPROVED && userExist.dataValues.isVerified !== true) {
      return res.status(406).json({ msg: 'User is not registered yet with this phone number' });
    }

    const phoneWithSufix = `+${userExist.dataValues.cc}${userExist.dataValues.phone}`;

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const response = await sendSMS(phoneWithSufix, `Your Ponditi password reset OTP code is: ${otp}`);
    if (process.env.NODE_ENV === 'development') {
      console.log({
        phoneWithSufix,
        phone: userExist.dataValues.phone,
        otp,
        msgStatus: response.status,
      });
    }
    // console.log(msg);
    if (response.status !== 200) return res.status(406).json({ msg: 'Invalid phone number' });
    // update code from database
    await Customer.update({ otp }, { where: { id: userExist.dataValues.id } });

    return res.status(201).json({ msg: 'If the number you is correct a verification code will be sent there' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'server error' });
};

/**
 *
 * @param {type} req phone          raw phone number without any country code
 * @param {type} req otp            A new otp will be needed which was sended by /user/forgetpassword request
 * @param {type} req password       password must be equal or more than 6 charecter long
 * @returns response 200            If the number you is correct a verification OTP code will be sent there
 */
const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }

  let userExist = null;
  if (req.body.email) {
    userExist = await Customer.findOne({ where: { email: req.body.email } });
  } else if (req.body.phone) {
    userExist = await Customer.findOne({ where: { phone: req.body.phone } });
  } else {
    return res.status(406).json({ msg: 'Email and phone both can not be empty' });
  }

  if (!userExist) {
    return res.status(406).json({ msg: 'User is not registered yet with this phone number' });
  }

  if (userExist.dataValues.isActive !== APPROVED && userExist.dataValues.isVerified !== true) {
    return res.status(406).json({ msg: 'User is not registered yet with this phone number' });
  }

  if (userExist.dataValues.otp !== req.body.otp) {
    return res.status(406).json({ msg: 'Invalid OTP' });
  }

  const updateObj = {};
  updateObj.otp = null;
  updateObj.password = await bcrypt.hash(req.body.password, 10);

  await Customer.update(updateObj, { where: { id: userExist.dataValues.id } }); // isActive

  // send message

  return res.status(200).json({ msg: 'Your password has been updated successfully' });
};

const resendOTP = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }
  //   const result = await Waitlist.update(
  //     { resume: req.file.filename },
  //     { where: { id: waitlistExist.dataValues.id } }
  // );
  // resendotp
  const findByPhone = await Customer.findOne({ where: { phone: req.body.phone } });
  if (!findByPhone) {
    return res.status(406).json({ msg: 'User is not registred with this phone number' });
  }
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const updateOtp = await Customer.update({ otp }, { where: { id: findByPhone.dataValues.id } }); // isActive
  await sendSMS(findByPhone.dataValues.phone, `Your Ponditi verification code is : ${otp}`);
  return res.status(201).json({
    msg: 'Updated OTP you should get new OTP via your phone',
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Customer.findAll({
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
        {
          model: Tuitionm,
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
    // include: [{ model: Education }],
    const userExist = await Customer.findOne({
      where: { id: userId },
      // include: [{ model: ClassType }, { model: Tuitionm }, { model: Subject }, { model: Notification }, { model: Education }],
    });
    if (userExist === null) {
      return res.status(404).json({ msg: 'user not found' });
    }
    const classTypes = await userExist.getClassTypes();
    const tuitionms = await userExist.getTuitionms();
    const subjects = await userExist.getSubjects();
    const notifications = await userExist.getNotifications();
    const educations = await userExist.getEducation();
    const { password, otp, ...user } = userExist.dataValues;
    // console.log(user);
    return res.status(200).json({
      msg: 'Single user found',
      user,
      tuitionms,
      classTypes,
      subjects,
      notifications,
      educations,
    });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

/**
 * @param {type} req any            Any properties of user that need to be updated
 * @returns response 202            If everything is okay update the user
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const pId = parseInt(id, 10);

  // A user can onlu update his own informations
  if (pId !== req.userId) {
    return res.status(406).json({ msg: 'You can not update someonelse detail' });
  }
  try {
    const previousUser = await Customer.findOne({ where: { id: req.userId } });

    // admin can not be updated
    if (previousUser.role === ADMIN) {
      return res.status(406).json({ msg: "Admin can't be updated" });
    }

    // No user exist with this user id
    if (previousUser === null) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Clone the object
    const updatedObj = { ...req.body };

    if (updatedObj.tutionplace) {
      // tuition place must be an array
      if (typeof updatedObj.tutionplace !== 'object') {
        return res.status(406).json({ msg: 'Tution place must be an array' });
      }

      // Convert array to string
      let newTutionplace = '';
      let i = 0;
      while (i < updatedObj.tutionplace.length) {
        let sep = '';
        if (i + 1 !== updatedObj.tutionplace.length) sep = '_';
        newTutionplace = `${newTutionplace + updatedObj.tutionplace[i]}${sep}`;
        i += 1;
      }
      if (newTutionplace !== '') updatedObj.tutionplace = newTutionplace;
    }

    // Set user rate per hour
    if (req.userRole === STUDENT) {
      delete updatedObj.tl_rate;
      delete updatedObj.sl_rate;
      delete updatedObj.ol_rate;
    } else if (req.userRole === TEACHER) {
      if (updatedObj.tl_rate) {
        updatedObj.tl_rate = parseInt(updatedObj.tl_rate, 10);
      }
      if (updatedObj.sl_rate) {
        updatedObj.sl_rate = parseInt(updatedObj.sl_rate, 10);
      }
      if (updatedObj.ol_rate) {
        updatedObj.ol_rate = parseInt(updatedObj.ol_rate, 10);
      }
    }

    // check empty password,
    if (updatedObj.password || updatedObj.password === '') {
      delete updatedObj.password;
    }
    // check empty phone
    if (updatedObj.phone || updatedObj.phone === '') {
      delete updatedObj.phone;
    }
    // check empty email
    if (updatedObj.email || updatedObj.email === '') {
      delete updatedObj.email;
    }

    // Make relationships with tuitionm
    if (updatedObj?.TuitionmId?.length > 0) {
      const findAllTuitionm = await Tuitionm.findAll({
        where: { id: updatedObj.TuitionmId },
      });
      await previousUser.setTuitionms(findAllTuitionm);
      delete updatedObj.TuitionmId;
    }

    // Make relationships with subject
    if (updatedObj?.SubjectId?.length > 0) {
      const findAllSubject = await Subject.findAll({
        where: { id: updatedObj.SubjectId },
      });
      await previousUser.setSubjects(findAllSubject);
      delete updatedObj.SubjectId;
    }

    // Make relationships with classtype
    if (updatedObj?.ClassTypeId?.length > 0) {
      const findAllClassType = await ClassType.findAll({
        where: { id: updatedObj.ClassTypeId },
      });
      await previousUser.setClassTypes(findAllClassType);
      delete updatedObj.ClassTypeId;
    }

    // Update user property
    await Customer.update(updatedObj, { where: { id } });
    return res.status(202).json({ msg: 'A user updated', user: updatedObj });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

const updateExamUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ msg: JSON.stringify(errors.array()) });
  }
  const { id } = req.params;
  const pId = parseInt(id, 10);
  // console.log(req.body);
  if (pId !== req.userId) {
    return res.status(406).json({ msg: 'You can not update someonelse detail' });
  }
  try {
    const findUser = await Customer.findOne({
      where: { id: req.userId },
      include: [{ model: Education }],
    });
    // console.log(findCustomer.Education.map((ue)=> ue.dataValues));
    if (findUser.role === ADMIN) {
      return res.status(406).json({ msg: "Admin can't be updated" });
    }
    if (findUser === null) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const updatedExamList = req.body.examlist;
    // console.log(updatedExamList);
    const newExamList = [];
    for (let i = 0; i < updatedExamList.length; i += 1) {
      const newExamObj = { ...updatedExamList[i] };
      // console.log(newExamObj);
      delete newExamObj.id;
      if (newExamObj.level && newExamObj.level !== null && newExamObj.institution && newExamObj.institution !== null) {
        if (newExamObj.running_study) {
          delete newExamObj.passing_year;
        } else {
          const passingYearInt = parseInt(newExamObj.passing_year, 10);
          newExamObj.passing_year = passingYearInt;
          if (isNaN(passingYearInt)) delete newExamObj.passing_year;
        }
        const existingEducation = findUser.Education.find((fue) => fue.level === newExamObj.level);
        if (existingEducation) {
          // console.log(existingEducation);
          const newUpdatedEducation = existingEducation.update(newExamObj);
          newExamList.push(newUpdatedEducation);
        } else {
          const newEducationLevel = Education.create(newExamObj); // Create or update
          newExamList.push(newEducationLevel);
        }
      }
      console.log(newExamObj);
    }
    // console.log(newExamList);
    if (newExamList.length === 0) {
      return res.status(406).json({
        msg: 'No item to update, make sure to put level, institution',
      });
    }
    const allUpdatedExam = await Promise.all(newExamList);
    await findUser.setEducation(allUpdatedExam);
    // Get all exam - array
    // console.log(updatedUserExam);
    // console.log(allUpdatedExam);
    return res.status(202).json({ msg: 'A user exam updated', examlist: allUpdatedExam });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

const updateImageUser = async (req, res) => {
  const { id } = req.params;
  const pId = parseInt(id, 10);
  if (pId !== req.userId) {
    return res.status(406).json({ msg: 'You can not update someon else detail' });
  }
  try {
    if (!req.file) {
      return res.status(406).json({ msg: 'No image to update' });
    }
    const findUser = await Customer.findOne({
      where: { id: req.userId },
      include: [{ model: Education }],
    });
    if (findUser.role === ADMIN) {
      return res.status(406).json({ msg: "Admin can't be updated" });
    }
    if (findUser === null) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // console.log(req.file);
    const filePath = `${__dirname}/../uploads/${req.file.filename}`;
    await uploadImageToS3(req.file); // Upload compressed file
    await unlinkFile(filePath); // Delete orginal file
    // Delete file if it exist

    // If there is a file already delete that file first
    if (findUser.dataValues.image) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: findUser.dataValues.image,
      };
      // console.log(params);
      await s3.deleteObject(params).promise();
    }

    await Customer.update({ image: req.file.filename }, { where: { id } });

    return res.status(202).json({ msg: 'A user image updated', image: req.file.filename });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Something went wrong' });
};

const notificationSeen = async (req, res) => {
  try {
    const seenNotifications = await Notification.update({ viewed: true }, { where: { userId: req.userId } });
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
      name: `${Buffer.from(Math.random().toString()).toString('base64').substring(10, 5)} ${Buffer.from(Math.random().toString()).toString('base64').substring(10, 5)}`,
      // lastname: Buffer.from(Math.random().toString()).toString('base64').substring(10, 5),
      password,
      phone: Math.floor(100000000 + Math.random() * 900000000).toString() + i.toString(),
      cc: '+880',
      email: `${Buffer.from(Math.random().toString()).toString('base64').substring(10, 5).toLowerCase()}@email.com`,
      role: i % 2 === 0 ? TEACHER : STUDENT,
      age: total + i,
      isVerified: true,
      isActive: APPROVED,
      profession: profession[i],
      institution: institution[i],
      experience: 2 + i,
      location: location[i],
      otp: Buffer.from(Math.random().toString()).toString('base64').substring(6, 3),
      // ClassTypes
      // Subjects
    };
    userList.push(oneUser);
    i += 1;
  }

  const allUsers = await Customer.bulkCreate(userList);
  res.json({ msg: 'all user created', users: allUsers });
};

module.exports = {
  login,
  registerUser,
  rejectUser,
  acceptUser,
  verifyUser,
  resendOTP,
  getAllUsers,
  sendOTP,
  getSingleUser,
  updateUser,
  updateExamUser,
  updateImageUser,
  logout,
  forgetPassword,
  resetPassword,
  notificationSeen,
  seedUsers,
};
