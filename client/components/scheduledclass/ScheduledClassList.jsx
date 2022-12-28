/* eslint-disable react/no-array-index-key */
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { roles, scheduledclassStatus } from '../../config/keys';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';
import { locationSelection } from '../../utils/helper';
import { convertISOToReadableTime } from '../../utils/timeFunction';

const { TEACHER } = roles;

const { APPROVED, REJECTED, PENDING } = scheduledclassStatus;

// SOR = student or teacher
function ScheduledClassList({ scheduledClassList, acceptRequestHandler, rejectRequestHandler }) {
  const selectedContent = useSelector((state) => state.user.selectedContent);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  const showContent = (src) => {
    switch (selectedContent) {
      case PENDING:
        return authUserInfo.role === TEACHER ? (
          <td>
            <button type="button" className="btn btn-primary" onClick={(are) => acceptRequestHandler(are, src.id)}>
              Accept
            </button>
            <button type="button" className="btn btn-danger" onClick={(are) => rejectRequestHandler(are, src.id)}>
              Reject
            </button>
            <button className="btn btn-primary" type="button">
              <Link href={`/scheduledclass/detail/${src.id}`} type="button" className="btn btn-primary">
                Detail
              </Link>
            </button>
          </td>
        ) : (
          <td>
            <button className="btn btn-primary" type="button">
              <Link href={`/scheduledclass/detail/${src.id}`} type="button" className="btn btn-primary">
                Detail
              </Link>
            </button>
          </td>
        );
      case APPROVED:
        return (
          <td>
            <button className="btn btn-primary" type="button">
              <Link href={`/scheduledclass/detail/${src.id}`} type="button" className="btn btn-primary">
                Detail
              </Link>
            </button>
          </td>
        );
      case REJECTED:
        return authUserInfo.role === TEACHER ? (
          <td>
            <button type="button" className="btn btn-primary" onClick={(are) => acceptRequestHandler(are, src.id)}>
              Accept
            </button>
            <button className="btn btn-primary" type="button">
              <Link href={`/scheduledclass/detail/${src.id}`} type="button" className="btn btn-primary">
                Detail
              </Link>
            </button>
          </td>
        ) : (
          <td>
            <button className="btn btn-primary" type="button">
              <Link href={`/scheduledclass/detail/${src.id}`} type="button" className="btn btn-primary">
                Detail
              </Link>
            </button>
          </td>
        );

      default:
        return (
          <td>
            <button className="btn btn-primary" type="button">
              <Link href={`/scheduledclass/detail/${src.id}`} type="button" className="btn btn-primary">
                Detail
              </Link>
            </button>
          </td>
        );
    }
  };

  return (
    <div className="ScheduledClassList">
      {scheduledClassList.length > 0 ? (
        <div>
          <table className="table">
            <thead className="bg-primary text-white border-white">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tution Location</th>
                <th scope="col">Time</th>
                <th scope="col">Class</th>
                <th scope="col">Subject</th>
                <th scope="col">Handler</th>
              </tr>
            </thead>
            <tbody className="text-lowercase">
              {scheduledClassList.map((src, srcI) => (
                <tr key={srcI}>
                  <td>{src?.id}</td>
                  <td>{locationSelection(src?.types)}</td>
                  <td>{convertISOToReadableTime(src?.start)}</td>
                  <td>{src?.Subject?.name}</td>
                  <td>{src?.ClassType?.name}</td>
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
