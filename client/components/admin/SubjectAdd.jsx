/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../config/axios';
import {
  setErrorList,
  toggleLoading,
  resetErrorList,
} from '../../redux/reducers/elementsSlice';
import {
  setAddSubject,
  resetAddSubject,
  setSubjectList,
} from '../../redux/reducers/subjectReducer';

function SubjectAdd(props) {
  const dispatch = useDispatch();

  const addSubject = useSelector((state) => state.subject.addSubject);

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
        // add subject to the list
        dispatch(setSubjectList([response.data.subject, ...props.subjectList]));
        // reset subject
        dispatch(resetAddSubject);
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

  const inputChangeHandler = (iche) => {
    // console.log({[iche.target.name]: iche.target.value});
    dispatch(setAddSubject({ [iche.target.name]: iche.target.value }));
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
    <div className="SubjectAdd">
      <div className="row mx-0 mb-3">
        <div className="col">
          <h1 className="h1">Add Subject</h1>
        </div>
      </div>
      <form className="mb-5" onSubmit={addSubjectHandler}>
        <div className="row mx-0 mb-3">
          <div className="col">
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
        </div>
        <div className="row mx-0 mb-3">
          {props.classtypeList &&
            props.classtypeList.map((sl) => (
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
          <div className="col">
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
              onClick={props.togglePartHandler}
              role="button"
            >
              See subject list
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SubjectAdd;
