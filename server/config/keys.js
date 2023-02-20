module.exports = {
  // ROLES
  roles: {
    ADMIN: 'ADMIN',
    SUPER: 'SUPER',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
  },
  gender: {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHERS: 'OTHERS',
  },
  tuitionmedums: {
    BANGLA: 'BANGLA',
    ENGLISH: 'ENGLISH',
    ARABIC: 'ARABIC',
  },
  types: {
    ANY: 'ANY',
    TL: 'TL',
    SL: 'SL',
    ONLINE: 'ONLINE',
  },
  scheduledClassStatus: {
    PAYMENT_DUE: 'PAYMENT_DUE',
    CANCEL: 'CANCEL',
    REQUEST_REGISTER: 'REQUEST_REGISTER',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    COMPLETE_REQUESTED: 'COMPLETE_REQUESTED',
    START_CLASS: 'START_CLASS',
    FINISH_CLASS: 'FINISH_CLASS',
    INCOMPLETE: 'INCOMPLETE', // For user
  },
  notificationTypes: {
    INITIATED_CLASS: 'INITIATED_CLASS',
    ACCEPT_REQUEST: 'ACCEPT_REQUEST',
    REJECTED_REQUEST: 'REJECTED_REQUEST',
    START_CLASS: 'START_CLASS',
    COMPLETE: 'COMPLETE',
  },
  roomStatus: {
    INITIALIZED: 'INITIALIZED',
    RUNNING: 'RUNNING',
    FINISH: 'FINISH',
  },
};
