/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/**
 * @controller for searching teachers and students
 */

const sequelize = require('sequelize');

const { Op } = sequelize;
const db = require('../models');

const { User, Subject, ClassType } = db;
const { roles, types } = require('../config/keys.js');

const { TEACHER, STUDENT } = roles;
const {
 ANY, ONLINE, TL, SL 
} = types;

const searchTeacher = async (req, res, next) => {
  try {
    const searchQuery = {};
    let where = {};
    const include = [];

    const searchParams = Object.assign(req.query);
    console.log({ searchParams });

    /**
     * @search by location, role, classtypes, subjects
     * Later we need to use google place api
     */
    if (
      searchParams.location &&
      searchParams.location !== ANY &&
      searchParams.location !== ''
    ) {
      // [Op.notILike]
      where.location = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('location')),
        'LIKE',
        `%${searchParams.location.toLowerCase()}%`,
      ); // making case insensative
    }


    if (searchParams.role && searchParams.role !== null && searchParams.role !== ANY) {
      if (searchParams.role === TEACHER) {
        where.role = TEACHER;
      } else if (searchParams.role === STUDENT) {
        where.role = STUDENT;
      } else {
        // null or ANY type
      }
    }






    // console.log(searchParams.SubjectId, searchParams.ClassTypeId);
    if (searchParams.SubjectId && searchParams.SubjectId !== ANY && searchParams.SubjectId !== '') {
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

    if (searchParams.ClassTypeId && searchParams.ClassTypeId  !== ANY && searchParams.ClassTypeId  !== '') {
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
    const findTeachers = await User.findAll(searchQuery);

    const teachers = findTeachers.map((teacher) => {
      teacher.password = undefined;
      return teacher;
    });
    if (teachers.length > 0) {
      return res.status(200).json({ msg: 'teacher found', teachers });
    }
    return res.status(404).json({ msg: 'No teacher found' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchTeacher };
