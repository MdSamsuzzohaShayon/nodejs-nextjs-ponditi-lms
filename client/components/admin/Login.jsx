/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setLoginAdmin } from '../../redux/reducers/adminReducer';
import { resetErrorList, setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { toggleAuthUser } from '../../redux/reducers/userReducer';
import axios from '../../config/axios';
import ErrorMessages from '../elements/ErrorMessages';

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginAdmin = useSelector((state) => state.admin.loginAdmin);

  const loginSubmitHandler = async (lshe) => {
    lshe.preventDefault();
    if (loginAdmin.emailorpass === '') {
      return dispatch(setErrorList(['You must use email or phone number to login']));
    }

    if (loginAdmin.password.length < 6) {
      return dispatch(setErrorList(['Password must be more than or equal 6 charecter long']));
    }
    const loginObj = { ...loginAdmin };
    const pattern = /\d+/;
    if (loginObj.emailorpass.includes('@') && loginObj.emailorpass.includes('.')) {
      loginObj.email = loginObj.emailorpass;
      delete loginObj.emailorpass;
      delete loginObj.phone;
    } else if (pattern.test(loginObj.emailorpass)) {
      loginObj.phone = loginObj.emailorpass;
      // check all numbers
      delete loginObj.email;
      delete loginObj.emailorpass;
    } else {
      // Invalid input
      return dispatch(setErrorList(['Put a valid phone number or email']));
    }

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/admin/login', loginObj, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        dispatch(resetErrorList());
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

  return (
    <div className="Login">
      <div className="row mx-0 mb-3">
        <h1>Login as Admin</h1>
      </div>
      <ErrorMessages />
      <form onSubmit={loginSubmitHandler}>
        <div className="row mb-3 mx-0">
          <div className="col">
            <label htmlFor="emailorpass">Email or Phone</label>
            <input type="text" className="form-control" name="emailorpass" id="emailorpass" defaultValue={loginAdmin.emailorpass} onChange={inputChangeHandler} />
          </div>
        </div>

        <div className="row mb-3 mx-0">
          <div className="col">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" id="password" defaultValue={loginAdmin.password} onChange={inputChangeHandler} />
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col">
            <button type="submit" className="btn btn-primary w-fit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
