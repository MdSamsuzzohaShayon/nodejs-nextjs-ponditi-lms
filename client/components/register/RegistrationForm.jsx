/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { setCurrentUser, setUserFormsType, resetUser, setSelectedStep } from '../../redux/reducers/userReducer';
import { setErrorList, resetErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';

function RegistrationForm(props) {
  const dispatch = useDispatch();
  const pyInputEl = useRef(null);
  const userInfo = useSelector((state) => state.user.currentUser);

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setCurrentUser({ [iche.target.name]: iche.target.value }));
  };
  const inputRSChangeHandler = (irse) => {
    // console.log(irse.target.checked);
    dispatch(setCurrentUser({ [irse.target.name]: irse.target.checked }));
  };

  const currentlyStudyHandler = (cse) => {
    // cse.preventDefault();
    inputRSChangeHandler(cse);
    if (cse.target.checked) {
      pyInputEl.current.disabled = true;
      pyInputEl.current.value = null;
    } else {
      pyInputEl.current.disabled = false;
    }
  };

  const inputErrName = (userName) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (userName.length < 2) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Name must be more than 1 charecter long</p>;
    }
    return null;
  };

  const inputErrEmail = (userEmail) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (userEmail === '' || userEmail === null || !userEmail.includes('@')) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Invalid email address</p>;
    }
    return null;
  };

  const inputErrProfession = (userProfession) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (userProfession === '' || userProfession === null) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Profession can not be empty</p>;
    }
    return null;
  };

  const inputErrInstitution = (userInstitution) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (userInstitution === '' || userInstitution === null) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Institution can not be empty</p>;
    }
    return null;
  };

  const inputErrLoc = (userLoc) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (userLoc === '' || userLoc === null) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Location can not be empty</p>;
    }
    return null;
  };

  const inputErrEdu = (userEdu) => {
    const commonCls = 'fs-6 fw-light text-danger';
    if (userEdu === '' || userEdu === null) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Education can not be empty</p>;
    }
    return null;
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="firstname">Name</label>
          <input type="text" className="form-control" name="name" id="name" defaultValue={userInfo?.name} onChange={inputChangeHandler} />
          {inputErrName(userInfo?.name)}
        </div>
        <div className="col-md-6">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" id="email" defaultValue={userInfo?.email} onChange={inputChangeHandler} />
          {inputErrEmail(userInfo?.email)}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="profession">Profession</label>
          <input type="profession" className="form-control" name="profession" id="profession" defaultValue={userInfo?.profession} onChange={inputChangeHandler} />
          {inputErrProfession(userInfo?.profession)}
        </div>
        <div className="col-md-6">
          <label htmlFor="institution">Institution</label>
          <input type="institution" className="form-control" name="institution" id="institution" defaultValue={userInfo?.institution} onChange={inputChangeHandler} />
          {inputErrInstitution(userInfo?.institution)}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="experience">Experience(years)</label>
          <input type="number" className="form-control" name="experience" id="experience" defaultValue={userInfo?.experience} onChange={inputChangeHandler} />
        </div>
        <div className="col-md-6">
          {/* Replace this with present address and use google map api  */}
          <label htmlFor="district">Location</label>
          <input type="text" className="form-control" name="district" id="district" defaultValue={userInfo?.district} onChange={inputChangeHandler} />
          {inputErrLoc(userInfo?.district)}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="firstname">height Education</label>
          <input type="text" className="form-control" name="degree" id="degree" defaultValue={userInfo?.degree} onChange={inputChangeHandler} />
          {inputErrEdu(userInfo?.degree)}
        </div>
        <div className="col-md-6">
          <label htmlFor="major">Major</label>
          <input type="text" className="form-control" name="major" id="major" defaultValue={userInfo?.major} onChange={inputChangeHandler} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="passing_year">Passing Year</label>
          <input
            type="number"
            className="form-control"
            name="passing_year"
            id="passing_year"
            ref={pyInputEl}
            defaultValue={userInfo?.passing_year}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="col-md-6 d-flex flex-row-reverse justify-content-end align-items-center">
          <label htmlFor="running_study">Currently running study</label>
          <input type="checkbox" name="running_study" className="mx-2" id="running_study" onChange={currentlyStudyHandler} />
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
