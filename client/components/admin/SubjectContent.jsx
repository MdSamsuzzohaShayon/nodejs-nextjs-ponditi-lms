import { useEffect } from 'react';
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
  setSubjectList,
  setAddSubject,
} from '../../redux/reducers/subjectReducer';

function SubjectContent() {
  let isMounted = false;

  const dispatch = useDispatch();
  const router = useRouter();

  const isLoading = useSelector((state) => state.elements.isLoading);
  const subjectList = useSelector((state) => state.subject.subjectList);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  // const subjectList = [];
  const addSubject = useSelector((state) => state.subject.addSubject);

  const fetchAllSubject = async () => {
    try {
      // dispatch(toggleLoading(true));
      // console.log('try');
      const response = await axios.get('/subject/all');
      if (response.status === 200) {
        // console.log(response);
        dispatch(setSubjectList(response.data.subjects));
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      // console.log('finally');
      // dispatch(toggleLoading(false));
    }
  };
  useEffect(() => {
    if (isMounted === false) {
      fetchAllSubject();
    }
    isMounted = true;
  }, []);

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
    dispatch(setAddSubject({ [iche.target.name]: iche.target.value }));
  };

  return (
    <div className="SubjectContent w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <ErrorMessages />
          <h1>Add Class Type</h1>
          <form className="mb-5" onSubmit={addSubjectHandler}>
            <div className="row mx-0 mb-3">
              <div className="col-md-6">
                <label htmlFor="name">Subject Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="E.G. English"
                  name="name"
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="name">Select Class Type</label>
                <select
                  name="classTypeId"
                  id="classTypeId"
                  className="form-control"
                  onChange={inputChangeHandler}
                >
                  {/* <option value=""></option> */}
                  {classtypeList.map((ctl) => (
                    <option value={ctl.id} key={ctl.id}>
                      {ctl.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              id="subject-addon"
            >
              Add Subject
            </button>
          </form>

          {subjectList.length > 0 && (
            <>
              <h1>Class Type List</h1>
              <ul className="list-group">
                {subjectList.map((ctl) => (
                  <li
                    className="list-group-item rounded-1 d-flex justify-content-between"
                    key={ctl.id}
                  >
                    <span>{ctl.name}</span>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SubjectContent;
