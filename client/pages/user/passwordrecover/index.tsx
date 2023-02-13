/* eslint-disable jsx-a11y/anchor-is-valid */
// React/next
import React from 'react';
import Link from 'next/link';

// Components
import Layout from '../../../components/layouts/Layout';
import Loader from '../../../components/elements/Loader';
import MessageList from '../../../components/elements/MessageList';
import PassChangeReq from '../../../components/user/passwordrecover/PassChangeReq';
import VerifyPassOtp from '../../../components/user/passwordrecover/VerifyPassOtp';
// import SetNewPass from '../../../components/user/passwordrecover/SetNewPass';

// Redux
import { setResetPassStep, setChangeResetPassReq } from '../../../redux/reducers/userReducer';
import { useAppSelector, useAppDispatch } from '../../../redux/store';

function PasswordrecoverIndex() {
  // Hooks
  const dispatch = useAppDispatch();

  // Redux state
  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const resetPassStep = useAppSelector((state) => state.user.resetPassStep);
  const resetPassReq = useAppSelector((state) => state.user.resetPassReq);

  const inputChangeHandler = (iche: React.ChangeEvent<HTMLInputElement>) => {
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
              <div className="col d-flex flex-column">
                <Link href="/user/login" className="text-decoration-underline text-capitalize text-dark">
                  Login
                </Link>
                <Link href="/user/register" className="text-decoration-underline text-capitalize text-dark">
                  Don&apos;t have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default PasswordrecoverIndex;
