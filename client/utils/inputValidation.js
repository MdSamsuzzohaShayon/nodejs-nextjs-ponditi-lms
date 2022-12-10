/* eslint-disable react/jsx-filename-extension */
export const phnNumInputErr = (noValidate, phnNum) => {
  const commonCls = 'fs-6 fw-light text-danger';
  if (phnNum.length !== 11) {
    return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Number must be 11 charecter long</p>;
  }
  if (phnNum[0] !== '0') {
    return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Number must start with 0</p>;
  }
  return null;
};

export const inputErrOTP = (noValidate, otpNum) => {
  const commonCls = 'fs-6 fw-light text-danger';
  if (otpNum.length !== 6) {
    return <p className={noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>OTP must be 6 charecter long</p>;
  }
  return null;
};
export const inputErrPassword = (noValidate, pass) => {
  const commonCls = 'fs-6 fw-light text-danger';
  if (pass.length < 6) {
    return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Password must be more than or equal 6 charecter.</p>;
  }
  return null;
};
export const inputErrPassword2 = (noValidate, pass, pass2) => {
  const commonCls = 'fs-6 fw-light text-danger';
  if (pass2.length < 6) {
    return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Password must be more than or equal 6 charecter.</p>;
  }
  if (pass !== pass2) {
    return <p className={noValidate === false ? commonCls : `${commonCls} d-none`}>Password did not match.</p>;
  }
  return null;
};
