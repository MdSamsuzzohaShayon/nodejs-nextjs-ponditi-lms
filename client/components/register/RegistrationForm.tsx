/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */

// React/next
import React, { useRef, useState } from 'react';

// Google API
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

// Redux
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setRegisterableUser } from '../../redux/reducers/userReducer';
import { setOpenPriceCalc, setPageYOffset } from '../../redux/reducers/elementsSlice';
import { setSelectedTuitionm } from '../../redux/reducers/tuitionmReducer';
import { setSelectedClasstype } from '../../redux/reducers/classtypeReducer';

// Utils/config
import { roles, GOOGLE_PLACE_API_KEY, libraries } from '../../config/keys';

// Components
import Loader from '../elements/Loader';
import PriceCalculator from '../elements/PriceCalculator';
import useMedieQuery from '../../hooks/useMediaQuery';
import ClassSubjectStudentForm from './ClassSubjectStudentForm';

// Types
import { UserRegFormPropsInterface } from '../../types/redux/userInterface';
import { UserRoleEnum, GenderEnum } from '../../types/enums';

const online = 'online';
const tl = 'tl';
const sl = 'sl';

const genderList = [
  {
    id: 1,
    val: GenderEnum.MALE,
  },
  {
    id: 2,
    val: GenderEnum.FEMALE,
  },
  {
    id: 3,
    val: GenderEnum.OTHERS,
  },
];

// Register form component
function RegistrationForm(props: UserRegFormPropsInterface) {
  // Hooks
  const dispatch = useAppDispatch();
  const breakpointSm = useMedieQuery(768);

  // Element reference
  const pyInputEl = useRef<HTMLInputElement | null>(null);
  const rateInputOlEl = useRef<HTMLInputElement | null>(null);
  const rateInputTlEl = useRef<HTMLInputElement | null>(null);
  const rateInputSlEl = useRef<HTMLInputElement | null>(null);

  /**
   * ========================================================================
   * @api for google places
   */
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    googleMapsApiKey: GOOGLE_PLACE_API_KEY,
    libraries,
  });

  // const registerableUser = useSelector((state) => state.user.currentUser);
  const registerableUser = useAppSelector((state) => state.user.registerableUser);

  /**
   * Using states because we are not going to need this in another component
   */
  const [autocomplete, setAutocomplete] = useState(null);

  /**
   * ========================================================================
   * LOCAL STATE FOR CALCULATING PRICE
   */
  const [selectedStyleItem, setSelectedStyleItem] = useState<string>(online);
  const [calculatorTitle, setCalculatorTitle] = useState<string>('untitled');
  const initialDaysOfMonth: number = 15;
  const initialMonthlyEarning: number = 3000;
  const [daysOfMonth, setDaysOfMonth] = useState<number>(initialDaysOfMonth);
  const [daysOfMonthOl, setDaysOfMonthOl] = useState<number>(initialDaysOfMonth);
  const [daysOfMonthSl, setDaysOfMonthSl] = useState<number>(initialDaysOfMonth);
  const [daysOfMonthTl, setDaysOfMonthTl] = useState<number>(initialDaysOfMonth);
  const [monthlyEarning, setMonthlyEarning] = useState<number>(initialMonthlyEarning);
  const [monthlyEarningOl, setMonthlyEarningOl] = useState<number>(initialMonthlyEarning);
  const [monthlyEarningSl, setMonthlyEarningSl] = useState<number>(initialMonthlyEarning);
  const [monthlyEarningTl, setMonthlyEarningTl] = useState<number>(initialMonthlyEarning);
  const [calculateRate, setCalculateRate] = useState<number | null>(null);

  /**
   * ========================================================================
   * LOCAL STATE FOR TUITION STYLE
   */
  const [displayTuitionOl, setDisplayTuitionOl] = useState<boolean>(false);
  const [displayTuitionSl, setDisplayTuitionSl] = useState<boolean>(false);
  const [displayTuitionTl, setDisplayTuitionTl] = useState<boolean>(false);

  /**
   * ========================================================================
   * CHANGE EVENT HANDLER 1
   */
  const inputTuitionStyleHandler = (itse: React.ChangeEvent<HTMLInputElement>) => {
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
      const newRegisterableUser = registerableUser.tutionplace.filter((ru: string) => ru.toUpperCase() !== itse.target.name.toUpperCase());
      dispatch(setRegisterableUser({ tutionplace: newRegisterableUser }));
    }
    // (e) => setDisplayTuitionOl((prevState) => !prevState)
  };
  // CHANGE EVENT HANDLER 2
  const inputChangeHandler = (iche: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // iche.preventDefault();
    dispatch(setRegisterableUser({ [iche.target.name]: iche.target.value }));
  };
  // CHANGE EVENT HANDLER 3
  const inputRateChangeHandler = (irce: React.ChangeEvent<HTMLInputElement>) => {
    // console.log({ [irce.target.name]: parseInt(irce.target.value, 10) });
    dispatch(setRegisterableUser({ [irce.target.name]: parseInt(irce.target.value, 10) }));
  };
  // CHANGE EVENT HANDLER 4
  const inputPriceChangeHandler = (ipce: React.ChangeEvent<HTMLInputElement>) => {
    // console.log({ [ipce.target.name]: ipce.target.value });
    let rate: number = 120;
    let earning: number | null = null;
    let days = null;
    if (ipce.target.name === 'monthly_earning') {
      earning = parseInt(ipce.target.value, 10);
      days = daysOfMonth;
      rate = parseInt((earning / daysOfMonth).toFixed(2), 10);
    } else if (ipce.target.name === 'days_of_month') {
      earning = monthlyEarning;
      days = parseInt(ipce.target.value, 10);
      rate = parseInt((monthlyEarning / days).toFixed(2), 10);
    }
    setCalculateRate(rate);
    switch (selectedStyleItem) {
      case online: {
        dispatch(setRegisterableUser({ ol_rate: rate }));
        if (rateInputOlEl && rateInputOlEl.current) {
          rateInputOlEl.current.value = rate.toString();
        }
        if (earning) {
          setMonthlyEarningOl(earning);
        }
        if (days) {
          setDaysOfMonthOl(days);
        }
        break;
      }
      case sl: {
        dispatch(setRegisterableUser({ sl_rate: rate }));
        if (rateInputSlEl && rateInputSlEl.current) {
          rateInputSlEl.current.value = rate.toString();
        }
        if (earning) {
          setMonthlyEarningSl(earning);
        }
        if (days) {
          setDaysOfMonthSl(days);
        }
        break;
      }
      case tl: {
        dispatch(setRegisterableUser({ tl_rate: rate }));
        if (rateInputTlEl && rateInputTlEl.current) {
          rateInputTlEl.current.value = rate.toString();
        }
        if (earning) {
          setMonthlyEarningTl(earning);
        }
        if (days) {
          setDaysOfMonthTl(days);
        }
        break;
      }

      default:
        break;
    }
  };
  // CHANGE EVENT HANDLER 5
  const inputRSChangeHandler = (irse: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(irse.target.checked)
    dispatch(setRegisterableUser({ [irse.target.name]: irse.target.checked }));
  };
  // CHANGE EVENT HANDLER 6
  const tuitionmChangeHandler = (tce: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedTuitionm([parseInt(tce.target.value, 10)]));
  };
  // CHANGE EVENT HANDLER 7
  const classtypeChangeHandler = (tce: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedClasstype([parseInt(tce.target.value, 10)]));
  };
  // CHANGE EVENT HANDLER 8
  const currentlyStudyHandler = (cse: React.ChangeEvent<HTMLInputElement>) => {
    // cse.preventDefault();
    inputRSChangeHandler(cse);
    if (cse.target.checked) {
      if (pyInputEl && pyInputEl.current) {
        pyInputEl.current.disabled = true;
        pyInputEl.current.value = '';
      }
    } else if (pyInputEl && pyInputEl.current) {
      pyInputEl.current.disabled = false;
    }
  };
  // CHANGE EVENT HANDLER 9
  const placeChangedHandler = () => {
    if (autocomplete) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      try {
        dispatch(setRegisterableUser({ presentaddress: `${autocomplete.getPlace().name}, ${autocomplete.getPlace().formatted_address}, (${lng}, ${lat})` }));
      } catch (error) {
        console.log(error);
      }
    }
  };
  // CHANGE EVENT HANDLER 10
  const inputNumChangeHandler = (iche: React.ChangeEvent<HTMLInputElement>) => {
    if (iche.target.value !== '') {
      dispatch(setRegisterableUser({ [iche.target.name]: parseInt(iche.target.value, 10) }));
    } else {
      dispatch(setRegisterableUser({ [iche.target.name]: null }));
    }
  };

  /**
   * ========================================================================
   * TOGGLE PRICE CALCULATOR
   */
  const openPriceCalcHandler = (opce: React.SyntheticEvent, inputName: string) => {
    opce.preventDefault();
    // window.pageYOffset
    dispatch(setPageYOffset(window.pageYOffset));
    setSelectedStyleItem(inputName);
    switch (inputName) {
      case online:
        setCalculatorTitle('Online rate');
        if (registerableUser.ol_rate) setCalculateRate(registerableUser.ol_rate);
        setMonthlyEarning(monthlyEarningOl);
        setDaysOfMonth(daysOfMonthOl);
        break;
      case tl:
        setCalculatorTitle("Teacher's location rate");
        if (registerableUser.tl_rate) setCalculateRate(registerableUser.tl_rate);
        setMonthlyEarning(monthlyEarningTl);
        setDaysOfMonth(daysOfMonthTl);
        break;
      case sl:
        setCalculatorTitle("Student's Location rate");
        if (registerableUser.sl_rate) setCalculateRate(registerableUser.sl_rate);
        setMonthlyEarning(monthlyEarningSl);
        setDaysOfMonth(daysOfMonthSl);
        break;

      default:
        break;
    }
    dispatch(setOpenPriceCalc(true));
  };

  /**
   * ========================================================================
   * ERROR VALIDATION
   */
  const commonCls = 'fs-6 fw-light text-danger';
  const inputEmptyPrevent = (userProp: string, text: string) => {
    if (userProp === '' || userProp === null) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>{text} can not be empty</p>;
    }
    return null;
  };
  const inputNumEmptyPrevent = (userProp: number | null, text: string) => {
    if (userProp === 0 || userProp === null) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>{text} can not be empty</p>;
    }
    return null;
  };

  // TUITION STYLE ERROR
  const inputTuitionStyleErr = () => {
    if (registerableUser.tutionplace.length < 1) {
      props.changeValidationPassed(false);
      return <p className={props.noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>You must select atleast one style</p>;
    }
    if (registerableUser.tutionplace.length > 0) {
      let errStr = '';
      let passed = true;
      if (displayTuitionOl) {
        if (registerableUser.ol_rate === null) {
          passed = false;
          errStr += 'Online, ';
        }
      }
      if (displayTuitionSl) {
        if (registerableUser.sl_rate === null) {
          passed = false;
          errStr += "Student's Location, ";
        }
      }
      if (displayTuitionTl) {
        if (registerableUser.tl_rate === null) {
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

  if (!isLoaded) {
    return <Loader />;
  }
  const onLoadHandler = (ace) => {
    setAutocomplete(ace);
  };

  return (
    <>
      <div className="row ">
        <div className="col-md-4 mb-3">
          <label htmlFor="firstname">Name*</label>
          <input type="text" className="form-control" name="name" id="name" defaultValue={registerableUser?.name} onChange={inputChangeHandler} required />
          {inputEmptyPrevent(registerableUser.name, 'Name')}
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="email">Email*</label>
          <input type="email" className="form-control" name="email" id="email" defaultValue={registerableUser?.email} onChange={inputChangeHandler} required />
          {inputEmptyPrevent(registerableUser.email, 'Email')}
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="gender">Gender*</label>
          <select name="gender" className="form-control" id="gender" defaultValue={registerableUser?.gender} onChange={inputChangeHandler} >
            {genderList.map((gender) => (
              <option value={gender.val} key={gender.id}>
                {gender.val}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row ">
        {registerableUser.role === UserRoleEnum.TEACHER && (
          <div className="col-md-6 mb-3">
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

        <div className={registerableUser.role !== UserRoleEnum.TEACHER ? 'col-md-12 mb-3' : 'col-md-6 mb-3'}>
          <label htmlFor="pinstitution">{registerableUser.role === UserRoleEnum.TEACHER ? 'Professional Institution*' : 'Institution*'}</label>
          <input
            type="pinstitution"
            className="form-control"
            name="pinstitution"
            id="pinstitution"
            defaultValue={registerableUser?.pinstitution}
            onChange={inputChangeHandler}
            required
          />
          {inputEmptyPrevent(registerableUser.pinstitution, 'Institution')}
        </div>
      </div>

      <div className="row ">
        {registerableUser.role === UserRoleEnum.TEACHER && (
          <div className="col-md-6 mb-3">
            <label htmlFor="experience">Experience(years)*</label>
            <input
              type="number"
              className="form-control"
              name="experience"
              id="experience"
              defaultValue={registerableUser?.experience}
              onChange={inputNumChangeHandler}
            />
            {inputNumEmptyPrevent(registerableUser.experience, 'Experience')}
          </div>
        )}

        <div className={registerableUser.role !== UserRoleEnum.TEACHER ? 'col-md-12 mb-3' : 'col-md-6 mb-3'}>
          {/* Replace this with present address and use google map api  */}
          <label htmlFor="district">Present Address*</label>
          <Autocomplete onLoad={onLoadHandler} onPlaceChanged={placeChangedHandler} className="form-control p-0">
            <input type="text" className="form-control" id="presentaddress" name="presentaddress" onChange={inputChangeHandler} />
          </Autocomplete>
          {inputEmptyPrevent(registerableUser.presentaddress, 'Location')}
        </div>
      </div>

      {registerableUser.role === UserRoleEnum.TEACHER && (
        <>
          <div className="row ">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstname">highest Education*</label>
              <input type="text" className="form-control" name="degree" id="degree" defaultValue={registerableUser?.degree} onChange={inputChangeHandler} />
              {inputEmptyPrevent(registerableUser.degree, 'Degree')}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="major">Major / Subject*</label>
              <input type="text" className="form-control" name="major" id="major" defaultValue={registerableUser?.major} onChange={inputChangeHandler} />
              {inputEmptyPrevent(registerableUser.major, 'Major')}
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-3">
              <label htmlFor="institution">Institution*</label>
              <input
                type="text"
                className="form-control"
                name="institution"
                id="institution"
                defaultValue={registerableUser?.institution}
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mb-md-3">
              <label htmlFor="passing_year">Passing Year*</label>
              <input
                type="number"
                className="form-control"
                name="passing_year"
                id="passing_year"
                ref={pyInputEl}
                defaultValue={registerableUser?.passing_year}
                onChange={inputNumChangeHandler}
              />
            </div>
            <div className="col-md-6 mb-3 d-flex flex-row-reverse justify-content-end align-items-center">
              <label htmlFor="running_study" className="mt-md-4 mt-2">
                Currently running study
              </label>
              <input type="checkbox" name="running_study" className="mx-2 mt-md-4 mt-2" id="running_study" onChange={currentlyStudyHandler} />
            </div>
          </div>

          {/* Tuition style with calculator start  */}
          <div className="row ">
            <div className="col-md-12 mb-3">
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

      {registerableUser.role === UserRoleEnum.STUDENT && (
        <ClassSubjectStudentForm selectedMedium={0} selectedClassType={0} tuitionmChangeHandler={tuitionmChangeHandler} classtypeChangeHandler={classtypeChangeHandler} />
      )}

      <div className="row ">
        <div className="col-md-6 mb-3">
          <label htmlFor="ref">Reference no.(Optional)</label>
          <input type="number" onChange={inputNumChangeHandler} name="ref" id="ref" className="form-control" />
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
