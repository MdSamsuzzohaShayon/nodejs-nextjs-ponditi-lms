/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../config/axios';
import {
  resetErrorList,
  setErrorList,
  toggleLoading,
} from '../../redux/reducers/elementsSlice';
import {
  setAddClassType,
  setClasstypeList,
  resetAddClassType,
} from '../../redux/reducers/classtypeReducer';

function ClassTypeAdd(props) {
  const dispatch = useDispatch();
  const subjectList = useSelector((state) => state.subject.subjectList);
  const addClassType = useSelector((state) => state.classtype.addClassType);

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
        // console.log(response);
      if (response.status === 201) {
        // response.data.classType
        dispatch(
          setClasstypeList([response.data.classType, ...props.classtypeList])
        );
        dispatch(resetAddClassType());
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

  const inputChangeHandler = (iche) => {
    // console.log({[iche.target.name]: iche.target.value});
    dispatch(setAddClassType({ [iche.target.name]: iche.target.value }));
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
    <div className="ClassTypeAdd">
      <div className="row mx-0 mb-3">
        <div className="col">
          <h1 className="h1">Add Class Type</h1>
        </div>
      </div>
      <form className="mb-5" onSubmit={addClassTypeHandler}>
        <div className="row mx-0 mb-3">
          <div className="col">
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
        </div>
        <div className="row mx-0 mb-3">
          {subjectList &&
            subjectList.map((sl, slIdx) => (
              <div className="col-md-3" key={slIdx}>
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
          <div className="col">
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
              onClick={props.togglePartHandler}
              role="button"
            >
              See class list
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ClassTypeAdd;
