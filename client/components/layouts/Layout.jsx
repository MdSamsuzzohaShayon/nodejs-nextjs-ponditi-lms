import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toggleLoading } from '../../redux/reducers/elementsSlice';
import { toggleAuthUser, setAuthUserInfo, resetAuthUserInfo } from '../../redux/reducers/userReducer';
import Header from './Header';
import Footer from './Footer';
import Loader from '../elements/Loader';

function Layout({ children }) {
  let isMounted = false;
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.elements.isLoading);

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

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && dispatch(toggleLoading(true));
    const handleComplete = (url) => url === router.asPath && dispatch(toggleLoading(false));

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <div className="Layout">
      <Header />
      {isLoading ? <Loader /> : children}
      <Footer />
    </div>
  );
}

export default Layout;
