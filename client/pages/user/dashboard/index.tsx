/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toggleLoading, resetErrorList } from '../../../redux/reducers/elementsSlice';
import { toggleAuthUser } from '../../../redux/reducers/userReducer';
import { fetchAllRequestedSCOU } from '../../../redux/reducers/scheduledclassReducer';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import Detail from '../../../components/user/Detail';
import Layout from '../../../components/layouts/Layout';
import { roles } from '../../../config/keys';

const { ADMIN } = roles;

function DashboardIndex() {
  let isMounted = false;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      // console.log(user);
      if (user === null) {
        dispatch(toggleAuthUser(false));
        router.push('/user/login');
      } else {
        dispatch(toggleAuthUser(true));
        const userData = JSON.stringify(user);
        if (userData.role === ADMIN) {
          router.push('/admin');
        }
      }
      dispatch(resetErrorList([]));
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  useEffect(() => {
    (async () => {
      if (authUserInfo.id) {
        await Promise.all([dispatch(fetchAllRequestedSCOU(authUserInfo.id))]);
      }
    })();
  }, [authUserInfo]);

  return (
    <Layout title="User Dahboard | Ponditi">
      <div className="user-dashboard d-flex">
        <div className="container">
          {/* <img src="https://ponditistorage.s3.ap-southeast-1.amazonaws.com/ramos.jpg-42-image.jpg" height="200" alt="User Image" /> */}
          {/* userDetail, update, search, userId */}
          <Detail userDetail={currentUser} update search={false} userId={authUserInfo.id} />
        </div>
      </div>
    </Layout>
  );
}

export default DashboardIndex;
