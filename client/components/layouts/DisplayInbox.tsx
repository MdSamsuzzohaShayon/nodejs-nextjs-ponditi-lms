/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { DisplayInboxPropsInterface } from '../../types/redux/elementsInterface';
import { RoomListInterface } from '../../types/redux/messageinterface';

function DisplayInbox({ showInboxes, setShowInboxes, roomListOfAUser, authUserInfo, unseenMessageList }: DisplayInboxPropsInterface) {
  const inboxEl = useRef<HTMLDivElement | null>(null);

  // close notification bar on display click
  useEffect(() => {
    // console.log(inboxEl);
    document.addEventListener('click', (domCE) => {
      if (!inboxEl.current) return;
      const withinBoundary = domCE.composedPath().includes(inboxEl.current);

      if (withinBoundary === false && showInboxes === true && !domCE.target.parentElement.classList.contains('open-inbox')) {
        // console.log('Click happened Outside element', {showNotificationBar, elm: domCE.target.parentElement});
        // console.log({withinBoundary, showNotificationBar});
        setShowInboxes(false);
      }
    });
  }, [showInboxes]);

  const displayRoomList = () => {
    if (roomListOfAUser.length === 0) return <p className="text-white">No message Found!</p>;
    const roomListRender = [];

    for (let i = 0; i < roomListOfAUser.length; i += 1) {
      const messagesOfCurrentRoom = unseenMessageList.filter((um) => um.RoomId === roomListOfAUser[i].id);

      roomListRender.push(
        <li className="list-group-item bg-transparent border border-info text-white d-flex justify-content-between flex-row" key={i} aria-hidden="true">
          {roomListOfAUser[i].invitorId === authUserInfo.id ? (
            <Link href={`/user/chat/?receiverId=${roomListOfAUser[i].invitereceverId}`}>{roomListOfAUser[i].Inviterecever?.name}</Link>
          ) : (
            <Link href={`/user/chat/?receiverId=${roomListOfAUser[i].invitorId}`}>{roomListOfAUser[i].Roominvitor?.name}</Link>
          )}
          {messagesOfCurrentRoom.length > 0 && <span>({messagesOfCurrentRoom.length})</span>}
        </li>,
      );
    }

    return <ul className="list-group">{roomListRender}</ul>;
  };

  return (
    <div ref={inboxEl} className={showInboxes ? `inbox-bar card text-bg-primary position-absolute` : `inbox-bar card text-bg-primary position-absolute d-none`}>
      <div className="card-body">
        <div className="d-flex w-full justify-content-between align-items-center mb-2">
          <h5 className="card-title">Inbox</h5>
          <img src="/icons/close.svg" width={30} alt="close" aria-hidden="true" onClick={() => setShowInboxes(false)} />
        </div>
        {displayRoomList()}
      </div>
    </div>
  );
}

export default DisplayInbox;
