import { useSelector } from 'react-redux';
import ScheduledClassList from './ScheduledClassList';

// SOR = student or teacher
function RejectedClass() {
  const rejectedSCOU = useSelector(
    (state) => state.scheduledclass.rejectedSCOU
  );

  const acceptRequestHandler = async (are, scheduledclassId) => {
    console.log(scheduledclassId);
  };

  const rejectRequestHandler = async (are, scheduledclassId) => {
    are.preventDefault();
    console.log(scheduledclassId);
  };

  return (
    <div className="RejectedClass">
      <h1>Scheduled Class List</h1>
      {rejectedSCOU.length > 0 ? (
        <ScheduledClassList
          scheduledClassList={rejectedSCOU}
          acceptRequestHandler={acceptRequestHandler}
          rejectRequestHandler={rejectRequestHandler}
        />
      ) : (
        <div className="alert alert-danger">No request found</div>
      )}
    </div>
  );
}

export default RejectedClass;
