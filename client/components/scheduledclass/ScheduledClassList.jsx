import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { roles, userDashboardSidebarList } from '../../config/keys';
import {
  toggleLoading,
  setErrorList,
} from '../../redux/reducers/elementsSlice';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';
import { locationSelection } from '../../utils/helper';
import { convertISOToReadableTime } from '../../utils/timeFunction';
import axios from '../../config/axios';

const { STUDENT, TEACHER } = roles;

const { CLASS_SCHEDULED, PROFILE, STUDENT_OR_TEACHER_REQUESTS } =
  userDashboardSidebarList;

// SOR = student or teacher
function ScheduledClassList({
  scheduledClassList,
  acceptRequestHandler,
  rejectRequestHandler,
}) {
  const selectedContent = useSelector((state) => state.user.selectedContent);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  const showContent = (src) => {
    switch (selectedContent) {
      case STUDENT_OR_TEACHER_REQUESTS:
        return (
          <>
            {resetAuthUserInfo.role === TEACHER && (
              <>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(are) => acceptRequestHandler(are, src.id)}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(are) => rejectRequestHandler(are, src.id)}
                  >
                    Reject
                  </button>
                </td>
              </>
            )}
            <td>
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </td>
            <td>
              <Link
                href={`/scheduledclass/detail/${src.id}`}
                type="button"
                className="btn btn-primary"
              >
                Detail
              </Link>
            </td>
          </>
        );
      case CLASS_SCHEDULED:
        return (
          <>
            <td>
              <button type="button" className="btn btn-primary">
                Detail
              </button>
            </td>
            <td>
              <button type="button" className="btn btn-primary">
                Support
              </button>
            </td>
            <td>
              <button type="button" className="btn btn-danger">
                Cancel
              </button>
            </td>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ScheduledClassList">
      {scheduledClassList.length > 0 ? (
        <div>
          <table className="table">
            <thead className="bg-primary text-white border-white">
              <tr>
                <th colSpan="5">Class</th>
                {authUserInfo.role === STUDENT && (
                  <th colSpan="3">Teacher Detail</th>
                )}
                {authUserInfo.role === TEACHER && (
                  <th colSpan="3">Student Detail</th>
                )}
                <th colSpan="3">Handler</th>
              </tr>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tution Location</th>
                <th scope="col">Start time</th>
                <th scope="col">Duration</th>
                <th scope="col">End time</th>

                <th scope="col">Class</th>
                <th scope="col">Subject</th>
                <th scope="col">Sender</th>
                <th scope="col">Accept</th>
                <th scope="col">Reject</th>
                <th scope="col">Delete</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody className="text-lowercase">
              {scheduledClassList.map((src) => (
                <tr key={src.id}>
                  <td>{src.id}</td>
                  <td>{locationSelection(src.types)}</td>
                  <td>{convertISOToReadableTime(src.start)}</td>
                  <td>{src.hours} h</td>
                  <td>end time</td>

                  <td>{src.status}</td>
                  <td>{src?.Subject?.name}</td>
                  <td>{src?.ClassType?.name}</td>
                  <td>
                    {`${src?.Sender?.firstname} ${src?.Sender?.lastname}`}
                  </td>

                  {/* handler content start  */}
                  {showContent(src)}
                  {/* handler content end  */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-danger">No request found</div>
      )}
    </div>
  );
}

export default ScheduledClassList;
