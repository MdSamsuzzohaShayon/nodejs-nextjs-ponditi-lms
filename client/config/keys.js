export const BACKEND_URL = 'http://localhost:9000';
// export const BACKEND_URL = 'https://ponditi-backend.herokuapp.com';
export const APP_NAME = 'Ponditi';
export const GOOGLE_PLACE_API_KEY = 'AIzaSyAF8GtQJ6sD_O731EUBO3ATruUYjObZYdg';
export const libraries = ['places'];

export const SEND_CODE = 'SEND_CODE';
export const VERIFY_CODE = 'VERIFY_CODE';
export const REGISTER = 'REGISTER';
export const CLASS_SUB = 'CLASS_SUB';
export const TS_SELECT = 'TS_SELECT'; // teacher student selection

export const roles = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
};

export const adminSidebarList = {
  MEDIUM: 'MEDIUM',
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

export const tuitionmediums = {
  BANGLA: 'BANGLA',
  ENGLISH: 'ENGLISH',
  ARABIC: 'ARABIC',
};

export const scheduledclassStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  START_CLASS: 'START_CLASS',
  ANY: 'ANY',
  FINISH_CLASS: 'FINISH_CLASS',
};
