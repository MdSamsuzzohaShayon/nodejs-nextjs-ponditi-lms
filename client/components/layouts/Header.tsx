/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */

// React/next
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Config/util
import { roles, scheduledclassStatus } from '../../config/keys';
import axios from '../../config/axios';

// Redux
import { toggleAuthUser, setSelectedContent } from '../../redux/reducers/userReducer';
import { toggleLoading } from '../../redux/reducers/elementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

// Hooks
import useMediaQuery from '../../hooks/useMediaQuery';

// Component
import DisplayInbox from './DisplayInbox';
import DisplayNotificationBar from './DisplayNotificationBar';

// Types
import { UserNotificationInterface } from '../../types/redux/userInterface';
import { ClassStatusEnum } from '../../types/enums';

const { ADMIN, STUDENT, TEACHER } = roles;
const { PENDING, APPROVED, REJECTED } = scheduledclassStatus;

function Header() {
  let isMounted = false;

  // hooks
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isBreakpoint = useMediaQuery(768);

  // States from redux
  const menuItemList = useAppSelector((state) => state.elements.menuItemList);
  const userUnseenNotifications = useAppSelector((state) => state.user.userUnseenNotifications);
  const userNotifications = useAppSelector((state) => state.user.userNotifications);
  const authenticatedUser = useAppSelector((state) => state.user.authenticatedUser);
  const authUserInfo = useAppSelector((state) => state.user.authUserInfo);
  const roomListOfAUser = useAppSelector((state) => state.message.roomListOfAUser);

  // State local
  const [dashboardUrl, setDashboardUrl] = useState('/user/dashboard');
  const [showNotificationBar, setShowNotificationBar] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const [showMenues, setShowMenues] = useState(false);
  const [showInboxes, setShowInboxes] = useState(false);

  // Ref
  const notificationMenuItem = useRef(null);

  useEffect(() => {
    if (isMounted === false) {
      const user = localStorage.getItem('user');
      if (user !== null) {
        const userData = JSON.parse(user);

        if (userData.role === ADMIN) {
          setDashboardUrl('/admin');
        } else {
          setDashboardUrl('/user/dashboard');
        }
      }
    }
    isMounted = true;
  }, []);

  // Logout
  const logoutHandler = async (lhe: React.SyntheticEvent) => {
    lhe.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/user/logout');
      dispatch(toggleAuthUser(null));
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      window.localStorage.removeItem('user');
    }
  };

  const natificationBarCloseHandler = (nbce) => {
    nbce.preventDefault();
    setShowNotificationBar(false);
  };

  const linkRedirectHandler = (lre: React.SyntheticEvent, notification: UserNotificationInterface) => {
    lre.preventDefault();
    const baseUrl = window.location.origin;
    let newUrl = window.location.origin;
    let scheduledClassId = null;
    if (notification.comment.includes('(')) {
      scheduledClassId = parseInt(notification.comment.substring(notification.comment.indexOf('(') + 1, notification.comment.indexOf(')')), 10);
    }

    // http://localhost:3000/scheduledclass/detail/2
    newUrl = scheduledClassId ? `${baseUrl}/scheduledclass/detail/?scheduledclassId=${scheduledClassId}` : `${baseUrl}/user/requesthistory`;
    switch (notification.type) {
      case ClassStatusEnum.INITIATED_CLASS:
        dispatch(setSelectedContent(PENDING));
        break;
      // 'ACCEPT_REQUEST REJECTED_REQUEST START_CLASS',
      case ClassStatusEnum.ACCEPT_REQUEST:
        dispatch(setSelectedContent(APPROVED));
        break;
      case ClassStatusEnum.REJECTED_REQUEST:
        dispatch(setSelectedContent(REJECTED));
        break;
      case ClassStatusEnum.START_CLASS:
        break;
      case ClassStatusEnum.FINISH_CLASS:
        break;
      default:
        break;
    }
    // console.log({newUrl, scheduledClassId});
    router.push(newUrl);
  };

  const dropdownMenuHandler = (dme: React.SyntheticEvent) => {
    dme.preventDefault();
    setShowMenues((prevState) => !prevState);
    setShowNotificationBar(false);
    setShowInboxes(false);
  };
  const notificationBarHandler = (nbe: React.SyntheticEvent) => {
    nbe.preventDefault();
    setShowMenues(false);
    setShowInboxes(false);
    setShowNotificationBar((prevState) => !prevState);
  };
  const inboxBarHandler = (ibe: React.SyntheticEvent) => {
    ibe.preventDefault();
    setShowMenues(false);
    setShowNotificationBar(false);
    setShowInboxes((prevState) => !prevState);
  };

  return (
    <>
      {/* Menu Start  */}
      <div className="Header bg-transparent text-white p-0 m-0 shadow">
        {isBreakpoint ? (
          <div className="d-md-none container">
            {/* Mobile menu start  */}
            <div className="w-full d-flex justify-content-between">
              <img src="/logo.png" className="img-logo" alt="" />
              {expandMenu ? (
                <img src="/icons/close-contradicts.svg" alt="" onClick={(e) => setExpandMenu(false)} />
              ) : (
                <img src="/icons/menu-contradict.svg" alt="" onClick={(e) => setExpandMenu(true)} />
              )}
            </div>
            {/* Expanded content start  */}
            {expandMenu && (
              <>
                <ul className="d-flex align-items-start flex-column p-0 m-0">
                  {menuItemList.map((mil, milIdx) => (
                    <li key={mil.id} className="list-unstyled">
                      <Link href={mil.link}>{mil.name}</Link>
                    </li>
                  ))}
                </ul>
                {authenticatedUser ? (
                  <ul className="list-unstyled d-flex justify-content-start align-items-start flex-column">
                    {authUserInfo.role === ADMIN && (
                      <li>
                        <Link href="/admin">Dashboard</Link>
                      </li>
                    )}
                    {authUserInfo.role === STUDENT || authUserInfo.role === TEACHER ? (
                      <>
                        <li className="text-lowercase">
                          <Link href={dashboardUrl}>{`Profile (${authUserInfo.role.toLowerCase()})`}</Link>
                        </li>
                        <li className="d-flex">
                          <Link href="/user/requesthistory">Request history</Link>
                        </li>
                      </>
                    ) : null}
                    <li>
                      <Link href="/admin/changepassword">Change Password</Link>
                    </li>
                    <li>
                      <button className="bg-transparent border-0 text-white" type="button" onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                    <li className="d-flex justify-content-center w-full">
                      <button type="button" className="btn btn-transparent p-0 m-0 " onClick={notificationBarHandler} ref={notificationMenuItem}>
                        {userUnseenNotifications.length > 0 ? (
                          <img src="/icons/notification-dot.svg" alt="notification" height={35} />
                        ) : (
                          <img height={35} src="/icons/notification.svg" alt="notification" />
                        )}
                        {userUnseenNotifications.length > 0 && <div className="bg-danger text-white p-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
                      </button>
                      <button className="btn btn-transparent p-0 m-0" type="button" onClick={inboxBarHandler}>
                        <img src="/icons/inbox.svg" className="f-full" alt="" height={30} />
                      </button>
                    </li>
                  </ul>
                ) : (
                  <div className="d-flex justify-content-start align-items-start flex-column">
                    <div>
                      <Link href="/user/login">Login</Link>
                    </div>
                    <div>
                      <Link href="/user/register">Register</Link>
                    </div>
                  </div>
                )}
                {/* {showNotificationBar ? `notification-bar card position-absolute` : `notification-bar card position-absolute d-none`} */}
                <DisplayNotificationBar
                  linkRedirectHandler={linkRedirectHandler}
                  natificationBarCloseHandler={natificationBarCloseHandler}
                  showNotificationBar={showNotificationBar}
                  userNotifications={userNotifications}
                />
                <DisplayInbox authUserInfo={authUserInfo} roomListOfAUser={roomListOfAUser} showInboxes={showInboxes} setShowInboxes={setShowInboxes} />
              </>
            )}

            {/* Expanded content end  */}
            {/* Mobile menu end  */}
          </div>
        ) : (
          <>
            {/* Desktop menu start  */}
            <div className="container">
              <div className="row header-row">
                <div className="col-2 d-flex justify-content-start align-items-center">
                  <img src="/logo.png" className="img-logo" alt="" />
                </div>
                <div className="col-8">
                  <div className="d-flex justify-content-around align-items-start align-items-center h-full">
                    {menuItemList.map((mil, milIdx) => (
                      <div
                        key={mil.id}
                        className="d-flex justify-content-center text-center h-full d-flex align-items-center"
                        style={{ flexBasis: `${100 / menuItemList.length}%` }}
                      >
                        <Link href={mil.link}>{mil.name}</Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-2 d-flex justify-content-end align-items-center h-full position-relative">
                  {authenticatedUser ? (
                    <>
                      <div className="dropdown h-full">
                        <button
                          className="btn bg-transparent text-primary border-none dropdown-toggle btn-dropdown-user h-full text-capitalize"
                          type="button"
                          onClick={dropdownMenuHandler}
                        >
                          {authUserInfo.name && authUserInfo.name.split(' ')[0]}
                        </button>
                        {/* // Need to check */}
                        <ul className={showMenues ? 'dropdown-menu bg-primary d-block' : 'dropdown-menu bg-primary'}>
                          <li>
                            <div className="dropdown-item text-white">
                              <Link href={dashboardUrl}> Edit Profile</Link>
                            </div>
                          </li>
                          {authUserInfo.role === ADMIN && (
                            <li>
                              <div className="dropdown-item">
                                <Link href="/admin">Dashboard</Link>
                              </div>
                            </li>
                          )}
                          {authUserInfo.role === STUDENT || authUserInfo.role === TEACHER ? (
                            <li>
                              <div className="dropdown-item d-flex">
                                <Link href="/user/requesthistory">Request history</Link>
                                {userUnseenNotifications.length > 0 && <div className="bg-danger text-white px-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
                              </div>
                            </li>
                          ) : null}
                          <li>
                            <div className="dropdown-item text-white">
                              <Link href={authUserInfo.role === STUDENT || authUserInfo.role === TEACHER ? '/user/changepassword' : '/admin/changepassword'}>
                                Change Password
                              </Link>
                            </div>
                          </li>
                          <li>
                            <button className="bg-transparent border-0 text-white dropdown-item" type="button" onClick={logoutHandler}>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                      <button type="button" className="btn btn-transparent p-0 m-0 position-relative" onClick={notificationBarHandler} ref={notificationMenuItem}>
                        {userUnseenNotifications.length > 0 ? (
                          <img src="/icons/notification-dot.svg" alt="notification" height={35} />
                        ) : (
                          <img height={35} src="/icons/notification.svg" alt="notification" />
                        )}
                        {userUnseenNotifications.length > 0 && (
                          <div className="bg-danger text-white p-1 w-fit rounded-3 position-absolute top-0">{userUnseenNotifications.length}</div>
                        )}
                      </button>
                      <div className="d-flex">
                        <button className="btn btn-transparent p-0 m-0" type="button" onClick={inboxBarHandler}>
                          <img src="/icons/inbox.svg" className="f-full" alt="" height={25} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-start align-items-start">
                      <div className="mx-2">
                        <Link href="/user/login">Login</Link>
                      </div>
                      <div className="mx-2">
                        <Link href="/user/register">Register</Link>
                      </div>
                    </div>
                  )}
                  <DisplayNotificationBar
                    linkRedirectHandler={linkRedirectHandler}
                    natificationBarCloseHandler={natificationBarCloseHandler}
                    showNotificationBar={showNotificationBar}
                    userNotifications={userNotifications}
                  />
                  <DisplayInbox authUserInfo={authUserInfo} roomListOfAUser={roomListOfAUser} showInboxes={showInboxes} setShowInboxes={setShowInboxes} />
                </div>
              </div>
              {/* <div className="border-of-header w-full bg-primary-deep" /> */}
            </div>
            {/* Desktop menu end  */}
          </>
        )}
      </div>
      {/* Menu Ends  */}
    </>
  );
}

export default Header;
