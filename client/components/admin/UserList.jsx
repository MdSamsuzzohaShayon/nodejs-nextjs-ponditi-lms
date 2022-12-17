/* eslint-disable react/destructuring-assignment */
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
      const response = await axios.put(`/user/reject/${userId}`);
      // console.log(response);
      if (response.status === 202) {
        dispatch(resetErrorList());
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

      <ul className="nav nav-pills">
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

      {props.allUserList.length > 0 && (
        <ul className="list-group">
          {props.allUserList.map((aul) => (
            <li className="list-group-item rounded-1 d-flex justify-content-between" key={aul.id}>
              <span className="text-capitalize props prop-1">{aul?.name} </span>
              <div className="props prop-2 info d-flex flex-wrap justify-content-start">
                <p className="me-1">{aul?.phone}</p> &nbsp;
                <p>{aul?.email}</p>
              </div>
              <div className="props prop-4 justify-content-end d-flex flex-wrap">
                <button className="btn btn-primary w-fit h-fit " type="button">
                  <Link href={`/user/detail/${aul.id}`}>Detail</Link>
                </button>
                {aul.isActive === PENDING && (
                  <>
                    <button className="btn btn-primary w-fit h-fit " type="button" onClick={(e) => acceptUserHandler(e, aul.id)}>
                      Approve
                    </button>
                    <button className="btn btn-danger w-fit " type="button" onClick={(e) => rejectedUserHandler(e, aul.id)}>
                      Reject
                    </button>
                  </>
                )}

                {aul.isActive === REJECTED && (
                  <button className="btn btn-primary w-fit h-fit " type="button" onClick={(e) => acceptUserHandler(e, aul.id)}>
                    Approve
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .props {
          width: 33%;
        }
      `}</style>
    </div>
  );
}

export default UserList;
