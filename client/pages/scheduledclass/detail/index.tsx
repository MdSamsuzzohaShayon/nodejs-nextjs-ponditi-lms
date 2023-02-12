/* eslint-disable jsx-a11y/anchor-is-valid */

// React/next
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Redux
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { fetchSingleScheduledClass, setUpdateScheduledClass, setAcceptedSCOU, setRequestedSCOU, setRejectedSCOU } from '../../../redux/reducers/scheduledclassReducer';
import { resetErrorList, setErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import { resetAuthUserInfo, requestHistorySeen } from '../../../redux/reducers/userReducer';

// Components
import Layout from '../../../components/layouts/Layout';
import Review from '../../../components/scheduledclass/Review';
import SingleScheduledClassInfo from '../../../components/scheduledclass/SingleScheduledClassInfo';
import StopWatch from '../../../components/elements/StopWatch';
import Loader from '../../../components/elements/Loader';
import MessageList from '../../../components/elements/MessageList';

// Config/utils
import { scheduledclassStatus, roles } from '../../../config/keys';
import axios from '../../../config/axios';

const { START_CLASS, APPROVED, FINISH_CLASS, PENDING } = scheduledclassStatus;
const { TEACHER, STUDENT } = roles;

function ScheduledclassIndex() {
  // HOOKS
  const router = useRouter();
  const dispatch = useAppDispatch();

  // LOCAL STATE
  const [scheduledclassId, setScheduledclassId] = useState<number | null>(null);

  // REDUX STATE
  const singleScheduledClass = useAppSelector((state) => state.scheduledclass.singleScheduledClass);
  const updateScheduledClass = useAppSelector((state) => state.scheduledclass.updateScheduledClass);
  const requestedSCOU = useAppSelector((state) => state.scheduledclass.requestedSCOU);
  const acceptedSCOU = useAppSelector((state) => state.scheduledclass.acceptedSCOU);
  const rejectedSCOU = useAppSelector((state) => state.scheduledclass.rejectedSCOU);
  const generateBill = useAppSelector((state) => state.scheduledclass.generateBill);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const userUnseenNotifications = useAppSelector((state) => state.user.userUnseenNotifications);
  const isLoading = useAppSelector((state) => state.elements.isLoading);

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
          await dispatch(requestHistorySeen());
        }
      }
    })();
  }, []);

  /**
   * ================================================================================================
   * START A CLASS BY TEACHER
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
   * MEET LINK CHANGE HANDLER
   */
  const inputChangeHandler = (ice: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUpdateScheduledClass({ meetlink: ice.target.value }));
    // updateScheduledClass
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

  /**
   * ================================================================================================
   * SUBMIT OR ADD MEET LINK
   */
  const addMeetLinkHandler = async (amle: React.FormEvent<HTMLFormElement>) => {
    amle.preventDefault();
    try {
      if (!updateScheduledClass.meetlink) {
        return dispatch(setErrorList(['Fill all input field']));
      }
      const response = await axios.put(`/scheduledclass/update/${scheduledclassId}`, { meetlink: updateScheduledClass.meetlink });
      if (response.status === 202) {
        dispatch(dispatch(resetErrorList()));
        if (scheduledclassId) await dispatch(fetchSingleScheduledClass(scheduledclassId));
      }
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
   * FINISH THE CLASS BY TEACHER
   */
  const finishClassHandler = async (fce: React.SyntheticEvent) => {
    fce.preventDefault();
    try {
      const response = await axios.put(`/scheduledclass/finishclass/${scheduledclassId}`);
      if (response.status === 202) {
        dispatch(dispatch(resetErrorList()));
        if (scheduledclassId) await dispatch(fetchSingleScheduledClass(scheduledclassId));
      }
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
            {singleScheduledClass.status === APPROVED && authUserInfo.role === TEACHER && (
              <button type="button" className="btn btn-primary" onClick={startClassHandler}>
                Start Class
              </button>
            )}
            {singleScheduledClass.status === PENDING && authUserInfo.role === TEACHER && (
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary" onClick={acceptRequestHandler}>
                  Accept
                </button>
                <button type="button" className="btn btn-danger" onClick={rejectRequestHandler}>
                  Reject
                </button>
              </div>
            )}

            {singleScheduledClass.startedat && singleScheduledClass.status === START_CLASS && (
              <>
                <div className="card rounded-1">
                  <div className="card-header">Class Running</div>
                  <div className="card-body">
                    {/* <p>Time{singleScheduledClass.startedat}</p> */}
                    <div className="card-text">
                      <StopWatch startedat={singleScheduledClass.startedat} perHourRate={singleScheduledClass.perHourRate} />
                      Bill {generateBill} TK{' '}
                    </div>
                    <blockquote className="blockquote mt-4">
                      <footer className="blockquote-footer">
                        {authUserInfo.role === TEACHER && 'Once student paid his payment you must need to finish'}
                        {authUserInfo.role === STUDENT && 'You must pay and teacher will finish the task afterword you will be available to send another request'}
                      </footer>
                    </blockquote>
                    {authUserInfo.role === TEACHER && (
                      <button type="button" className="btn btn-primary w-fit" onClick={finishClassHandler}>
                        Finish
                      </button>
                    )}
                  </div>
                </div>

                {singleScheduledClass.meetlink && singleScheduledClass.status === START_CLASS && (
                  <div className="alert alert-primary mt-3 rounded-1">{singleScheduledClass.meetlink}</div>
                )}

                <form className="my-3" onSubmit={addMeetLinkHandler}>
                  <h5>Submit google meet link</h5>
                  <div className="row mx-0 mb-3">
                    <input type="text" className="form-control" name="meetlink" onChange={inputChangeHandler} />
                  </div>
                  <div className="row mx-0 mb-3">
                    <button type="submit" className="btn btn-primary w-fit">
                      Add Link
                    </button>
                  </div>
                </form>
              </>
            )}

            {singleScheduledClass.status === FINISH_CLASS && <Review singleScheduledClass={singleScheduledClass} authUserInfo={authUserInfo} />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ScheduledclassIndex;
