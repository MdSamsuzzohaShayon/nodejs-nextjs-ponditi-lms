/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import {
  setCurrentUser,
  setUserFormsType,
  setVerifyCode,
  resetVerifyCode,
  setHasPhone,
} from '../../redux/reducers/userReducer';
import axios from '../../config/axios';
import { SEND_CODE, REGISTER } from '../../config/keys';
import {
  setErrorList,
  resetErrorList,
  toggleLoading
} from '../../redux/reducers/elementsSlice';

function VerifyCode() {
  const dispatch = useDispatch();
  const verifyCode = useSelector((state) => state.user.verifyCode);
  const hasPhone = useSelector((state) => state.user.hasPhone);

  const submitVerifyCodeHandler = async (vhe) => {
    vhe.preventDefault();
    const verifyObj = {...verifyCode};
    if (verifyObj.phone === '' || verifyObj.otp === '') {
      dispatch(setErrorList(['Invalid phone or OTP']));
    }

    // Only For Bangladesh
    try {
      dispatch(toggleLoading(true));
      const response = await axios.put('/user/verifyotp', verifyObj, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        // dispatch(resetUser());
        // Router.push('/user/login');
        dispatch(resetErrorList());
        dispatch(setCurrentUser({ phone: verifyObj.phone }));
        dispatch(setUserFormsType(REGISTER));
        dispatch(resetVerifyCode());
      }
    } catch (error) {
      if (error?.response?.status === 406) {
        // console.log(error.response);
        dispatch(setErrorList([error.response.data.msg]));
      } else {
        dispatch(setErrorList(['Request unsuccessfull']));
      }
    }finally{
      dispatch(toggleLoading(false));
    }
  };

  const inputChangeHandler = (oece) => {
    dispatch(setVerifyCode({ [oece.target.name]: oece.target.value }));
  };

  const sendCodeSegment = (scse) => {
    scse.preventDefault();
    dispatch(setUserFormsType(SEND_CODE));
    dispatch(resetVerifyCode());
    dispatch(setHasPhone(false));
  };

  return (
    <div className="VerifyCode">
      <h1 className="Register">Verify code</h1>
      <form onSubmit={submitVerifyCodeHandler}>
        {!hasPhone && (
          <div className="row mb-3 mx-0">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              required
              className="form-control"
              name="phone"
              id="phone"
              defaultValue={verifyCode.phone}
              onChange={inputChangeHandler}
              placeholder="E.g. 017000000000"
            />
          </div>
        )}
        <div className="row mb-3 mx-0">
          <label htmlFor="otp">OTP Code</label>
          <input
            type="text"
            required
            className="form-control"
            name="otp"
            id="otp"
            defaultValue=""
            onChange={inputChangeHandler}
            placeholder="E.g. 273647"
          />
        </div>
        <div className="row mx-0 mb-3">
          <button type="submit" className="btn btn-primary w-fit">
            Verify
          </button>
        </div>
        <div className="row mx-0 mb-3">
          <a href="#" className="text-dark" onClick={sendCodeSegment}>
            Need code?
          </a>
          <Link href="/user/login">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}

export default VerifyCode;
