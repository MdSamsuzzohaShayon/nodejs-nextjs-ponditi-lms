/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import cookieCutter from 'cookie-cutter';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import axios from '../../config/axios';
import {
  setErrorList,
  resetErrorList,
  toggleLoading
} from '../../redux/reducers/elementsSlice';
import { setLoginInfo, resetLoginInfo } from '../../redux/reducers/userReducer';
import Layout from '../../components/layouts/Layout';
import ErrorMessages from '../../components/elements/ErrorMessages';
import Loader from '../../components/elements/Loader';

function login() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.elements.isLoading);
  const loginInfo = useSelector((state) => state.user.loginInfo);

  // eslint-disable-next-line consistent-return
  const loginHandler = async (rhe) => {
    rhe.preventDefault();
    if (loginInfo.phoneoremail === '' && loginInfo.password === '') {
      dispatch(setErrorList(['both field must be filled']));
    }

    const newObj = {};
    if (loginInfo.phoneoremail.toString().includes('@')) {
      newObj.email = loginInfo.phoneoremail;
    } else {
      newObj.phone = loginInfo.phoneoremail;
    }
    newObj.password = loginInfo.password;

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/user/login', newObj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        dispatch(resetLoginInfo());
        dispatch(resetErrorList());
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/user/dashboard');
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    }finally{
      dispatch(toggleLoading(false));
    }
  };

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setLoginInfo({ [iche.target.name]: iche.target.value }));
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="Login d-flex p-0 m-0">
          <div className="side left-side bg-danger-deep d-none d-md-block">
            <div className="left-side-wrapper h-full vertical-center">
              <div className="login-shape">
                <img src="/shape/login.svg" alt="Login" />
              </div>
            </div>
          </div>
          <div className="side right-side">
            <div className="right-side-wrapper h-full vertical-center">
              <h1 className="login">Login</h1>
              <ErrorMessages />
              <form onSubmit={loginHandler}>
                <div className="row mb-3 mx-0">
                  <label htmlFor="phoneoremail">Phone or Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneoremail"
                    id="phoneoremail"
                    defaultValue={loginInfo.phoneoremail}
                    onChange={inputChangeHandler}
                    placeholder="phone or email"
                  />
                </div>

                <div className="row mb-3 mx-0">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="*******"
                    defaultValue={loginInfo.password}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="row mb-3 mx-0">
                  <button type="submit" className="btn btn-primary w-fit">
                    Login
                  </button>
                </div>
                <div className="row mb-3 mx-0">
                  <a
                    href="#"
                    className="text-decoration-underline text-capitalize text-dark"
                  >
                    Password forgotten?
                  </a>
                  <a
                    href="#"
                    className="text-decoration-underline text-capitalize text-dark"
                  >
                    Don&apos;t have an account?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export default login;
