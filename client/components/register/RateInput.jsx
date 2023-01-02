/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRegisterableUser } from '../../redux/reducers/userReducer';
import PriceCalculator from '../elements/PriceCalculator';
import { setOpenPriceCalc } from '../../redux/reducers/elementsSlice';

const online = 'online';
const tl = 'tl';
const sl = 'sl';

function RateInput(props) {
  const dispatch = useDispatch();

  const pyInputEl = useRef(null);
  const rateInputOlEl = useRef(null);
  const rateInputTlEl = useRef(null);
  const rateInputSlEl = useRef(null);

  //   const registerableUser = useSelector((state) => state.user.registerableUser);
  //   const currentUser = useSelector((state) => state.user.currentUser);

  // Display tuition styles input field
  const [displayTuitionOl, setDisplayTuitionOl] = useState(!!props.user.ol_rate);
  const [displayTuitionSl, setDisplayTuitionSl] = useState(!!props.user.sl_rate);
  const [displayTuitionTl, setDisplayTuitionTl] = useState(!!props.user.tl_rate);

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
    props.tuitionPlaceChange(itse);
    /*
    if (itse.target.checked) {
      // add new item
      // dispatch(setRegisterableUser({ tutionplace: [...props.user.tutionplace, itse.target.name.toUpperCase()] }));
      // props.tuitionPlaceChange(true, itse);
    } else {
      // Remove deselected item
      // const newRegisterableUser = props.user.tutionplace.filter((ru) => ru.toUpperCase() !== itse.target.name.toUpperCase());
      // dispatch(setRegisterableUser({ tutionplace: newRegisterableUser }));
      // props.tuitionPlaceChange(false, itse);
    }
    */
    // (e) => setDisplayTuitionOl((prevState) => !prevState)
  };

  const openPriceCalcHandler = (opce, inputName) => {
    opce.preventDefault();
    setSelectedStyleItem(inputName);
    switch (inputName) {
      case online:
        setCalculatorTitle('Online rate');
        setCalculateRate(props.user.ol_rate);
        setMonthlyEarning(monthlyEarningOl);
        setDaysOfMonth(daysOfMonthOl);
        break;
      case tl:
        setCalculatorTitle("Teacher's location rate");
        setCalculateRate(props.user.tl_rate);
        setMonthlyEarning(monthlyEarningTl);
        setDaysOfMonth(daysOfMonthTl);
        break;
      case sl:
        setCalculatorTitle("Student's Location rate");
        setCalculateRate(props.user.sl_rate);
        setMonthlyEarning(monthlyEarningSl);
        setDaysOfMonth(daysOfMonthSl);
        break;

      default:
        break;
    }
    dispatch(setOpenPriceCalc(true));
  };

  const inputRateChangeHandler = (irce) => {
    // console.log({ [irce.target.name]: parseInt(irce.target.value, 10) });
    // dispatch(setRegisterableUser({ [irce.target.name]: parseInt(irce.target.value, 10) }));
    props.inputRateChange({ name: irce.target.name, rate: parseInt(irce.target.value, 10) });
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
        props.inputRateChange({ name: ipce.target.name, rate: parseInt(ipce.target.value, 10) });
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

  //   Make function optionals
  const inputTuitionStyleErr = () => {
    if (props.inputTuitionStyleErr) {
      props.inputTuitionStyleErr();
    }
  };

  return (
    <div className="RateInput">
      <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="tuitionstyle">Tuition Style</label>
          <div className="row">
            <div className="col-md-3">
              <div className="input-item d-flex align-items-start justify-content-start flex-column">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name={online}
                    type="checkbox"
                    defaultChecked={!!props.user.ol_rate}
                    onChange={inputTuitionStyleHandler}
                    id={online}
                  />
                  <label className="form-check-label" htmlFor={online}>
                    Online
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-item d-flex align-items-start justify-content-start flex-column">
                <div className="form-check">
                  <input className="form-check-input" name={tl} type="checkbox" defaultChecked={!!props.user.tl_rate} onChange={inputTuitionStyleHandler} id={tl} />
                  <label className="form-check-label" htmlFor={tl}>
                    Teacher&apos;s location
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-item d-flex align-items-start justify-content-start flex-column">
                <div className="form-check">
                  <input className="form-check-input" name={sl} type="checkbox" defaultChecked={!!props.user.sl_rate} onChange={inputTuitionStyleHandler} id={sl} />
                  <label className="form-check-label" htmlFor={sl}>
                    Student&apos;s location
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              {displayTuitionOl && (
                <div className="price-form">
                  <div className="input-group mb-3">
                    <div className="form-floating p-0">
                      <input
                        type="number"
                        className="form-control"
                        ref={rateInputOlEl}
                        defaultValue={props.user?.ol_rate}
                        name="ol_rate"
                        onChange={inputRateChangeHandler}
                      />
                    </div>
                    <span className="input-group-text">
                      <img src="/icons/calculator.svg" alt="" onClick={(e) => openPriceCalcHandler(e, online)} role="button" />
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-3">
              {displayTuitionTl && (
                <div className="price-form">
                  <div className="input-group mb-3">
                    <div className="form-floating p-0">
                      <input
                        type="number"
                        className="form-control"
                        ref={rateInputTlEl}
                        onChange={inputRateChangeHandler}
                        defaultValue={props.user?.tl_rate}
                        id="tl_rate"
                        name="tl_rate"
                      />
                    </div>
                    <span className="input-group-text">
                      <img src="/icons/calculator.svg" alt="" onClick={(e) => openPriceCalcHandler(e, tl)} role="button" />
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-3">
              {displayTuitionSl && (
                <div className="price-form">
                  <div className="input-group mb-3">
                    <div className="form-floating p-0">
                      <input
                        type="number"
                        className="form-control"
                        ref={rateInputSlEl}
                        onChange={inputRateChangeHandler}
                        defaultValue={props.user?.sl_rate}
                        id="sl_rate"
                        name="sl_rate"
                      />
                    </div>
                    <span className="input-group-text">
                      <img src="/icons/calculator.svg" alt="" onClick={(e) => openPriceCalcHandler(e, sl)} role="button" />
                    </span>
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
    </div>
  );
}

export default RateInput;
