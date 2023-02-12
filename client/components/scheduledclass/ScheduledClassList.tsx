/* eslint-disable react/no-array-index-key */

// React/next
import React from 'react';
import Link from 'next/link';

// Redux
import { useAppSelector } from '../../redux/store';

// Config/utils
import { locationSelection } from '../../utils/helper';
import { convertISOToReadableTime } from '../../utils/timeFunction';

// Types
import { UserRoleEnum, StatusEnum } from '../../types/enums';
import { ScheduledclassListPropsInterface, SingleScheduledClassInterface } from '../../types/pages/scheduledclassInterface';

// SOR = student or teacher
function ScheduledClassList({ scheduledClassList, acceptRequestHandler, rejectRequestHandler }: ScheduledclassListPropsInterface) {
  const selectedContent = useAppSelector((state) => state.user.selectedContent);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);

  const showContent = (src: SingleScheduledClassInterface) => {
    switch (selectedContent) {
      case StatusEnum.PENDING:
        return authUserInfo.role === UserRoleEnum.TEACHER ? (
          <td>
            <button type="button" className="btn btn-primary" onClick={(are) => acceptRequestHandler(are, src.id)}>
              Accept
            </button>
            <button type="button" className="btn btn-danger" onClick={(are) => rejectRequestHandler(are, src.id)}>
              Reject
            </button>
            <Link href={`/scheduledclass/detail/?scheduledclassId=${src.id}`} type="button" className="btn btn-primary">
              Detail
            </Link>
          </td>
        ) : (
          <td>
            <Link href={`/scheduledclass/detail/?scheduledclassId=${src.id}`} type="button" className="btn btn-primary">
              Detail
            </Link>
          </td>
        );
      case StatusEnum.APPROVED:
        return (
          <td>
            <Link href={`/scheduledclass/detail/?scheduledclassId=${src.id}`} type="button" className="btn btn-primary">
              Detail
            </Link>
          </td>
        );
      case StatusEnum.REJECTED:
        return authUserInfo.role === UserRoleEnum.TEACHER ? (
          <td>
            <button type="button" className="btn btn-primary" onClick={(are) => acceptRequestHandler(are, src.id)}>
              Accept
            </button>
            <Link href={`/scheduledclass/detail/?scheduledclassId=${src.id}`} type="button" className="btn btn-primary">
              Detail
            </Link>
          </td>
        ) : (
          <td>
            <Link href={`/scheduledclass/detail/?scheduledclassId=${src.id}`} type="button" className="btn btn-primary">
              Detail
            </Link>
          </td>
        );

      default:
        return (
          <td>
            <Link href={`/scheduledclass/detail/?scheduledclassId=${src.id}`} type="button" className="btn btn-primary">
              Detail
            </Link>
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
