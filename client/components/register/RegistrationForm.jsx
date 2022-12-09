/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { setCurrentUser, setUserFormsType, resetUser, setSelectedStep } from '../../redux/reducers/userReducer';
import { setErrorList, resetErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import axios from '../../config/axios';
import { SEND_CODE } from '../../config/keys';
import UserDetailInput from './UserDetailInput';
// import ClassSubjectInput from './ClassSubjectInput';
import ClassSubjectInput from '../user/Update/ClassSubjectForm';

function RegistrationForm() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.currentUser);
  const selectedStep = useSelector((state) => state.user.selectedStep);
  const selectedClasstypeList = useSelector((state) => state.classtype.selectedClasstypeList);
  const selectedSubjectList = useSelector((state) => state.subject.selectedSubjectList);

  const registerHandler = async (rhe) => {
    rhe.preventDefault();
    if (selectedClasstypeList.length === 0 || selectedSubjectList.length === 0) {
      return dispatch(setErrorList(['Please select a preffered class and a preffered subject']));
    }

    try {
      dispatch(toggleLoading(true));
      const userObj = { ...userInfo };
      userObj.SubjectId = selectedSubjectList;
      userObj.ClassTypeId = selectedClasstypeList;
      const response = await axios.put('/user/register', userObj, {
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(response);
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        dispatch(resetErrorList());
        dispatch(setUserFormsType(SEND_CODE));
        dispatch(resetUser());
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
    } finally {
      dispatch(toggleLoading(false));
    }
    return null;
  };

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setCurrentUser({ [iche.target.name]: iche.target.value }));
  };
  const inputRSChangeHandler = (irse) => {
    // console.log(irse.target.checked);
    dispatch(setCurrentUser({ [irse.target.name]: irse.target.checked }));
  };

  const stepBtnHandler = (sbhe, stepNo) => {
    sbhe.preventDefault();
    // validate previous state
    /**
     * @validate
     */
    /**     
    if (stepNo === 2) {
      if (
        userInfo.firstname === '' ||
        userInfo.phone === '' ||
        userInfo.lastname === '' ||
        userInfo.password === '' ||
        userInfo.password2 === '' ||
        userInfo.email === ''
      ) {
        return dispatch(setErrorList(['Fill all fields to go to the next step']));
      }
      if (userInfo.password !== userInfo.password2) {
        return dispatch(setErrorList(['Password did not patch']));
      }
      dispatch(resetErrorList());

      // const filter =
      //   /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      // if (filter.test(userInfo.email)) {
      //   // Yay! valid
      //   return dispatch(setErrorList(['Invalid email address']));
      // }
    }

    if (stepNo === 3) {
      if (userInfo.age === '' || userInfo.profession === '' || userInfo.institution === '' || userInfo.experience === '' || userInfo.location === '') {
        return dispatch(setErrorList(['Fill all fields to go to the next step']));
      }
    }
     */
    dispatch(resetErrorList());
    return dispatch(setSelectedStep(stepNo));
  };

  const showSteps = () => {
    if (selectedStep === 1) {
      // <Step1
      //   update={false}
      //   inputChangeHandler={inputChangeHandler}
      //   nextStepHandler={(sbhe) => stepBtnHandler(sbhe, selectedStep + 1)}
      // />
      return <UserDetailInput inputChangeHandler={inputChangeHandler} userInfo={userInfo} inputRSChangeHandler={inputRSChangeHandler} />;
    }

    if (selectedStep === 2) {
      return <ClassSubjectInput inputChangeHandler={inputChangeHandler} userInfo={userInfo} inputRSChangeHandler={inputRSChangeHandler} />;
    }
    return <UserDetailInput inputChangeHandler={inputChangeHandler} userInfo={userInfo} inputRSChangeHandler={inputRSChangeHandler} />;
  };

  return (
    <div className="RegistrationForm section">
      <h1 className="Register">Register</h1>
      <div className="steps row mb-3 mx-0">
        <div className="btn-group p-0" role="group" aria-label="Basic example">
          <button type="button" onClick={(sbhe) => stepBtnHandler(sbhe, 1)} className={selectedStep === 1 ? 'btn btn-primary' : 'btn btn-secondary'}>
            Account
          </button>
          <button type="button" onClick={(sbhe) => stepBtnHandler(sbhe, 2)} className={selectedStep === 2 ? 'btn btn-primary' : 'btn btn-secondary'}>
            Classess
          </button>
        </div>
      </div>
      <form onSubmit={registerHandler}>
        {showSteps()}
        <div className="row mb-3">
          <button className="btn btn-primary w-fit mx-3" type="submit">
            Register
          </button>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col d-flex flex-column">
            <Link href="/user/login">
              <a className="text-decoration-underline text-capitalize text-dark">Already have an account?</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
