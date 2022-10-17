import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';
import SendRequest from '../../../components/detail/SendRequest';
import Layout from '../../../components/layouts/Layout';
import { roles } from '../../../config/keys';
import { setInitializeSchedule } from '../../../redux/reducers/scheduledclassReducer';
import ErrorMessages from '../../../components/elements/ErrorMessages';
import { resetErrorList } from '../../../redux/reducers/elementsSlice';
import Loader from '../../../components/elements/Loader';

const { STUDENT, TEACHER } = roles;

function index() {
  let isMounted = true;
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoading = useSelector((state) => state.elements.isLoading);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const initializeSchedule = useSelector(
    (state) => state.scheduledclass.initializeSchedule
  );

  const { userId } = router.query;

  const initializeScheduleValue = (receverId) => {
    if (authUserInfo.role === TEACHER) {
      router.push('/user/dashboard');
    } else if (
      initializeSchedule.SubjectId === null ||
      initializeSchedule.ClassTypeId === null
    ) {
      const search = window.localStorage.getItem('search');
      if (search) {
        const searchData = JSON.parse(search);
        dispatch(
          setInitializeSchedule({
            receverId: parseInt(receverId, 10),
            SubjectId: parseInt(searchData.SubjectId, 10),
            ClassTypeId: parseInt(searchData.ClassTypeId, 10),
          })
        );
      } else {
        router.push('/search');
      }
    }
  };

  useEffect(() => {
    if (userId && isMounted) {
      dispatch(resetErrorList());
      if (authUserInfo?.role !== STUDENT) {
        router.push('/user/login');
      }
      (async () => {
        // console.log({ userId, authUserInfo });
        await dispatch(fetchSelectedSingleUser(userId));
        await initializeScheduleValue(userId);
        // console.log(selectedUser);
      })();
      isMounted = false;
    }
  }, [router.isReady]);

  useEffect(() => {
    // console.log(selectedUser);
    if (selectedUser.role !== TEACHER) {
      router.push('/search');
    }
  }, [selectedUser]);

  return (
    <Layout>
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ErrorMessages />
            <SendRequest />
          </>
        )}
      </div>
    </Layout>
  );
}

export default index;
