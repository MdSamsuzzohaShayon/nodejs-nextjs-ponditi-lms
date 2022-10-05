/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../components/layouts/Layout';
import {
  fetchSingleScheduledClass,
  setShowReviewFields,
} from '../../../redux/reducers/scheduledclassReducer';
import { roles } from '../../../config/keys';
import { locationSelection } from '../../../utils/helper';
import { convertISOToReadableTime } from '../../../utils/timeFunction';
import Review from '../../../components/scheduledclass/Review';

const { TEACHER, STUDENT } = roles;

function detail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { scheduledclassId } = router.query;

  const singleScheduledClass = useSelector(
    (state) => state.scheduledclass.singleScheduledClass
  );
  const showReviewFields = useSelector(
    (state) => state.scheduledclass.showReviewFields
  );
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  // console.log({scheduledclassId});

  useEffect(() => {
    (async () => {
      if (scheduledclassId) {
        await dispatch(fetchSingleScheduledClass(scheduledclassId));
        // console.log(scheduledclassId);
      }
    })();
  }, [router.isReady]);

  /*
  useEffect(()=>{
    console.log("singleScheduledClass");
    console.log(singleScheduledClass);
  }, [singleScheduledClass]);
  */

  const completeSCHandler = (csce) => {
    csce.preventDefault();
    dispatch(setShowReviewFields(true));
  };

  return (
    <Layout>
      <section className="section section-1">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-3">
              <h3>Icon</h3>
              <h4>Tution Place</h4>
              <p>{locationSelection(singleScheduledClass?.types)}</p>
            </div>
            <div className="col-md-3">
              <h3>Icon</h3>
              <h4>Status</h4>
              <p>{singleScheduledClass?.status}</p>
            </div>
            <div className="col-md-3">
              <h3>Icon</h3>
              <h4>Bill</h4>
              <p>
                {singleScheduledClass.hours * singleScheduledClass.perHourRate}{' '}
                TK total
              </p>
            </div>
            <div className="col-md-3">
              <h3>Icon</h3>
              <h4>Duration</h4>
              <p>{singleScheduledClass.hours} hours</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="card rounded-1">
                {authUserInfo.role === TEACHER && (
                  <div className="card-body">
                    <h5 className="card-title">Student&apos;s Detail</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {singleScheduledClass?.Sender?.lastname}
                      &nbsp;
                      {singleScheduledClass?.Sender?.firstname}
                    </h6>
                    <p className="card-text">
                      Location: {singleScheduledClass?.Sender?.location}
                    </p>
                    <p className="card-text">
                      Age: {singleScheduledClass?.Sender?.age}
                    </p>
                  </div>
                )}
                {authUserInfo.role === STUDENT && (
                  <div className="card-body">
                    <h5 className="card-title">Teacher&apos;s Detail</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {singleScheduledClass?.Recever?.lastname}
                      &nbsp;
                      {singleScheduledClass?.Recever?.firstname}
                    </h6>
                    <p className="card-text">
                      Location: {singleScheduledClass?.Recever?.location}
                    </p>
                    <p className="card-text">
                      Age: {singleScheduledClass?.Recever?.age}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="card rounded-1">
                <div className="card-body">
                  <h5 className="card-title">Subject Detail</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Any</h6>
                  <p className="card-text">
                    Class: {singleScheduledClass?.ClassType?.name}
                  </p>
                  <p className="card-text">
                    Subject: {singleScheduledClass?.Subject?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            Start : {convertISOToReadableTime(singleScheduledClass.start)}
          </div>
          <p>{singleScheduledClass?.desc}</p>
          <p>Resolution Center</p>
          {/* Make as completed  */}

          {showReviewFields ? (
            <Review />
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={completeSCHandler}
            >
              Complete
            </button>
          )}
          <p>Is paid or completed(button)?</p>
        </div>
      </section>
    </Layout>
  );
}

export default detail;
