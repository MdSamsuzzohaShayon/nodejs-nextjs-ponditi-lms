/* eslint-disable jsx-a11y/label-has-associated-control */
// import cookieCutter from 'cookie-cutter';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import router from 'next/router';
import axios from '../../config/axios';
import { openModal, toggleLoading } from '../../redux/reducers/elementsSlice';
import { setLoginInfo } from '../../redux/reducers/userReducer';
import Loader from '../../components/elements/Loader';
import Layout from '../../components/layouts/Layout';

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
    if(loginInfo.phone === '' && loginInfo.email === ''){
      return setErrMsg('You must use email or phone');
    }
    if (loginInfo.password.length < 4) {
      return setErrMsg('Password must be more than 4 charecter long');
    }

    try {
      // dispatch(toggleLoading(true));
      const response = await axios.post('/user/login', loginInfo);
      if (response.status === 200) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      // Open Modal
      // if (error.response) {
      //   setErrMsg(error.response.data.msg);
      //   dispatch(
      //     openModal({
      //       heading: 'Login unsuccessful!',
      //       body: error.response.data.msg,
      //     })
      //   );
      // }
    } finally {
      // dispatch(toggleLoading(false));
    }
  };

  const inputChangeHandler = (iche) => {
    // iche.preventDefault();
    dispatch(setLoginInfo({ [iche.target.name]: iche.target.value }));
  };

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <Layout>
      <div className="container">
        <h2 className="login">Login</h2>
        <form onSubmit={loginHandler}>
          <div className="row mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              id="phone"
              defaultValue={loginInfo.phone}
              onChange={inputChangeHandler}
              placeholder="phone"
            />
          </div>

          <div className="row mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              defaultValue={loginInfo.email}
              onChange={inputChangeHandler}
              placeholder="email"
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              defaultValue={loginInfo.password}
              onChange={inputChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default login;
