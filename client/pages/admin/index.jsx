import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/Layout';
import { toggleAuthUser, fetchAllUsersByAdmin, resetAllUserList } from '../../redux/reducers/userReducer';
import { toggleLoading } from '../../redux/reducers/elementsSlice';
import Loader from '../../components/elements/Loader';
import Dashboard from '../../components/admin/Dashboard';
import { fetchAllClassTypes } from '../../redux/reducers/classtypeReducer';
import { fetchAllSubjects } from '../../redux/reducers/subjectReducer';
import { roles } from '../../config/keys';
import { fetchAllTuitionms } from '../../redux/reducers/tuitionmReducer';

const { ADMIN } = roles;

function index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.elements.isLoading);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  // get localstorage
  let isMounted = false;
  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = window.localStorage.getItem('user');
      const userData = JSON.parse(user);
      if (userData && userData.role === ADMIN) {
        dispatch(toggleAuthUser(true));
        dispatch(toggleLoading(false));

        // Fetch data
        (async () => {
          await Promise.all([dispatch(fetchAllUsersByAdmin(null)), dispatch(fetchAllClassTypes()), dispatch(fetchAllSubjects()), dispatch(fetchAllTuitionms())]);
        })();
      } else {
        dispatch(toggleAuthUser(false));
        window.localStorage.removeItem('user');
        router.push('/admin/login');
      }
    }
    isMounted = true;
    // return () => {
    //   dispatch(resetAllUserList());
    // };
  }, []);

  // otherwise use dashboard component
  return (
    <Layout>
      <section className="section-1 Admin">{isLoading ? <Loader /> : <Dashboard />}</section>
    </Layout>
  );
}

export default index;
