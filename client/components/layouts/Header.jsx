/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { roles, scheduledclassStatus } from '../../config/keys';
import axios from '../../config/axios';
import { toggleAuthUser, setSelectedContent } from '../../redux/reducers/userReducer';
import { INITIATED_CLASS, ACCEPT_REQUEST, REJECTED_REQUEST, START_CLASS, FINISH_CLASS } from '../../utils/types';
import useMediaQuery from '../../hooks/useMediaQuery';
import { toggleLoading } from '../../redux/reducers/elementsSlice';

const { ADMIN, STUDENT, TEACHER } = roles;
const { PENDING, APPROVED, REJECTED } = scheduledclassStatus;

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isBreakpoint = useMediaQuery(768);

  const menuItemList = useSelector((state) => state.elements.menuItemList);
  const socialItems = useSelector((state) => state.elements.socialItems);
  const userUnseenNotifications = useSelector((state) => state.user.userUnseenNotifications);
  const userNotifications = useSelector((state) => state.user.userNotifications);
  const authenticatedUser = useSelector((state) => state.user.authenticatedUser);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [dashboardUrl, setDashboardUrl] = useState('/user/dashboard');
  const [showNotificationBar, setShowNotificationBar] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const [showMenues, setShowMenues] = useState(false);

  const notificationMenuItem = useRef(null);

  // () => {
  //   console.log({authUserInfo});
  //   if (authUserInfo.role === 'ADMIN') {
  //     return '/admin';
  //   }
  //   return '/user/dashboard';
  // }

  let isMounted = false;
  useEffect(() => {
    if (isMounted === false) {
      const user = localStorage.getItem('user');
      const userData = JSON.parse(user);

      if (user !== null) {
        if (userData.role === ADMIN) {
          setDashboardUrl('/admin');
        } else {
          setDashboardUrl('/user/dashboard');
        }
      }
    }
    isMounted = true;
  }, []);

  const logoutHandler = async (lhe) => {
    lhe.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/user/logout');
      dispatch(toggleAuthUser());
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      window.localStorage.removeItem('user');
    }
  };

  const notificationBarHandler = (nbe) => {
    nbe.preventDefault();
    // console.log(nbe);
    // console.log({
    //   rect: notificationMenuItem.current.getBoundingClientRect(),
    //   offsettop: notificationMenuItem.current.offsetTop,
    //   w_height: window.innerHeight,
    //   w_width: window.innerWidth,
    // });
    setShowNotificationBar((prevState) => !prevState);
  };

  const natificationBarCloseHandler = (nbce) => {
    nbce.preventDefault();
    setShowNotificationBar(false);
  };

  const linkRedirectHandler = (lre, notification) => {
    lre.preventDefault();
    const baseUrl = window.location.origin;
    let newUrl = window.location.origin;
    // console.log(window.location);
    // console.log(notification);
    let scheduledClassId = null;
    if (notification.comment.includes('(')) {
      scheduledClassId = parseInt(notification.comment.substring(notification.comment.indexOf('(') + 1, notification.comment.indexOf(')')), 10);
    }

    // http://localhost:3000/scheduledclass/detail/2
    switch (notification.type) {
      case INITIATED_CLASS:
        dispatch(setSelectedContent(PENDING));
        newUrl = scheduledClassId ? `${baseUrl}/scheduledclass/detail/${scheduledClassId}` : `${baseUrl}/user/requesthistory`;
        break;
      // 'ACCEPT_REQUEST REJECTED_REQUEST START_CLASS',
      case ACCEPT_REQUEST:
        dispatch(setSelectedContent(APPROVED));
        newUrl = scheduledClassId ? `${baseUrl}/scheduledclass/detail/${scheduledClassId}` : `${baseUrl}/user/requesthistory`;
        break;
      case REJECTED_REQUEST:
        dispatch(setSelectedContent(REJECTED));
        newUrl = scheduledClassId ? `${baseUrl}/scheduledclass/detail/${scheduledClassId}` : `${baseUrl}/user/requesthistory`;
        break;
      case START_CLASS:
        newUrl = scheduledClassId ? `${baseUrl}/scheduledclass/detail/${scheduledClassId}` : `${baseUrl}/user/requesthistory`;
        break;
      case FINISH_CLASS:
        newUrl = scheduledClassId ? `${baseUrl}/scheduledclass/detail/${scheduledClassId}` : `${baseUrl}/user/requesthistory`;
        break;
      default:
        break;
    }
    // console.log({newUrl, scheduledClassId});
    router.push(newUrl);
  };

  const setMenuItemClass = (index) => {
    let newClass = 'd-flex justify-content-center text-center border-right-slim h-full d-flex align-items-center';
    if (index === 0) {
      newClass += ' border-left-slim';
    }
    return newClass;
  };

  return (
    <>
      {/* Menu Start  */}
      <div className="Header bg-primary text-white p-0 m-0">
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
                <div className="d-flex align-items-start w-full h-full flex-column flex-md-row">
                  {menuItemList.map((mil, milIdx) => {
                    if (milIdx === menuItemList.length - 1) {
                      return (
                        <div key={mil.id} className="d-flex flex-column justify-content-start">
                          <Link href={mil.link}>{mil.name}</Link>
                        </div>
                      );
                    }
                    return (
                      <div key={mil.id} className="d-flex flex-column justify-content-start">
                        <Link href={mil.link}>{mil.name}</Link>
                      </div>
                    );
                  })}
                </div>
                <div className="auth py-md-0 py-2">
                  {authenticatedUser ? (
                    <ul className="list-unstyled d-flex justify-content-start align-items-start flex-column">
                      {authUserInfo.role === ADMIN && (
                        <>
                          <li>
                            <Link href="/admin">Dashboard</Link>
                          </li>
                          <li>
                            <Link href="/admin/changepassword">Change Password</Link>
                          </li>
                        </>
                      )}
                      {authUserInfo.role === STUDENT || authUserInfo.role === TEACHER ? (
                        <>
                          <li className="text-lowercase">
                            <Link href={dashboardUrl}>{`Profile (${authUserInfo.role.toLowerCase()})`}</Link>
                          </li>
                          <li className="d-flex">
                            <div className="p-1">
                              <Link href="/user/requesthistory">Request history</Link>
                            </div>
                            {userUnseenNotifications.length > 0 && <div className="bg-danger text-white p-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
                          </li>
                          <li className="d-flex" role="button" onClick={notificationBarHandler} aria-hidden="true" ref={notificationMenuItem}>
                            <div className="p-1">
                              {userUnseenNotifications.length > 0 ? (
                                <img src="/icons/notification-dot.svg" alt="notification" height={25} />
                              ) : (
                                <img height={25} src="/icons/notification.svg" alt="notification" />
                              )}
                            </div>
                            {userUnseenNotifications.length > 0 && <div className="bg-danger text-white p-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
                          </li>
                        </>
                      ) : null}
                      <li className="">
                        <button href="#" className="bg-transparent border-0 text-white" type="button" onClick={logoutHandler}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <div className="d-flex justify-content-start align-items-start flex-column">
                      <div href="#">
                        <Link href="/user/login">Login</Link>
                      </div>
                      <div href="#">
                        <Link href="/user/register">Register</Link>
                      </div>
                    </div>
                  )}

                  {/* {showNotificationBar ? `notification-bar card position-absolute` : `notification-bar card position-absolute d-none`} */}
                  <div
                    className={
                      showNotificationBar ? `notification-bar card text-bg-primary position-absolute` : `notification-bar card text-bg-primary position-absolute d-none`
                    }
                  >
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
                              role="button"
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
                </div>
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
                      <div key={mil.id} className={setMenuItemClass(milIdx)} style={{ flexBasis: `${100 / menuItemList.length}%` }}>
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
                          className="btn bg-transparent text-white border-none dropdown-toggle btn-dropdown-user h-full text-capitalize"
                          type="button"
                          onClick={(e) => setShowMenues((prevState) => !prevState)}
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
                              <div className="dropdown-item" href="#">
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
                            <button href="#" className="bg-transparent border-0 text-white dropdown-item" type="button" onClick={logoutHandler}>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="ntification-item d-flex" role="button" onClick={notificationBarHandler} aria-hidden="true" ref={notificationMenuItem}>
                        {userUnseenNotifications.length > 0 ? (
                          <img src="/icons/notification-dot.svg" alt="notification" height={25} />
                        ) : (
                          <img height={25} src="/icons/notification.svg" alt="notification" />
                        )}
                        {userUnseenNotifications.length > 0 && <div className="bg-danger text-white px-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
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
                  <div
                    className={
                      showNotificationBar ? `notification-bar card text-bg-primary position-absolute` : `notification-bar card text-bg-primary position-absolute d-none`
                    }
                  >
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
                              role="button"
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
