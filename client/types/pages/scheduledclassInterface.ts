/* eslint-disable no-unused-vars */
import React from 'react';
import { TDateISO } from '../utils/dateFunctions';
import { AuthUserInfoInterface, SingleUserInterface } from '../redux/userInterface';
import { ClassTypeInterface, SubjectInterface } from '../redux/SubjectClassTuitionmInterface';

export interface ScheduledClassReviewIn {
  id: number;
  stars: number;
  comment: string;
  publish: boolean;
  createdAt: TDateISO;
  updatedAt: TDateISO;
  reviewerId: number;
  reviewtakerId: number;
  ScheduledClassId: number;
}

export interface SingleScheduledClassInterface {
  id: number | null;
  desc: string;
  types: string;
  status: string;
  start: TDateISO | null;
  startedat: string | null;
  meetlink?: string | null;
  terminatedat: string | null;
  tuitionlocation: string;
  perHourRate: number | null;
  createdAt: TDateISO | null;
  updatedAt: TDateISO | null;
  ClassTypeId: number | null;
  senderId: number | null;
  receverId: number | null;
  SubjectId: number | null;
}

export interface CreatedScheduledClassIn extends SingleScheduledClassInterface {
  Reviews: ScheduledClassReviewIn[];
  Sender: SingleUserInterface;
  Recever: SingleUserInterface;
  ClassType: ClassTypeInterface;
  Subject: SubjectInterface;
}

export interface ScheduledclassListPropsInterface {
  scheduledClassList: SingleScheduledClassInterface[];
  acceptRequestHandler: (are: React.SyntheticEvent, singleScheduledClass: CreatedScheduledClassIn) => void;
  rejectRequestHandler: (are: React.SyntheticEvent, singleScheduledClass: CreatedScheduledClassIn) => void;
  finishClassHandler: (are: React.SyntheticEvent, singleScheduledClass: CreatedScheduledClassIn) => void;
}

export interface RunningClassElementsPropsIn {
  singleScheduledClass: SingleScheduledClassInterface;
  authUserInfo: AuthUserInfoInterface;
  scheduledclassId: number;
}

export interface RefiewPropsIn {
  singleScheduledClass: CreatedScheduledClassIn;
}
