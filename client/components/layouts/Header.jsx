/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { roles } from '../../config/keys';
import axios from '../../config/axios';
import { toggleAuthUser } from '../../redux/reducers/userReducer';

const { ADMIN, STUDENT, TEACHER } = roles;

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const menuItemList = useSelector((state) => state.elements.menuItemList);
  const socialItems = useSelector((state) => state.elements.socialItems);
  const userUnseenNotifications = useSelector(
    (state) => state.user.userUnseenNotifications
  );
  const authenticatedUser = useSelector(
    (state) => state.user.authenticatedUser
  );
  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const [dashboardUrl, setDashboardUrl] = useState('/initial');
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
      const response = await axios.post('/user/logout');
      dispatch(toggleAuthUser());
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      window.localStorage.removeItem('user');
    }
  };

  return (
    <>
      {/* Desktop Menu Start  */}
      <div className="Header bg-danger text-white p-0 m-0">
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
                <div className="auth py-1 py-md-0 py-2">
                  {authenticatedUser ? (
                    <ul className="list-unstyled d-flex justify-content-center align-items-center flex-direction-column flex-md-direction-row">
                      {authUserInfo.role === ADMIN && (
                        <li className="mx-2">
                          <Link href="/admin">Dashboard</Link>
                        </li>
                      )}
                      {authUserInfo.role === STUDENT ||
                      authUserInfo.role === TEACHER ? (
                        <>
                          <li className="mx-2">
                            <Link href={dashboardUrl}>Profile</Link>
                          </li>
                          <li className="mx-2 d-flex">
                            <div className="p-1">
                              <Link href="/user/requesthistory">
                                Request history
                              </Link>
                            </div>
                            {userUnseenNotifications.length > 0 && (
                              <div className="bg-primary text-white p-1 w-fit rounded-3">
                                {userUnseenNotifications.length}
                              </div>
                            )}
                          </li>
                        </>
                      ) : null}
                      <li className="mx-2">
                        <button
                          className="btn btn-primary small-btn mx-2"
                          type="button"
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <>
                      <Link
                        href="/user/login"
                        className="btn btn-outline-primary small-btn mx-2"
                      >
                        Login
                      </Link>
                      <button
                        className="btn btn-primary small-btn mx-2"
                        type="button"
                      >
                        <Link href="/user/register">Register</Link>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="bottom-header w-full">
              <div className="bottom-header-wrapper">
                <div className="d-flex justify-content-around align-items-start align-items-md-center w-full h-full flex-column flex-md-row">
                  {menuItemList.map((mil, milIdx) => {
                    if (milIdx === menuItemList.length - 1) {
                      return (
                        <div
                          key={mil.id}
                          className="menu-item d-flex flex-column justify-content-center text-md-center mx-2 mx-md-0 border-right-slim"
                        >
                          <Link href={mil.link}>{mil.name}</Link>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={mil.id}
                        className="menu-item d-flex flex-column justify-content-center text-md-center mx-2 mx-md-0"
                      >
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
        <style jsx>{`
          .menu-item {
            width: ${100 / menuItemList.length} %;
          }
        `}</style>
      </div>
      {/* Desktop Menu Ends  */}
    </>
  );
}

export default Header;
