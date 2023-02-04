/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layouts/Layout';
import Detail from '../../../components/user/Detail';
import { fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';
import { useAppSelector, useAppDispatch } from '../../../redux/store';

function Index() {
  let isFetched = false;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);

  const selectedUser = useAppSelector((state) => state.user.selectedUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newUserId = params.get('userId');
    // console.log(userId);
    if (newUserId) {
      const userIdInt = parseInt(newUserId, 10);
      setUserId(userIdInt);
      const user = window.localStorage.getItem('user');
      if (isFetched === false && user) {
        (async () => {
          // console.log(userId);
          await dispatch(fetchSelectedSingleUser(userIdInt));
          // await Promise.all([dispatch(fetchSelectedSingleUser(newUserId)), dispatch(fetchCurrentSingleUser(newUserId))]);
        })();
        // Check auth
      }
      isFetched = true;
    } else {
      router.push('/');
    }
  }, []);

  return (
    <Layout title="User Detail | Ponditi">
      <div className="detail">
        <div className="container">
          <Detail userDetail={selectedUser} update={false} search={false} userId={userId} />
        </div>
      </div>
    </Layout>
  );
}

export default Index;
