/* eslint-disable react/destructuring-assignment */
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import Router from 'next/router';
import axios from '../../../config/axios';
import { resetErrorList, setErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import { resetChangeResetPassReq } from '../../../redux/reducers/userReducer';

function VerifyPassOtp(props) {
  const dispatch = useDispatch();
  let validationPassed = true;
  const [noValidate, setNoValidate] = useState(true);

  const redirectWithOTPHandler = async (rwoe) => {
    rwoe.preventDefault();
    setNoValidate(false);
    if (validationPassed === false) return null;

    dispatch(resetErrorList());
    if (props.resetPassReq.phoneoremail === '') {
      dispatch(setErrorList(['both field must be filled']));
    }

    const newObj = {};
    if (props.resetPassReq.phoneoremail.toString().includes('@')) {
      newObj.email = props.resetPassReq.phoneoremail;
    } else {
      newObj.phone = props.resetPassReq.phoneoremail;
    }
    newObj.otp = props.resetPassReq.otp;
    newObj.password = props.resetPassReq.password;

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
        // navigate to next step
        dispatch(toggleLoading(false));
        // navigate('/user/login');
        Router.push('/user/login');
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
    return null;
  };

  const inputErrOTP = (otpNum) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (otpNum.length !== 6) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>OTP must be 6 charecter long</p>;
    }
    return null;
  };
  const inputErrPassword = (pass) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (pass.length < 6) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Password must be more than or equal 6 charecter.</p>;
    }
    return null;
  };
  const inputErrPassword2 = (pass, pass2) => {
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
            <input type="number" className="form-control" name="otp" defaultValue={props.resetPassReq.otp} onChange={props.inputChangeHandler} />
            {inputErrOTP(props.resetPassReq.otp)}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="password">New Password</label>
            <input type="password" className="form-control" name="password" defaultValue={props.resetPassReq.password} onChange={props.inputChangeHandler} />
            {inputErrPassword(props.resetPassReq.password)}
          </div>
          <div className="col-md-6">
            <label htmlFor="password2">Confirm New Password</label>
            <input type="password" className="form-control" name="password2" defaultValue={props.resetPassReq.password2} onChange={props.inputChangeHandler} />
            {inputErrPassword2(props.resetPassReq.password, props.resetPassReq.password2)}
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
