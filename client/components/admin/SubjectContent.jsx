/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../config/axios';
import ErrorMessages from '../elements/ErrorMessages';
import Loader from '../elements/Loader';
import {
  setErrorList,
  toggleLoading,
  resetErrorList,
} from '../../redux/reducers/elementsSlice';
import { setSubjectList } from '../../redux/reducers/subjectReducer';
import SubjectAdd from './SubjectAdd';
import List from './List';

function SubjectContent() {
  const isMounted = false;

  const [addContent, setAddContent] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const isLoading = useSelector((state) => state.elements.isLoading);
  const subjectList = useSelector((state) => state.subject.subjectList);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  // const subjectList = [];

  const togglePartHandler = (tphe) => {
    tphe.preventDefault();
    setAddContent((prevState) => (prevState = !prevState));
  };

  const deleteSubjectHandler = async (dche, subjectId) => {
    dche.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.delete(`/subject/delete/${subjectId}`);
      if (response.status === 200) {
        const newSubjectList = subjectList.filter(
          (ctl) => ctl.id !== subjectId
        );
        dispatch(setSubjectList(newSubjectList));
        dispatch(resetErrorList());
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

  return (
    <div className="ClassTypeContent w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <ErrorMessages />
          {addContent ? (
            <SubjectAdd
              togglePartHandler={togglePartHandler}
              classtypeList={classtypeList}
              subjectList={subjectList}
            />
          ) : (
            <>
              <List
                list={subjectList}
                title="Subject List"
                deleteHandler={deleteSubjectHandler}
              />
              <div className="row my-3 mx-0">
                <a
                  href="#"
                  className="btn btn-primary w-fit"
                  onClick={togglePartHandler}
                  role="button"
                >
                  Add Subject
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SubjectContent;
