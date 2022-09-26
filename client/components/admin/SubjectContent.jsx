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
import {
  setSubjectList,
  setAddSubject,
} from '../../redux/reducers/subjectReducer';

function SubjectContent() {
  const isMounted = false;

  const [addContent, setAddContent] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const isLoading = useSelector((state) => state.elements.isLoading);
  const subjectList = useSelector((state) => state.subject.subjectList);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  // const subjectList = [];
  const addSubject = useSelector((state) => state.subject.addSubject);

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

  const addSubjectHandler = async (acthe) => {
    acthe.preventDefault();
    if (addSubject.name === '') {
      return dispatch(setErrorList(['You must put subject name']));
    }
    if (addSubject.classTypeId === 0) {
      return dispatch(setErrorList(['You must select classtype']));
    }
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/subject/add', addSubject);
      // console.log(response);
      if (response.status === 201) {
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

  const inputChangeHandler = (iche) => {
    // console.log({[iche.target.name]: iche.target.value});
    dispatch(setAddSubject({ [iche.target.name]: iche.target.value }));
  };

  const togglePartHandler = (tphe) => {
    tphe.preventDefault();
    setAddContent((prevState) => (prevState = !prevState));
  };

  const classTypeSelectionHandler = (sshe) => {
    // sshe.preventDefault();
    const classTypeIdList = [...addSubject.classTypeId];
    const targetedId = parseInt(sshe.target.value, 10);
    // add
    if (sshe.target.checked === true) {
      classTypeIdList.push(targetedId);
      dispatch(setAddSubject({ classTypeId: classTypeIdList }));
    } else {
      // remove
      const targetedIdIndex = classTypeIdList.indexOf(targetedId);
      classTypeIdList.splice(targetedIdIndex, 1);
      dispatch(setAddSubject({ classTypeId: classTypeIdList }));
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
            <>
              <h1>Add Subject</h1>
              <form className="mb-5" onSubmit={addSubjectHandler}>
                <div className="row mx-0 mb-3">
                  <label htmlFor="name">Subject Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="E.G. Subject 1"
                    name="name"
                    aria-label="Recipient's username"
                    aria-describedby="classtype-addon"
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="row mx-0 mb-3">
                  {classtypeList &&
                    classtypeList.map((sl, slIdx) => (
                      <div className="col-md-3" key={sl.id}>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={sl.name}
                            name={sl.name}
                            value={sl.id}
                            onChange={classTypeSelectionHandler}
                          />
                          <label className="form-check-label" htmlFor={sl.name}>
                            {sl.name}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row mb-3 mx-0 d-flex">
                  <button
                    className="btn btn-primary w-fit"
                    type="submit"
                    id="classtype-addon"
                  >
                    Add Subject
                  </button>
                  <a
                    href="#"
                    className="btn btn-secondary w-fit"
                    onClick={togglePartHandler}
                    role="button"
                  >
                    See subject list
                  </a>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1>Class Type List</h1>
              {subjectList.length > 0 && (
                <ul className="list-group">
                  {subjectList.map((ctl) => (
                    <li
                      className="list-group-item rounded-1 d-flex justify-content-between"
                      key={ctl.id}
                    >
                      <span className="text-capitalize">{ctl.name}</span>
                      <span>{ctl.ClassTypes.length}</span>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={(e) => deleteSubjectHandler(e, ctl.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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
