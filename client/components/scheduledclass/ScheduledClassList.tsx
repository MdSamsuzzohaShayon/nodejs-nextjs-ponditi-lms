/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */

// React/next
import React, { useEffect } from 'react';
import Link from 'next/link';

// Redux
import { useAppSelector } from '../../redux/store';

// Config/utils
import { locationSelection } from '../../utils/helper';
import { convertISOToReadableTime } from '../../utils/timeFunction';

// Types
import { UserRoleEnum, StatusEnum, TuitionStyleEnum } from '../../types/enums';
import { ScheduledclassListPropsInterface, SingleScheduledClassInterface } from '../../types/pages/scheduledclassInterface';

// SOR = student or teacher
function ScheduledClassList({ scheduledClassList, acceptRequestHandler, rejectRequestHandler, finishClassHandler }: ScheduledclassListPropsInterface) {

  const selectedContent = useAppSelector((state) => state.user.selectedContent);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);




  /**
   * ================================================================================================
   * SHOW CONDITIONAL CONTENT
   */
  const showContent = (src: SingleScheduledClassInterface) => {
    // console.log(src);
    
    // console.log({selectedContent, check: selectedContent === StatusEnum.APPROVED});
    switch (selectedContent) {
      
      case StatusEnum.PENDING:
        return authUserInfo.role === UserRoleEnum.TEACHER ? (
          <td>
            <button type="button" className="btn btn-primary" onClick={(are) => acceptRequestHandler(are, src)}>
              Accept
            </button>
            <button type="button" className="btn btn-danger" onClick={(are) => rejectRequestHandler(are, src)}>
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
          <td className="d-flex justify-content-end">
            <Link href={`/scheduledclass/detail/?scheduledclassId=${src.id}`} type="button" className="btn btn-light ms-5 tooptip-wrapper">
              <img src="/icons/view.svg" width="20px" alt="" />
              <p className="tooltip-custom">Class Details</p>
            </Link>
            {src.types === TuitionStyleEnum.ONLINE && authUserInfo.role === UserRoleEnum.TEACHER && (
              <>
                <Link href="https://meet.google.com/new" target="_blank" type="button" className="btn btn-success ms-2">
                  Start
                </Link>
                <Link href="https://meet.google.com/new" target="_blank" type="button" className="btn btn-light ms-2 tooptip-wrapper">
                  <img src="/icons/share.svg" width="20px" alt="" />
                  <p className="tooltip-custom">Link Share</p>
                </Link>
                <button type="button" className="btn btn-light ms-2 tooptip-wrapper" onClick={(are) => finishClassHandler(are, src)}>
                  <img src="/icons/tick.svg" width="20px" alt="" />
                  <p className="tooltip-custom">Class Completed</p>
                </button>
              </>
            )}
          </td>
        );
      case StatusEnum.REJECTED:
        return authUserInfo.role === UserRoleEnum.TEACHER ? (
          <td>
            <button type="button" className="btn btn-primary" onClick={(are) => acceptRequestHandler(are, src)}>
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
                <th scope="col">Tution Style</th>
                <th scope="col">Time</th>
                <th scope="col">Class</th>
                <th scope="col">Subject</th>
                <th scope="col">
                  <p className="ms-5 mb-0">Status</p>
                </th>
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
