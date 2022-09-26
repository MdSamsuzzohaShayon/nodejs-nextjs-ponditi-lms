/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../config/axios';
import ErrorMessages from '../elements/ErrorMessages';
import Loader from '../elements/Loader';
import {
  setErrorList,
  toggleLoading,
} from '../../redux/reducers/elementsSlice';
import {
  setClasstypeList,
  setAddClassType,
} from '../../redux/reducers/classtypeReducer';

function ClassTypeContent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [addContent, setAddContent] = useState(false);

  const isLoading = useSelector((state) => state.elements.isLoading);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const subjectList = useSelector((state) => state.subject.subjectList);
  const addClassType = useSelector((state) => state.classtype.addClassType);

  const deleteClassTypeHandler = async (dche, classTypeId) => {
    dche.preventDefault();
    try {
      dispatch(toggleLoading(true));
      const response = await axios.delete(`/classtype/delete/${classTypeId}`);
      if (response.status === 200) {
        const newClassTypeList = classtypeList.filter(
          (ctl) => ctl.id !== classTypeId
        );
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

  const addClassTypeHandler = async (acthe) => {
    acthe.preventDefault();
    if (addClassType.name === '') {
      return dispatch(setErrorList(['You must put classtype name']));
    }
    if (addClassType.subjectId.length <= 0) {
      return dispatch(
        setErrorList(['You must put select atleast one subject'])
      );
    }
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/classtype/add', addClassType);
      console.log(response);
      // if (response.status === 201) {

      // }
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
    dispatch(setAddClassType({ [iche.target.name]: iche.target.value }));
  };

  const togglePartHandler = (tphe) => {
    tphe.preventDefault();
    setAddContent((prevState) => (prevState = !prevState));
  };

  const subjectSelectionHandler = (sshe) => {
    // sshe.preventDefault();
    const subjectIdList = [...addClassType.subjectId];
    const targetedId = parseInt(sshe.target.value, 10);
    // add
    if (sshe.target.checked === true) {
      subjectIdList.push(targetedId);
      dispatch(setAddClassType({ subjectId: subjectIdList }));
    } else {
      // remove
      const targetedIdIndex = subjectIdList.indexOf(targetedId);
      subjectIdList.splice(targetedIdIndex, 1);
      dispatch(setAddClassType({ subjectId: subjectIdList }));
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
              <h1>Add Class Type</h1>
              <form className="mb-5" onSubmit={addClassTypeHandler}>
                <div className="row mx-0 mb-3">
                  <label htmlFor="name">Class Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="E.G. Class 1"
                    name="name"
                    aria-label="Recipient's username"
                    aria-describedby="classtype-addon"
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="row mx-0 mb-3">
                  {subjectList &&
                    subjectList.map((sl, slIdx) => (
                      <div className="col-md-3" key={sl.id}>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={sl.name}
                            name={sl.name}
                            value={sl.id}
                            onChange={subjectSelectionHandler}
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
                    Add Class Type
                  </button>
                  <a
                    href="#"
                    className="btn btn-secondary w-fit"
                    onClick={togglePartHandler}
                    role="button"
                  >
                    See class list
                  </a>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1>Class Type List</h1>
              {classtypeList.length > 0 && (
                <ul className="list-group">
                  {classtypeList.map((ctl) => (
                    <li
                      className="list-group-item rounded-1 d-flex justify-content-between"
                      key={ctl.id}
                    >
                      <span className='text-capitalize'>{ctl.name}</span>
                      <span>{ctl.Subjects.length}</span>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={(e) => deleteClassTypeHandler(e, ctl.id)}
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
