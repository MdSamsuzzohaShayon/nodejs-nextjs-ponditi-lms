/* eslint-disable @next/next/no-img-element */

// React/next
import React from 'react';
import Link from 'next/link';

// Redux
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { setANewMessage } from '../../../redux/reducers/messageReducer';
import { setErrorList } from '../../../redux/reducers/elementsSlice';

// Socket
import { useSocket } from '../../../context/ThemeProvider';

// Types
import { ChatPropsInterface, DataInterface } from '../../../types/pages/userPageInterface';
import { RoomMessageInterface } from '../../../types/redux/messageinterface';
import { UserRoleEnum } from '../../../types/enums';

// React Chat Component
function Chat({ receiverId, authUserInfo }: ChatPropsInterface) {
  // Reference to React Element
  const lastMessageEl = React.useRef<HTMLDivElement>(null);
  const messageInputEl = React.useRef<HTMLInputElement>(null);

  // Dispatch
  const dispatch = useAppDispatch();

  // Use socket from context
  const socket = useSocket(); // useContext

  // State
  const [data, setData] = React.useState<DataInterface>(); // This data is going to submit as object
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const messagesOfARoom = useAppSelector((state) => state.message.messagesOfARoom);

  // Send message
  const sendMessageHandler = (sme: React.FormEvent<HTMLFormElement>) => {
    sme.preventDefault();
    if (lastMessageEl && lastMessageEl.current) {
      lastMessageEl.current.scrollIntoView();
    }
    if (data && data.message && data.message.length > 250) {
      return dispatch(setErrorList(['Message is too long']));
    }
    if (data && data.message !== '') {
      const newDataObj: DataInterface = { ...data, receiverId, senderId: authUserInfo.id };
      socket.emit('message-from-client', newDataObj);
      // add message to the state after sending message
      if (authUserInfo.id && receiverId && data.message) {
        const newMsg: RoomMessageInterface = {
          id: Math.random(),
          publish: false,
          messagesenderId: authUserInfo.id,
          messagereceverId: receiverId,
          text: data.message,
        };
        dispatch(setANewMessage(newMsg));
      }
      // Clean input field
      // sme.currentTarget.form?.reset();
      if (messageInputEl.current) {
        messageInputEl.current.value = '';
      }
      setData({ message: '' });
    }
    return null;
  };

  // Join room and Receive message
  React.useEffect(() => {
    // console.log('Before - ',{receiverId, senderId: authUserInfo.id});
    if (!socket || !receiverId || !authUserInfo.id) return;
    // console.log('After - ',{receiverId, senderId: authUserInfo.id});
    setData({ receiverId, senderId: authUserInfo.id });

    // socket events from client
    socket.emit('join-room-from-client', { receiverId, senderId: authUserInfo.id });
    // Getting message from server
    socket.on('message-from-server', (data) => {
      // console.log(data);
      // add message to the state for receiving message
      // const newMessage:RoomMessageInterface = {};
      // const newMsg = { messagesenderId: data.senderId, messagereceverId: data.receiverId, text: data.message };
      // dispatch(setANewMessage(newMsg));
      if (data.senderId && data.receiverId && data.message) {
        const newMsg: RoomMessageInterface = {
          id: Math.random(),
          publish: false,
          messagesenderId: data.senderId,
          messagereceverId: data.receiverId,
          text: data.message,
        };
        dispatch(setANewMessage(newMsg));
      }
    });
  }, [socket, authUserInfo, receiverId]);

  // Scroll into the last message element
  React.useEffect(() => {
    if (lastMessageEl && lastMessageEl.current) {
      lastMessageEl.current.scrollIntoView();
    }
  }, []);

  // input change
  const inputMessageChangeHandler = (imce: React.ChangeEvent<HTMLInputElement>) => {
    if (imce.target.value.toString().length > 250) {
      dispatch(setErrorList(['Message is too long']));
    } else {
      setData({ message: imce.target.value });
    }
  };

  // Message align and make message set
  const balanceLeftRightMessage = (i: number, prevMessageUserId: number | null, messageList: React.ReactElement[], messageSetList: React.ReactElement[]) => {
    if (messageSetList.length === 0) return;
    if (prevMessageUserId === authUserInfo.id) {
      messageList.push(
        <div key={i} className="col-md-12 d-flex flex-column  align-items-end mt-3">
          <img
            src="/img/default-img.jpg"
            className="rounded-circle shadow"
            style={{ width: '60px', height: '60px', objectFit: 'cover', objectPosition: 'center' }}
            alt=""
          />
          {messageSetList}
        </div>,
      );
    } else {
      messageList.push(
        <div key={i} className="col-md-12 d-flex flex-column">
          <img
            src="/img/default-img.jpg"
            className="rounded-circle shadow"
            style={{ width: '60px', height: '60px', objectFit: 'cover', objectPosition: 'center' }}
            alt=""
          />
          {messageSetList}
        </div>,
      );
    }
  };

  // Sender receiver should rotate from database
  const displayMessage = () => {
    let prevMessageUserId: number | null = null;
    const messageList: [] = [];
    let messageSetList = [];
    let singleMessageCls: string = '';
    for (let i = 0; i < messagesOfARoom.length; i += 1) {
      if (messagesOfARoom[i].messagesenderId === authUserInfo.id) {
        singleMessageCls = 'alert alert-primary w-fit rounded-pill py-2 shadow';
      } else {
        singleMessageCls = 'alert alert-light w-fit rounded-pill py-2 shadow';
      }

      // For last message
      if (i === messagesOfARoom.length - 1) {
        prevMessageUserId = messagesOfARoom[i].messagesenderId;
        messageSetList.push(
          <p key={i} className={singleMessageCls} style={{ margin: '3px 0' }}>
            {messagesOfARoom[i].text}
          </p>,
        );
        // console.log(prevMessageUserId, authUserInfo.id);
        balanceLeftRightMessage(i, prevMessageUserId, messageList, messageSetList);
        break;
      }

      // If same user sending another message
      if (prevMessageUserId !== messagesOfARoom[i].messagesenderId) {
        balanceLeftRightMessage(i, prevMessageUserId, messageList, messageSetList);
        messageSetList = [];
        messageSetList.push(
          <p key={i} className={singleMessageCls} style={{ margin: '3px 0' }}>
            {messagesOfARoom[i].text}
          </p>,
        );
      } else {
        messageSetList.push(
          <p key={i} className={singleMessageCls} style={{ margin: '3px 0' }}>
            {messagesOfARoom[i].text}
          </p>,
        );
      }

      // If logged in user is the sender
      prevMessageUserId = messagesOfARoom[i].messagesenderId;
      // console.log(i);
    }
    return (
      <div className="row mt-3 chat-content" style={{ height: '70vh', overflowY: 'auto' }}>
        {messageList}
        <div className="last-message-element" ref={lastMessageEl} />
      </div>
    );
  };

  return (
    <div className="bg-light card">
      <div className="chat-header bg-white px-0 py-3 m-0">
        <div className="container d-flex justify-content-between">
          <h4 className="text-capitalize">{selectedUser?.name}</h4>
          <span>
            <img src="/icons/close.svg" alt="" />
          </span>
        </div>
      </div>
      <div className="chat-body">{displayMessage()}</div>
      <div className="chat-header bg-white p-0 m-0">
        <form className="form w-full" onSubmit={sendMessageHandler}>
          {/* <input type="text" placeholder="Type a message" className="form-control" /> */}
          <div className="input-group">
            <input type="text" className="form-control rounded-0  py-3" placeholder="Type a message..." ref={messageInputEl} onChange={inputMessageChangeHandler} />
            {authUserInfo.role === UserRoleEnum.STUDENT && (
              <span className="input-group-text py-3 rounded-0 bg-white" id="basic-addon1">
                <Link className="btn btn-transparent w-full" href={`/search/request/?receiverId=${receiverId}`}>
                  <img src="/icons/study.svg" className="w-full" alt="" />
                </Link>
              </span>
            )}
            <span className="input-group-text py-3 rounded-0 bg-white" id="basic-addon1">
              <button className="btn btn-transparent w-full" type="submit">
                <img src="/icons/send.svg" className="w-full" alt="" />
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
