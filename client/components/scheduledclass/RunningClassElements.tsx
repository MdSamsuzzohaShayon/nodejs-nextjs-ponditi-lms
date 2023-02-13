// React/next
import React from 'react';
import Router from 'next/router';

// Components
import StopWatch from '../elements/StopWatch';

// Config/utils
import axios from '../../config/axios';

// Redux
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchSingleScheduledClass, setUpdateScheduledClass } from '../../redux/reducers/scheduledclassReducer';
import { resetErrorList, setErrorList } from '../../redux/reducers/elementsSlice';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';

// Types
import { StatusEnum, UserRoleEnum } from '../../types/enums';
import { RunningClassElementsPropsIn } from '../../types/pages/scheduledclassInterface';

function RunningClassElements({ singleScheduledClass, authUserInfo, scheduledclassId }: RunningClassElementsPropsIn) {
  const dispatch = useAppDispatch();
  const generateBill = useAppSelector((state) => state.scheduledclass.generateBill);
  const updateScheduledClass = useAppSelector((state) => state.scheduledclass.updateScheduledClass);

  /**
   * ================================================================================================
   * FINISH THE CLASS BY StatusEnum.TEACHER
   */
  const finishClassHandler = async (fce: React.SyntheticEvent) => {
    fce.preventDefault();
    try {
      const response = await axios.put(`/scheduledclass/finishclass/${scheduledclassId}`);
      if (response.status === 202) {
        dispatch(resetErrorList());
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
      {singleScheduledClass.status === StatusEnum.APPROVED && (
        <>
          {singleScheduledClass.meetlink && <div className="alert alert-primary mt-3 rounded-1">{singleScheduledClass.meetlink}</div>}

          <form className="my-3" onSubmit={addMeetLinkHandler}>
            <h5>Submit google meet link</h5>
            <div className="row mx-0 mb-3">
              <input type="text" className="form-control" name="meetlink" onChange={inputChangeHandler} />
            </div>
            <div className="row mx-0 mb-3">
              <button type="submit" className="btn btn-primary w-fit">
                Add Link
              </button>
              {authUserInfo.role === UserRoleEnum.TEACHER && (
                <button type="button" className="btn btn-danger w-fit" onClick={finishClassHandler}>
                  Finish
                </button>
              )}
            </div>
          </form>
        </>
      )}
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
