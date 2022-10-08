import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import Detail from '../../../components/user/Detail';
import { fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';

function index() {
  let isMounted = false;
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;

  const selectedUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    if (userId && isMounted === false) {
      (async () => {
        // console.log({ userId });
        await dispatch(fetchSelectedSingleUser(userId));
      })();
      isMounted = true;
    }
  }, [router.isReady]);
  return (
    <Layout>
      <div className="container">
        <Detail userDetail={selectedUser} />
      </div>
    </Layout>
  );
}

export default index;
