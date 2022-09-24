import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/Layout';
import Login from '../../components/admin/Login';
import { toggleAuthUser } from '../../redux/reducers/userReducer';
import { toggleLoading } from '../../redux/reducers/elementsSlice';
import Loader from '../../components/elements/Loader';

function login() {
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
      } else {
        dispatch(toggleAuthUser(true));
        router.push('/admin');
      }
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  return (
    <Layout>
      <section className="section-1 Admin-login">
        <div className="container">{isLoading ? <Loader /> : <Login />}</div>
      </section>
    </Layout>
  );
}

export default login;
