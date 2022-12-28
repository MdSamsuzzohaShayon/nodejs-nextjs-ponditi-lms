/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../config/axios';
import MessageList from '../elements/MessageList';
import Loader from '../elements/Loader';
import { setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { setClasstypeList, setAddClassType } from '../../redux/reducers/classtypeReducer';
import ClassTypeAdd from './ClassTypeAdd';
import List from './List';

function ClassTypeContent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [addContent, setAddContent] = useState(false);

  const isLoading = useSelector((state) => state.elements.isLoading);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);

  const deleteClassTypeHandler = async (dche, classTypeId) => {
    dche.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.delete(`/classtype/delete/${classTypeId}`);
      if (response.status === 200) {
        const newClassTypeList = classtypeList.filter((ctl) => ctl.id !== classTypeId);
        dispatch(setClasstypeList(newClassTypeList));
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
    <div className="ClassTypeContent w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <MessageList />
          {addContent ? (
            <ClassTypeAdd togglePartHandler={togglePartHandler} classtypeList={classtypeList} />
          ) : (
            <>
              <List list={classtypeList} title="Class Type List" deleteHandler={deleteClassTypeHandler} />
              <div className="row my-3 mx-0">
                <a href="#" className="btn btn-primary w-fit" onClick={togglePartHandler} role="button">
                  Add Class
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ClassTypeContent;
