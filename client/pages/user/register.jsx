/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { openModal, toggleLoading } from '../../redux/reducers/elementsSlice';
import CustomModal from '../../components/elements/CustomModal';
import axios from '../../config/axios';
import Loader from '../../components/elements/Loader';
import Layout from '../../components/layouts/Layout';
import {
  resetUser,
  setCurrentUser,
  setOtpCode,
} from '../../redux/reducers/userReducer';

const REGISTER = 'REGISTER';
const SENDCODE = 'SENDCODE';
const VERIFY = 'VERIFY';

function register() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);
  const otpCode = useSelector((state) => state.user.otpCode);

  const [errMsg, setErrMsg] = useState(null);
  const [registerForm, setRegisterForm] = useState(REGISTER);
  // const [sendCodeForm, setSendCodeForm] = useState(false);

  // eslint-disable-next-line consistent-return
  const registerHandler = async (rhe) => {
    rhe.preventDefault();
    if (userInfo.password !== userInfo.password2) {
      return setErrMsg('Password did not matched');
    }
    if (userInfo.password.length < 5) {
      return setErrMsg('Password must be 5 charecter long');
    }

    try {
      const response = await axios.post('/user/register', userInfo, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      if (
        response.status === 202 ||
        response.status === 201 ||
        response.status === 200
      ) {
        setRegisterForm(VERIFY);

        // Open Modal
        setErrMsg(null);
        dispatch(
          openModal({
            heading: 'Validate your email!',
            body: response.data.msg,
          })
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrMsg(error.response.data.msg);
      }
    }
  };

  const codeVerificationHandler = (cvhe) => {
    cvhe.preventDefault();
    setRegisterForm(SENDCODE);
  };

  const verifyCodeHandler = async (vhe) => {
    vhe.preventDefault();
    try {
      const response = await axios.put(
        '/user/verifyotp',
        { otp: otpCode,        
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        dispatch(resetUser());
        Router.push('/user/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setCurrentUser({ [iche.target.name]: iche.target.value }));
  };

  const otpInputChange = (oece) => {
    dispatch(setOtpCode(oece.target.value));
  };

  // if (isLoading) {
  //   return <Loader />;
  // }

  // const fetchAPi = async () => {
  //   const response = await axios.get('/test', {
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   console.log(response);
  // };

  // useEffect(() => {
  //   fetchAPi();
  // }, []);


  const numberCheckHandler=(nche)=>{
    nche.preventDefault();
    setRegisterForm(SENDCODE);
  }

  const resendCodeHandler = async (rche) => {
    rche.preventDefault();
    setRegisterForm(VERIFY);
    try {
      const response = await axios.put(
        '/user/resendotp',
        { phone: userInfo.phone },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const showContent = () => {
    if (registerForm === REGISTER) {
      return (
        <>
          <h1 className="Register">Register</h1>
          {errMsg && <p className="alert alert-danger">{errMsg}</p>}
          <form onSubmit={registerHandler}>
            <div className="row mb-3">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                required
                className="form-control"
                name="firstname"
                id="firstname"
                defaultValue={userInfo.firstname}
                onChange={inputChangeHandler}
                placeholder="Firstname"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                required
                className="form-control"
                name="lastname"
                id="lastname"
                defaultValue={userInfo.lastname}
                onChange={inputChangeHandler}
                placeholder="Lastname"
              />
            </div>

            <div className="row mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                required
                className="form-control"
                name="phone"
                id="phone"
                defaultValue={userInfo.phone}
                onChange={inputChangeHandler}
                placeholder="phone"
              />
            </div>

            <div className="row mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                className="form-control"
                name="email"
                id="email"
                defaultValue={userInfo.email}
                onChange={inputChangeHandler}
                placeholder="email"
              />
            </div>

            <div className="row mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                className="form-control"
                name="password"
                id="password"
                defaultValue={userInfo.password}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password2"
                required
                className="form-control"
                name="password2"
                id="password2"
                defaultValue={userInfo.password2}
                onChange={inputChangeHandler}
              />
            </div>

            <div className="row mb-3">
              <label htmlFor="role">Register as</label>
              <select
                name="role"
                id="role"
                onChange={inputChangeHandler}
                defaultValue={userInfo.role}
              >
                <option value="TEACHER">Teacher</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>

            <div className="row mb-3">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                required
                className="form-control"
                name="age"
                id="age"
                defaultValue={userInfo.age}
                onChange={inputChangeHandler}
                placeholder="age"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="profession">Profession</label>
              <input
                type="text"
                required
                className="form-control"
                name="profession"
                id="profession"
                defaultValue={userInfo.profession}
                onChange={inputChangeHandler}
                placeholder="profession"
              />
            </div>

            <div className="row mb-3">
              <label htmlFor="institution">Institution</label>
              <input
                type="text"
                required
                className="form-control"
                name="institution"
                id="institution"
                defaultValue={userInfo.institution}
                onChange={inputChangeHandler}
                placeholder="institution"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="subjects">Subjects (Comma seperated list)</label>
              <input
                type="text"
                required
                className="form-control"
                name="subjects"
                id="subjects"
                defaultValue={userInfo.subjects}
                onChange={inputChangeHandler}
                placeholder="subjects"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="experience">Experience</label>
              <input
                type="text"
                required
                className="form-control"
                name="experience"
                id="experience"
                defaultValue={userInfo.experience}
                onChange={inputChangeHandler}
                placeholder="Experience"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="location">location</label>
              <input
                type="text"
                required
                className="form-control"
                name="location"
                id="location"
                defaultValue={userInfo.name}
                onChange={inputChangeHandler}
                placeholder="location"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="degree">Education/Degree</label>
              <input
                type="text"
                required
                className="form-control"
                name="degree"
                id="degree"
                defaultValue={userInfo.degree}
                onChange={inputChangeHandler}
                placeholder="degree"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="major">Major</label>
              <input
                type="text"
                required
                className="form-control"
                name="major"
                id="major"
                defaultValue={userInfo.major}
                onChange={inputChangeHandler}
                placeholder="major"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="passing_year">Passing Year</label>
              <input
                type="number"
                required
                className="form-control"
                name="passing_year"
                id="passing_year"
                defaultValue={userInfo.passing_year}
                onChange={inputChangeHandler}
                placeholder="passing_year"
              />
            </div>
            <div className="row mb-3">
              <label htmlFor="cgpa">CGPA</label>
              <input
                type="number"
                required
                className="form-control"
                name="cgpa"
                id="cgpa"
                defaultValue={userInfo.cgpa}
                onChange={inputChangeHandler}
                placeholder="cgpa"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
            <button
              onClick={codeVerificationHandler}
              className="btn btn-primary"
            >
              Need verification?
            </button>
          </form>
        </>
      );
    }
    if (registerForm === SENDCODE) {
      return (
        <>
          <h1 className="Register">Send Code</h1>
          <form onSubmit={resendCodeHandler}>
            <div className="row mb-3">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                required
                className="form-control"
                name="phone"
                id="phone"
                defaultValue={userInfo.phone}
                onChange={inputChangeHandler}
                placeholder="phone"
              />
            </div>

            <button className="btn btn-primary" >
              Resend code
            </button>
          </form>
        </>
      );
    }
    return (
      <>
        <h1 className="Register">Verify code</h1>
        <form onSubmit={verifyCodeHandler}>
          <div className="row mb-3">
            <label htmlFor="otp">OTP Code</label>
            <input
              type="text"
              required
              className="form-control"
              name="otp"
              id="otp"
              defaultValue=""
              onChange={otpInputChange}
              placeholder="otp"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Verify
          </button>
          <button className="btn btn-primary" onClick={resendCodeHandler}>
            Resend code
          </button>
          <button type="submit" className="btn btn-primary" onClick={numberCheckHandler}>
            Number check
          </button>
        </form>
      </>
    );
  };

  return (
    <Layout>
      <div className="Register">
        <div className="container">{showContent()}</div>
      </div>
    </Layout>
  );
}

export default register;
