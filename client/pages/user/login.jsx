/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import cookieCutter from 'cookie-cutter';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import router from 'next/router';
import axios from '../../config/axios';
import {
  openModal,
  setErrorList,
  toggleLoading,
} from '../../redux/reducers/elementsSlice';
import {
  setLoginInfo,
  setLoginWith,
  resetLoginInfo,
  setTeacherLogin,
} from '../../redux/reducers/userReducer';
import Loader from '../../components/elements/Loader';
import Layout from '../../components/layouts/Layout';
import ErrorMessages from '../../components/elements/ErrorMessages';

function login() {
  const dispatch = useDispatch();
  const initialStudio = {
    email: '',
    password: '',
  };
  const [studioInfo, setStudioInfo] = useState(initialStudio);
  const [errMsg, setErrMsg] = useState(null);

  const isLoading = useSelector((state) => state.elements.isLoading);
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const loginWithEmail = useSelector((state) => state.user.loginWithEmail);
  const teacherLogin = useSelector((state) => state.user.teacherLogin);

  // const makeSureNotAuthenticated = async () => {
  //   try {
  //     dispatch(toggleLoading(true));
  //     await axios.get('/staff/check');
  //   } catch (err) {
  //     if (err.response.status === 406) {
  //       router.push('/studio');
  //     }
  //   } finally {
  //     dispatch(toggleLoading(false));
  //   }
  // };

  // useEffect(() => {
  //   if (isMounted) makeSureNotAuthenticated();
  //   isMounted = false;
  // }, []);

  // eslint-disable-next-line consistent-return
  const loginHandler = async (rhe) => {
    rhe.preventDefault();
    if (loginInfo.phoneoremail === '' && loginInfo.password === '') {
      dispatch(setErrorList(['both field must be filled']));
    }

    // if (loginInfo.password.length < 4) {
    //   dispatch(setErrorList(['both field must be filled']));
    // }

    const newObj = {};
    // console.log(login.phoneoremail);
    if (loginInfo.phoneoremail.toString().includes('@')) {
      newObj.email = loginInfo.phoneoremail;
    } else {
      newObj.phone = loginInfo.phoneoremail;
    }
    newObj.password = loginInfo.password;

    try {
      // dispatch(toggleLoading(true));
      const response = await axios.post('/user/login', newObj, {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('user', 'true');
      if (response.status === 200) {
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/user/dashboard');
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error?.response?.status === 406) {
          dispatch(setErrorList([error.response.data.msg]));
        }
        // setErrMsg(error.response.data.msg);
      }
    }
  };

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setLoginInfo({ [iche.target.name]: iche.target.value }));
  };

  // if (isLoading) {
  //   return <Loader />;
  // }

  function toggleInputHandle(tihe, isEmail) {
    tihe.preventDefault();
    dispatch(setLoginWith(isEmail));
    dispatch(resetLoginInfo());
  }

  function toggleTeacherLogin(ttle, val) {
    ttle.preventDefault();
    dispatch(setTeacherLogin(val));
  }

  return (
    <Layout>
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
              {/* <div className="login-register-toggle row mb-3 mx-0">
                <div
                  className="btn-group p-0"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <button
                    type="button"
                    className={
                      teacherLogin ? 'btn btn-primary'  : 'btn btn-secondary'
                    }
                    onClick={(e) => toggleTeacherLogin(e, true)}
                  >
                    Teacher
                  </button>

                  <button
                    type="button"
                    className={
                      teacherLogin ? 'btn btn-secondary' : 'btn btn-primary' 
                    }
                    onClick={(e) => toggleTeacherLogin(e, false)}
                  >
                    Student
                  </button>
                </div>
              </div> */}
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
                {loginWithEmail === false ? (
                  <a
                    href="#"
                    onClick={(e) => toggleInputHandle(e, true)}
                    className="text-decoration-underline text-capitalize text-dark"
                  >
                    Use Email Instead
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => toggleInputHandle(e, false)}
                    className="text-decoration-underline text-capitalize text-dark"
                  >
                    Use Phone Instead
                  </a>
                )}

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
    </Layout>
  );
}

export default login;
