/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../config/axios';
import { toggleLoading, setErrorList, resetErrorList } from '../../redux/reducers/elementsSlice';
import { scheduledclassStatus } from '../../config/keys';
import { setSelectedTabElement } from '../../redux/reducers/adminReducer';
import { fetchAllUsersByAdmin } from '../../redux/reducers/userReducer';

const { APPROVED, REJECTED, PENDING } = scheduledclassStatus;

function UserList(props) {
  const dispatch = useDispatch();

  const adminUserTabElement = useSelector((state) => state.admin.adminUserTabElement);

  const rejectedUserHandler = async (rue, userId) => {
    rue.preventDefault();
    try {
      dispatch(toggleLoading(true));
      // console.log(userId);
      const response = await axios.put(`/user/reject/${userId}`);
      // console.log(response);
      if (response.status === 202) {
        dispatch(resetErrorList());
        dispatch(fetchAllUsersByAdmin(null));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        Router.push('/admin/login');
      }
    } finally {
      // console.log('finally');
      dispatch(toggleLoading(false));
    }
  };

  const acceptUserHandler = async (rue, userId) => {
    rue.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.put(`/user/accept/${userId}`);
      // console.log(response);
      if (response.status === 202) {
        dispatch(resetErrorList());
        // Get all user one more time
        dispatch(fetchAllUsersByAdmin(null));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        Router.push('/admin/login');
      }
    } finally {
      // console.log('finally');
      dispatch(toggleLoading(false));
    }
  };

  const changeTabItemHandler = (ctie, itemName) => {
    ctie.preventDefault();
    // console.log({ selectedTabElement, itemName });
    dispatch(setSelectedTabElement(itemName));
  };

  return (
    <div className="UserList">
      <h1>User List</h1>

      <ul className="nav nav-pills bg-danger">
        {adminUserTabElement.map((aut) => (
          <li key={aut.id} className="nav-item">
            <button
              type="button"
              className={aut.name === props.selectedTabElement ? 'nav-link rounded-1 text-capitalize active' : 'nav-link rounded-1 text-capitalize'}
              onClick={(ctie) => changeTabItemHandler(ctie, aut.name)}
            >
              {aut.text}
            </button>
          </li>
        ))}
      </ul>

      {props.allUserList.length > 0 &&
        props.allUserList.map((aul) => (
          <div className="row mt-2 border-bottom" key={aul.id}>
            <div className="col-md-4">{aul?.name}</div>
            <div className="col-md-4">
              <p>{aul?.phone}</p>
              <p>{aul?.email}</p>
            </div>
            <div className="col-md-4 justify-content-end d-flex flex-wrap align-items-center">
              <button className=" mx-1 w-fit h-fit bg-transparent border-0" type="button">
                <Link href={`/user/detail/?userId=${aul.id}`}>
                  <img src="/icons/detail.svg" width={20} alt="" />
                </Link>
              </button>
              {aul.isActive === PENDING && (
                <>
                  <button className=" mx-1 w-fit h-fit bg-transparent border-0" type="button" onClick={(e) => acceptUserHandler(e, aul.id)}>
                    <img src="/icons/tick.svg" width={20} alt="" />
                  </button>
                  <button className=" mx-1 bg-transparent border-0" type="button" onClick={(e) => rejectedUserHandler(e, aul.id)}>
                    <img src="/icons/reject.svg" width={20} alt="" />
                  </button>
                </>
              )}

              {aul.isActive === REJECTED && (
                <button className=" mx-1 w-fit h-fit bg-transparent border-0" type="button" onClick={(e) => acceptUserHandler(e, aul.id)}>
                  <img src="/icons/tick.svg" width={20} alt="" />
                </button>
              )}
            </div>
          </div>
        ))}
      <style jsx>{`
        .props {
          width: 33%;
        }
      `}</style>
    </div>
  );
}

export default UserList;
