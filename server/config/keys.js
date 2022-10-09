module.exports = {
  // ROLES
  roles: {
    ADMIN: 'ADMIN',
    SUPER: 'SUPER',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
  },
  types: {
    ANY: 'ANY',
    TL: 'TL',
    SL: 'SL',
    ONLINE: 'ONLINE',
  },
  scheduledClassStatus: {
    PAYMENT_DUE: 'PAYMENT_DUE',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    COMPLETE_REQUESTED: 'COMPLETE_REQUESTED',
    START_CLASS: 'START_CLASS',
    FINISH_CLASS: 'FINISH_CLASS',
  },
  notificationTypes: {
    INITIATED_CLASS: 'INITIATED_CLASS',
    COMPLETE: 'COMPLETE',
  },
};
