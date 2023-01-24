/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import Router from 'next/router';
import { setShowReviewFields, setLeaveAReview, fetchSingleScheduledClass, resetLeaveAReview } from '../../redux/reducers/scheduledclassReducer';
import MakeStar from '../elements/MakeStar';
import axios from '../../config/axios';
import { setErrorList, resetErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';
import { roles } from '../../config/keys';

const { TEACHER, STUDENT } = roles;

function Review(props) {
  const dispatch = useDispatch();
  const [reviewList, setReviewList] = useState(props.singleScheduledClass.Reviews);
  const [reviewerIds, setReviewerIds] = useState([...props.singleScheduledClass.Reviews.map((r) => r.reviewerId)]);

  const leaveAReview = useSelector((state) => state.scheduledclass.leaveAReview);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  // console.log(reviewList);

  const cancelSCHandler = (csce) => {
    csce.preventDefault();
    dispatch(setShowReviewFields(false));
  };

  const inputChangeHandler = (ice) => {
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
                {reviewList[i].reviewerId === props.singleScheduledClass.Sender.id
                  ? props.singleScheduledClass.Sender.firstname[0] + props.singleScheduledClass.Sender.lastname[0]
                  : props.singleScheduledClass.Recever.firstname[0] + props.singleScheduledClass.Recever.lastname[0]}
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

  const setStarsReview = (sse, numOfStar) => {
    sse.preventDefault();
    // console.log(leaveAReview);
    dispatch(setLeaveAReview({ stars: numOfStar }));
  };

  const leaveAReviewHandler = async (lare) => {
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
      const response = await axios.post(`/review/leave/${props.singleScheduledClass.id}`, leaveAReview);
      if (response.status === 202 || response.status === 201 || response.status === 200) {
        dispatch(resetLeaveAReview());
        dispatch(dispatch(resetErrorList()));
        // Fetch one more time
        await dispatch(fetchSingleScheduledClass(props.singleScheduledClass.id));
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
        Router.push('/user/login');
      }
    } finally {
      dispatch(toggleLoading(false));
    }
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
          <textarea rows={2} type="text" name="comment" onChange={inputChangeHandler} className="form-control rounded-1" />
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
    // console.log(props.singleScheduledClass.Reviews);
    // console.log(reviewerIds);
    if (authUserInfo.role === TEACHER && reviewerIds.length === 0) {
      return null;
    }
    if (reviewerIds.length === 0 && authUserInfo.role === STUDENT) {
      return reviewForm();
    }
    if (reviewerIds.length === 1 && authUserInfo.role === TEACHER) {
      return reviewForm();
    }

    // if (reviewerIds.length < 2 && reviewerIds.includes(authUserInfo.id)) {
    //   return reviewForm();
    // }

    return null;
  };

  return (
    <div className="Review">
      {reviewList.length > 0 && showComment()}
      {showForm()}
    </div>
  );
}

export default Review;
