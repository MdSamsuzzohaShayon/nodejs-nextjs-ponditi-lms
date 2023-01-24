/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import InputElement from './InputElement';

function FormStep({ selectedStep, inputChangeHandler, nextStepHandler }) {
  const registerSteps = useSelector((state) => state.user.registerSteps);
  const selectedInputs = registerSteps.find((rs) => rs.step === selectedStep);
  // console.log(selectedInputs);

  return (
    <div className="FormStep">
      {/* <div className="row mb-3 mx-0">
        <InputElement
          text="Firstname"
          fieldname="firstname"
          inputChangeHandler={inputChangeHandler}
        />
      </div> */}
      <div className="row mb-3 mx-0">
        {selectedInputs.properties &&
          selectedInputs.properties.length > 0 &&
          selectedInputs.properties.map((si, idx) => <InputElement key={idx} text={si.text} field={si.field} inputChangeHandler={inputChangeHandler} />)}
      </div>
      {selectedStep === 1 || selectedStep === 2 ? (
        <div className="row mb-3 mx-0">
          <button className="btn btn-primary w-fit" type="button" onClick={nextStepHandler}>
            Next
          </button>
        </div>
      ) : (
        <div className="row mb-3 mx-0">
          <button className="btn btn-primary w-fit" type="submit">
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default FormStep;
