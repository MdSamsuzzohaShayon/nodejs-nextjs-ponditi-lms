/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import axios from '../../config/axios';
import {
  setSendOTP,
  setUserFormsType,
  setVerifyCode,
  setHasPhone,
} from '../../redux/reducers/userReducer';
import {
  setErrorList,
  setSuccessMessageList,
} from '../../redux/reducers/elementsSlice';
import countryPhoneCodes from '../../data/countryPhoneCode.json';
import { VERIFY_CODE } from '../../config/keys';

function SendCode() {
  const dispatch = useDispatch();
  const sendOTP = useSelector((state) => state.user.sendOTP);
  // duplicate
  const sendCodeHandler = async (rche) => {
    rche.preventDefault();
    if (sendOTP.phone.length < 3) {
      dispatch(setErrorList(['Seems this number is not valid']));
    }
    // setRegisterForm(VERIFY);
    try {
      const response = await axios.post('/user/sendotp', sendOTP, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201 || response.status === 208) {
        const phoneWithSuffix =
          sendOTP.cc[sendOTP.cc.length - 1] + sendOTP.phone;
        dispatch(setVerifyCode({ phone: phoneWithSuffix, otp: '' }));
        dispatch(setHasPhone(true));
        dispatch(setUserFormsType(VERIFY_CODE));
      }
      dispatch(setSuccessMessageList([response.data.msg]));
    } catch (error) {
      // console.log(error);
      if (error?.response?.status === 406) {
        // console.log(error.response);
        dispatch(setErrorList([error.response.data.msg]));
      } else {
        dispatch(setErrorList(['Request unsuccessfull']));
      }
    }
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

  return (
    <section className="SendCode">
      <h1 className="Register">Send Code</h1>
      <form onSubmit={sendCodeHandler}>
        <label htmlFor="phone">Phone Number</label>
        <div className="input-group mb-3">
          <select
            name="cc"
            id="cc"
            className="form-select"
            defaultValue={sendOTP.cc}
            onChange={inputChangeHandler}
          >
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
                <option
                  key={idx}
                  value={`+${cpc.code}`}
                >{`+${cpc.code} (${cpc.iso})`}</option>
              )
              // <option value="1">1</option>
            )}
          </select>
          <input
            type="text"
            onChange={inputChangeHandler}
            name="phone"
            className="form-control"
          />
        </div>
        <div className="row mx-0 mb-3">
          <button type="submit" className="w-fit btn btn-primary">
            Register
          </button>
        </div>
        <div className="row mx-0 mb-3 text-dark">
          <a href="#" className="text-dark" onClick={verifyCodeSegment}>
            Verify your existing code.
          </a>
          <Link href="/user/login" >Already have an account?</Link>
        </div>
      </form>
    </section>
  );
}

export default SendCode;
