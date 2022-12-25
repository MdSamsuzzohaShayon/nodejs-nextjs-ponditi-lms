import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import Detail from '../../../components/user/Detail';
import { fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';

function index() {
  let isFetched = false;
  const dispatch = useDispatch();
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const selectedUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newUserId = params.get('userId');
    // console.log(userId);
    if (newUserId) {
      setUserId(newUserId);
      const user = window.localStorage.getItem('user');
      if (isFetched === false && user) {
        (async () => {
          // console.log(userId);
          await dispatch(fetchSelectedSingleUser(newUserId));
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
    <Layout>
      <div className="detail">
        <div className="container">
          <Detail userDetail={selectedUser} update={false} />
        </div>
      </div>
    </Layout>
  );
}

export default index;
