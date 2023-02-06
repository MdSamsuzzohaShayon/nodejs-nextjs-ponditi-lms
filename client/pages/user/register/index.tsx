/* eslint-disable jsx-a11y/label-has-associated-control */
// React/next
import React, { useEffect } from 'react';
import Router from 'next/router';

// Redux
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { resetErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import { fetchAllClassTypes } from '../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '../../../redux/reducers/tuitionmReducer';
import { resetRegisterableUser, resetSendOTP, resetVerifyCode } from '../../../redux/reducers/userReducer';

// Config/utils
import { REGISTER, SEND_CODE, VERIFY_CODE, TS_SELECT } from '../../../config/keys';
import RegistrationForm from '../../../components/register/RegistrationForm';

// Components
import Layout from '../../../components/layouts/Layout';
import VerifyCode from '../../../components/register/VerifyCode';
import SendCode from '../../../components/register/SendCode';
import MessageList from '../../../components/elements/MessageList';
import Loader from '../../../components/elements/Loader';
import TsSelect from '../../../components/register/TsSelect';


function RegisterIndex() {
  // Variables
  let isMounted = true;

  // Hooks
  const dispatch = useAppDispatch();

  // Redux state
  const userSendVerifyStep = useAppSelector((state) => state.user.userSendVerifyStep);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const isLoading = useAppSelector((state) => state.elements.isLoading);


  // Conditional component display
  const showSelectedForm = () => {
    if (userSendVerifyStep === VERIFY_CODE) {
      return <VerifyCode />;
    }
    return <SendCode />;
  };

  // Fetch on component mount
  useEffect(() => {
    dispatch(resetSendOTP());
    dispatch(resetVerifyCode());
    dispatch(resetRegisterableUser());
    dispatch(resetErrorList());
    dispatch(toggleLoading(false));
    if (isMounted) {
      (async () => {
        dispatch(resetErrorList());
        await Promise.all([dispatch(fetchAllClassTypes(null)), dispatch(fetchAllSubjects(null)), dispatch(fetchAllTuitionms(null))]);
      })();
    }
    isMounted = false;
  }, []);

  // Redirect user if already logged in
  useEffect(() => {
    if (authUserInfo.id) {
      Router.push('/user/dashboard');
    }
  }, [authUserInfo]);

  return (
    <Layout title="Register Your Account | Ponditi">
      <div className="register container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <MessageList />
            {showSelectedForm()}
          </>
        )}
        {/* <RegistrationForm /> */}
      </div>
    </Layout>
  );
}

export default RegisterIndex;
