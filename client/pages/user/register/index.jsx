/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Layout from '../../../components/layouts/Layout';
import { REGISTER, SEND_CODE, VERIFY_CODE, TS_SELECT } from '../../../config/keys';
import RegistrationForm from '../../../components/register/RegistrationForm';
import VerifyCode from '../../../components/register/VerifyCode';
import SendCode from '../../../components/register/SendCode';
import MessageList from '../../../components/elements/MessageList';
import { resetErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import Loader from '../../../components/elements/Loader';
import TsSelect from '../../../components/register/TsSelect';
import { fetchAllClassTypes } from '../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '../../../redux/reducers/tuitionmReducer';
import { resetRegisterableUser, resetVerifyCode } from '../../../redux/reducers/userReducer';


function register() {
  let isMounted = true;
  const dispatch = useDispatch();
  const userSendVerifyStep = useSelector((state) => state.user.userSendVerifyStep);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const isLoading = useSelector((state) => state.elements.isLoading);
  // let isLoading = true;

  // eslint-disable-next-line consistent-return

  const showSelectedForm = () => {
    if (userSendVerifyStep === VERIFY_CODE) {
      return <VerifyCode />;
    }
    return <SendCode />;
  };

  useEffect(() => {
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

  useEffect(() => {
    if (authUserInfo.id) {
      Router.push('/user/dashboard');
    }
  }, [authUserInfo]);

  return (
    <Layout>
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

export default register;
