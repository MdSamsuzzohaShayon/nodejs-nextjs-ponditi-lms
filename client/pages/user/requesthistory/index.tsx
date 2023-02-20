/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */

// React/next
import Router from 'next/router';
import React, { useEffect } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchAllRequestedSCOU, setAcceptedSCOU, setRejectedSCOU, setRequestedSCOU, fetchSingleScheduledClass } from '../../../redux/reducers/scheduledclassReducer';
import { setSelectedContent, requestHistorySeen, resetAuthUserInfo } from '../../../redux/reducers/userReducer';
import { toggleLoading, setErrorList, resetErrorList } from '../../../redux/reducers/elementsSlice';

// Components
import UnderDev from '../../../components/elements/UnderDev';
import Layout from '../../../components/layouts/Layout';
import { scheduledclassStatus } from '../../../config/keys';
import ScheduledClassList from '../../../components/scheduledclass/ScheduledClassList';
import MessageList from '../../../components/elements/MessageList';
import ModalQuestion from '../../../components/elements/ModalQuestion';

// Config/utils
import axios from '../../../config/axios';

// Types
import { StatusEnum } from '../../../types/enums';
import { CreatedScheduledClassIn } from '../../../types/pages/scheduledclassInterface';

// Socket
import { useSocket } from '../../../context/ThemeProvider';

// const { StatusEnum.APPROVED, StatusEnum.PENDING, StatusEnum.REJECTED, StatusEnum.START_CLASS, StatusEnum.FINISH_CLASS } = scheduledclassStatus;

// Component
function RequesthistoryIndex() {
  // Hooks
  const dispatch = useAppDispatch();
  // const [selectedElement, setSelectedElement] = useState(StatusEnum.APPROVED);

  // Socket - Use socket from context
  const socket = useSocket(); // useContext

  // Redux state
  const selectedContent = useAppSelector((state) => state.user.selectedContent);
  const tabElements = useAppSelector((state) => state.scheduledclass.tabElements);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const requestedSCOU = useAppSelector((state) => state.scheduledclass.requestedSCOU);
  const runningSCOU = useAppSelector((state) => state.scheduledclass.runningSCOU);
  const completedSCOU = useAppSelector((state) => state.scheduledclass.completedSCOU);
  const acceptedSCOU = useAppSelector((state) => state.scheduledclass.acceptedSCOU);
  const rejectedSCOU = useAppSelector((state) => state.scheduledclass.rejectedSCOU);
  const userUnseenNotifications = useAppSelector((state) => state.user.userUnseenNotifications);

  /**
   * =============================================================================================
   * EVENT FOR TOGGLE ELEMENTS BETWEEN DIFFERENT STATUS OF CLASS
   */
  const tabElementChangeHandler = (tece: React.SyntheticEvent, tabName: string) => {
    tece.preventDefault();
    dispatch(setSelectedContent(tabName));
  };

  /**
   * =============================================================================================
   * EVENT FOR ACCEPTING THE CLASS
   */
  const acceptRequestHandler = async (are: React.SyntheticEvent, singleMessageCls: CreatedScheduledClassIn) => {
    are.preventDefault();
    try {
      dispatch(toggleLoading(true));
      // console.log(scheduledclassId);
      if (!singleMessageCls.id) return;
      // check recever id and current user id
      const response = await axios.put(`/scheduledclass/accept/${singleMessageCls.id}`);
      if (response.status === 200 || response.status === 202) {
        // find Item and move from  requestedSCOU to acceptedSCOU
        const newAcceptedSCOU = requestedSCOU.find((rs) => rs.id === singleMessageCls.id);
        const newRequestedSCOU = requestedSCOU.filter((rs) => rs.id !== singleMessageCls.id);
        // console.log({ requestedSCOU, newAcceptedSCOU, newRequestedSCOU });
        const newDataObj = { receiverId: authUserInfo.id, senderId: singleMessageCls.Sender.id };
        console.log("Scoket - ",newDataObj);
        await socket.emit('update-notification-from-client', newDataObj);
        dispatch(setAcceptedSCOU([...acceptedSCOU, newAcceptedSCOU]));
        dispatch(setRequestedSCOU(newRequestedSCOU));
        // console.log({ newAcceptedSCOU, newRequestedSCOU });
        dispatch(setSelectedContent(StatusEnum.APPROVED));
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

  /**
   * =============================================================================================
   * EVENT FOR REJECTING A CLASS
   */
  const rejectRequestHandler = async (are: React.SyntheticEvent, singleMessageCls: CreatedScheduledClassIn) => {
    are.preventDefault();
    if (!singleMessageCls.id) return;
    try {
      dispatch(toggleLoading(true));
      // check recever id and current user id
      const response = await axios.put(`/scheduledclass/reject/${singleMessageCls.id}`);
      if (response.status === 200 || response.status === 202) {
        const newDataObj = { receiverId: authUserInfo.id, senderId: singleMessageCls.Sender.id };
        await socket.emit('update-notification-from-client', newDataObj);
        const newRejectedSCOU = requestedSCOU.find((rs) => rs.id === singleMessageCls.id);
        const newRequestedSCOU = requestedSCOU.filter((rs) => rs.id !== singleMessageCls.id);
        dispatch(setRejectedSCOU([...rejectedSCOU, newRejectedSCOU]));
        dispatch(setRequestedSCOU(newRequestedSCOU));
        dispatch(setSelectedContent(StatusEnum.REJECTED));
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
   * FINISH THE CLASS BY StatusEnum.TEACHER
   */
  const finishClassHandler = async (fce: React.SyntheticEvent, singleMessageCls: CreatedScheduledClassIn) => {
    fce.preventDefault();
    // console.log(singleMessageCls);
    
    if (!singleMessageCls.id) return;
    try {
      dispatch(toggleLoading(true));
      const response = await axios.put(`/scheduledclass/finishclass/${singleMessageCls.id}`);
      if (response.status === 202) {
        dispatch(resetErrorList());
        const newDataObj = { receiverId: authUserInfo.id, senderId: singleMessageCls.Sender.id };
        await socket.emit('update-notification-from-client', newDataObj);
        if (singleMessageCls.id) await dispatch(fetchSingleScheduledClass(singleMessageCls.id));
        dispatch(setSelectedContent(StatusEnum.FINISH_CLASS));
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error?.response?.data?.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        Router.push('/user/login');
      }
    }
    dispatch(toggleLoading(false));
  };
  const fakeFinishClassHandler = async (fce: React.SyntheticEvent, singleMessageCls: CreatedScheduledClassIn) => {
    fce.preventDefault();
    console.log('Can not finish class from here', singleMessageCls);
  };

  /**
   * =============================================================================================
   * DISPLAY CONTENT DEStatusEnum.PENDING ON DIFFERENT TYPE OF CLICK
   */
  const showContent = () => {
    switch (selectedContent) {
      case StatusEnum.APPROVED:
        return (
          <ScheduledClassList
            finishClassHandler={finishClassHandler}
            acceptRequestHandler={acceptRequestHandler}
            rejectRequestHandler={rejectRequestHandler}
            scheduledClassList={acceptedSCOU}
          />
        );
      case StatusEnum.PENDING:
        return (
          <ScheduledClassList
            finishClassHandler={fakeFinishClassHandler}
            acceptRequestHandler={acceptRequestHandler}
            rejectRequestHandler={rejectRequestHandler}
            scheduledClassList={requestedSCOU}
          />
        );
      case StatusEnum.REJECTED:
        return (
          <ScheduledClassList
            finishClassHandler={fakeFinishClassHandler}
            acceptRequestHandler={acceptRequestHandler}
            rejectRequestHandler={rejectRequestHandler}
            scheduledClassList={rejectedSCOU}
          />
        );

      case StatusEnum.START_CLASS:
        return (
          <ScheduledClassList
            finishClassHandler={finishClassHandler}
            acceptRequestHandler={acceptRequestHandler}
            rejectRequestHandler={rejectRequestHandler}
            scheduledClassList={runningSCOU}
          />
        );
      case StatusEnum.FINISH_CLASS:
        return (
          <ScheduledClassList
            finishClassHandler={fakeFinishClassHandler}
            acceptRequestHandler={acceptRequestHandler}
            rejectRequestHandler={rejectRequestHandler}
            scheduledClassList={completedSCOU}
          />
        );

      default:
        return (
          <ScheduledClassList
            finishClassHandler={fakeFinishClassHandler}
            acceptRequestHandler={acceptRequestHandler}
            rejectRequestHandler={rejectRequestHandler}
            scheduledClassList={acceptedSCOU}
          />
        );
    }
  };

  /**
   * =============================================================================================
   * MAKE ALL NOTIFICATIONS SEEN ON MOUNTING THE COMPONENT
   */
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

  // useEffect(() => {
  //   // top = -getBoundingClientRect().height
  //   const tooltips = document.querySelectorAll('.tooltip-custom');
  //   console.log({ tooltips });
  //   // position-relative
  //   tooltips.forEach((tooltop) => {
  //     console.log({tooltop});

  //     if (tooltop.parentElement) {
  //       tooltop.parentElement.style.position = 'relative';
  //       tooltop.style.top = `-${tooltop.getBoundingClientRect().height}px`;
  //       tooltop.style.display = `none`;
  //     }
  //   });
  // }, [selectedContent]);

  return (
    <Layout title="Request History | Ponditi">
      <section className="section">
        <ModalQuestion />
        <div className="container">
          <div className="requesthistory">
            <div className="card w-full">
              <div className="card-header">
                <h5 className="card-title text-center">Class summary</h5>
              </div>
              <div className="card-body">
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <div className="row">
                  <div className="col-md-6">
                    <p className="card-text">Approved class {acceptedSCOU.length}</p>
                    <p className="card-text">Rejected class {rejectedSCOU.length}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="card-text">Completed class {completedSCOU.length}</p>
                    <p className="card-text">Requested class {requestedSCOU.length}</p>
                  </div>
                </div>
              </div>
            </div>
            <MessageList />
            <div className="card w-full">
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
