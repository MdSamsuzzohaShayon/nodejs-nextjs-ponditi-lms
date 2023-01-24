import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import ChangePass from '../../../components/changepassword/ChangePass';
import Loader from '../../../components/elements/Loader';
import MessageList from '../../../components/elements/MessageList';
import { toggleLoading, resetErrorList } from '../../../redux/reducers/elementsSlice';
import { toggleAuthUser } from '../../../redux/reducers/userReducer';


function index() {
  let isMounted = false;
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.elements.isLoading);

  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      if (user === null) {
        dispatch(toggleAuthUser(false));
        Router.push('/user/login');
      } else {
        dispatch(toggleAuthUser(true));
      }
      dispatch(resetErrorList([]));
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  return (
    <Layout title="Admin Password Change | Ponditi">
      <div className="container mt-2">
        <MessageList />
      </div>
      <div className="changepassword">{isLoading ? <Loader /> : <ChangePass />}</div>
    </Layout>
  );
}

export default index;
