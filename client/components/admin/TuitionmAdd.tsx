/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../config/axios';
import { resetErrorList, setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { setAddTuitionm, setTuitionmList, resetAddTuitionm } from '../../redux/reducers/tuitionmReducer';

function TuitionmAdd(props) {
  const dispatch = useDispatch();
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const addTuitionm = useSelector((state) => state.tuitionm.addTuitionm);

  const addTuitionmHandler = async (acthe) => {
    acthe.preventDefault();
    if (addTuitionm.name === '') {
      return dispatch(setErrorList(['You must put tuitionm name']));
    }

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/tuitionm/add', addTuitionm);
      // console.log(response);
      if (response.status === 201) {
        // response.data.tuitionm
        dispatch(setTuitionmList([response.data.tuitionm, ...props.tuitionmList]));
        dispatch(resetAddTuitionm());
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
    return null;
  };

  const inputChangeHandler = (iche) => {
    // console.log({[iche.target.name]: iche.target.value});
    dispatch(setAddTuitionm({ [iche.target.name]: iche.target.value }));
  };

  const classtypeSelectionHandler = (sshe) => {
    // sshe.preventDefault();
    const ClassTypeIdList = [...addTuitionm.ClassTypeId];
    const targetedId = parseInt(sshe.target.value, 10);
    // add
    if (sshe.target.checked === true) {
      ClassTypeIdList.push(targetedId);
      dispatch(setAddTuitionm({ ClassTypeId: ClassTypeIdList }));
    } else {
      // remove
      const targetedIdIndex = ClassTypeIdList.indexOf(targetedId);
      ClassTypeIdList.splice(targetedIdIndex, 1);
      dispatch(setAddTuitionm({ ClassTypeId: ClassTypeIdList }));
    }
  };
  return (
    <div className="TuitionmAdd">
      <div className="row mx-0 mb-3">
        <div className="col">
          <h1 className="h1">Add Tuition Medium</h1>
        </div>
      </div>
      <form className="mb-5" onSubmit={addTuitionmHandler}>
        <div className="row mx-0 mb-3">
          <div className="col">
            <label htmlFor="name">Medium Name</label>
            <input type="text" className="form-control" name="name" onChange={inputChangeHandler} />
          </div>
        </div>
        {/* =============================
        Do not delete it for now (if to delete clean all related functions ) */}
        {/* <div className="row mx-0 mb-3">
          {classtypeList &&
            classtypeList.map((sl, slIdx) => (
              <div className="col-md-3" key={slIdx}>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id={sl.name} name={sl.name} value={sl.id} onChange={classtypeSelectionHandler} />
                  <label className="form-check-label" htmlFor={sl.name}>
                    {sl.name}
                  </label>
                </div>
              </div>
            ))}
        </div> */}
        <div className="row mb-3 mx-0 d-flex">
          <div className="col">
            <button className="btn btn-primary w-fit" type="submit" id="tuitionm-addon">
              Add Class Type
            </button>
            <a href="#" className="btn btn-secondary w-fit" onClick={props.togglePartHandler} role="button">
              See class list
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TuitionmAdd;
