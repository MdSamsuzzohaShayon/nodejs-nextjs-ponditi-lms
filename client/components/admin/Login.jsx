/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  setLoginAdmin,
  toggleEmailAndPhone,
} from '../../redux/reducers/adminReducer';
import {
  resetErrorList,
  setErrorList,
  toggleLoading,
} from '../../redux/reducers/elementsSlice';
import { toggleAuthUser } from '../../redux/reducers/userReducer';
import axios from '../../config/axios';
import ErrorMessages from '../elements/ErrorMessages';

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginAdmin = useSelector((state) => state.admin.loginAdmin);
  const useEmailToLogin = useSelector((state) => state.admin.useEmailToLogin);

  const loginSubmitHandler = async (lshe) => {
    lshe.preventDefault();
    if (loginAdmin.email === '' && loginAdmin.phone) {
      dispatch(setErrorList(['You must use email or phone number to login']));
    }

    if (loginAdmin.password.length < 6) {
      dispatch(
        setErrorList(['Password must be more than or equal 6 charecter long'])
      );
    }
    const loginObj = { password: loginAdmin.password };
    if (useEmailToLogin) {
      loginObj.email = loginAdmin.email;
    } else {
      loginObj.phone = loginAdmin.phone;
    }

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/admin/login', loginObj, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        dispatch(resetErrorList);
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        // Change to dashboard view
        dispatch(toggleAuthUser(true));
        router.push('/admin');
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        await axios.post('/user/logout');
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const inputChangeHandler = (iche) => {
    dispatch(setLoginAdmin({ [iche.target.name]: iche.target.value }));
  };

  const togglePhoneEmailHandler = (tpehe) => {
    tpehe.preventDefault();
    dispatch(toggleEmailAndPhone());
  };
  return (
    <div className="Login">
      <h1>Login as Admin</h1>
      <ErrorMessages />
      <form onSubmit={loginSubmitHandler}>
        {useEmailToLogin === true ? (
          <div className="row mb-3 mx-0">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              defaultValue={loginAdmin.email}
              onChange={inputChangeHandler}
              placeholder="email"
            />
          </div>
        ) : (
          <div className="row mb-3 mx-0">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              id="phone"
              defaultValue={loginAdmin.phone}
              onChange={inputChangeHandler}
              placeholder="phone"
            />
          </div>
        )}

        <div className="row mb-3 mx-0">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            defaultValue={loginAdmin.password}
            onChange={inputChangeHandler}
            placeholder="password"
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
            className="text-dark text-capitalize"
            onClick={togglePhoneEmailHandler}
          >
            {useEmailToLogin === true
              ? 'Use phone instead'
              : 'Use email instead'}
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
