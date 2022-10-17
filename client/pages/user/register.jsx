/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layouts/Layout';
import { REGISTER, SEND_CODE, VERIFY_CODE } from '../../config/keys';
import RegistrationForm from '../../components/register/RegistrationForm';
import VerifyCode from '../../components/register/VerifyCode';
import SendCode from '../../components/register/SendCode';
import ErrorMessages from '../../components/elements/ErrorMessages';
import { resetErrorList } from '../../redux/reducers/elementsSlice';
import Loader from '../../components/elements/Loader';

function register() {
  const dispatch = useDispatch();
  const userFormsType = useSelector((state) => state.user.userFormsType);
  const isLoading = useSelector((state) => state.elements.isLoading);
  // let isLoading = true;

  // eslint-disable-next-line consistent-return

  const showSelectedForm = () => {
    if (userFormsType === REGISTER) {
      return <RegistrationForm />;
    }
    if (userFormsType === VERIFY_CODE) {
      return <VerifyCode />;
    }
    return <SendCode />;
  };

  useEffect(() => {
    dispatch(resetErrorList());
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
