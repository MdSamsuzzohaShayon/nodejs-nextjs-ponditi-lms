/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import cookieCutter from 'cookie-cutter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from '../../../config/axios';
import { setErrorList, resetErrorList, toggleLoading, resetSuccessMessageList } from '../../../redux/reducers/elementsSlice';
import { setLoginInfo, resetLoginInfo } from '../../../redux/reducers/userReducer';
import Layout from '../../../components/layouts/Layout';
import MessageList from '../../../components/elements/MessageList';
import Loader from '../../../components/elements/Loader';

function login() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.elements.isLoading);
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  // eslint-disable-next-line consistent-return
  const loginHandler = async (rhe) => {
    rhe.preventDefault();
    dispatch(resetErrorList());
    if (loginInfo.phone === null && loginInfo.password === null) {
      dispatch(setErrorList(['both field must be filled']));
    }

    const newObj = {};
    if (loginInfo.phone.toString().includes('@')) {
      newObj.email = loginInfo.phone;
    } else {
      newObj.phone = loginInfo.phone;
    }
    newObj.password = loginInfo.password;

    try {
      dispatch(toggleLoading(true));
      console.log({ isLoading });
      const response = await axios.post('/user/login', newObj, {
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

  // useEffect(() => () => {
  //   // console.log('Component unmounted');
  //   dispatch(toggleLoading(false));
  // });

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
              <div className="row">
                <div className="col-md-12">
                  <MessageList />
                </div>
              </div>
              <form onSubmit={loginHandler}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="phone">Phone</label>
                    <input type="number" className="form-control" name="phone" id="phone" onChange={inputChangeHandler} required />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={inputChangeHandler} required />
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
