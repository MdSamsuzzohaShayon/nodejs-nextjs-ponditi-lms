/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Layout from '../../../components/layouts/Layout';
import Loader from '../../../components/elements/Loader';
import MessageList from '../../../components/elements/MessageList';
import PassChangeReq from '../../../components/user/passwordrecover/PassChangeReq';
import VerifyPassOtp from '../../../components/user/passwordrecover/VerifyPassOtp';
// import SetNewPass from '../../../components/user/passwordrecover/SetNewPass';
import { setResetPassStep, setChangeResetPassReq } from '../../../redux/reducers/userReducer';

function passwordrecover() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.elements.isLoading);
  const resetPassStep = useSelector((state) => state.user.resetPassStep);
  const resetPassReq = useSelector((state) => state.user.resetPassReq);

  const resetPasswordRequest = () => {};

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setChangeResetPassReq({ [iche.target.name]: iche.target.value }));
  };

  const toNextStep = () => {
    dispatch(setResetPassStep(resetPassStep + 1));
  };

  const showStep = () => {
    switch (resetPassStep) {
      case 1: {
        return <PassChangeReq resetPassReq={resetPassReq} toNextStep={toNextStep} inputChangeHandler={inputChangeHandler} />;
      }
      case 2: {
        return <VerifyPassOtp resetPassReq={resetPassReq} toNextStep={toNextStep} inputChangeHandler={inputChangeHandler} />;
      }
      // case 3: {
      //   return <SetNewPass resetPassReq={resetPassReq} toNextStep={toNextStep} inputChangeHandler={inputChangeHandler} />;
      // }

      default:
        return <PassChangeReq resetPassReq={resetPassReq} toNextStep={toNextStep} inputChangeHandler={inputChangeHandler} />;
    }
  };
  return (
    <Layout title="Recover You Password | Ponditi">
      <section className="Login d-flex p-0 m-0">
        <div className="container">
          <h1 className="PasswordRecover mt-5">Password Recover</h1>
          <MessageList />
          {showStep()}
          <div className="row mb-3">
            <div className="col d-flex flex-column">
              <Link href="/user/passwordrecover">
                Login
              </Link>
              <Link href="/user/register">
                Don&apos;t have an account?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default passwordrecover;
