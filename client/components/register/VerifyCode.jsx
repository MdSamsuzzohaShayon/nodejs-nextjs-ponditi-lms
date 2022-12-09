/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { setCurrentUser, setUserFormsType, setVerifyCode, resetVerifyCode, setHasPhone } from '../../redux/reducers/userReducer';
import axios from '../../config/axios';
import { SEND_CODE, TS_SELECT, VERIFY_CODE } from '../../config/keys';
import { setErrorList, resetErrorList, toggleLoading, setSuccessMessageList } from '../../redux/reducers/elementsSlice';

function VerifyCode() {
  const dispatch = useDispatch();
  const verifyCode = useSelector((state) => state.user.verifyCode);
  const hasPhone = useSelector((state) => state.user.hasPhone);
  const sendOTP = useSelector((state) => state.user.sendOTP);

  const submitVerifyCodeHandler = async (vhe) => {
    vhe.preventDefault();
    if (verifyCode.phone === '' || verifyCode.otp === '') {
      dispatch(setErrorList(['Invalid phone or OTP']));
    }
    // console.log(verifyCode);

    // Only For Bangladesh
    try {
      dispatch(toggleLoading(true));
      const response = await axios.put('/user/verifyotp', verifyCode, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        // dispatch(resetUser());
        // Router.push('/user/login');
        dispatch(resetErrorList());
        dispatch(setCurrentUser({ phone: verifyCode.phone }));
        dispatch(setUserFormsType(TS_SELECT));
        dispatch(resetVerifyCode());
      }
    } catch (error) {
      if (error?.response?.data?.msg) {
        // console.log(error.response);
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
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

  const resendCodeHandler = async (rce) => {
    rce.preventDefault();
    const otpObj = { ...sendOTP };
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/user/sendotp', otpObj, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201 || response.status === 208) {
        // const phoneWithSuffix = otpObj.cc[otpObj.cc.length - 1] + otpObj.phone;
        dispatch(setVerifyCode({ phone: otpObj.phone, otp: '' }));
        dispatch(setHasPhone(true));
        dispatch(setUserFormsType(VERIFY_CODE));
        // dispatch(resetErrorList());
      }
      dispatch(setSuccessMessageList([response.data.msg]));
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      } else {
        dispatch(setErrorList(['Request unsuccessfull']));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
    return null;
  };

  return (
    <div className="VerifyCode section">
      <h1 className="Register">Verify code</h1>
      <form onSubmit={submitVerifyCodeHandler}>
        {!hasPhone && (
          <div className="row mb-3">
            <div className="col-md-12">
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
          </div>
        )}
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="otp">OTP Code</label>
            <input type="text" required className="form-control" name="otp" id="otp" defaultValue="" onChange={inputChangeHandler} placeholder="E.g. 273647" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-fit">
              Verify
            </button>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col d-flex flex-column">
            {sendOTP.phone && sendOTP.phone !== '' ? (
              <a href="#" className="text-decoration-underline text-capitalize text-dark" onClick={resendCodeHandler}>
                Resend code
              </a>
            ) : (
              <a href="#" className="text-decoration-underline text-capitalize text-dark" onClick={sendCodeSegment}>
                Need code?
              </a>
            )}

            <Link href="/user/login">
              <a className="text-decoration-underline text-capitalize text-dark">Already have an account?</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VerifyCode;
