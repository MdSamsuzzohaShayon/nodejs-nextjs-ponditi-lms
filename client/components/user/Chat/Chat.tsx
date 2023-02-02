/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { setANewMessage } from '../../../redux/reducers/messageReducer';
import { useSocket } from '../../../context/ThemeProvider';
import { ChatPropsInterface, DataInterface } from '../../../types/pages/userPageInterface';
import { RoomMessageInterface } from '../../../types/redux/messageinterface';

function Chat({ receiverId, authUserInfo }: ChatPropsInterface) {
  const dispatch = useAppDispatch();
  const messageInputEl = React.useRef<HTMLInputElement>(null);
  const socket = useSocket(); // useContext
  const [data, setData] = React.useState<DataInterface>(); // This data is going to submit as object
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const messagesOfARoom = useAppSelector((state) => state.message.messagesOfARoom);

  const sendMessageHandler = (sme: React.FormEvent<HTMLFormElement>): void => {
    sme.preventDefault();
    if (data && data.message !== '') {
      // Send message
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
  };

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

  const inputMessageChangeHandler = (imce: React.ChangeEvent<HTMLInputElement>) => {
    if (imce.target.value.toString().length > 250) {
      console.log('Message is too long');
    } else {
      setData({ message: imce.target.value });
    }
  };

  const balanceLeftRightMessage = (i: number, prevMessageUserId: number | null, messageList: React.ReactElement[], messageSetList: []) => {
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
    // messagesOfARoom
    for (let i = 0; i < messagesOfARoom.length; i += 1) {
      // console.log({
      //   i,
      //   prevMessageUserId,
      //   messagesenderId: messagesOfARoom[i].messagesenderId,
      // });
      if (messagesOfARoom[i].messagesenderId === authUserInfo.id) {
        //  iAmSender = true;
        singleMessageCls = 'alert alert-primary w-fit rounded-pill py-2 shadow';
      } else {
        singleMessageCls = 'alert alert-light w-fit rounded-pill py-2 shadow';
      }

      if (i === messagesOfARoom.length - 1) {
        messageSetList.push(
          <p key={i} className={singleMessageCls} style={{ margin: '3px 0' }}>
            {messagesOfARoom[i].text}
          </p>,
        );
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
    return <div className="row mt-3">{messageList}</div>;
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
      <div className="chat-body">
        <div className="container">{displayMessage()}</div>
      </div>
      <div className="chat-header bg-white p-0 m-0">
        <form className="form w-full" onSubmit={sendMessageHandler}>
          {/* <input type="text" placeholder="Type a message" className="form-control" /> */}
          <div className="input-group">
            <input type="text" className="form-control rounded-0  py-3" placeholder="Type a message..." ref={messageInputEl} onChange={inputMessageChangeHandler} />
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
