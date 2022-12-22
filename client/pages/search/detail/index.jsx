import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import Detail from '../../../components/user/Detail';
import { fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';
import { resetErrorList } from '../../../redux/reducers/elementsSlice';

function index() {
  let isMounted = false;
  const dispatch = useDispatch();
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const selectedUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newUserId = params.get('userId');
    if (newUserId) {
      setUserId(newUserId);
      if (isMounted === false) {
        (async () => {
          dispatch(resetErrorList());
          // console.log({ userId });
          await dispatch(fetchSelectedSingleUser(newUserId));
        })();
        isMounted = true;
      }
    } else {
      router.push('/');
    }
  }, []);
  return (
    <Layout>
      <div className="container">
        <Detail userDetail={selectedUser} />
      </div>
    </Layout>
  );
}

export default index;
