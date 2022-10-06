/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import FormStep from './FormStep';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import {
  setSelectedStep,
  setCurrentUser,
  resetCurrentUser,
} from '../../redux/reducers/userReducer';
import {
  setErrorList,
  resetErrorList,
} from '../../redux/reducers/elementsSlice';
import axios from '../../config/axios';

function RegistrationForm() {
  const dispatch = useDispatch();

  const selectedStep = useSelector((state) => state.user.selectedStep);
  const userInfo = useSelector((state) => state.user.currentUser);

  const stepBtnHandler = (sbhe, stepNo) => {
    sbhe.preventDefault();
    // validate previous state
    if (stepNo === 2) {
      if (
        userInfo.firstname === '' ||
        userInfo.phone === '' ||
        userInfo.lastname === '' ||
        userInfo.password === '' ||
        userInfo.password2 === '' ||
        userInfo.email === ''
      ) {
        return dispatch(
          setErrorList(['Fill all fields to go to the next step'])
        );
      }
      if (userInfo.password !== userInfo.password2) {
        return dispatch(setErrorList(['Password did not patch']));
      }

      // const filter =
      //   /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      // if (filter.test(userInfo.email)) {
      //   // Yay! valid
      //   return dispatch(setErrorList(['Invalid email address']));
      // }
    }

    if (stepNo === 3) {
      if (
        userInfo.age === '' ||
        userInfo.profession === '' ||
        userInfo.institution === '' ||
        userInfo.experience === '' ||
        userInfo.location === ''
      ) {
        return dispatch(
          setErrorList(['Fill all fields to go to the next step'])
        );
      }
    }
    dispatch(resetErrorList());
    return dispatch(setSelectedStep(stepNo));
  };

  const registerHandler = async (rhe) => {
    rhe.preventDefault();
    if (userInfo.password !== userInfo.password2) {
      return dispatch(setErrorList(['Password did not match']));
    }
    if (userInfo.password.length < 6) {
      return dispatch(setErrorList(['Password must be more than 6 charecter long']));
    }

    try {
      const response = await axios.put('/user/register', userInfo, {
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(response);
      if (
        response.status === 202 ||
        response.status === 201 ||
        response.status === 200
      ) {
        dispatch(resetErrorList());
        dispatch(resetCurrentUser());
        Router.push('/user/login');
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error?.response?.data?.msg) {
          dispatch(setErrorList([error.response.data.msg]));
        }
        // setErrMsg(error.response.data.msg);
      }
    }
  };

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setCurrentUser({ [iche.target.name]: iche.target.value }));
  };

  const showSteps = () => {
    if (selectedStep === 1) {
      return (
        <Step1
          update={false}
          inputChangeHandler={inputChangeHandler}
          nextStepHandler={(sbhe) => stepBtnHandler(sbhe, selectedStep + 1)}
        />
      );
    }
    if (selectedStep === 2) {
      return (
        <Step2
          update={false}
          inputChangeHandler={inputChangeHandler}
          nextStepHandler={(sbhe) => stepBtnHandler(sbhe, selectedStep + 1)}
        />
      );
    }
    return (
      <Step3
        update={false}
        inputChangeHandler={inputChangeHandler}
        nextStepHandler={registerHandler}
      />
    );
  };

  return (
    <div className="RegistrationForm">
      <h1 className="Register">Register</h1>
      <div className="steps row mb-3 mx-0">
        <div className="btn-group p-0" role="group" aria-label="Basic example">
          <button
            type="button"
            onClick={(sbhe) => stepBtnHandler(sbhe, 1)}
            className={
              selectedStep === 1 ? 'btn btn-primary' : 'btn btn-secondary'
            }
          >
            Account
          </button>
          <button
            type="button"
            onClick={(sbhe) => stepBtnHandler(sbhe, 2)}
            className={
              selectedStep === 2 ? 'btn btn-primary' : 'btn btn-secondary'
            }
          >
            Personal
          </button>
          <button
            type="button"
            onClick={(sbhe) => stepBtnHandler(sbhe, 3)}
            className={
              selectedStep === 3 ? 'btn btn-primary' : 'btn btn-secondary'
            }
          >
            Education
          </button>
        </div>
      </div>
      {/* {errMsg && <p className="alert alert-danger">{errMsg}</p>} */}
      <form onSubmit={registerHandler}>
        {/* <FormStep
          selectedStep={selectedStep}
          inputChangeHandler={inputChangeHandler}
          nextStepHandler={(sbhe) => stepBtnHandler(sbhe, selectedStep + 1)}
        /> */}
        {showSteps()}

        {/* <div className="row mb-3 mx-0">
          <Link href="/user/login">Already have an account?</Link>
        </div> */}
      </form>
    </div>
  );
}

export default RegistrationForm;
