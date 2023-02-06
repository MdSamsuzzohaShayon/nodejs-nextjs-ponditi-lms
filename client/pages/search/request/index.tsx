// React/next
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// redux
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { fetchCurrentSingleUser, fetchSelectedSingleUser } from '../../../redux/reducers/userReducer';
import { setInitializeSchedule, fetchAllRequestedSCOU } from '../../../redux/reducers/scheduledclassReducer';
import { resetErrorList } from '../../../redux/reducers/elementsSlice';
import { fetchAllSubjects } from '../../../redux/reducers/subjectReducer';
import { fetchAllClassTypes } from '../../../redux/reducers/classtypeReducer';

// Components
import SendRequest from '../../../components/detail/SendRequest';
import Layout from '../../../components/layouts/Layout';
import MessageList from '../../../components/elements/MessageList';
import Loader from '../../../components/elements/Loader';

// Utils/config
import { roles } from '../../../config/keys';

// Types
import { TuitionStyleEnum } from '../../../types/enums';
import { ScheduledClassInterface } from '../../../types/redux/scheduledclassInterface';

const { STUDENT, TEACHER } = roles;

// Request index component
function RequestIndex() {
  let isMounted = true;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userId, setUserId] = useState(0);

  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const initializeSchedule = useAppSelector((state) => state.scheduledclass.initializeSchedule);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  // const { userId } = router.query;

  /**
   * INITIALIZE SCHEDULE AT COMPONENT MOUNT
   * =========================================================================================================
   */
  const initializeScheduleValue = (receiverId: number) => {
    if (authUserInfo.role === TEACHER) {
      router.push('/user/dashboard');
    } else if (initializeSchedule.SubjectId === 0 || initializeSchedule.ClassTypeId === 0) {
      const search = window.localStorage.getItem('search');
      if (search) {
        const searchData = JSON.parse(search);
        const today = new Date();

        let SubjectId = 0;
        if (searchData.SubjectId && searchData.SubjectId !== '0') {
          dispatch(fetchAllSubjects(null));
          SubjectId = parseInt(searchData.SubjectId, 10);
        }
        let ClassTypeId = 0;
        if (searchData.ClassTypeId && searchData.ClassTypeId !== '0') {
          dispatch(fetchAllClassTypes(null));
          ClassTypeId = parseInt(searchData.ClassTypeId, 10);
        }
        // Fetch subject and class

        const scheduledClassObj: ScheduledClassInterface = {
          receiverId,
          SubjectId,
          ClassTypeId,
          tutionplace: searchData.tutionplace,
          desc: 'This is Note',
          date: `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`,
          time: '',
          tuitionlocation: '',
        };

        // Settuition location
        if (initializeSchedule.tutionplace === TuitionStyleEnum.ONLINE || initializeSchedule.tutionplace === TuitionStyleEnum.ANY) {
          scheduledClassObj.tuitionlocation = TuitionStyleEnum.ONLINE;
          // FOR TEACHER'S LOCATION
        } else if (initializeSchedule.tutionplace === TuitionStyleEnum.TL) {
          scheduledClassObj.tuitionlocation = selectedUser.presentaddress;
          // fOR STUDENT'S LOCATION
        } else if (initializeSchedule.tutionplace === TuitionStyleEnum.SL) {
          let placeWithoutLngLat = currentUser.presentaddress;
          if (placeWithoutLngLat.includes('(')) {
            // eslint-disable-next-line prefer-destructuring
            placeWithoutLngLat = placeWithoutLngLat.split('(')[0];
          }
          scheduledClassObj.tuitionlocation = placeWithoutLngLat;
        }
        dispatch(setInitializeSchedule(scheduledClassObj));
      } else {
        router.push('/');
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
          await Promise.all([dispatch(fetchSelectedSingleUser(userIdInt)), initializeScheduleValue(userIdInt), dispatch(fetchAllRequestedSCOU(userIdInt))]);
          // Initialize scheduled class here
          initializeScheduleValue(userIdInt);
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

export default RequestIndex;
