// React/next
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Redux
import { toggleLoading } from '../../redux/reducers/elementsSlice';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { toggleAuthUser, setAuthUserInfo, resetAuthUserInfo, fetchCurrentSingleUser } from '../../redux/reducers/userReducer';
import { fetchAllRoomsOfAUser, fetchAllUnseenMessagesOfAUser } from '../../redux/reducers/messageReducer';

// Components
import Header from './Header';
import Footer from './Footer';
import Loader from '../elements/Loader';

// Socket
import { useSocket } from '../../context/ThemeProvider';

// Types
import { LayoutPropsInterface } from '../../types/components/LayoutInterface';

function Layout(props: LayoutPropsInterface) {
  let isMounted = false;
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Use socket from context
  const socket = useSocket(); // useContext

  const isLoading = useAppSelector((state) => state.elements.isLoading);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);

  useEffect(() => {
    if (isMounted === false) {
      dispatch(toggleLoading(true));
      const user = localStorage.getItem('user');
      // console.log(JSON.parse(user));
      if (user === null) {
        dispatch(toggleAuthUser(false));
        dispatch(resetAuthUserInfo());
      } else {
        dispatch(toggleAuthUser(true));
        dispatch(setAuthUserInfo(JSON.parse(user)));
        // Fetch all rooms of a user
        (async () => {
          if (JSON.parse(user).id) {
            dispatch(fetchCurrentSingleUser(JSON.parse(user).id));
          }
          dispatch(fetchAllRoomsOfAUser());
          dispatch(fetchAllUnseenMessagesOfAUser());
        })();
      }
      dispatch(toggleLoading(false));
    }
    isMounted = true;
  }, []);

  // Join room and Receive message
  useEffect(() => {
    // console.log('Before - ',{receiverId, senderId: authUserInfo.id});
    if (!socket || !authUserInfo.id) return;
    // console.log('After - ', { userId: authUserInfo.id });

    // socket events from client
    socket.emit('join-notroom-from-client', { userId: authUserInfo.id });
    // Getting message from server
    socket.on('update-notification-from-server', (data) => {
      console.log({data});
      // receiverId
      // senderId
      if(data.receiverId && data.senderId){
        dispatch(fetchCurrentSingleUser(authUserInfo.id));
      }
    });
  }, [socket, authUserInfo]);

  // useEffect(() => {
  //   const handleStart = (url: string) => url !== router.asPath && dispatch(toggleLoading(true));
  //   const handleComplete = (url: string) => url === router.asPath && dispatch(toggleLoading(false));

  //   router.events.on('routeChangeStart', handleStart);
  //   router.events.on('routeChangeComplete', handleComplete);
  //   router.events.on('routeChangeError', handleComplete);

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart);
  //     router.events.off('routeChangeComplete', handleComplete);
  //     router.events.off('routeChangeError', handleComplete);
  //   };
  // });

  return (
    <div className="Layout">
      <Head>
        <title>{props?.title}</title>
      </Head>
      <Header />
      {isLoading ? <Loader /> : <div className="bg-light">{props?.children} </div>}
      <Footer />
    </div>
  );
}

export default Layout;
