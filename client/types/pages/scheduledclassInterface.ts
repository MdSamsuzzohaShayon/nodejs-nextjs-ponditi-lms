/* eslint-disable no-unused-vars */
import React from 'react';
import { TDateISO } from '../utils/dateFunctions';

export interface SingleScheduledClassInterface {
  id: number;
  desc: string;
  types: string;
  status: string;
  start: TDateISO;
  startedat: string | null;
  meetlink?: string | null;
  terminatedat: string | null;
  tuitionlocation: string;
  perHourRate: number | null;
  createdAt: TDateISO;
  updatedAt: TDateISO;
  ClassTypeId: number;
  senderId: number;
  receverId: number;
  SubjectId: number;
}

export interface ScheduledclassListPropsInterface {
  scheduledClassList: SingleScheduledClassInterface[];
  acceptRequestHandler: (are: React.SyntheticEvent, scheduledclassId: number) => void;
  rejectRequestHandler: (are: React.SyntheticEvent, scheduledclassId: number) => void;
}
