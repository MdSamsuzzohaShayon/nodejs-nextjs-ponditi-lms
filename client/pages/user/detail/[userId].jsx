import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import Detail from '../../../components/user/Detail';
import { fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';

function index() {
  let isFetched = false;
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;

  const selectedUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    if (userId) {
      const user = window.localStorage.getItem('user');
      if (isFetched === false && user) {
        (async () => {
          console.log(userId);
          await dispatch(fetchSelectedSingleUser(userId));
        })();
        // Check auth
      }
      isFetched = true;
    }
  }, [router.isReady]);
  return (
    <Layout>
      <div className="container">
        <Detail userDetail={selectedUser} update={false} />
      </div>
    </Layout>
  );
}

export default index;