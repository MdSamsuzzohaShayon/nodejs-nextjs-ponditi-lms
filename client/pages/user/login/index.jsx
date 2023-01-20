/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import cookieCutter from 'cookie-cutter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from '../../../config/axios';
import { setErrorList, resetErrorList, toggleLoading, resetSuccessMessageList, setNoValidate } from '../../../redux/reducers/elementsSlice';
import { setLoginInfo, resetLoginInfo } from '../../../redux/reducers/userReducer';
import Layout from '../../../components/layouts/Layout';
import MessageList from '../../../components/elements/MessageList';
import Loader from '../../../components/elements/Loader';

function login() {
  const commonCls = 'fs-6 fw-light text-danger';
  let validationPassed = true;

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.elements.isLoading);
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  const noValidate = useSelector((state) => state.elements.noValidate);

  // eslint-disable-next-line consistent-return
  const loginHandler = async (rhe) => {
    rhe.preventDefault();
    dispatch(resetErrorList());

    dispatch(setNoValidate(false));
    if (validationPassed === false) return null;

    // if (loginInfo.phone === null && loginInfo.password === null) {
    //   dispatch(setErrorList(['both field must be filled']));
    // }

    // const newObj = {};
    // if (loginInfo.phone.toString().includes('@')) {
    //   newObj.email = loginInfo.phone;
    // } else {
    //   newObj.phone = loginInfo.phone;
    // }
    // newObj.password = loginInfo.password;

    try {
      dispatch(toggleLoading(true));
      console.log({ isLoading });
      const response = await axios.post('/user/login', loginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        dispatch(resetErrorList());
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        Router.push('/user/dashboard');
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      dispatch(toggleLoading(false));
    }
  };

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setLoginInfo({ [iche.target.name]: iche.target.value }));
  };

  useEffect(() => {
    dispatch(resetErrorList());
    dispatch(setNoValidate(true)); // initially we will not validate
    dispatch(toggleLoading(false));
    return () => {
      dispatch(resetSuccessMessageList());
      dispatch(resetLoginInfo());
    };
  }, []);

  useEffect(() => {
    if (authUserInfo.id) {
      Router.push('/user/dashboard');
    }
  }, [authUserInfo]);

  const inputPhoneValidate = (userProp) => {
    if (userProp === '' || userProp === null) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Phone number can not be empty</p>;
    }
    if (userProp.length < 11) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Please put a valid phone number.</p>;
    }
    return null;
  };

  const inputPassValidate = (userProp) => {
    if (userProp === '' || userProp === null) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Password can not be empty</p>;
    }
    if (userProp.length < 6) {
      validationPassed = false;
      return <p className={noValidate === false ? commonCls : `${commonCls} text-danger d-none`}>Password can not be less than 6 char long.</p>;
    }
    return null;
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="Login d-flex p-0 m-0">
          <div className="side left-side bg-primary d-none d-md-block">
            <div className="left-side-wrapper h-full vertical-center">
              <div className="login-shape">
                <img src="/shape/login.svg" alt="Login" />
              </div>
            </div>
          </div>
          <div className="side right-side">
            <div className="right-side-wrapper h-full vertical-center">
              <h1 className="login">Login</h1>
              <div className="row">
                <div className="col-md-12">
                  <MessageList />
                </div>
              </div>
              <form onSubmit={loginHandler} noValidate={noValidate}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="phone">Phone*</label>
                    <input type="number" className="form-control" name="phone" id="phone" onChange={inputChangeHandler} required />
                    {inputPhoneValidate(loginInfo.phone)}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="password">Password*</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={inputChangeHandler} required />
                    {inputPassValidate(loginInfo.password)}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <button type="submit" className="btn btn-primary w-fit">
                      Login
                    </button>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col d-flex flex-column">
                    <Link href="/user/passwordrecover">
                      <a className="text-decoration-underline text-capitalize text-dark">Password forgotten?</a>
                    </Link>
                    <Link href="/user/register">
                      <a className="text-decoration-underline text-capitalize text-dark">Don&apos;t have an account?</a>
                    </Link>
                  </div>
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
