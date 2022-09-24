import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/Layout';
import { toggleAuthUser } from '../../redux/reducers/userReducer';
import { toggleLoading } from '../../redux/reducers/elementsSlice';
import Loader from '../../components/elements/Loader';
import Dashboard from '../../components/admin/Dashboard';

function index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.elements.isLoading);

  // get localstorage
  let isMounted = false;
  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      // console.log(user);
      if (user === null) {
        dispatch(toggleAuthUser(false));
        router.push('/admin/login');
      } else {
        dispatch(toggleAuthUser(true));
      }
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  // otherwise use dashboard component
  return (
    <Layout>
      <section className="section-1 Admin">
        {isLoading ? <Loader /> : <Dashboard />}
      </section>
    </Layout>
  );
}

export default index;
