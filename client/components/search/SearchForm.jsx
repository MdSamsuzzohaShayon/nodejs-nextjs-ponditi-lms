/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import axios from '../../config/axios';
import { setErrorList, toggleLoading, resetErrorList} from '../../redux/reducers/elementsSlice';
import {
  setSearchParams,
  setSearchAllUserList,
  setSearchUserList,
  setRPTotalPage,
  setRPStart,
  setRPCurrentPage,
  resetSearchUserList,
} from '../../redux/reducers/searchReducer';
import { setSubjectList } from '../../redux/reducers/subjectReducer';
import { types } from '../../config/keys';


const { ANY } = types;

function SearchForm() {
  
  const dispatch = useDispatch();
  
  
  const searchParams = useSelector((state) => state.search.searchParams);
  const searchTypeList = useSelector((state) => state.search.searchTypeList);
  const rpStart = useSelector((state) => state.search.rpStart);
  const rpTotal = useSelector((state) => state.search.rpTotal);
  
  const subjectList = useSelector((state) => state.subject.subjectList);
  const subjectListCopy = useSelector((state) => state.subject.subjectListCopy);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  
  /**
   * @fetch all data on component mounted
   */
  const searchTeacherHandler = async () => {
    try {
      // console.log(searchParams);
      dispatch(toggleLoading(true));
      const response = await axios.get('/search/teacher', {
        params: searchParams,
      });
      if (response.status === 200) {
        dispatch(setSearchAllUserList(response.data.teachers));
        // rpStart: 0, // rp = result pagination
        dispatch(setRPStart(0));
        // rpCurrentPage: 1,
        dispatch(setRPCurrentPage(1));
        // searchUserList: [],
        const displayableItems = response.data.teachers.slice(rpStart, rpTotal);
        dispatch(setSearchUserList(displayableItems));
        // rpTotalPage: 1,
        dispatch(
          setRPTotalPage(Math.ceil(response.data.teachers.length / rpTotal))
        );
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem('search');
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 404) {
        dispatch(resetSearchUserList());
      }
    }finally{
      dispatch(toggleLoading(false));
    }
  };

  const classtypeInputChangeHandler = (iche) => {
    const val = parseInt(iche.target.value, 10);
    // console.log(iche.target.value === '0');
    // ClassTypeId
    dispatch(setSearchParams({ [iche.target.name]: iche.target.value }));
    if (iche.target.value === '0') {
      dispatch(setSubjectList(subjectListCopy));
    } else {
      const newSubjectList = classtypeList.find(
        (ctl) => ctl.id === val
      )?.Subjects;
      if (newSubjectList?.length > 0) {
        // dispatch(setCurrentUser({ SubjectId: [newSubjectList[0].id] }));
        dispatch(setSubjectList(newSubjectList));
        dispatch(
          setSearchParams({ SubjectId: newSubjectList[0].id.toString() })
        );
      }
    }
  };

  // online, teacher's location, student's location
  const inputChangeHandler = (tiche) => {
    dispatch(setSearchParams({ [tiche.target.name]: tiche.target.value }));
  };

  /**
   * @submit form event
   */
  const searchSubmitHandler = (sshe) => {
    sshe.preventDefault();
    window.localStorage.setItem('search', JSON.stringify(searchParams));
    Router.push('/search');
  };

  return (
    <div className="SearchForm">
      <form className="py-4" onSubmit={searchSubmitHandler}>
        <div className="row mx-0 mb-3">
          <div className="col-md-6">
            <label htmlFor="location">Location</label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white" id="basic-addon1">
                <img src="/icons/location.svg" alt="" />
              </span>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                name="location"
                defaultValue={searchParams.location}
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="ClassTypeId">Class</label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white" id="basic-addon1">
                <img src="/icons/classtype.svg" alt="" />
              </span>
              <select
                name="ClassTypeId"
                id="ClassTypeId"
                className="form-control border-0 shadow-none"
                onChange={classtypeInputChangeHandler}
                defaultValue={searchParams.ClassTypeId}
              >
                {classtypeList !== null ? (
                  classtypeList.map((ctl) => (
                    <option key={ctl.id} value={ctl.id}>
                      {ctl.name}
                    </option>
                  ))
                ) : (
                  <option value="">Any Class</option>
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="row mx-0 mb-3">
          <div className="col-md-6">
            <label htmlFor="SubjectId">Subject</label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white" id="subject-addon">
                <img src="/icons/subject.svg" alt="" />
              </span>
              <select
                name="SubjectId"
                id="SubjectId"
                className="form-control border-0 shadow-none"
                onChange={inputChangeHandler}
                defaultValue={searchParams.SubjectId}
              >
                {subjectList.length > 0 ? (
                  subjectList.map((ctl) => (
                    <option key={ctl.id} value={ctl.id}>
                      {ctl.name}
                    </option>
                  ))
                ) : (
                  <option value="">Any Subject</option>
                )}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="classtype">Tution Location</label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white" id="subject-addon">
                <img src="/icons/classtype.svg" alt="" />
              </span>
              <select
                name="tutionplace"
                id="classtype"
                className="form-control border-0 shadow-none"
                defaultValue={searchParams.tutionplace}
                onChange={inputChangeHandler}
              >
                {searchTypeList.length > 0 &&
                  searchTypeList.map((ctl) => (
                    <option key={ctl.id} value={ctl.type}>
                      {ctl.text}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row mx-0 mb-3">
          <button
            className="btn btn-primary w-fit text-uppercase mx-3s"
            role="button"
            onClick={searchTeacherHandler}
          >
            Search Teacher
          </button>
        </div>
        <div className="row mx-0 mb-3">
          <a href="#" className="text-danger">
            Advanced search
          </a>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
