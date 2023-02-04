import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layouts/Layout';
import Detail from '../../../components/user/Detail';
import { fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { resetErrorList } from '../../../redux/reducers/elementsSlice';

function Index() {
  let isMounted = false;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);

  const selectedUser = useAppSelector((state) => state.user.selectedUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newUserId = params.get('userId');
    if (newUserId) {
      const userIdInt = parseInt(newUserId, 10);
      setUserId(userIdInt);
      if (isMounted === false) {
        (async () => {
          dispatch(resetErrorList());
          // console.log({ userId });
          await dispatch(fetchSelectedSingleUser(userIdInt));
        })();
        isMounted = true;
      }
    } else {
      router.push('/');
    }
  }, []);
  return (
    <Layout title="Teacher Detail | Ponditi">
      <div className="container">
        <Detail userDetail={selectedUser} userId={userId} update={false} search />
      </div>
    </Layout>
  );
}

export default Index;
