import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toggleLoading } from '../../redux/reducers/elementsSlice';
import {
  toggleAuthUser,
  setAuthUserInfo,
  resetAuthUserInfo,
} from '../../redux/reducers/userReducer';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const dispatch = useDispatch();
  let isMounted = false;
  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      // console.log(JSON.parse(user));
      if (user === null) {
        dispatch(toggleAuthUser(false));
        dispatch(resetAuthUserInfo());
      } else {
        dispatch(toggleAuthUser(true));
        dispatch(setAuthUserInfo(JSON.parse(user)));
      }
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);
  return (
    <div className="Layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
