/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleLoading,
  resetErrorList,
} from '../../redux/reducers/elementsSlice';
import {
  setSelectedContent,
  toggleAuthUser,
  fetchSingleUser,
} from '../../redux/reducers/userReducer';

import { fetchAllRequestedSCOU } from '../../redux/reducers/scheduledclassReducer';
import Layout from '../../components/layouts/Layout';
import Profile from '../../components/user/Profile';
import SOTRequest from '../../components/scheduledclass/SOTRequest';
import ApprovedClass from '../../components/scheduledclass/ApprovedClass';
import RejectedClass from '../../components/scheduledclass/RejectedClass';
import { userDashboardSidebarList, roles } from '../../config/keys';

const { TEACHER, STUDENT, ADMIN } = roles;

const { CLASS_SCHEDULED, PROFILE, STUDENT_OR_TEACHER_REQUESTS, REJECTED } =
  userDashboardSidebarList;

function dashboard() {
  let isMounted = false;
  const router = useRouter();
  const dispatch = useDispatch();
  const dashboardSidebarElements = useSelector(
    (state) => state.user.dashboardSidebarElements
  );
  const selectedContent = useSelector((state) => state.user.selectedContent);
  const authUserInfo = useSelector((state) => state.user.authUserInfo);

  const selectSidebarElement = (ssee, selectedElement) => {
    ssee.preventDefault();
    dispatch(setSelectedContent(selectedElement));
  };

  const showContent = () => {
    switch (selectedContent) {
      case STUDENT_OR_TEACHER_REQUESTS:
        return <SOTRequest />;
      case PROFILE:
        return <Profile />;
      case CLASS_SCHEDULED:
        return <ApprovedClass />;
      case REJECTED:
        return <RejectedClass />;

      default:
        return <Profile />;
    }
  };

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

  useEffect(() => {
    if (authUserInfo.id) {
      dispatch(fetchAllRequestedSCOU(authUserInfo.id));
      dispatch(fetchSingleUser(authUserInfo.id));
    }
  }, [authUserInfo]);

  return (
    <Layout>
      <div className="user-dashboard d-flex">
        <div className="sidebar bg-danger text-secondary">
          <ul className="d-flex flex-column list-unstyled">
            {dashboardSidebarElements.map((ase) => {
              let displayText = ase.text;
              if (ase.name === STUDENT_OR_TEACHER_REQUESTS) {
                if (authUserInfo.role === TEACHER) {
                  displayText = "Student's requests";
                } else if (authUserInfo.role === STUDENT) {
                  displayText = 'Sent requests';
                } else {
                  displayText = "Student's requests";
                }
              }
              return (
                <li
                  className={
                    selectedContent === ase.name
                      ? 'px-4 py-2 menu-item bg-primary'
                      : 'px-4 py-2 menu-item '
                  }
                  key={ase.id}
                >
                  <a
                    onClick={(e) => selectSidebarElement(e, ase.name)}
                    href="#"
                    role="button"
                  >
                    {displayText}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="content">
          <div className="w-full">
            <div className="p-4">{showContent()}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dashboard;
