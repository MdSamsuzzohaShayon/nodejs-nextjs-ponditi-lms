/* eslint-disable no-unused-vars */
import React from 'react';
import { ResetPassReqInterface } from './userPageInterface';

export interface PassChangeReqPropsInterface {
  resetPassReq: ResetPassReqInterface;
  toNextStep: () => void;
  inputChangeHandler: (ice: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SendCodeToPhoneOrEmailInterface {
  phone?: string;
  email?: string;
}

export interface VerifyPhoneOrEmailInterface extends SendCodeToPhoneOrEmailInterface {
  password: string;
  otp: string;
}
