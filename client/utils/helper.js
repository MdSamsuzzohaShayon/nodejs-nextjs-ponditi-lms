/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/prefer-default-export
import { types } from '../config/keys';

const { ONLINE, TL, SL, ANY } = types;

export function removeEmpty(obj) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === null || newObj[key] === '') {
      delete newObj[key];
    }
  });
  return newObj;
}

export const locationSelection = (loc) => {
  switch (loc) {
    case ONLINE:
      return 'Online';
    case TL:
      return "Teacher's Location";
    case SL:
      return "Student's Location";

    default:
      return null;
  }
};

export async function getStudioAndStaff(token, axios) {
  try {
    const response = await axios.get('/staff/single', {
      headers: { Cookie: `token=${token};` },
    });
    if (response.status === 200) {
      return {
        studio: response.data.currentStudio,
        staff: response.data.currentStaff,
        allStaff: response.data.allStaff,
        allSessions: response.data.allSessions,
        allInstructors: response.data.allInstructors,
        msg: null,
      };
    }
  } catch (err) {
    console.error(err);
    if (err.response) {
      return {
        studio: null,
        staff: null,
        allStaff: null,
        allSessions: null,
        allInstructors: null,
        msg: err.response.data.msg,
      };
    }
  }
  return {
    studio: null,
    staff: null,
    allStaff: null,
    allSessions: null,
    allInstructors: null,
    msg: 'Something went wrong',
  };
}
