import { useSelector } from 'react-redux';
import ScheduledClassList from './ScheduledClassList';

// SOR = student or teacher
function ApprovedClass() {
  const acceptedSCOU = useSelector(
    (state) => state.scheduledclass.acceptedSCOU
  );

  const acceptRequestHandler = async (are, scheduledclassId) => {
    console.log(scheduledclassId);
  };

  const rejectRequestHandler = async (are, scheduledclassId) => {
    are.preventDefault();
    console.log(scheduledclassId);
  };

  return (
    <div className="ApprovedClass">
      <h1>Scheduled Class List</h1>
      {acceptedSCOU.length > 0 ? (
        <ScheduledClassList
          scheduledClassList={acceptedSCOU}
          acceptRequestHandler={acceptRequestHandler}
          rejectRequestHandler={rejectRequestHandler}
        />
      ) : (
        <div className="alert alert-danger">No request found</div>
      )}
    </div>
  );
}

export default ApprovedClass;
