import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Layout from '../../components/layouts/Layout';
import { fetchSingleUser } from '../../redux/reducers/scheduledclassReducer';
import ErrorMessages from '../../components/elements/ErrorMessages';
import SendRequest from '../../components/detail/SendRequest';
import Detail from '../../components/user/Detail';
import { roles } from '../../config/keys';

const { TEACHER } = roles;

function selected() {
  let isMounted = false;
  const dispatch = useDispatch();
  // check user id
  const selectedSearchUser = useSelector(
    (state) => state.scheduledclass.selectedSearchUser
  );
  const madeRequest = useSelector((state) => state.scheduledclass.madeRequest);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  useEffect(() => {
    if (isMounted === false) {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('userId');
      if (!userId) {
        Router.push('/search');
      }
      if (Object.keys(selectedSearchUser).length === 0) {
        // get single user
        dispatch(fetchSingleUser(userId));
      }
    }
    isMounted = true;
  }, []);

  return (
    <Layout>
      <div className="selected">
        <section className="section-1 section">
          <div className="container">
            <ErrorMessages />
            {madeRequest && authUserInfo.role !== TEACHER ? (
              <SendRequest />
            ) : (
              <Detail userDetail={selectedSearchUser} update={false} />
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default selected;
