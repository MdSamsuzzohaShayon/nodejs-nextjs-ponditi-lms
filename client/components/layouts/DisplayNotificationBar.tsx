/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */

// React/nextjs
import Link from 'next/link';
import React from 'react';
import Router from 'next/router';

// Redux
import { setSelectedContent } from '../../redux/reducers/userReducer';
import { useAppDispatch } from '../../redux/store';
import { fetchSingleScheduledClass } from '../../redux/reducers/scheduledclassReducer';

// Types
import { DisplayNotificationPropsInterface } from '../../types/redux/elementsInterface';
import { UserNotificationInterface } from '../../types/redux/userInterface';
import { ClassStatusEnum, StatusEnum } from '../../types/enums';

function DisplayNotificationBar({ showNotificationBar, natificationBarCloseHandler, userNotifications }: DisplayNotificationPropsInterface) {
  const dispatch = useAppDispatch();

  const linkRedirectHandler = async (lre: React.SyntheticEvent, notification: UserNotificationInterface) => {
    lre.preventDefault();
    const baseUrl: string = window.location.origin;
    let newUrl: string = window.location.origin;
    let scheduledClassId: number | null = null;
    if (notification.comment.includes('(')) {
      scheduledClassId = parseInt(notification.comment.substring(notification.comment.indexOf('(') + 1, notification.comment.indexOf(')')), 10);
    }

    // http://localhost:3000/scheduledclass/detail/2
    newUrl = scheduledClassId ? `${baseUrl}/scheduledclass/detail/?scheduledclassId=${scheduledClassId}` : `${baseUrl}/user/requesthistory`;
    switch (notification.type) {
      case ClassStatusEnum.INITIATED_CLASS:
        dispatch(setSelectedContent(StatusEnum.PENDING));
        break;
      // 'ACCEPT_REQUEST REJECTED_REQUEST START_CLASS',
      case ClassStatusEnum.ACCEPT_REQUEST:
        dispatch(setSelectedContent(StatusEnum.APPROVED));
        break;
      case ClassStatusEnum.REJECTED_REQUEST:
        dispatch(setSelectedContent(StatusEnum.REJECTED));
        break;
      case ClassStatusEnum.START_CLASS:
        break;
      case ClassStatusEnum.FINISH_CLASS:
        break;
      default:
        break;
    }

    if (scheduledClassId) {
      await dispatch(fetchSingleScheduledClass(scheduledClassId));
    }
    // console.log({newUrl, scheduledClassId});
    Router.push(newUrl);
  };

  return (
    <div className={showNotificationBar ? `notification-bar card text-bg-primary position-absolute` : `notification-bar card text-bg-primary position-absolute d-none`}>
      <div className="card-body">
        <div className="d-flex w-full justify-content-between align-items-center mb-2">
          <h5 className="card-title">Notifications</h5>
          <img src="/icons/close.svg" width={30} alt="close" aria-hidden="true" onClick={natificationBarCloseHandler} />
        </div>
        <ul className="list-group">
          {userNotifications.length > 0 ? (
            userNotifications.map((un: UserNotificationInterface, unI: number) => (
              <li className={un.viewed ? 'list-group-item bg-transparent border-none' : 'list-group-item bg-transparent text-white border-none'} key={unI}>
                <button type="button" className="btn btn-transparent p-0 m-0 text-white" onClick={(lre) => linkRedirectHandler(lre, un)}>
                  {un.comment}
                </button>
                {/* <Link href={`http://localhost:3000/scheduledclass/detail/?scheduledclassId=${un.id}`} className="list-group-item bg-transparent text-white border-none">
                  {un.comment}
                </Link> */}
              </li>
            ))
          ) : (
            <li className="list-group-item bg-transparent text-white border-none">No notification found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DisplayNotificationBar;
