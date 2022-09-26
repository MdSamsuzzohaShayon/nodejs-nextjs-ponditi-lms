/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleLoading,
  setErrorList,
} from '../../redux/reducers/elementsSlice';
import {
  setSelectedContent,
  setCurrentUser,
  toggleAuthUser,
} from '../../redux/reducers/userReducer';
import Layout from '../layouts/Layout';
import { userDashboardSidebarList, roles } from '../../config/keys';
import axios from '../../config/axios';



// inspire -  https://dribbble.com/shots/4986374-Job-dashboard-profile/attachments/1115022?mode=media

function Profile() {
  let isMounted = false;
  let isFetched = false;
  const dispatch = useDispatch();
  const router = useRouter();

  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (isMounted === false) {
      const user = localStorage.getItem('user');
      // console.log(user);
      if (user === null) {
        dispatch(toggleAuthUser(false));
        router.push('/user/login');
      } else {
        dispatch(toggleAuthUser(true));
      }
    }
    isMounted = true;
  }, []);

  const fetchSingleUser = async (userId) => {
    try {
      dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get(`/user/single/${userId}`);
      if (response.status === 200) {
        // console.log(response);
        // const newUser = Object.assign(currentUser, response.data.user);
        dispatch(setCurrentUser({ ...response.data.user }));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  useEffect(() => {
    if (authUserInfo.id) {
      // console.log(authUserInfo);
      fetchSingleUser(authUserInfo.id).catch((err) => console.log(err));
      isFetched = true;
    }
  }, [authUserInfo]);
  return (
    <div className="Profile m-4">
      <div className="row mx-0 mb-5">
        <div className="col-md-3">
          <img
            src={currentUser.img ? currentUser.img : '/img/default-img.jpg'}
            className="profile-img img-fluid rounded-circle"
            alt=""
          />
        </div>
        <div className="col-md-9">
          {currentUser.firstname && (
            <div className="name-edit-profile-wrapper d-flex justify-content-between align-items-center">
              <h1 className="h1">
                {`${currentUser.firstname} ${currentUser.lastname}`}
              </h1>
              <button className="btn btn-primary" type="button">
                <Link href="/user/update">Edit</Link>
              </button>
            </div>
          )}
          {currentUser.location && (
            <div className="d-flex">
              <span className="location-icon mx-2">
                <img src="/icons/location.svg" alt="" />
              </span>
              <p>{currentUser.location}</p>
            </div>
          )}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            earum minus et ipsam suscipit in animi consectetur cupiditate
            accusamus, corrupti, repellendus similique consequuntur eius vero
            veritatis vel id tenetur
          </p>
        </div>
      </div>
      <div className="row mx-0 mb-5">
        {currentUser.experience && (
          <div className="col-md-4 d-flex justify-content-start">
            <div className="icon">
              <img
                src="/icons/experience.svg"
                className="img-fluid explain-icon"
                alt=""
              />
            </div>
            <div className="info">
              <h2>{currentUser.experience} years</h2>
              <p>Experience</p>
            </div>
          </div>
        )}
        {currentUser.degree && (
          <div className="col-md-4 d-flex justify-content-start">
            <div className="icon">
              <img
                src="/icons/experience.svg"
                className="img-fluid explain-icon"
                alt=""
              />
            </div>
            <div className="info">
              <h2>
                {currentUser.degree} - {currentUser.major}
              </h2>
              <p>Education</p>
            </div>
          </div>
        )}
        {currentUser.degree && (
          <div className="col-md-4 d-flex justify-content-start">
            <div className="icon">
              <img
                src="/icons/experience.svg"
                className="img-fluid explain-icon"
                alt=""
              />
            </div>
            <div className="info">
              <h2>No(tutions)</h2>
              <p>Completed</p>
            </div>
          </div>
        )}
        <br />
        <br />
        <br />
        Class type subject review
      </div>
    </div>
  );
}

export default Profile;
