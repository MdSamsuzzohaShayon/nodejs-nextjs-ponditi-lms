/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */

// React/next
import Router from 'next/router';
import React, { useEffect } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchAllRequestedSCOU, setAcceptedSCOU, setRejectedSCOU, setRequestedSCOU } from '../../../redux/reducers/scheduledclassReducer';
import { setSelectedContent, requestHistorySeen, resetAuthUserInfo } from '../../../redux/reducers/userReducer';
import { toggleLoading, setErrorList } from '../../../redux/reducers/elementsSlice';

// Components
import UnderDev from '../../../components/elements/UnderDev';
import Layout from '../../../components/layouts/Layout';
import { scheduledclassStatus } from '../../../config/keys';
import ScheduledClassList from '../../../components/scheduledclass/ScheduledClassList';

// Config/utils
import axios from '../../../config/axios';

const { APPROVED, PENDING, REJECTED, START_CLASS, FINISH_CLASS } = scheduledclassStatus;

function RequesthistoryIndex() {
  const dispatch = useAppDispatch();
  // const [selectedElement, setSelectedElement] = useState(APPROVED);
  const selectedContent = useAppSelector((state) => state.user.selectedContent);

  const tabElements = useAppSelector((state) => state.scheduledclass.tabElements);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const requestedSCOU = useAppSelector((state) => state.scheduledclass.requestedSCOU);
  const runningSCOU = useAppSelector((state) => state.scheduledclass.runningSCOU);
  const completedSCOU = useAppSelector((state) => state.scheduledclass.completedSCOU);
  const acceptedSCOU = useAppSelector((state) => state.scheduledclass.acceptedSCOU);
  const rejectedSCOU = useAppSelector((state) => state.scheduledclass.rejectedSCOU);

  const userUnseenNotifications = useAppSelector((state) => state.user.userUnseenNotifications);

  const tabElementChangeHandler = (tece: React.SyntheticEvent, tabName: string) => {
    tece.preventDefault();
    dispatch(setSelectedContent(tabName));
  };

  /**
   * @action handler
   */
  const acceptRequestHandler = async (are: React.SyntheticEvent, scheduledclassId: number) => {
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
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        Router.push('/user/login');
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const rejectRequestHandler = async (are: React.SyntheticEvent, scheduledclassId: number) => {
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

  const showContent = () => {
    switch (selectedContent) {
      case APPROVED:
        return <ScheduledClassList acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} scheduledClassList={acceptedSCOU} />;
      case PENDING:
        return <ScheduledClassList acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} scheduledClassList={requestedSCOU} />;
      case REJECTED:
        return <ScheduledClassList acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} scheduledClassList={rejectedSCOU} />;

      case START_CLASS:
        return <ScheduledClassList acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} scheduledClassList={runningSCOU} />;
      case FINISH_CLASS:
        return <ScheduledClassList acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} scheduledClassList={completedSCOU} />;

      default:
        return <ScheduledClassList acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} scheduledClassList={acceptedSCOU} />;
    }
  };

  useEffect(() => {
    (async () => {
      if (authUserInfo.id) {
        await Promise.all([dispatch(fetchAllRequestedSCOU(authUserInfo.id))]);
        if (userUnseenNotifications.length > 0) {
          await dispatch(requestHistorySeen());
        }
      }
    })();
    // seen request history
  }, [authUserInfo]);

  return (
    <Layout title="Request History | Ponditi">
      <section className="section">
        <div className="container">
          <div className="requesthistory">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs">
                  {tabElements.map((te, idx) => (
                    <li className="nav-item" key={idx}>
                      <a
                        className={selectedContent === te.name ? 'nav-link rounded-1 active' : 'nav-link rounded-1'}
                        aria-current="page"
                        href="#"
                        onClick={(tece) => tabElementChangeHandler(tece, te.name)}
                      >
                        {te.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-body">
                <div className="content-for-classlist">{showContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default RequesthistoryIndex;
