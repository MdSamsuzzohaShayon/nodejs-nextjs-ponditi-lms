/**
 * @controller for searching teachers and students
 */

const sequelize = require("sequelize");
const { Op } = sequelize;
const db = require("../models");
const { User } = db;
const keys = require('../config/keys.js');
const { SUPER, TEACHER, STUDENT } = keys.roles;

const searchTeacher = async (req, res, next) => {
  try {
    const where = {
      role: TEACHER,
    };

    const { location, classes, subjects} = req.body;

    /**
     * @search by location
     * Later we need to use google place api
     */
    if (location) {
      // [Op.notILike]
      where.location = sequelize.where(
        sequelize.fn("LOWER", sequelize.col("location")),
        "LIKE",
        "%" + location.toLowerCase() + "%"
      ); // making case insensative
    }

    /**
     * @search by classes
     */
    if (classes) {
      const lowerClass = classes.toLowerCase();
      where.classes = {
        [Op.substring]: "%" + lowerClass + "%", // '%Bob%'
      }; // making case insensative
    }

    /**
     * @search by subjects
     */
    if (subjects) {
      // making case insensative
      const lowerSubject = subjects.toLowerCase();
      where.subjects = {
        [Op.substring]: "%" + lowerSubject + "%", // '%Bob%'
      }; 
    }


    /**
     * @search by online offline or home
     */
    //  if (subjects) {
    //   // making case insensative
    //   const lowerSubject = subjects.toLowerCase();
    //   where.subjects = {
    //     [Op.substring]: "%" + lowerSubject + "%", // '%Bob%'
    //   }; 
    // }

    const findTeachers = await User.findAll({
      where,
    });

    const teachers = findTeachers.map((teacher) => {
      teacher.password = undefined;
      return teacher;
    });
    if (teachers.length > 0) {
      return res.status(200).json({ msg: "teacher found", teachers });
    }
    return res.status(404).json({ msg: "No teacher found" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchTeacher };
