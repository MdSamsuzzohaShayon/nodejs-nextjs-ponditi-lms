import React from 'react';
import { TDateISO } from '../utils/dateFunctions';

export interface AuthUserInfoInterface {
  name: string | null;
  email: string | null;
  id: number | null;
  role: string | null;
}

export interface TuitionRateInterface {
  ol_rate?: number;
  tl_rate?: number;
  sl_rate?: number;
}

export interface RegisterableUserInterface {
  name: string;
  email: string;
  profession: string;
  experience: number | null;
  passing_year: number | null;
  role: string;
  sl_rate?: number | null;
  tl_rate?: number | null;
  ol_rate?: number | null;
  presentaddress: string;
  degree: string;
  running_study: boolean;
  major: string;
  institution: string;
  pinstitution: string;
  ref: number | null;
  tutionplace: string[];
}

// experience(pin):"4"
// passing_year(pin):"2023"
// ref(pin):"109"

export interface SingleUserInterface {
  id: number | null;
  name: string;
  phone: string;
  image?: string;
  cc: string;
  email: string;
  district?: string;
  presentaddress: string;
  role: string;
  age?: number | null;
  profession: string;
  institution: string;
  experience: string;
  isActive: string;
  isVerified: boolean;
  tutionplace: string;
  tuitionmedium: string;
  isAvailable: true;
  tl_rate?: number | null;
  sl_rate?: number | null;
  ol_rate?: number | null;
  totalHours?: number;
  ref?: number;
  createdAt?: string;
  updatedAt?: string;
}



export interface UserRegPriceCalcPropsInterface {
  title: string;
  inputPriceChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  result: number | null;
  defaultDays: number;
  defaultEarn: number;
}

export interface UserRegFormPropsInterface {
  changeValidationPassed: any;
  noValidate: boolean;
  userId: number | null;
}

export interface UserNotificationInterface {
  id: number;
  type: string;
  comment: string;
  viewed: boolean;
  createdAt: TDateISO;
  updatedAt: TDateISO;
  CustomerId: number;
}
