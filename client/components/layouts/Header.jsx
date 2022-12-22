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

  const [dashboardUrl, setDashboardUrl] = useState('/initial');
  const [showNotificationBar, setShowNotificationBar] = useState(false);
  const [notificationOffset, setNotificationOffset] = useState(38);
  const [expandMenu, setExpandMenu] = useState(false);
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
    // const topOffset = `${30 + notificationMenuItem.current.offsetTop}px`;
    setNotificationOffset(30 + notificationMenuItem.current.offsetTop);
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

  return (
    <>
      {/* Menu Start  */}
      <div className="Header bg-danger text-white p-0 m-0">
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
                    <ul className="list-unstyled d-flex justify-content-start align-items-center flex-column">
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
                            <div className="p-1">
                              <Link href="/user/requesthistory">Request history</Link>
                            </div>
                            {userUnseenNotifications.length > 0 && <div className="bg-primary text-white p-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
                          </li>
                          <li className="d-flex" role="button" onClick={notificationBarHandler} aria-hidden="true" ref={notificationMenuItem}>
                            <div className="p-1">
                              {userUnseenNotifications.length > 0 ? (
                                <img src="/icons/notification-dot.svg" alt="notification" height={25} />
                              ) : (
                                <img height={25} src="/icons/notification.svg" alt="notification" />
                              )}
                            </div>
                            {userUnseenNotifications.length > 0 && <div className="bg-primary text-white p-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
                          </li>
                        </>
                      ) : null}
                      <li className="">
                        <button className="btn btn-primary small-btn mx-2" type="button" onClick={logoutHandler}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <div className="d-flex justify-content-start align-items-start flex-column">
                      <Link href="/user/login" className="btn btn-outline-primary small-btn">
                        Login
                      </Link>
                      <button className="btn btn-primary small-btn" type="button">
                        <Link href="/user/register">Register</Link>
                      </button>
                    </div>
                  )}

                  <div className={showNotificationBar ? `notification-bar card position-absolute` : `notification-bar card position-absolute d-none`}>
                    <div className="card-body">
                      <div className="d-flex w-full justify-content-between align-items-center mb-2">
                        <h5 className="card-title text-dark">Notifications</h5>
                        <img src="/icons/close.svg" width={30} alt="close" aria-hidden="true" onClick={natificationBarCloseHandler} />
                      </div>
                      <ul className="list-group">
                        {userNotifications.length > 0 ? (
                          userNotifications.map((un, unI) => (
                            <li
                              className={un.viewed ? 'list-group-item' : 'list-group-item bg-secondary'}
                              key={unI}
                              onClick={(lre) => linkRedirectHandler(lre, un)}
                              role="button"
                              aria-hidden="true"
                            >
                              {un.comment}
                            </li>
                          ))
                        ) : (
                          <li className="list-group-item">No notification found</li>
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
            <div className="row m-0 d-flex flex-column flex-md-row">
              <div className="logo-column p-0 text-center">
                <img src="/logo.png" className="img-logo" alt="" />
              </div>
              <div className="nav-column p-0">
                <div className="top-header w-full bg-danger-deep">
                  <div className="top-header-wrapper d-flex justify-content-between h-full flex-md-row flex-column align-items-start align-items-md-center py-0 py-md-3">
                    <div className="social d-flex h-full py-md-0 py-2">
                      <ul className="d-flex justify-centent-start align-items-center m-0 px-1">
                        {socialItems.map((si) => (
                          <li className="nav-item list-unstyled" key={si.id}>
                            <a href="#" className="nav-link">
                              <img src={`/icons/${si.icon}`} alt={si.name} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="auth py-md-0 py-2">
                      {authenticatedUser ? (
                        <ul className="list-unstyled d-flex justify-content-center align-items-center flex-direction-column flex-md-direction-row m-0">
                          {authUserInfo.role === ADMIN && (
                            <li className="mx-2">
                              <Link href="/admin">Dashboard</Link>
                            </li>
                          )}
                          {authUserInfo.role === STUDENT || authUserInfo.role === TEACHER ? (
                            <>
                              <li className="mx-2 text-lowercase">
                                <Link href={dashboardUrl}>{`Profile (${authUserInfo.role.toLowerCase()})`}</Link>
                              </li>
                              <li className="mx-2 d-flex">
                                <div className="p-1">
                                  <Link href="/user/requesthistory">Request history</Link>
                                </div>
                                {userUnseenNotifications.length > 0 && <div className="bg-primary text-white p-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
                              </li>
                              <li className="mx-2 d-flex" role="button" onClick={notificationBarHandler} aria-hidden="true" ref={notificationMenuItem}>
                                <div className="p-1">
                                  {userUnseenNotifications.length > 0 ? (
                                    <img src="/icons/notification-dot.svg" alt="notification" height={25} />
                                  ) : (
                                    <img height={25} src="/icons/notification.svg" alt="notification" />
                                  )}
                                </div>
                                {userUnseenNotifications.length > 0 && <div className="bg-primary text-white p-1 w-fit rounded-3">{userUnseenNotifications.length}</div>}
                              </li>
                            </>
                          ) : null}
                          <li className="">
                            <button className="btn btn-primary small-btn mx-2" type="button" onClick={logoutHandler}>
                              Logout
                            </button>
                          </li>
                        </ul>
                      ) : (
                        <div className="mx-2">
                          <Link href="/user/login" className="btn btn-outline-primary small-btn">
                            Login
                          </Link>
                          <button className="btn btn-primary small-btn mx-2" type="button">
                            <Link href="/user/register">Register</Link>
                          </button>
                        </div>
                      )}

                      <div className={showNotificationBar ? `notification-bar card position-absolute` : `notification-bar card position-absolute d-none`}>
                        <div className="card-body">
                          <div className="d-flex w-full justify-content-between align-items-center mb-2">
                            <h5 className="card-title text-dark">Notifications</h5>
                            <img src="/icons/close.svg" width={30} alt="close" aria-hidden="true" onClick={natificationBarCloseHandler} />
                          </div>
                          <ul className="list-group">
                            {userNotifications.length > 0 ? (
                              userNotifications.map((un, unI) => (
                                <li
                                  className={un.viewed ? 'list-group-item' : 'list-group-item bg-secondary'}
                                  key={unI}
                                  onClick={(lre) => linkRedirectHandler(lre, un)}
                                  role="button"
                                  aria-hidden="true"
                                >
                                  {un.comment}
                                </li>
                              ))
                            ) : (
                              <li className="list-group-item">No notification found</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom-header w-full">
                  <div className="bottom-header-wrapper">
                    <div className="d-flex justify-content-around align-items-start align-items-md-center w-full h-full flex-column flex-md-row">
                      {menuItemList.map((mil, milIdx) => {
                        if (milIdx === menuItemList.length - 1) {
                          return (
                            <div key={mil.id} className="menu-item d-flex flex-column justify-content-center text-md-center mx-2 mx-md-0 border-right-slim">
                              <Link href={mil.link}>{mil.name}</Link>
                            </div>
                          );
                        }
                        return (
                          <div key={mil.id} className="menu-item d-flex flex-column justify-content-center text-md-center mx-2 mx-md-0">
                            <Link href={mil.link}>{mil.name}</Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-of-header w-full bg-danger-deep" />
            {/* Desktop menu end  */}
          </>
        )}

        <style jsx>{`
          .menu-item {
            width: ${100 / menuItemList.length} %;
          }
          .notification-bar {
            top: ${notificationOffset}px;
          }
          .notification-bar a {
            color: black !important;
          }
        `}</style>
      </div>
      {/* Menu Ends  */}
    </>
  );
}

export default Header;
