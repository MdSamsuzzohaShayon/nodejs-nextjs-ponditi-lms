/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const { ADMIN, TEACHER, STUDENT } = keys.roles;
const authenticationFor = async (req, res, role, next) => {
  try {
    const cookieToken = req.cookies.token;
    if (!cookieToken) return res.status(401).json({ msg: 'Unauthenticated' });
    const decodedToken = await jwt.verify(cookieToken, process.env.JWT_SECRET);
    if (!decodedToken) return res.status(401).json({ msg: 'Unauthenticated' });
    if (decodedToken.role !== role) {
      return res.status(401).json({ msg: 'Unauthenticated' });
    }
    req.userId = decodedToken?.id;
    req.userEmail = decodedToken?.email;
    req.userRole = decodedToken.role;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const options = {
        maxAge: 0,
      };
      // if (process.env.NODE_ENV !== 'development') {
      //   options.sameSite = 'none';
      //   options.secure = true;
      // }
      res.cookie('token', '', options); // Remove cookie
      return res.status(401).json({ msg: 'Unauthenticated' });
    }
  }
};

// eslint-disable-next-line consistent-return
const ensureTeacher = async (req, res, next) => {
  // Authenticate user
  await authenticationFor(req, res, TEACHER, next);
};
const ensureStudent = async (req, res, next) => {
  // Authenticate user
  await authenticationFor(req, res, STUDENT, next);
};
const ensureAdmin = async (req, res, next) => {
  // Authenticate user
  await authenticationFor(req, res, ADMIN, next);
};

const ensureAuth = async (req, res, next) => {
  try {
    // Authenticate user
    const cookieToken = req.cookies.token;
    if (!cookieToken) return res.status(401).send({ msg: 'Unauthenticated' });
    const decodedToken = await jwt.verify(cookieToken, process.env.JWT_SECRET);
    if (!decodedToken) return res.status(401).send({ msg: 'Unauthenticated' });
    // console.log({decodedToken, role: decodedToken.role});
    if (decodedToken?.role !== STUDENT && decodedToken?.role !== TEACHER && decodedToken?.role !== ADMIN ) return res.status(401).send({ msg: 'Unauthenticated' });
    req.userId = decodedToken?.id;
    req.userEmail = decodedToken?.email;
    req.userRole = decodedToken.role;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const options = {
        maxAge: 0,
      };
      // if (process.env.NODE_ENV !== 'development') {
      //   options.sameSite = 'none';
      //   options.secure = true;
      // }
      res.cookie('token', '', options); // Remove cookie
      return res.status(401).json({ msg: 'Unauthenticated' });
    }
  }
};

// eslint-disable-next-line consistent-return
const ensureGuest = async (req, res, next) => {
  const cookieToken = req.cookies.token;
  if (cookieToken) {
    return res
      .status(405)
      .json({ msg: 'Delete the token from header and request once again' });
  }
  next();
};

module.exports = {
  ensureTeacher,
  ensureStudent,
  ensureAdmin,
  ensureAuth,
  ensureGuest,
};
