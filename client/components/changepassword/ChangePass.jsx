import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import axios from '../../config/axios';
import { toggleLoading, setErrorList, resetErrorList } from '../../redux/reducers/elementsSlice';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';

function ChangePass() {
  const dispatch = useDispatch();

  const initialUpdatePassword = {
    current: '',
    password: '',
    password2: '',
  };
  const [updatePassword, setUpdatePassword] = useState(initialUpdatePassword);

  const passwordChangeHandler = async (pce) => {
    pce.preventDefault();
    if (updatePassword.current === '' || updatePassword.password === '') {
      return dispatch(setErrorList(['You must fill all the fields']));
    }
    if (updatePassword.current.length < 6 || updatePassword.password.length < 6) {
      return dispatch(setErrorList(['Password can not be less than 6 charecter long']));
    }
    if (updatePassword.password !== updatePassword.password2) {
      return dispatch(setErrorList(['Password did not match']));
    }
    try {
      dispatch(toggleLoading(true));
      const response = await axios.put('/admin/changepassword', updatePassword);
      if (response.status === 202) {
        dispatch(resetErrorList());
        Router.push('/');
      }
    } catch (error) {
      // console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        Router.push('/user/login');
      }
    } finally {
      // console.log('finally');
      dispatch(toggleLoading(false));
    }
    return null;
  };

  const inputChangeHandler = (ice) => {
    // console.log({ [ice.target.name]: ice.target.value });
    // console.log(updatePassword);
    setUpdatePassword({ ...updatePassword, [ice.target.name]: ice.target.value });
  };



  return (
    <section className="ChangePass">
      <div className="container">
        <h2 className="mt-5">Change password</h2>
        <form onSubmit={passwordChangeHandler}>
          <div className="row mb-3">
            <div className="col">
              <div className="form-floating">
                <input type="password" className="form-control" id="current" name="current" placeholder="******" onChange={inputChangeHandler} />
                <label htmlFor="current">current password</label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <input type="password" className="form-control" id="password" name="password" placeholder="******" onChange={inputChangeHandler} />
                <label htmlFor="password">new password</label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <input type="password" className="form-control" id="password2" name="password2" placeholder="******" onChange={inputChangeHandler} />
                <label htmlFor="password2">Confirm new password</label>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePass;
