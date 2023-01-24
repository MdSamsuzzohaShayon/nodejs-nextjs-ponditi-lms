/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import { fetchSingleScheduledClass, setUpdateScheduledClass, setAcceptedSCOU, setRequestedSCOU, setRejectedSCOU } from '../../../redux/reducers/scheduledclassReducer';
import { resetErrorList, setErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import { resetAuthUserInfo, requestHistorySeen } from '../../../redux/reducers/userReducer';
import { scheduledclassStatus, roles } from '../../../config/keys';
import axios from '../../../config/axios';
import Review from '../../../components/scheduledclass/Review';
import SingleScheduledClassInfo from '../../../components/scheduledclass/SingleScheduledClassInfo';
import StopWatch from '../../../components/elements/StopWatch';
import Loader from '../../../components/elements/Loader';
import MessageList from '../../../components/elements/MessageList';

const { START_CLASS, APPROVED, FINISH_CLASS, PENDING } = scheduledclassStatus;
const { TEACHER, STUDENT } = roles;

function detail() {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { scheduledclassId } = router.query;
  const [scheduledclassId, setScheduledclassId] = useState(null);

  const singleScheduledClass = useSelector((state) => state.scheduledclass.singleScheduledClass);
  const updateScheduledClass = useSelector((state) => state.scheduledclass.updateScheduledClass);

  const requestedSCOU = useSelector((state) => state.scheduledclass.requestedSCOU);
  const acceptedSCOU = useSelector((state) => state.scheduledclass.acceptedSCOU);
  const rejectedSCOU = useSelector((state) => state.scheduledclass.rejectedSCOU);
  const generateBill = useSelector((state) => state.scheduledclass.generateBill);

  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const userUnseenNotifications = useSelector((state) => state.user.userUnseenNotifications);

  const isLoading = useSelector((state) => state.elements.isLoading);

  // console.log({scheduledclassId});

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const newScheduledclassId = params.get('scheduledclassId');
      setScheduledclassId(newScheduledclassId);
      if (newScheduledclassId) {
        await dispatch(fetchSingleScheduledClass(newScheduledclassId));
        if (userUnseenNotifications.length > 0) {
          await dispatch(requestHistorySeen(null));
        }
      }
    })();
  }, [router.isReady]);

  /*
  useEffect(()=>{
    console.log("singleScheduledClass");
    console.log(singleScheduledClass);
  }, [singleScheduledClass]);
  */

  const startClassHandler = async (sce) => {
    sce.preventDefault();
    try {
      const response = await axios.put(`/scheduledclass/start/${scheduledclassId}`);
      if (response.status === 202) {
        dispatch(dispatch(resetErrorList()));
        await dispatch(fetchSingleScheduledClass(scheduledclassId));
      }
      // console.log(response.data);
      return response.data;
    } catch (error) {
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

  const inputChangeHandler = (ice) => {
    dispatch(setUpdateScheduledClass({ meetlink: ice.target.value }));
    // updateScheduledClass
  };

  /**
   * @action handler
   */
  const acceptRequestHandler = async (are) => {
    are.preventDefault();
    try {
      dispatch(toggleLoading());
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
    } catch (error) {
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
      dispatch(toggleLoading());
    }
  };

  const rejectRequestHandler = async (are) => {
    are.preventDefault();
    try {
      dispatch(toggleLoading());
      // check recever id and current user id
      const response = await axios.put(`/scheduledclass/reject/${scheduledclassId}`);
      if (response.status === 200 || response.status === 202) {
        const newRejectedSCOU = requestedSCOU.find((rs) => rs.id === scheduledclassId);
        const newRequestedSCOU = requestedSCOU.filter((rs) => rs.id !== scheduledclassId);
        dispatch(setRejectedSCOU([...rejectedSCOU, newRejectedSCOU]));
        dispatch(setRequestedSCOU(newRequestedSCOU));
        router.push('/user/requesthistory');
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading());
    }
  };

  const addMeetLinkHandler = async (amle) => {
    amle.preventDefault();
    try {
      if (!updateScheduledClass.meetlink) {
        return dispatch(setErrorList(['Fill all input field']));
      }
      const response = await axios.put(`/scheduledclass/update/${scheduledclassId}`, { meetlink: updateScheduledClass.meetlink });
      if (response.status === 202) {
        dispatch(dispatch(resetErrorList()));
        await dispatch(fetchSingleScheduledClass(scheduledclassId));
      }
    } catch (error) {
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

  const finishClassHandler = async (fce) => {
    fce.preventDefault();
    try {
      const response = await axios.put(`/scheduledclass/finishclass/${scheduledclassId}`);
      if (response.status === 202) {
        dispatch(dispatch(resetErrorList()));
        await dispatch(fetchSingleScheduledClass(scheduledclassId));
      }
    } catch (error) {
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

export default detail;
