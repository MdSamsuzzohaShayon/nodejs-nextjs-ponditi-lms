import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import Chat from '../../../components/user/Chat/Chat';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Layout from '../../../components/layouts/Layout';
import { resetErrorList, toggleLoading } from '../../../redux/reducers/elementsSlice';
import { fetchSelectedSingleUser, toggleAuthUser } from '../../../redux/reducers/userReducer';
import { fetchAllMessagesOfARoom } from '../../../redux/reducers/messageReducer';

// Types
import { UserRoleEnum } from '../../../types/enums';

// Check authentication and fetch previous messages
function ChatIndex() {
  let isMounted: boolean = true;
  const [receiverId, setReceiver] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isBreakpoint = useMediaQuery(786);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);

  useEffect(() => {
    if (isMounted && authUserInfo.id) {
      const params = new URLSearchParams(window.location.search);
      const newReceverId = params.get('receiverId');
      if (newReceverId !== null) {
        const receiverIdInt: number = parseInt(newReceverId, 10);
        setReceiver(receiverIdInt);
        (async () => {
          dispatch(resetErrorList());
          // console.log({ userId });
          await Promise.all([
            dispatch(fetchSelectedSingleUser(receiverIdInt)),
            dispatch(fetchAllMessagesOfARoom({ receiverId: receiverIdInt, senderId: parseInt(authUserInfo.id, 10) })),
          ]);
        })();
        isMounted = false;
      } else {
        Router.push('/');
      }
    }
  }, [authUserInfo]);

  useEffect(() => {
    if (isMounted) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      // console.log(user);
      if (user === null) {
        dispatch(toggleAuthUser(false));
        Router.push('/user/login');
      } else {
        dispatch(toggleAuthUser(true));
        const userData = JSON.stringify(user);
        if (userData.role === UserRoleEnum.ADMIN) {
          Router.push('/admin');
        }
      }
      dispatch(resetErrorList([]));
      dispatch(toggleLoading(false));
    }
  }, []);

  /*
    useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      // console.log(user);
      if (user === null) {
        dispatch(toggleAuthUser(false));
        router.push('/user/login');
      } else {
        dispatch(toggleAuthUser(true));
        const userData = JSON.stringify(user);
        if (userData.role === ADMIN) {
          router.push('/admin');
        }
      }
      dispatch(resetErrorList([]));
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);
  */

  // For mobile screen
  if (isBreakpoint) {
    return <Chat receiverId={receiverId} authUserInfo={authUserInfo} />;
  }
  // For desktop screen
  return (
    <Layout title="User Messages | Ponditi">
      <div className="container">
        <Chat receiverId={receiverId} authUserInfo={authUserInfo} />
      </div>
    </Layout>
  );
}

export default ChatIndex;
