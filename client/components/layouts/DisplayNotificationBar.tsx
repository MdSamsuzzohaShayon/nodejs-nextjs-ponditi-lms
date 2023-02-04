/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { DisplayNotificationPropsInterface } from '../../types/redux/elementsInterface';

function DisplayNotificationBar({ showNotificationBar, natificationBarCloseHandler, userNotifications, linkRedirectHandler }) {
  return (
    <div className={showNotificationBar ? `notification-bar card text-bg-primary position-absolute` : `notification-bar card text-bg-primary position-absolute d-none`}>
      <div className="card-body">
        <div className="d-flex w-full justify-content-between align-items-center mb-2">
          <h5 className="card-title">Notifications</h5>
          <img src="/icons/close.svg" width={30} alt="close" aria-hidden="true" onClick={natificationBarCloseHandler} />
        </div>
        <ul className="list-group">
          {userNotifications.length > 0 ? (
            userNotifications.map((un, unI) => (
              <li
                className={un.viewed ? 'list-group-item bg-transparent text-white border-none' : 'list-group-item bg-transparent text-white border-none'}
                key={unI}
                onClick={(lre) => linkRedirectHandler(lre, un)}
                aria-hidden="true"
              >
                {un.comment}
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
