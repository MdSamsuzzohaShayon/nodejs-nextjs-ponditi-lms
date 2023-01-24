/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/Layout';
import Login from '../../components/admin/Login';
import { toggleAuthUser } from '../../redux/reducers/userReducer';
import { toggleLoading } from '../../redux/reducers/elementsSlice';
import Loader from '../../components/elements/Loader';

function login() {
  const router = useRouter();
  const dispatch = useDispatch();
  // get localstorage
  let isMounted = false;
  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      // console.log(user);
      if (user === null) {
        dispatch(toggleAuthUser(false));
      } else {
        dispatch(toggleAuthUser(true));
        router.push('/admin');
      }
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  return (
    <Layout title="Admin Login | Ponditi">
      <section className="section-1 Admin-login">
        <div className="container">
          <div className="row mt-5">
            <div className="lockicon col-md-6 d-none d-md-block">
              <img src="/shape/login.svg" alt="" className="img-fluid" />
            </div>
            <div className="login-component col-md-6">
              <Login />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default login;
