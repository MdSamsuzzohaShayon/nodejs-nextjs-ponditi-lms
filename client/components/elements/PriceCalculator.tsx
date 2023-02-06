/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import styles from './PriceCalculator.module.scss';
import { setOpenPriceCalc } from '../../redux/reducers/elementsSlice';
import { UserRegPriceCalcPropsInterface } from '../../types/redux/userInterface';

function PriceCalculator(props: UserRegPriceCalcPropsInterface) {
  const dispatch = useAppDispatch();
  const openPriceCalc = useAppSelector((state) => state.elements.openPriceCalc);
  const pageYOffset = useAppSelector((state) => state.elements.pageYOffset);

  const closePriceCalc = (cpce: React.SyntheticEvent) => {
    cpce.preventDefault();
    // console.log(cpce.target);
    dispatch(setOpenPriceCalc(false));
  };
  return (
    <div
      className={`${styles.priceCalculatorWrapper} position-absolute start-0 ${openPriceCalc ? 'd-block' : 'd-none'}`}
      role="button"
      style={{ top: `${pageYOffset}px` }}
    >
      <div className={`${styles.PriceCalculator} bg-secondary position-absolute top-50 start-50 translate-middle mt-1 p-2`}>
        <div className="d-flex justify-content-between">
          <h2 className="fs-2 mt-5">{props?.title}</h2>
          <button className="btn btn-outline-none" type="button">
            <img src="/icons/close.svg" alt="" onClick={closePriceCalc} role="button" />
          </button>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="monthly_earning">Total Monthly Earning</label>
          </div>
          <div className="col-md-6">
            <input onChange={props.inputPriceChangeHandler} defaultValue={props.defaultEarn} className="rate-inputs form-control" name="monthly_earning" type="number" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="days_of_month">Total days of Month</label>
          </div>
          <div className="col-md-6">
            <input onChange={props.inputPriceChangeHandler} defaultValue={props.defaultDays} className="rate-inputs form-control" name="days_of_month" type="number" />
          </div>
        </div>
        <div className="row mb-3">
          <hr />
          <div className="col-md-12">
            <h2 className="fs-2">Per hour rate {props?.result} Tk</h2>
          </div>
        </div>
        <div className="w-full btn-wrapper d-flex justify-content-center">
          <button className="btn btn-primary" type="button" onClick={closePriceCalc}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceCalculator;
