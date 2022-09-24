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

  const isLoading = useSelector((state) => state.elements.isLoading);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
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

  return (
    <div className="ClassTypeContent w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1>Add Class Type</h1>
          <form className="mb-5" onSubmit={addClassTypeHandler}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="E.G. Class 1"
                name="name"
                aria-label="Recipient's username"
                aria-describedby="classtype-addon"
                onChange={inputChangeHandler}
              />
              <button
                className="btn btn-primary"
                type="submit"
                id="classtype-addon"
              >
                Add Class Type
              </button>
            </div>
          </form>

          <h1>Class Type List</h1>
          <ErrorMessages />
          {classtypeList.length > 0 && (
            <ul className="list-group">
              {classtypeList.map((ctl) => (
                <li
                  className="list-group-item rounded-1 d-flex justify-content-between"
                  key={ctl.id}
                >
                  <span>{ctl.name}</span>
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
        </div>
      )}
    </div>
  );
}

export default ClassTypeContent;
