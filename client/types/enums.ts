/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
export enum TuitionStyleEnum {
  ANY = 'ANY',
  ONLINE = 'ONLINE',
  TL = 'TL', // teacher's location
  SL = 'SL', // student's location
}

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export enum TimeAMPMEnum {
  AM = 'AM',
  PM = 'PM',
}

export enum ClassStatusEnum {
  INITIATED_CLASS = 'INITIATED_CLASS',
  ACCEPT_REQUEST = 'ACCEPT_REQUEST',
  REJECTED_REQUEST = 'REJECTED_REQUEST',
  START_CLASS = 'START_CLASS',
  FINISH_CLASS = 'FINISH_CLASS',
}

export enum StatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  START_CLASS = 'START_CLASS',
  ANY = 'ANY',
  FINISH_CLASS = 'FINISH_CLASS',
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS'
}
