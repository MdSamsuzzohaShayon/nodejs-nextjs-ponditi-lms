/* eslint-disable jsx-a11y/label-has-associated-control */
// React/next
import React, { useState } from 'react';
import Router from 'next/router';

// Config/utils
import axios from '../../../config/axios';

// Redux
import { resetErrorList, setErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import { resetChangeResetPassReq, setResetPassStep } from '../../../redux/reducers/userReducer';
import { useAppDispatch } from '../../../redux/store';

// Types
import { PassChangeReqPropsInterface, VerifyPhoneOrEmailInterface } from '../../../types/pages/passwordRecoverinterface';

function VerifyPassOtp({ resetPassReq, toNextStep, inputChangeHandler }: PassChangeReqPropsInterface) {
  const dispatch = useAppDispatch();
  let validationPassed = true;
  const [noValidate, setNoValidate] = useState(true);

  const redirectWithOTPHandler = async (rwoe: React.FormEvent<HTMLFormElement>) => {
    rwoe.preventDefault();
    setNoValidate(false);
    if (validationPassed === false) return null;

    dispatch(resetErrorList());
    if (resetPassReq.phoneoremail === '') {
      dispatch(setErrorList(['both field must be filled']));
    }

    const newObj: VerifyPhoneOrEmailInterface = {
      otp: resetPassReq.otp,
      password: resetPassReq.password,
    };
    if (resetPassReq.phoneoremail.toString().includes('@')) {
      newObj.email = resetPassReq.phoneoremail;
    } else {
      newObj.phone = resetPassReq.phoneoremail;
    }


    try {
      dispatch(toggleLoading(true));
      const response = await axios.put('/user/resetpassword', newObj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(resetChangeResetPassReq());
        dispatch(resetErrorList());
        dispatch(setResetPassStep(1));
        // navigate to next step
        dispatch(toggleLoading(false));
        // navigate('/user/login');
        Router.push('/user/login');
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
    return null;
  };

  const inputErrOTP = (otpNum: string) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (otpNum.length !== 6) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>OTP must be 6 charecter long</p>;
    }
    return null;
  };
  const inputErrPassword = (pass: string) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (pass.length < 6) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Password must be more than or equal 6 charecter.</p>;
    }
    return null;
  };
  const inputErrPassword2 = (pass: string, pass2: string) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (pass2.length < 6) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Password must be more than or equal 6 charecter.</p>;
    }
    if (pass !== pass2) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Password did not match.</p>;
    }
    return null;
  };

  return (
    <div className="VerifyPassOtp">
      <form onSubmit={redirectWithOTPHandler} noValidate={noValidate}>
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="otp">OTP code</label>
            <input type="number" className="form-control" name="otp" defaultValue={resetPassReq.otp} onChange={inputChangeHandler} />
            {inputErrOTP(resetPassReq.otp)}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="password">New Password</label>
            <input type="password" className="form-control" name="password" defaultValue={resetPassReq.password} onChange={inputChangeHandler} />
            {inputErrPassword(resetPassReq.password)}
          </div>
          <div className="col-md-6">
            <label htmlFor="password2">Confirm New Password</label>
            <input type="password" className="form-control" name="password2" defaultValue={resetPassReq.password2} onChange={inputChangeHandler} />
            {inputErrPassword2(resetPassReq.password, resetPassReq.password2)}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <button type="submit" className="btn btn-primary w-fit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VerifyPassOtp;
