/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/**
 * @controller for searching teachers and students
 */

const sequelize = require('sequelize');

const { Op } = sequelize;
const db = require('../models');

const { Customer, Subject, ClassType, Review, Tuitionm } = db;
const { roles, types, scheduledClassStatus } = require('../config/keys.js');

const { TEACHER, STUDENT } = roles;
const { ANY, ONLINE, TL, SL } = types;
const { APPROVED, INCOMPLETE } = scheduledClassStatus;

const searchTeacher = async (req, res) => {
  try {
    const searchQuery = {};
    let where = { isActive: { [Op.or]: [INCOMPLETE, APPROVED] }, role: TEACHER, isAvailable: true };
    const include = [
      {
        model: Review,
        as: 'Reviewtaker',
      },
    ];

    const searchParams = Object.assign(req.query);
    // console.log({ searchParams });

    /**
     * @search by location, role, classtypes, subjects
     * Later we need to use google place api
     */
    if (searchParams.location && searchParams.location !== ANY && searchParams.location !== '') {
      // console.log({location: searchParams.location});
      // [Op.notILike]
      /*
      where.location = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('district')),
        'LIKE',
        `%${searchParams.location.toLowerCase()}%`,
      );
      */
      where[Op.or] = [{ district: searchParams.location }, { presentaddress: { [Op.substring]: searchParams.location } }];
      // where.presentaddress = {[Op.substring]: searchParams.location};
      // making case insensative
    }
    /*
    if (
      searchParams.role &&
      searchParams.role !== null &&
      searchParams.role !== ANY
    ) {
      // console.log({role: searchParams.role});
      // Search reacher only for now
      if (searchParams.role === TEACHER) {
        where.role = TEACHER;
      } else if (searchParams.role === STUDENT) {
        where.role = STUDENT;
      } else {
        // null or ANY type
      }
    }
    */
    // Search by location
    if (searchParams.tutionplace && searchParams.tutionplace !== ANY && searchParams.tutionplace !== '' && searchParams.tutionplace !== '0') {
      where.tutionplace = { [Op.like]: `%${searchParams.tutionplace}%` };
    }

    // Search by Tuition Medium
    if (searchParams.TuitionmId && searchParams.TuitionmId !== ANY && searchParams.TuitionmId !== '' && searchParams.TuitionmId !== '0') {
      const newTMArrInt = [];
      if (searchParams.TuitionmId.includes(',')) {
        const newCTIArr = searchParams.TuitionmId.split(',');
        for (let ctiIdx = 0; ctiIdx < newCTIArr.length; ctiIdx += 1) {
          newTMArrInt.push(parseInt(newCTIArr[ctiIdx], 10));
        }
      } else {
        newTMArrInt.push(parseInt(searchParams.TuitionmId, 10));
      }
      include.push({
        model: Tuitionm,
        attributes: [],
        require: true,
      });
      where = { ...where, '$Tuitionms.id$': newTMArrInt };
    }

    // console.log(searchParams.SubjectId, searchParams.ClassTypeId);
    if (searchParams.SubjectId && searchParams.SubjectId !== ANY && searchParams.SubjectId !== '' && searchParams.SubjectId !== '0') {
      // console.log({ SubjectId: searchParams.SubjectId });
      // && searchParams.SubjectId[0] !== 0
      const newSIArrInt = [];
      if (searchParams.SubjectId.includes(',')) {
        const newCTIArr = searchParams.SubjectId.split(',');
        for (let ctiIdx = 0; ctiIdx < newCTIArr.length; ctiIdx += 1) {
          newSIArrInt.push(parseInt(newCTIArr[ctiIdx], 10));
        }
      } else {
        newSIArrInt.push(parseInt(searchParams.SubjectId, 10));
      }
      include.push({
        model: Subject,
        attributes: [],
        require: true,
      });
      // console.log(newSIArrInt);
      where = { ...where, '$Subjects.id$': newSIArrInt };
    }

    if (searchParams.ClassTypeId && searchParams.ClassTypeId !== ANY && searchParams.ClassTypeId !== '' && searchParams.ClassTypeId !== '0') {
      // console.log({ ClassTypeId: searchParams.ClassTypeId });
      // && searchParams.ClassTypeId[0] !== 0
      const newCTIArrInt = [];
      if (searchParams.ClassTypeId.includes(',')) {
        const newCTIArr = searchParams.ClassTypeId.split(',');
        for (let ctiIdx = 0; ctiIdx < newCTIArr.length; ctiIdx += 1) {
          newCTIArrInt.push(parseInt(newCTIArr[ctiIdx], 10));
        }
      } else {
        newCTIArrInt.push(parseInt(searchParams.ClassTypeId, 10));
      }
      // console.log(newCTIArrInt);
      include.push({
        model: ClassType,
        attributes: [],
        require: true,
      });
      where = { ...where, '$ClassTypes.id$': newCTIArrInt };
    }
    /*
     */

    /**
     * @search by online offline or home
     */
    searchQuery.where = where;
    searchQuery.include = include;
    const findTeachers = await Customer.findAll(searchQuery);

    const teachers = findTeachers.map((teacher) => {
      teacher.password = undefined;
      return teacher;
    });

    // console.log(teachers);
    if (teachers.length > 0) {
      return res.status(200).json({ msg: 'teacher found', teachers });
    }
    return res.status(204).json({ msg: 'No teacher found' });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ msg: 'Internal server error' });
};

module.exports = { searchTeacher };
