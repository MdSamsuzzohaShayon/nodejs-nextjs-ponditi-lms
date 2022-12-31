/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { useState } from 'react';
import axios from '../../config/axios';
import { setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
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
import { types, GOOGLE_PLACE_API_KEY, libraries } from '../../config/keys';
import Loader from '../elements/Loader';
import { setClasstypeList } from '../../redux/reducers/classtypeReducer';

function SearchForm(props) {
  const defaultClass = { id: 0, name: 'Any Class' };
  const defaultSubject = { id: 0, name: 'Any Subject' };
  /**
   * @api for google places
   */
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    googleMapsApiKey: GOOGLE_PLACE_API_KEY,
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);

  const dispatch = useDispatch();

  const searchParams = useSelector((state) => state.search.searchParams);
  const searchTypeList = useSelector((state) => state.search.searchTypeList);
  const rpStart = useSelector((state) => state.search.rpStart);
  const rpTotal = useSelector((state) => state.search.rpTotal);
  const tuitionmList = useSelector((state) => state.tuitionm.tuitionmList);

  const subjectList = useSelector((state) => state.subject.subjectList);
  const subjectListCopy = useSelector((state) => state.subject.subjectListCopy);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const classtypeListCopy = useSelector((state) => state.classtype.classtypeListCopy);

  /**
   * @fetch all data on component mounted
   */
  const searchTeacherHandler = async () => {
    try {
      // console.log(searchParams);
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
        dispatch(setRPTotalPage(Math.ceil(response.data.teachers.length / rpTotal)));
      } else if (response.status === 204) {
        window.localStorage.removeItem('search');
        dispatch(setErrorList(['No teacher found']));
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem('search');
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    }
  };

  const tuitionmInputChangeHandler = (iche) => {
    const val = parseInt(iche.target.value, 10);
    dispatch(setSearchParams({ [iche.target.name]: iche.target.value }));
    if (iche.target.value === '0') {
      dispatch(setClasstypeList([defaultClass, ...classtypeListCopy]));
      dispatch(setSubjectList([defaultSubject, ...subjectListCopy]));
    } else {
      const classTypeOfOneTuitionm = tuitionmList.find((ctl) => ctl.id === val)?.ClassTypes;
      // console.log(newClassTypeList);
      const classtypeIdList = classTypeOfOneTuitionm.map((c) => c.id);
      const selectedClassTypes = classtypeListCopy.filter((ctl) => classtypeIdList.includes(ctl.id));
      // console.log(selectedClassTypes);

      if (selectedClassTypes?.length > 0) {
        dispatch(setClasstypeList([defaultClass, ...selectedClassTypes]));
        dispatch(setSearchParams({ ClassTypeId: selectedClassTypes[0].id.toString() }));

        // set subject list
        const newSubjectIdList = [];
        for (let i = 0; i < selectedClassTypes.length; i += 1) {
          for (let j = 0; j < selectedClassTypes[i].Subjects.length; j += 1) {
            // console.log(selectedClassTypes[i].Subjects[j]);
            newSubjectIdList.push(selectedClassTypes[i].Subjects[j].id);
          }
        }
        if (newSubjectIdList.length > 0) {
          const uniqueSubjectIdList = [...new Set(newSubjectIdList)];
          const newSubjectList = subjectListCopy.filter((sl) => uniqueSubjectIdList.includes(sl.id));
          dispatch(setSubjectList([defaultSubject, ...newSubjectList]));
          dispatch(setSearchParams({ SubjectId: newSubjectList[0].id.toString() }));
        }
      }
    }
  };

  const classtypeInputChangeHandler = (iche) => {
    const val = parseInt(iche.target.value, 10);
    dispatch(setSearchParams({ [iche.target.name]: iche.target.value }));
    if (iche.target.value === '0') {
      dispatch(setSubjectList([defaultSubject, ...subjectListCopy]));
      // Need to work here
    } else {
      const selectedSubjects = classtypeListCopy.find((ctl) => ctl.id === val)?.Subjects;
      const newSubjectIdList = [];
      for (let i = 0; i < selectedSubjects.length; i += 1) {
        newSubjectIdList.push(selectedSubjects[i].id);
      }
      if (newSubjectIdList.length > 0) {
        const uniqueSubjectIdList = [...new Set(newSubjectIdList)];
        const newSubjectList = subjectListCopy.filter((sl) => uniqueSubjectIdList.includes(sl.id));
        dispatch(setSubjectList([defaultSubject, ...newSubjectList]));
        dispatch(setSearchParams({ SubjectId: newSubjectList[0].id.toString() }));
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

  if (!isLoaded) {
    return <Loader />;
  }
  const onLoadHandler = (ace) => {
    setAutocomplete(ace);
  };

  const placeChangedHandler = () => {
    try {
      // console.log(process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY);
      // const lat = autocomplete.getPlace().geometry.location.lat();
      // const lng = autocomplete.getPlace().geometry.location.lng();
      // console.log({ lat, lng });
      // console.log({ name: autocomplete.getPlace().name });
      // console.log(autocomplete.getPlace().formatted_address);
      dispatch(setSearchParams({ location: autocomplete.getPlace().name }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SearchForm">
      {/* <!-- Floating Labels --> */}
      {/* Inspired from https://codepen.io/WebDude75/pen/NWRKroX */}
      {/* <div className="floating-wrapper">
        <div className="floating-label">
          <input className="floating-input" type="text" placeholder="" />
          <span className="input-highlight" />
          <label>Location</label>
        </div>
        <div className="floating-label">
          <select className="floating-select" onClick="this.setAttribute('value', this.value);" value="">
            <option value="" />
            <option value="1">Alabama</option>
            <option value="2">Boston</option>
            <option value="3">Ohio</option>
            <option value="4">New York</option>
            <option value="5">Washington</option>
          </select>
          <span className="input-highlight" />
          <label>Select</label>
        </div>
      </div> */}
      {/* <!--/ Floating Labels --> */}
      {/* <Script src='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=YOUR_API_KEY' /> */}
      <form className="py-4" onSubmit={searchSubmitHandler}>
        <div className="row mb-3 search-input-row">
          {/* google places api start  */}
          <div className={props.fromHome ? 'col-md-12' : 'col-md-6'}>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white">
                <img src="/icons/location.svg" alt="" className="h-fit" />
              </span>
              <div className="form-floating">
                <Autocomplete onLoad={onLoadHandler} onPlaceChanged={placeChangedHandler} className="form-control p-0">
                  <input
                    type="text"
                    className={props.fromHome ? 'form-control h-full home-search-input' : 'form-control h-full'}
                    defaultValue={searchParams.location}
                    name="location"
                    placeholder="Location"
                  />
                </Autocomplete>
                <label htmlFor="location">Location</label>
              </div>
            </div>
          </div>
          {/* google places api end  */}
          <div className={props.fromHome ? 'col-md-12' : 'col-md-6'}>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white">
                <img src="/icons/classtype.svg" alt="" className="h-fit" />
              </span>
              <div className="form-floating">
                <select name="tutionplace" id="tutionplace" className="form-select" defaultValue={searchParams.tutionplace} onChange={inputChangeHandler}>
                  {searchTypeList.length > 0 &&
                    searchTypeList.map((ctl) => (
                      <option key={ctl.id} value={ctl.type}>
                        {ctl.text}
                      </option>
                    ))}
                </select>
                <label htmlFor="tutionplace">Tuition Types</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3 search-input-row">
          <div className={props.fromHome ? 'col-md-12' : 'col-md-4'}>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <img src="/icons/classtype.svg" alt="" className="h-fit" />
              </span>
              <div className="form-floating">
                <select name="TuitionmId" id="TuitionmId" className="form-select" defaultValue={searchParams.TuitionmId} onChange={tuitionmInputChangeHandler}>
                  {tuitionmList !== null ? (
                    tuitionmList.map((tm) => (
                      <option key={tm.id} value={tm.id}>
                        {tm.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Any Class</option>
                  )}
                </select>
                <label htmlFor="tutionplace">Tuition Medium</label>
              </div>
            </div>
          </div>
          <div className={props.fromHome ? 'col-md-12' : 'col-md-4'}>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <img src="/icons/classtype.svg" alt="" className="h-fit" />
              </span>
              <div className="form-floating">
                <select name="ClassTypeId" id="ClassTypeId" className="form-select" onChange={classtypeInputChangeHandler} defaultValue={searchParams.ClassTypeId}>
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
                <label htmlFor="tutionplace">Class</label>
              </div>
            </div>
          </div>
          <div className={props.fromHome ? 'col-md-12' : 'col-md-4'}>
            {/* <label htmlFor="SubjectId">Subject</label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white">
                <img src="/icons/subject.svg" alt="" className="h-fit" />
              </span>
              <select name="SubjectId" id="SubjectId" className="form-control" onChange={inputChangeHandler} defaultValue={searchParams.SubjectId}>
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
            </div> */}
            <div className="input-group">
              <span className="input-group-text bg-white">
                <img src="/icons/classtype.svg" alt="" className="h-fit" />
              </span>
              <div className="form-floating">
                <select name="SubjectId" id="SubjectId" className="form-select" onChange={inputChangeHandler} defaultValue={searchParams.SubjectId}>
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
                <label htmlFor="tutionplace">Subject</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3 search-input-row">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-primary w-fit text-uppercase mx-3s" role="button" onClick={searchTeacherHandler}>
              Search Teacher
            </button>
          </div>
        </div>
        {/* <div className="row mb-3 search-input-row">
          <div className="col d-flex justify-content-end">
            <a href="#" className="text-danger">
              Advanced search
            </a>
          </div>
        </div> */}
      </form>
    </div>
  );
}

export default SearchForm;
