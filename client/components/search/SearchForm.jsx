/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { useJsApiLoader, Autocomplete} from '@react-google-maps/api';
import { useState } from 'react';
import axios from '../../config/axios';
import {
  setErrorList,
  toggleLoading,
} from '../../redux/reducers/elementsSlice';
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

const { ANY } = types;

function SearchForm() {
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
    } finally {
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
      {/* <Script src='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=YOUR_API_KEY' /> */}
      <form className="py-4" onSubmit={searchSubmitHandler}>
        <div className="row mx-0 mb-3">
          {/* google places api start  */}
          <div className="col-md-6">
            <label htmlFor="location">Location</label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white">
                <img src="/icons/location.svg" alt="" className="h-fit" />
              </span>
              <Autocomplete
                onLoad={onLoadHandler}
                onPlaceChanged={placeChangedHandler}
                className="form-control p-0"
              >
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  placeholder="location"
                  name="location"
                  defaultValue={searchParams.location}
                  onChange={inputChangeHandler}
                />
              </Autocomplete>
            </div>
          </div>
          {/* google places api end  */}
          <div className="col-md-6">
            <label htmlFor="ClassTypeId">Class</label>
            <div className="input-group mb-3">
              <span className="input-group-text bg-white">
                <img src="/icons/classtype.svg" alt="" className="h-fit" />
              </span>
              <select
                name="ClassTypeId"
                id="ClassTypeId"
                className="form-control"
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
              <span className="input-group-text bg-white">
                <img src="/icons/subject.svg" alt="" className="h-fit" />
              </span>
              <select
                name="SubjectId"
                id="SubjectId"
                className="form-control"
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
              <span className="input-group-text bg-white">
                <img src="/icons/classtype.svg" alt="" className="h-fit" />
              </span>
              <select
                name="tutionplace"
                id="classtype"
                className="form-control"
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
          <div className="col d-flex justify-content-end">
            <button
              className="btn btn-primary w-fit text-uppercase mx-3s"
              role="button"
              onClick={searchTeacherHandler}
            >
              Search Teacher
            </button>
          </div>
        </div>
        <div className="row mx-0 mb-3">
          <div className="col d-flex justify-content-end">
            <a href="#" className="text-danger">
              Advanced search
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
