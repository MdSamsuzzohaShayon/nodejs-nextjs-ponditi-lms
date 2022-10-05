import { useDispatch } from 'react-redux';
import { setShowReviewFields } from '../../redux/reducers/scheduledclassReducer';

function Review() {
  const dispatch = useDispatch();

  const cancelSCHandler = (csce) => {
    csce.preventDefault();
    dispatch(setShowReviewFields(false));
  };
  return (
    <div>
        Review Content (forms)
      <button
        type="button"
        className="btn btn-danger"
        onClick={cancelSCHandler}
      >
        Cancel
      </button>
    </div>
  );
}

export default Review;
