/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { setCurrentUser, setUserFormsType, resetUser, setSelectedStep } from '../../redux/reducers/userReducer';
import { setSelectedTuitionm } from '../../redux/reducers/tuitionmReducer';
import { setClasstypeList, setSelectedClasstype } from '../../redux/reducers/classtypeReducer';
import { roles, GOOGLE_PLACE_API_KEY, libraries } from '../../config/keys';
import Loader from '../elements/Loader';

const { TEACHER, STUDENT } = roles;

function RegistrationForm(props) {
  const dispatch = useDispatch();
  const pyInputEl = useRef(null);
  /**
   * @api for google places
   */
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    googleMapsApiKey: GOOGLE_PLACE_API_KEY,
    libraries,
  });

  const userInfo = useSelector((state) => state.user.currentUser);
  const tuitionmList = useSelector((state) => state.tuitionm.tuitionmList);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);

  const [autocomplete, setAutocomplete] = useState(null);
  const [daysOfMonth, setDaysOfMonth] = useState(15);
  const [monthlyEarning, setMonthlyEarning] = useState(3000);

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setCurrentUser({ [iche.target.name]: iche.target.value }));
  };

  const tuitionmChangeHandler = (tce) => {
    dispatch(setSelectedTuitionm([parseInt(tce.target.value, 10)]));
  };

  const classtypeChangeHandler = (tce) => {
    dispatch(setSelectedClasstype([parseInt(tce.target.value, 10)]));
  };

  const inputChangeDaysOfMonthHandler = (icdme) => {
    // icdme.preventDefault();
    const totalDays = parseInt(icdme.target.value, 10);
    setDaysOfMonth(totalDays);
    dispatch(setCurrentUser({ rate: monthlyEarning / totalDays }));
  };

  const inputRateChangeHandler = (irce) => {
    const monthlyEarningVal = parseInt(irce.target.value, 10);
    setMonthlyEarning(monthlyEarningVal);
    dispatch(setCurrentUser({ rate: monthlyEarningVal / daysOfMonth }));
  };

  const inputRSChangeHandler = (irse) => {
    // console.log(irse.target.checked)
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

  const placeChangedHandler = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    try {
      dispatch(setCurrentUser({ presentaddress: `${autocomplete.getPlace().name}, ${autocomplete.getPlace().formatted_address}, (${lng}, ${lat})` }));
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoaded) {
    return <Loader />;
  }
  const onLoadHandler = (ace) => {
    setAutocomplete(ace);
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="firstname">Name*</label>
          <input type="text" className="form-control" name="name" id="name" defaultValue={userInfo?.name} onChange={inputChangeHandler} required />
          {inputErrName(userInfo?.name)}
        </div>
        <div className="col-md-6">
          <label htmlFor="email">Email*</label>
          <input type="email" className="form-control" name="email" id="email" defaultValue={userInfo?.email} onChange={inputChangeHandler} required />
          {inputErrEmail(userInfo?.email)}
        </div>
      </div>
      <div className="row mb-3">
        {userInfo.role === TEACHER && (
          <div className="col-md-6">
            <label htmlFor="profession">Profession*</label>
            <input type="profession" className="form-control" name="profession" id="profession" defaultValue={userInfo?.profession} onChange={inputChangeHandler} />
            {inputErrProfession(userInfo?.profession)}
          </div>
        )}

        <div className={userInfo.role !== TEACHER ? 'col-md-12' : 'col-md-6'}>
          <label htmlFor="institution">Institution*</label>
          <input
            type="institution"
            className="form-control"
            name="institution"
            id="institution"
            defaultValue={userInfo?.institution}
            onChange={inputChangeHandler}
            required
          />
          {inputErrInstitution(userInfo?.institution)}
        </div>
      </div>

      <div className="row mb-3">
        {userInfo.role === TEACHER && (
          <div className="col-md-6">
            <label htmlFor="experience">Experience(years)*</label>
            <input type="number" className="form-control" name="experience" id="experience" defaultValue={userInfo?.experience} onChange={inputChangeHandler} />
          </div>
        )}

        <div className={userInfo.role !== TEACHER ? 'col-md-12' : 'col-md-6'}>
          {/* Replace this with present address and use google map api  */}
          <label htmlFor="district">Location*</label>
          <Autocomplete onLoad={onLoadHandler} onPlaceChanged={placeChangedHandler} className="form-control p-0">
            <input
              type="text"
              className="form-control"
              id="presentaddress"
              placeholder="presentaddress"
              name="presentaddress"
              defaultValue={userInfo.presentaddress}
              onChange={inputChangeHandler}
            />
          </Autocomplete>
          {inputErrLoc(userInfo?.presentaddress)}
        </div>
      </div>

      {userInfo.role === TEACHER && (
        <>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstname">height Education*</label>
              <input type="text" className="form-control" name="degree" id="degree" defaultValue={userInfo?.degree} onChange={inputChangeHandler} />
              {inputErrEdu(userInfo?.degree)}
            </div>
            <div className="col-md-6">
              <label htmlFor="major">Major*</label>
              <input type="text" className="form-control" name="major" id="major" defaultValue={userInfo?.major} onChange={inputChangeHandler} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="passing_year">Passing Year*</label>
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
              <label htmlFor="running_study" className="mt-4">
                Currently running study
              </label>
              <input type="checkbox" name="running_study" className="mx-2 mt-4" id="running_study" onChange={currentlyStudyHandler} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="monthly_earning">Total Monthly Earning</label>
              <input className="rate-inputs form-control" type="number" defaultValue={monthlyEarning} onChange={inputRateChangeHandler} />
            </div>
            <div className="col-md-4">
              <label htmlFor="monthly_earning">Total days of Month</label>
              <input className="rate-inputs form-control" type="number" defaultValue={daysOfMonth} onChange={inputChangeDaysOfMonthHandler} />
            </div>
            <div className="col-md-4">
              <label htmlFor="monthlyenarning" className="mt-4">
                Per hour rate Tk {userInfo?.rate.toFixed(2)}
              </label>
            </div>
          </div>
        </>
      )}

      {userInfo.role === STUDENT && (
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="tutionm">Medium</label>
            <select className="form-control" name="tutionm" id="tutionm" onChange={tuitionmChangeHandler}>
              {tuitionmList.map((tm) => (
                <option value={tm.id} key={tm.id}>
                  {tm.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="classtype">Class Name</label>
            <select className="form-control" name="classtype" id="classtype" onChange={classtypeChangeHandler}>
              {classtypeList.map((ct) => (
                <option value={ct.id} key={ct.id}>
                  {ct.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationForm;
