/* eslint-disable jsx-a11y/anchor-is-valid */

// React/next
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Redux
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { fetchSingleScheduledClass, setAcceptedSCOU, setRequestedSCOU, setRejectedSCOU } from '../../../redux/reducers/scheduledclassReducer';
import { resetErrorList, setErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import { resetAuthUserInfo, requestHistorySeen } from '../../../redux/reducers/userReducer';

// Components
import Layout from '../../../components/layouts/Layout';
import Review from '../../../components/scheduledclass/Review';
import SingleScheduledClassInfo from '../../../components/scheduledclass/SingleScheduledClassInfo';
import Loader from '../../../components/elements/Loader';
import MessageList from '../../../components/elements/MessageList';
import RunningClassElements from '../../../components/scheduledclass/RunningClassElements';

// Config/utils
import axios from '../../../config/axios';

import { StatusEnum, UserRoleEnum } from '../../../types/enums';

// Single scheduled class component
function ScheduledclassIndex() {
  // HOOKS
  const router = useRouter();
  const dispatch = useAppDispatch();

  // LOCAL STATE
  const [scheduledclassId, setScheduledclassId] = useState<number | null>(null);

  // REDUX STATE
  const singleScheduledClass = useAppSelector((state) => state.scheduledclass.singleScheduledClass);
  const requestedSCOU = useAppSelector((state) => state.scheduledclass.requestedSCOU);
  const acceptedSCOU = useAppSelector((state) => state.scheduledclass.acceptedSCOU);
  const rejectedSCOU = useAppSelector((state) => state.scheduledclass.rejectedSCOU);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const userUnseenNotifications = useAppSelector((state) => state.user.userUnseenNotifications);

  /**
   * ================================================================================================
   * FETCH A SINGLE SCHEDULED CLASS AND MAKE ALL OF THEM SEEN AT MOUNT POINT
   */
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const newScheduledclassId = params.get('scheduledclassId');
      if (newScheduledclassId) {
        const newScheduledclassIdInt = parseInt(newScheduledclassId, 10);
        setScheduledclassId(newScheduledclassIdInt);
        await dispatch(fetchSingleScheduledClass(newScheduledclassIdInt));
        if (userUnseenNotifications.length > 0) {
          // Make request to see all notifications
          await dispatch(requestHistorySeen());
        }
      }
    })();
  }, []);

  /**
   * ================================================================================================
   * START A CLASS BY StatusEnum.TEACHER
   */
  const startClassHandler = async (sce: React.SyntheticEvent) => {
    sce.preventDefault();
    try {
      const response = await axios.put(`/scheduledclass/start/${scheduledclassId}`);
      if (response.status === 202) {
        dispatch(dispatch(resetErrorList()));
        if (scheduledclassId) await dispatch(fetchSingleScheduledClass(scheduledclassId));
      }
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error?.response?.data?.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        router.push('/user/login');
      }
    }
    return null;
  };

  /**
   * ================================================================================================
   * ACCEPT THE REQUEST
   */
  const acceptRequestHandler = async (are: React.SyntheticEvent) => {
    are.preventDefault();
    try {
      dispatch(toggleLoading(true));
      // check recever id and current user id
      const response = await axios.put(`/scheduledclass/accept/${scheduledclassId}`);
      if (response.status === 200 || response.status === 202) {
        // find Item and move from  requestedSCOU to acceptedSCOU
        const newAcceptedSCOU = requestedSCOU.find((rs) => rs.id === scheduledclassId);
        const newRequestedSCOU = requestedSCOU.filter((rs) => rs.id !== scheduledclassId);
        dispatch(setAcceptedSCOU([...acceptedSCOU, newAcceptedSCOU]));
        dispatch(setRequestedSCOU(newRequestedSCOU));
        router.push('/user/requesthistory');
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        router.push('/user/login');
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  /**
   * ================================================================================================
   * REJECT TUITION REQUEST
   */
  const rejectRequestHandler = async (are: React.SyntheticEvent) => {
    are.preventDefault();
    try {
      dispatch(toggleLoading(true));
      // check recever id and current user id
      const response = await axios.put(`/scheduledclass/reject/${scheduledclassId}`);
      if (response.status === 200 || response.status === 202) {
        const newRejectedSCOU = requestedSCOU.find((rs) => rs.id === scheduledclassId);
        const newRequestedSCOU = requestedSCOU.filter((rs) => rs.id !== scheduledclassId);
        dispatch(setRejectedSCOU([...rejectedSCOU, newRejectedSCOU]));
        dispatch(setRequestedSCOU(newRequestedSCOU));
        router.push('/user/requesthistory');
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  return (
    <Layout title="Scheduled Class | Ponditi">
      <section className="section section-1">
        <div className="container">
          <MessageList />
          <div>
            {/*
             * ================================================================================================
             * DETAIL OF A SINGLE SCHEDULED CLASS
             */}
            <SingleScheduledClassInfo authUserInfo={authUserInfo} singleScheduledClass={singleScheduledClass} />
            <p>{singleScheduledClass?.desc}</p>
            {/* {singleScheduledClass.status === APPROVED && authUserInfo.role === StatusEnum.TEACHER && (
              <button type="button" className="btn btn-primary" onClick={startClassHandler}>
                Start Class
              </button>
            )} */}
            {singleScheduledClass.status === StatusEnum.PENDING && authUserInfo.role === UserRoleEnum.TEACHER && (
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary" onClick={acceptRequestHandler}>
                  Accept
                </button>
                <button type="button" className="btn btn-danger" onClick={rejectRequestHandler}>
                  Reject
                </button>
              </div>
            )}

            {scheduledclassId && <RunningClassElements authUserInfo={authUserInfo} scheduledclassId={scheduledclassId} singleScheduledClass={singleScheduledClass} />}

            {singleScheduledClass.status === StatusEnum.FINISH_CLASS && <Review singleScheduledClass={singleScheduledClass} authUserInfo={authUserInfo} />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ScheduledclassIndex;
