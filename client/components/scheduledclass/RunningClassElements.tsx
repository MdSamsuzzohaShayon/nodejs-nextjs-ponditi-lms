// React/next
import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

// Components
import StopWatch from '../elements/StopWatch';

// Config/utils
import axios from '../../config/axios';

// Redux
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchSingleScheduledClass, setUpdateScheduledClass } from '../../redux/reducers/scheduledclassReducer';
import { resetErrorList, setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';

// Types
import { StatusEnum, UserRoleEnum } from '../../types/enums';
import { RunningClassElementsPropsIn } from '../../types/pages/scheduledclassInterface';

// Socket
import { useSocket } from '../../context/ThemeProvider';

function RunningClassElements({ singleScheduledClass, authUserInfo, scheduledclassId }: RunningClassElementsPropsIn) {
  const dispatch = useAppDispatch();
  // Socket - Use socket from context
  const socket = useSocket(); // useContext


  const generateBill = useAppSelector((state) => state.scheduledclass.generateBill);
  const updateScheduledClass = useAppSelector((state) => state.scheduledclass.updateScheduledClass);

  // console.log(authUserInfo.role === UserRoleEnum.TEACHER, singleScheduledClass.status === StatusEnum.START_CLASS);

  /**
   * ================================================================================================
   * FINISH THE CLASS BY StatusEnum.TEACHER
   */
  const finishClassHandler = async (fce: React.SyntheticEvent) => {
    fce.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.put(`/scheduledclass/finishclass/${scheduledclassId}`);
      if (response.status === 202) {
        dispatch(resetErrorList());
        const newDataObj = { receiverId: authUserInfo.id, senderId: singleScheduledClass.senderId };
        console.log("Scoket - ",newDataObj);
        await socket.emit('update-notification-from-client', newDataObj);
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
        Router.push('/user/login');
      }
    }
    dispatch(toggleLoading(false));
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
        amle.target.reset();
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

  return (
    <div>
      {singleScheduledClass.meetlink && singleScheduledClass.status === StatusEnum.APPROVED && (
        <div className="alert alert-primary mt-3 rounded-1 d-flex justify-content-between w-full align-items-center">
          <p>{singleScheduledClass.meetlink}</p>
          {authUserInfo.role === UserRoleEnum.STUDENT && (<button type="button" className="btn btn-primary">
            <Link href={singleScheduledClass.meetlink} target="_blank">
              Join
            </Link>
          </button>) }
          
        </div>
      )}

      <form className="my-3" onSubmit={addMeetLinkHandler}>
        {authUserInfo.role === UserRoleEnum.TEACHER && singleScheduledClass.status === StatusEnum.APPROVED && (
          <>
            <h5>Share class link</h5>
            <div className="row mx-0 mb-3">
              <input type="text" className="form-control" name="meetlink" onChange={inputChangeHandler} />
            </div>
          </>
        )}
        <div className="row mx-0 mb-3">
          {authUserInfo.role === UserRoleEnum.TEACHER && singleScheduledClass.status === StatusEnum.APPROVED && (
            <button type="submit" className="btn btn-primary w-fit">
              Share Link
            </button>
          )}

          {authUserInfo.role === UserRoleEnum.TEACHER &&
            (singleScheduledClass.status === StatusEnum.START_CLASS || singleScheduledClass.status === StatusEnum.APPROVED) && (
              <button type="button" className="btn btn-success text-white w-fit mx-2" onClick={finishClassHandler}>
                Completed
              </button>
            )}
        </div>
      </form>
    </div>
  );

  /*
  // Component returns previously, when teacher start the class then some effect can be shown here
  return (
    <div>
      {singleScheduledClass.startedat && singleScheduledClass.status === StatusEnum.START_CLASS && (
        <>
          <div className="card rounded-1">
            <div className="card-header">Class Running</div>
            <div className="card-body">
              <p>Time{singleScheduledClass.startedat}</p>
              <div className="card-text">
                <StopWatch startedat={singleScheduledClass.startedat} perHourRate={singleScheduledClass.perHourRate} />
                Bill {generateBill} TK{' '}
              </div>

              <blockquote className="blockquote mt-4">
                <footer className="blockquote-footer">
                  {authUserInfo.role === UserRoleEnum.TEACHER && 'Once student paid his payment you must need to finish'}
                  {authUserInfo.role === UserRoleEnum.STUDENT && 'You must pay and teacher will finish the task afterword you will be available to send another request'}
                </footer>
              </blockquote>

              {authUserInfo.role === UserRoleEnum.TEACHER && (
                <button type="button" className="btn btn-primary w-fit" onClick={finishClassHandler}>
                  Finish
                </button>
              )}
            </div>
          </div>

          {singleScheduledClass.meetlink && singleScheduledClass.status === StatusEnum.START_CLASS && (
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
    </div>
  );
  */
}

export default RunningClassElements;