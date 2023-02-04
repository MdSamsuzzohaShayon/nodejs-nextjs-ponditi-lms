// React/next
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// redux
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { fetchCurrentSingleUser, fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';
import { setInitializeSchedule, fetchAllRequestedSCOU } from '../../../redux/reducers/scheduledclassReducer';
import { resetErrorList } from '../../../redux/reducers/elementsSlice';

// Components
import SendRequest from '../../../components/detail/SendRequest';
import Layout from '../../../components/layouts/Layout';
import MessageList from '../../../components/elements/MessageList';
import Loader from '../../../components/elements/Loader';

// Utils/config
import { roles } from '../../../config/keys';

const { STUDENT, TEACHER } = roles;

function Index() {
  let isMounted = true;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userId, setUserId] = useState(0);
  const [existingScheduledClassList, setExistingScheduledClassList] = useState([]);

  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const initializeSchedule = useAppSelector((state) => state.scheduledclass.initializeSchedule);

  // const { userId } = router.query;

  const initializeScheduleValue = (receiverId: number) => {
    if (authUserInfo.role === TEACHER) {
      router.push('/user/dashboard');
    } else if (initializeSchedule.SubjectId === 0 || initializeSchedule.ClassTypeId === 0) {
      const search = window.localStorage.getItem('search');
      if (search) {
        const searchData = JSON.parse(search);
        dispatch(
          setInitializeSchedule({
            receiverId,
            SubjectId: parseInt(searchData.SubjectId, 10),
            ClassTypeId: parseInt(searchData.ClassTypeId, 10),
            tutionplace: searchData.tutionplace,
          }),
        );
      } else {
        router.push('/search');
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newUserId = params.get('receiverId');
    if (newUserId && authUserInfo.id) {
      // console.log("Request searching")
      const userIdInt: number = parseInt(newUserId, 10);
      if (userIdInt && isMounted) {
        setUserId(userIdInt);
        dispatch(resetErrorList());
        if (authUserInfo?.role !== STUDENT) {
          router.push('/user/login');
        }
        (async () => {
          // fetchAllRequestedSCOU
          console.log("Working");
          
          await Promise.all([
            dispatch(fetchSelectedSingleUser(userIdInt)),
            dispatch(fetchCurrentSingleUser(authUserInfo.id)),
            initializeScheduleValue(userIdInt),
            dispatch(fetchAllRequestedSCOU(userIdInt)),
          ]);
        })();
        isMounted = false;
      }
    }
  }, [authUserInfo]);

  useEffect(() => {
    // console.log(selectedUser);
    if (selectedUser.role !== TEACHER) {
      router.push('/search');
    }
  }, [selectedUser]);



  return (
    <Layout title="Tuition Request | Ponditi">
      <section className="container request">
        <MessageList />
        <SendRequest />
      </section>
    </Layout>
  );
}

export default Index;
