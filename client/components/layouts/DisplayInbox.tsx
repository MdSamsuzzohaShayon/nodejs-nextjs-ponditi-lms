/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Link from 'next/link';
import { DisplayInboxPropsInterface } from '../../types/redux/elementsInterface';

function DisplayInbox({ showInboxes, setShowInboxes, roomListOfAUser, authUserInfo }: DisplayInboxPropsInterface) {
  return (
    <div className={showInboxes ? `inbox-bar card text-bg-primary position-absolute` : `inbox-bar card text-bg-primary position-absolute d-none`}>
      <div className="card-body">
        <div className="d-flex w-full justify-content-between align-items-center mb-2">
          <h5 className="card-title">Inbox</h5>
          <img src="/icons/close.svg" width={30} alt="close" aria-hidden="true" onClick={() => setShowInboxes(false)} />
        </div>
        <ul className="list-group">
          {roomListOfAUser.length > 0 ? (
            roomListOfAUser.map((rl, rlI) => (
              <li className="list-group-item bg-transparent text-white border-none" key={rlI} aria-hidden="true">
                {rl.invitorId === authUserInfo.id ? (
                  <Link href={`/user/chat/?receiverId=${rl.invitereceverId}`}>{rl.Inviterecever?.name}</Link>
                ) : (
                  <Link href={`/user/chat/?receiverId=${rl.invitorId}`}>{rl.Roominvitor?.name}</Link>
                )}
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

export default DisplayInbox;
