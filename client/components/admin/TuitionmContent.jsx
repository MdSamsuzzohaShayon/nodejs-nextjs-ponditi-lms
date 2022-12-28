/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../config/axios';
import MessageList from '../elements/MessageList';
import Loader from '../elements/Loader';
import { setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { setTuitionmList, setAddTuitionm } from '../../redux/reducers/tuitionmReducer';
import TuitionmAdd from './TuitionmAdd';
import List from './List';

function TuitionmContent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [addContent, setAddContent] = useState(false);

  const isLoading = useSelector((state) => state.elements.isLoading);
  const tuitionmList = useSelector((state) => state.tuitionm.tuitionmList);

  const deleteTuitionmHandler = async (dche, tuitionmId) => {
    dche.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.delete(`/tuitionm/delete/${tuitionmId}`);
      if (response.status === 200) {
        const newTuitionmList = tuitionmList.filter((ctl) => ctl.id !== tuitionmId);
        dispatch(setTuitionmList(newTuitionmList));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        router.push('/admin/login');
      }
    } finally {
      // console.log('finally');
      dispatch(toggleLoading(false));
    }
  };

  const togglePartHandler = (tphe) => {
    tphe.preventDefault();
    // eslint-disable-next-line no-return-assign
    setAddContent((prevState) => (prevState = !prevState));
  };

  return (
    <div className="TuitionmContent w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <MessageList />
          {addContent ? (
            <TuitionmAdd togglePartHandler={togglePartHandler} tuitionmList={tuitionmList} />
          ) : (
            <>
              <List list={tuitionmList} title="Tuition Medium List" deleteHandler={deleteTuitionmHandler} />
              <div className="row my-3 mx-0">
                <a href="#" className="btn btn-primary w-fit" onClick={togglePartHandler} role="button">
                  Add Tuition Medium
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TuitionmContent;
