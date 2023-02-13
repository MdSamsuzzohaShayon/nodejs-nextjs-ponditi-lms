/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @next/next/no-img-element */

// React/next
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

// Redux
import { setShowReviewFields, setLeaveAReview, fetchSingleScheduledClass, resetLeaveAReview } from '../../redux/reducers/scheduledclassReducer';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';
import { setErrorList, resetErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

// Components
import MakeStar from '../elements/MakeStar';

// Config/utils
import axios from '../../config/axios';

// Types
import { UserRoleEnum } from '../../types/enums';
import { RefiewPropsIn, ScheduledClassReviewIn } from '../../types/pages/scheduledclassInterface';

function Review({ singleScheduledClass }: RefiewPropsIn) {
  const dispatch = useAppDispatch();
  const [reviewList, setReviewList] = useState<ScheduledClassReviewIn[]>([]);
  const [reviewerIds, setReviewerIds] = useState<number[]>([]);

  const leaveAReview = useAppSelector((state) => state.scheduledclass.leaveAReview);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);

  useEffect(() => {
    if (singleScheduledClass.Reviews && singleScheduledClass.Reviews.length > 0) {
      setReviewList(structuredClone(singleScheduledClass.Reviews));
      setReviewerIds([...singleScheduledClass.Reviews.map((r) => r.reviewerId)]);
    }
  }, []);

  const cancelSCHandler = (csce: React.SyntheticEvent) => {
    csce.preventDefault();
    dispatch(setShowReviewFields(false));
  };

  const inputChangeHandler = (ice: React.ChangeEvent<HTMLTextAreaElement>) => {
    ice.preventDefault();
    dispatch(setLeaveAReview({ [ice.target.name]: ice.target.value }));
  };

  const showComment = () => {
    // make stars
    const commentItems = [];
    for (let i = 0; i < reviewList.length; i += 1) {
      // make star
      const singleComment = (
        <div className="alert alert-primary rounded-1 row" key={i}>
          <div className="col-md-2">
            <div className="rounded-circle bg-danger text-uppercase comment-maker text-white d-flex align-items-center justify-content-center">
              <p className="m-0">
                {reviewList[i].reviewerId === singleScheduledClass.Sender.id
                  ? singleScheduledClass.Sender.name.slice(0, 2)
                  : singleScheduledClass.Recever.name.slice(0, 2)}
              </p>
            </div>
            {/* {reviewList[i].reviewerId === authUserInfo.id && (
            )} */}
          </div>
          <div className="col-md-8">{reviewList[i].comment} </div>
          <div className="col-md 2">
            <MakeStar limit={reviewList[i].stars} />
          </div>
        </div>
      );
      commentItems.push(singleComment);
    }
    return <div className="comments mx-0">{commentItems}</div>;
  };

  const setStarsReview = (sse: React.SyntheticEvent, numOfStar: number) => {
    sse.preventDefault();
    // console.log(leaveAReview);
    dispatch(setLeaveAReview({ stars: numOfStar }));
  };

  const leaveAReviewHandler = async (lare: React.SyntheticEvent) => {
    lare.preventDefault();
    if (leaveAReview.stars < 1) {
      return dispatch(setErrorList(['You must give atleast one star']));
    }
    if (leaveAReview.comment === '') {
      return dispatch(setErrorList(['You must write something']));
    }
    if (leaveAReview.comment.length < 10) {
      return dispatch(setErrorList(['You must write something', 'Comment must be more than 10 character long']));
    }
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post(`/review/leave/${singleScheduledClass.id}`, leaveAReview);
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        dispatch(resetLeaveAReview());
        dispatch(dispatch(resetErrorList()));
        // Fetch one more time
        if (singleScheduledClass.id) {
          await dispatch(fetchSingleScheduledClass(singleScheduledClass.id));
        }
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
        Router.push('/user/login');
      }
    } finally {
      dispatch(toggleLoading(false));
    }
    return null;
  };

  const reviewForm = () => (
    <form className="form">
      <div className="row mx-0 mb-3">
        <div className="col">
          <MakeStar limit={leaveAReview.stars} setStars={setStarsReview} />
        </div>
      </div>
      <div className="row mx-0 mb-3">
        <div className="col">
          <label htmlFor="comment" className="comment">
            Comment
          </label>
          <textarea rows={2} name="comment" onChange={inputChangeHandler} className="form-control rounded-1" />
        </div>
      </div>
      <div className="row mx-0 mb-3">
        <div className="col">
          <button type="button" className="btn btn-primary w-fit" onClick={leaveAReviewHandler}>
            Review
          </button>
          <button type="button" className="btn btn-danger w-fit mx-2" onClick={cancelSCHandler}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );

  const showForm = () => {
    // console.log(reviewerIds.length === 1, reviewerIds, authUserInfo.id);
    // console.log("Working");
    // console.log(singleScheduledClass.Reviews);
    // console.log(reviewerIds);
    if (authUserInfo.role === UserRoleEnum.TEACHER && reviewerIds.length === 0) {
      return null;
    }
    if (reviewerIds.length === 0 && authUserInfo.role === UserRoleEnum.STUDENT) {
      return reviewForm();
    }
    if (reviewerIds.length === 1 && authUserInfo.role === UserRoleEnum.TEACHER) {
      return reviewForm();
    }

    // if (reviewerIds.length < 2 && reviewerIds.includes(authUserInfo.id)) {
    //   return reviewForm();
    // }

    return null;
  };

  return (
    <div className="Review">
      {reviewList.length === 0 && authUserInfo.role === UserRoleEnum.TEACHER ? (
        <p className="alert alert-info"> The class is been completed please wait for the review</p>
      ) : (
        showComment()
      )}
      {showForm()}
    </div>
  );
}

export default Review;
