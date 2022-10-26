export const BACKEND_URL = 'http://localhost:9000';
// export const BACKEND_URL = 'https://ponditi-backend.herokuapp.com';
export const APP_NAME = 'Ponditi';

export const SEND_CODE = 'SEND_CODE';
export const VERIFY_CODE = 'VERIFY_CODE';
export const REGISTER = 'REGISTER';

export const roles = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
};

export const adminSidebarList = {
  CLASS_TYPE: 'CLASS_TYPE',
  SUBJECT: 'SUBJECT',
  STUDENT: 'STUDENT',
  USERS: 'USERS',
};

export const userDashboardSidebarList = {
  CLASS_SCHEDULED: 'CLASS_SCHEDULED',
  STUDENT_OR_TEACHER_REQUESTS: 'STUDENT_OR_TEACHER_REQUESTS',
  PROFILE: 'PROFILE',
  REJECTED: 'REJECTED',
};


export const types = {
  ANY: 'ANY',
  ONLINE: 'ONLINE',
  TL: 'TL', // teacher's location
  SL: 'SL', // student's location
};

export const scheduledclassStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  START_CLASS: 'START_CLASS',
  ANY: 'ANY',
  FINISH_CLASS: 'FINISH_CLASS'
}
