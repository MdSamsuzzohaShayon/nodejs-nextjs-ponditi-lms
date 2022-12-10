/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import axios from '../../config/axios';
import { setSendOTP, setUserFormsType, setVerifyCode, setHasPhone, resetSendOTP } from '../../redux/reducers/userReducer';
import { toggleLoading, setErrorList, setSuccessMessageList, resetErrorList } from '../../redux/reducers/elementsSlice';
import countryPhoneCodes from '../../data/countryPhoneCode.json';
import { VERIFY_CODE } from '../../config/keys';

function SendCode() {
  const dispatch = useDispatch();
  const formEl = useRef();
  const phnErrEl = useRef();
  let validationPassed = true;
  const [noValidate, setNoValidate] = useState(true);
  const sendOTP = useSelector((state) => state.user.sendOTP);

  // duplicate
  const sendCodeHandler = async (rche) => {
    rche.preventDefault();
    setNoValidate(false);
    const otpObj = { ...sendOTP };
    console.log(otpObj);
    // if (otpObj.phone.length < 3) {
    //   return dispatch(setErrorList(['Seems this number is not valid']));
    // }

    // console.log(validationPassed, 'above');

    if (validationPassed === false) return null;
    // console.log(validationPassed, 'beneth');
    // Only for bangladesh
    // if (otpObj.cc === '88' && otpObj.phone.length === 11) {
    //   otpObj.phone = otpObj.phone.substring(1);
    // }
    // console.log(otpObj);
    // setRegisterForm(VERIFY);
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
        // dispatch(resetSendOTP());
        dispatch(resetErrorList());
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

  // Duplicate
  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    // console.log({ [iche.target.name]: iche.target.value });
    dispatch(setSendOTP({ [iche.target.name]: iche.target.value }));
  };

  const verifyCodeSegment = (vcse) => {
    vcse.preventDefault();
    dispatch(setUserFormsType(VERIFY_CODE));
  };

  const phnNumInputErr = (phnNum) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (phnNum.length !== 11) {
      validationPassed = false;
      // console.log(validationPassed, 'phn num len err - ', render);
      return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Number must be 11 charecter long</p>;
    }
    if (phnNum[0] !== '0') {
      validationPassed = false;
      // console.log(validationPassed, 'phn num cc err - ', render);
      return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Number must start with 0</p>;
    }
    // console.log(validationPassed, 'phn num no err - ', render);
    // validationPassed = true;
    return null;
  };

  return (
    <section className="SendCode">
      <h1 className="Register">Send Code</h1>
      <form onSubmit={sendCodeHandler} className="needs-validation" noValidate={noValidate} ref={formEl}>
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-group mb-3">
              <select name="cc" id="cc" className="w-fit bg-white border-2 border-secondary phone-code" defaultValue={sendOTP.cc} onChange={inputChangeHandler}>
                {countryPhoneCodes.map(
                  (cpc, idx) => (
                    // const codeWithoutPlus =
                    //   sendOTP.cc[0] === '+' ? sendOTP.cc.substring(1) : sendOTP.cc;
                    // if (cpc.code === codeWithoutPlus) {
                    //   return (
                    //     <option key={idx} selected value={`+${cpc.code}`}>
                    //       {`+${cpc.code} (${cpc.iso})`}
                    //     </option>
                    //   );
                    // }
                    <option key={idx} value={`${cpc.code}`}>{`+${cpc.code} (${cpc.iso})`}</option>
                  )
                  // <option value="1">1</option>
                )}
              </select>
              <input type="text" onChange={inputChangeHandler} name="phone" className="form-control" defaultValue={sendOTP.phone} />
            </div>
            {phnNumInputErr(sendOTP.phone)}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <button type="submit" className="w-fit btn btn-primary">
              Register
            </button>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col d-flex flex-column">
            <a href="#" className="text-decoration-underline text-capitalize text-dark w-fit" onClick={verifyCodeSegment}>
              Verify your existing code.
            </a>
            <Link href="/user/login">
              <a className="text-decoration-underline text-capitalize text-dark w-fit">Already have an account?</a>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SendCode;
