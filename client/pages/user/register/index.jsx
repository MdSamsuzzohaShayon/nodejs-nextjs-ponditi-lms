/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import { REGISTER, SEND_CODE, VERIFY_CODE, TS_SELECT } from '../../../config/keys';
import RegistrationForm from '../../../components/register/RegistrationForm';
import VerifyCode from '../../../components/register/VerifyCode';
import SendCode from '../../../components/register/SendCode';
import ErrorMessages from '../../../components/elements/ErrorMessages';
import { resetErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import Loader from '../../../components/elements/Loader';
import TsSelect from '../../../components/register/TsSelect';
import { fetchAllClassTypes } from '../../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../../redux/reducers/subjectReducer';
import { fetchAllTuitionms } from '../../../redux/reducers/tuitionmReducer';

function register() {
  let isMounted = true;
  const dispatch = useDispatch();
  const userSendVerifyStep = useSelector((state) => state.user.userSendVerifyStep);
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

  return (
    <Layout>
      <div className="register container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ErrorMessages />
            {showSelectedForm()}
          </>
        )}
        {/* <RegistrationForm /> */}
      </div>
    </Layout>
  );
}

export default register;
