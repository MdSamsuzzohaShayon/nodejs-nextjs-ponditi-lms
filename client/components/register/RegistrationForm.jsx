/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { setRegisterableUser } from '../../redux/reducers/userReducer';
import { setSelectedTuitionm } from '../../redux/reducers/tuitionmReducer';
import { setSelectedClasstype } from '../../redux/reducers/classtypeReducer';
import { setOpenPriceCalc, setPageYOffset } from '../../redux/reducers/elementsSlice';
import { roles, GOOGLE_PLACE_API_KEY, libraries } from '../../config/keys';
import Loader from '../elements/Loader';
import PriceCalculator from '../elements/PriceCalculator';
import useMedieQuery from '../../hooks/useMediaQuery';

const { TEACHER, STUDENT } = roles;

const online = 'online';
const tl = 'tl';
const sl = 'sl';

function RegistrationForm(props) {
  const dispatch = useDispatch();
  const breakpointSm = useMedieQuery(768);

  const pyInputEl = useRef(null);
  const rateInputOlEl = useRef(null);
  const rateInputTlEl = useRef(null);
  const rateInputSlEl = useRef(null);
  /**
   * @api for google places
   */
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    googleMapsApiKey: GOOGLE_PLACE_API_KEY,
    libraries,
  });

  // const registerableUser = useSelector((state) => state.user.currentUser);
  const registerableUser = useSelector((state) => state.user.registerableUser);
  const tuitionmList = useSelector((state) => state.tuitionm.tuitionmList);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);

  /**
   * Using states because we are not going to need this in another component
   */
  const [autocomplete, setAutocomplete] = useState(null);

  // For calculating price
  const [selectedStyleItem, setSelectedStyleItem] = useState(online);
  const [calculatorTitle, setCalculatorTitle] = useState('untitled');
  const initialDaysOfMonth = 15;
  const initialMonthlyEarning = 3000;
  const [daysOfMonth, setDaysOfMonth] = useState(initialDaysOfMonth);
  const [daysOfMonthOl, setDaysOfMonthOl] = useState(initialDaysOfMonth);
  const [daysOfMonthSl, setDaysOfMonthSl] = useState(initialDaysOfMonth);
  const [daysOfMonthTl, setDaysOfMonthTl] = useState(initialDaysOfMonth);
  const [monthlyEarning, setMonthlyEarning] = useState(initialMonthlyEarning);
  const [monthlyEarningOl, setMonthlyEarningOl] = useState(initialMonthlyEarning);
  const [monthlyEarningSl, setMonthlyEarningSl] = useState(initialMonthlyEarning);
  const [monthlyEarningTl, setMonthlyEarningTl] = useState(initialMonthlyEarning);
  const [calculateRate, setCalculateRate] = useState(null);

  // Display tuition styles input field
  const [displayTuitionOl, setDisplayTuitionOl] = useState(false);
  const [displayTuitionSl, setDisplayTuitionSl] = useState(false);
  const [displayTuitionTl, setDisplayTuitionTl] = useState(false);

  const inputTuitionStyleHandler = (itse) => {
    switch (itse.target.name) {
      case online:
        setDisplayTuitionOl((prevState) => !prevState);
        break;
      case tl:
        setDisplayTuitionTl((prevState) => !prevState);
        break;
      case sl:
        setDisplayTuitionSl((prevState) => !prevState);
        break;

      default:
        break;
    }
    if (itse.target.checked) {
      // add new item
      dispatch(setRegisterableUser({ tutionplace: [...registerableUser.tutionplace, itse.target.name.toUpperCase()] }));
    } else {
      // Remove deselected item
      const newRegisterableUser = registerableUser.tutionplace.filter((ru) => ru.toUpperCase() !== itse.target.name.toUpperCase());
      dispatch(setRegisterableUser({ tutionplace: newRegisterableUser }));
    }
    // (e) => setDisplayTuitionOl((prevState) => !prevState)
  };

  const openPriceCalcHandler = (opce, inputName) => {
    opce.preventDefault();
    // window.pageYOffset
    dispatch(setPageYOffset(window.pageYOffset));
    setSelectedStyleItem(inputName);
    switch (inputName) {
      case online:
        setCalculatorTitle('Online rate');
        setCalculateRate(registerableUser.ol_rate);
        setMonthlyEarning(monthlyEarningOl);
        setDaysOfMonth(daysOfMonthOl);
        break;
      case tl:
        setCalculatorTitle("Teacher's location rate");
        setCalculateRate(registerableUser.tl_rate);
        setMonthlyEarning(monthlyEarningTl);
        setDaysOfMonth(daysOfMonthTl);
        break;
      case sl:
        setCalculatorTitle("Student's Location rate");
        setCalculateRate(registerableUser.sl_rate);
        setMonthlyEarning(monthlyEarningSl);
        setDaysOfMonth(daysOfMonthSl);
        break;

      default:
        break;
    }
    dispatch(setOpenPriceCalc(true));
  };

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setRegisterableUser({ [iche.target.name]: iche.target.value }));
  };

  const inputRateChangeHandler = (irce) => {
    // console.log({ [irce.target.name]: parseInt(irce.target.value, 10) });
    dispatch(setRegisterableUser({ [irce.target.name]: parseInt(irce.target.value, 10) }));
  };

  const tuitionmChangeHandler = (tce) => {
    dispatch(setSelectedTuitionm([parseInt(tce.target.value, 10)]));
  };

  const classtypeChangeHandler = (tce) => {
    dispatch(setSelectedClasstype([parseInt(tce.target.value, 10)]));
  };
  const inputPriceChangeHandler = (ipce) => {
    // console.log({ [ipce.target.name]: ipce.target.value });
    let rate = 120;
    let earning = null;
    let days = null;
    if (ipce.target.name === 'monthly_earning') {
      earning = parseInt(ipce.target.value, 10);
      days = daysOfMonth;
      rate = (earning / daysOfMonth).toFixed(2);
    } else if (ipce.target.name === 'days_of_month') {
      earning = monthlyEarning;
      days = parseInt(ipce.target.value, 10);
      rate = (monthlyEarning / days).toFixed(2);
    }
    setCalculateRate(rate);
    switch (selectedStyleItem) {
      case online: {
        dispatch(setRegisterableUser({ ol_rate: parseInt(rate, 10) }));
        rateInputOlEl.current.value = rate;
        setMonthlyEarningOl(earning);
        setDaysOfMonthOl(days);
        break;
      }
      case sl: {
        dispatch(setRegisterableUser({ sl_rate: parseInt(rate, 10) }));
        rateInputSlEl.current.value = rate;
        setMonthlyEarningSl(earning);
        setDaysOfMonthSl(days);
        break;
      }
      case tl: {
        dispatch(setRegisterableUser({ tl_rate: parseInt(rate, 10) }));
        rateInputTlEl.current.value = rate;
        setMonthlyEarningTl(earning);
        setDaysOfMonthTl(days);
        break;
      }

      default:
        break;
    }
  };

  const inputRSChangeHandler = (irse) => {
    // console.log(irse.target.checked)
    dispatch(setRegisterableUser({ [irse.target.name]: irse.target.checked }));
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

  const commonCls = 'fs-6 fw-light text-danger';
  const inputEmptyPrevent = (userProp, text) => {
    if (userProp === '' || userProp === null) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>{text} can not be empty</p>;
    }
    return null;
  };

  const inputTuitionStyleErr = () => {
    if (registerableUser.tutionplace.length < 1) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>You must select atleast one style</p>;
    }
    if (registerableUser.tutionplace.length > 0) {
      let errStr = '';
      let passed = true;
      if (displayTuitionOl) {
        if (registerableUser.ol_rate === null || registerableUser.ol_rate === '') {
          passed = false;
          errStr += 'Online, ';
        }
      }
      if (displayTuitionSl) {
        if (registerableUser.sl_rate === null || registerableUser.sl_rate === '') {
          passed = false;
          errStr += "Student's Location, ";
        }
      }
      if (displayTuitionTl) {
        if (registerableUser.tl_rate === null || registerableUser.tl_rate === '') {
          passed = false;
          errStr += "Teacher's Location ";
        }
      }
      if (passed) return null;
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Rates can not be empty for {errStr}</p>;
    }
    return null;
  };

  const placeChangedHandler = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    try {
      dispatch(setRegisterableUser({ presentaddress: `${autocomplete.getPlace().name}, ${autocomplete.getPlace().formatted_address}, (${lng}, ${lat})` }));
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
          <input type="text" className="form-control" name="name" id="name" defaultValue={registerableUser?.name} onChange={inputChangeHandler} required />
          {inputEmptyPrevent(registerableUser.name, 'Name')}
        </div>
        <div className="col-md-6">
          <label htmlFor="email">Email*</label>
          <input type="email" className="form-control" name="email" id="email" defaultValue={registerableUser?.email} onChange={inputChangeHandler} required />
          {inputEmptyPrevent(registerableUser.email, 'Email')}
        </div>
      </div>
      <div className="row mb-3">
        {registerableUser.role === TEACHER && (
          <div className="col-md-6">
            <label htmlFor="profession">Profession*</label>
            <input
              type="profession"
              className="form-control"
              name="profession"
              id="profession"
              defaultValue={registerableUser?.profession}
              onChange={inputChangeHandler}
            />
            {inputEmptyPrevent(registerableUser.profession, 'Profession')}
          </div>
        )}

        <div className={registerableUser.role !== TEACHER ? 'col-md-12' : 'col-md-6'}>
          <label htmlFor="institution">Institution*</label>
          <input
            type="institution"
            className="form-control"
            name="institution"
            id="institution"
            defaultValue={registerableUser?.institution}
            onChange={inputChangeHandler}
            required
          />
          {inputEmptyPrevent(registerableUser.institution, 'Institution')}
        </div>
      </div>

      <div className="row mb-3">
        {registerableUser.role === TEACHER && (
          <div className="col-md-6">
            <label htmlFor="experience">Experience(years)*</label>
            <input type="number" className="form-control" name="experience" id="experience" defaultValue={registerableUser?.experience} onChange={inputChangeHandler} />
            {inputEmptyPrevent(registerableUser.experience, 'Experience')}
          </div>
        )}

        <div className={registerableUser.role !== TEACHER ? 'col-md-12' : 'col-md-6'}>
          {/* Replace this with present address and use google map api  */}
          <label htmlFor="district">Present Address*</label>
          <Autocomplete onLoad={onLoadHandler} onPlaceChanged={placeChangedHandler} className="form-control p-0">
            <input type="text" className="form-control" id="presentaddress" name="presentaddress" onChange={inputChangeHandler} />
          </Autocomplete>
          {inputEmptyPrevent(registerableUser.presentaddress, 'Location')}
        </div>
      </div>

      {registerableUser.role === TEACHER && (
        <>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstname">highest Education*</label>
              <input type="text" className="form-control" name="degree" id="degree" defaultValue={registerableUser?.degree} onChange={inputChangeHandler} />
              {inputEmptyPrevent(registerableUser.degree, 'Degree')}
            </div>
            <div className="col-md-6">
              <label htmlFor="major">Major / Subject*</label>
              <input type="text" className="form-control" name="major" id="major" defaultValue={registerableUser?.major} onChange={inputChangeHandler} />
              {inputEmptyPrevent(registerableUser.major, 'Major')}
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
                defaultValue={registerableUser?.passing_year}
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

          {/* Tuition style with calculator start  */}
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="tuitionstyle">Tuition Style*</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-item d-flex align-items-start justify-content-start flex-column">
                    <div className="form-check">
                      <input className="form-check-input" name={online} type="checkbox" onChange={inputTuitionStyleHandler} id={online} />
                      <label className="form-check-label" htmlFor={online}>
                        Online
                      </label>
                    </div>
                  </div>
                  {displayTuitionOl && (
                    <div className="price-form">
                      <div className="input-group mb-3">
                        <div className="d-flex p-0">
                          <input
                            type="number"
                            className="form-control price-input-field"
                            ref={rateInputOlEl}
                            defaultValue={registerableUser?.ol_rate}
                            name="ol_rate"
                            placeholder="Rate"
                            onChange={inputRateChangeHandler}
                          />
                          <span className="input-group-text calculator-icon-span">
                            <img src="/icons/calculator.svg" alt="" onClick={(e) => openPriceCalcHandler(e, online)} role="button" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <div className="input-item d-flex align-items-start justify-content-start flex-column">
                    <div className="form-check">
                      <input className="form-check-input" name={tl} type="checkbox" onChange={inputTuitionStyleHandler} id={tl} />
                      <label className="form-check-label" htmlFor={tl}>
                        Teacher&apos;s location
                      </label>
                    </div>
                  </div>
                  {displayTuitionTl && (
                    <div className="price-form">
                      <div className="input-group mb-3">
                        <div className="d-flex p-0">
                          <input
                            type="number"
                            className="form-control price-input-field"
                            ref={rateInputTlEl}
                            onChange={inputRateChangeHandler}
                            defaultValue={registerableUser?.tl_rate}
                            id="tl_rate"
                            name="tl_rate"
                            placeholder="Rate"
                          />
                          <span className="input-group-text calculator-icon-span">
                            <img src="/icons/calculator.svg" alt="" onClick={(e) => openPriceCalcHandler(e, tl)} role="button" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-3">
                  <div className="input-item d-flex align-items-start justify-content-start flex-column">
                    <div className="form-check">
                      <input className="form-check-input" name={sl} type="checkbox" onChange={inputTuitionStyleHandler} id={sl} />
                      <label className="form-check-label" htmlFor={sl}>
                        Student&apos;s location
                      </label>
                    </div>
                  </div>
                  {displayTuitionSl && (
                    <div className="price-form">
                      <div className="input-group mb-3">
                        <div className="d-flex p-0">
                          <input
                            type="number"
                            className="form-control price-input-field"
                            ref={rateInputSlEl}
                            onChange={inputRateChangeHandler}
                            defaultValue={registerableUser?.sl_rate}
                            id="sl_rate"
                            name="sl_rate"
                            placeholder="Rate"
                          />
                          <span className="input-group-text calculator-icon-span">
                            <img src="/icons/calculator.svg" alt="" onClick={(e) => openPriceCalcHandler(e, sl)} role="button" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* tutionplace */}
              {inputTuitionStyleErr()}
            </div>
          </div>
          <PriceCalculator
            title={calculatorTitle}
            inputPriceChangeHandler={inputPriceChangeHandler}
            result={calculateRate}
            defaultDays={daysOfMonth}
            defaultEarn={monthlyEarning}
          />
          {/* Tuition style with calculator end */}
        </>
      )}

      {registerableUser.role === STUDENT && (
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="tutionm">Medium*</label>
            <select className="form-control" name="tutionm" id="tutionm" defaultValue={tuitionmList[0]?.id} onChange={tuitionmChangeHandler}>
              <option value="0" selected>
                Select a medium
              </option>
              {tuitionmList.map((tm) => (
                <option value={tm.id} key={tm.id}>
                  {tm.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="classtype">Class Name*</label>
            <select className="form-control" name="classtype" id="classtype" onChange={classtypeChangeHandler}>
              <option value="0" selected>
                Select a class
              </option>
              {classtypeList.map((ct) => (
                <option value={ct.id} key={ct.id}>
                  {ct.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="ref">Reference no.(Optional)</label>
          <input type="number" onChange={inputChangeHandler} name="ref" id="ref" className="form-control" />
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
