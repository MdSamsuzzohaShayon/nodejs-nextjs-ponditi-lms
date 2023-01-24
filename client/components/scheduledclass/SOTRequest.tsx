import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import Router from 'next/router';
import ScheduledClassList from './ScheduledClassList';
import { toggleLoading, setErrorList } from '../../redux/reducers/elementsSlice';
import { setRequestedSCOU, setAcceptedSCOU, setRejectedSCOU } from '../../redux/reducers/scheduledclassReducer';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';
import axios from '../../config/axios';

// SOR = student or teacher
function SOTRequest() {
  const dispatch = useDispatch();

  /**
   * @select from redux store
   * */
  const requestedSCOU = useSelector((state) => state.scheduledclass.requestedSCOU);
  const acceptedSCOU = useSelector((state) => state.scheduledclass.acceptedSCOU);
  const rejectedSCOU = useSelector((state) => state.scheduledclass.rejectedSCOU);

  /**
   * @action handler
   */
  const acceptRequestHandler = async (are, scheduledclassId) => {
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
      }
    } catch (error) {
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
      dispatch(toggleLoading());
    }
  };

  const rejectRequestHandler = async (are, scheduledclassId) => {
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

  return (
    <div className="SOTRequest">
      <h1>Requested Scheduled Class List</h1>
      {requestedSCOU.length > 0 ? (
        <ScheduledClassList scheduledClassList={requestedSCOU} acceptRequestHandler={acceptRequestHandler} rejectRequestHandler={rejectRequestHandler} />
      ) : (
        <div className="alert alert-danger">No request found</div>
      )}
    </div>
  );
}

export default SOTRequest;
