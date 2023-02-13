/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable @next/next/no-img-element */

// React/next
import Router from 'next/router';
import React, { useState } from 'react';

// Google map
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

// Config/utils
import axios from '../../config/axios';
import { types, GOOGLE_PLACE_API_KEY, libraries } from '../../config/keys';

// Redux
import { resetErrorList, setErrorList } from '../../redux/reducers/elementsSlice';
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
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setClasstypeList } from '../../redux/reducers/classtypeReducer';

// Components
import Loader from '../elements/Loader';
import MessageList from '../elements/MessageList';

// Types
import { SearchFormPropsInterface } from '../../types/pages/searchPageInterface';
import { SearchParamsInterface } from '../../types/redux/searchInterface';

const { ANY } = types;

// Making a search form component
function SearchForm({ fromHome }: SearchFormPropsInterface) {
  const defaultTuitionStyle = { id: 0, type: ANY, text: 'Any Style' };
  const defaultMedium = { id: 0, name: 'Select a medium', createdAt: '', updatedAt: '' };
  const defaultClass = { id: 0, name: 'Select a class', createdAt: '', updatedAt: '' };
  const defaultSubject = { id: 0, name: 'Select a subject', createdAt: '', updatedAt: '' };

  // Hooks
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    googleMapsApiKey: GOOGLE_PLACE_API_KEY,
    libraries,
  });
  const dispatch = useAppDispatch();
  const [autocomplete, setAutocomplete] = useState(null);

  // Redux state
  const searchParams = useAppSelector((state) => state.search.searchParams);
  const searchTypeList = useAppSelector((state) => state.search.searchTypeList);
  const rpStart = useAppSelector((state) => state.search.rpStart);
  const rpTotal = useAppSelector((state) => state.search.rpTotal);

  const tuitionmList = useAppSelector((state) => state.tuitionm.tuitionmList);
  const subjectList = useAppSelector((state) => state.subject.subjectList);
  const classtypeList = useAppSelector((state) => state.classtype.classtypeList);

  const constSubjectList = useAppSelector((state) => state.subject.constSubjectList);
  const constClasstypeList = useAppSelector((state) => state.classtype.constClasstypeList);

  /**
   * ====================================================================
   * @search teacher with different params
   */
  const searchTeacherHandler = async (ste: React.SyntheticEvent) => {
    ste.preventDefault();
    try {
      // console.log(searchParams);
      const response = await axios.get('/search/teacher', {
        params: searchParams,
      });
      if (response.status === 200) {
        dispatch(setSearchAllUserList(response.data.teachers));
        dispatch(setRPStart(0)); // rp = result pagination
        // rpCurrentPage: 1,
        dispatch(setRPCurrentPage(1));
        // searchUserList: [],
        const displayableItems = response.data.teachers.slice(rpStart, rpTotal);
        dispatch(setSearchUserList(displayableItems));
        // rpTotalPage: 1,
        dispatch(setRPTotalPage(Math.ceil(response.data.teachers.length / rpTotal)));
      } else if (response.status === 204) {
        dispatch(setErrorList(['No teacher found']));
        dispatch(resetSearchUserList());
      }
    } catch (error: any) {
      console.log(error);
      window.localStorage.removeItem('search');
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    }
  };

  /**
   * @submit form event to redirect to /search page
   */
  const searchSubmitHandler = (sshe: React.FormEvent) => {
    sshe.preventDefault();
    dispatch(resetErrorList());
    const errList = [];
    if (!searchParams.TuitionmId) {
      errList.push('You must need to select a tuition medium');
    }
    if (!searchParams.ClassTypeId) {
      errList.push('You must need to select a class');
    }
    if (!searchParams.SubjectId) {
      errList.push('You must need to select a subject');
    }
    if (errList.length > 0) {
      dispatch(setErrorList(errList));
    } else {
      dispatch(resetErrorList());
      window.localStorage.setItem('search', JSON.stringify(searchParams));
      Router.push('/search');
    }
  };

  /**
   *  ====================================================================
   * When tuitionm change the classtype and subjects must change according that that
   * @param iche is an event
   */
  const tuitionmInputChangeHandler = (iche: React.ChangeEvent<HTMLSelectElement>) => {
    const intVal = parseInt(iche.target.value, 10);
    // INITIALIZE SEARCH PARAMS
    const searchParamsObj: SearchParamsInterface = {};
    searchParamsObj.TuitionmId = intVal;
    dispatch(setSearchParams({ [iche.target.name]: intVal }));

    const classTypeOfOneTuitionm = tuitionmList.find((ctl) => ctl.id === intVal)?.ClassTypes;
    // console.log(newClassTypeList);
    if (!classTypeOfOneTuitionm) return;
    const classtypeIdList = classTypeOfOneTuitionm.map((c) => c.id);
    const selectedClassTypes = constClasstypeList.filter((ctl) => classtypeIdList.includes(ctl.id));
    // console.log(selectedClassTypes);

    // SET CLASS TYPE LIST
    if (selectedClassTypes?.length > 0) {
      dispatch(setClasstypeList(selectedClassTypes));
      dispatch(setSearchParams({ ClassTypeId: selectedClassTypes[0].id }));

      // SET SUBJECT LIST
      const newSubjectIdList = [];
      for (let i = 0; i < selectedClassTypes.length; i += 1) {
        for (let j = 0; j < selectedClassTypes[i].Subjects.length; j += 1) {
          // console.log(selectedClassTypes[i].Subjects[j]);
          newSubjectIdList.push(selectedClassTypes[i].Subjects[j].id);
        }
      }
      if (newSubjectIdList.length > 0) {
        const uniqueSubjectIdList = [...new Set(newSubjectIdList)];
        const newSubjectList = constSubjectList.filter((sl) => uniqueSubjectIdList.includes(sl.id));
        dispatch(setSubjectList(newSubjectList));
        dispatch(setSearchParams({ SubjectId: newSubjectList[0].id }));
      }
    }
  };

  /**
   *  ====================================================================
   * When classtype change change subject list must change according that that
   * @param iche is an event
   */
  const classtypeInputChangeHandler = (iche: React.ChangeEvent<HTMLSelectElement>) => {
    const intVal = parseInt(iche.target.value, 10);
    dispatch(setSearchParams({ [iche.target.name]: intVal }));
    if (intVal === 0) {
      dispatch(setSubjectList(constSubjectList));
      // Need to work here
    } else {
      const selectedSubjects = constClasstypeList.find((ctl) => ctl.id === intVal)?.Subjects;
      const newSubjectIdList = [];
      for (let i = 0; i < selectedSubjects.length; i += 1) {
        newSubjectIdList.push(selectedSubjects[i].id);
      }
      if (newSubjectIdList.length > 0) {
        const uniqueSubjectIdList = [...new Set(newSubjectIdList)];
        const newSubjectList = constSubjectList.filter((sl) => uniqueSubjectIdList.includes(sl.id));
        dispatch(setSubjectList(newSubjectList));
        dispatch(setSearchParams({ SubjectId: newSubjectList[0].id }));
      }
    }
  };

  /**
   *  ====================================================================
   * any input change value
   * @param tiche is an event
   */
  const inputChangeHandler = (tiche: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setSearchParams({ [tiche.target.name]: tiche.target.value }));
  };
  const inputNumChangeHandler = (ince: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setSearchParams({ [ince.target.name]: parseInt(ince.target.value, 10) }));
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
      if (autocomplete) {
        dispatch(setSearchParams({ location: autocomplete.getPlace().name }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SearchForm shadow">
      <MessageList />
      {/* <Script src='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=YOUR_API_KEY' /> */}
      <form className="py-4" onSubmit={fromHome ? searchSubmitHandler : searchTeacherHandler}>
        <div className="row search-input-row  mx-0 mb-1">
          {/* google places api start  */}
          <div className={fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="location">Location</label>
            <Autocomplete onLoad={onLoadHandler} onPlaceChanged={placeChangedHandler} className="form-control p-0">
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
          {/* google places api end  */}
          <div className={fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="tutionplace">Tuition style</label>
            <select name="tutionplace" id="tutionplace" className="form-control" defaultValue={searchParams.tutionplace} onChange={inputChangeHandler}>
              {[defaultTuitionStyle, ...searchTypeList].map((ctl) => (
                <option key={ctl.id} value={ctl.type}>
                  {ctl.text}
                </option>
              ))}
            </select>
          </div>
          <div className={fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="TuitionmId">Tuition Medium</label>
            <select name="TuitionmId" id="TuitionmId" className="form-control" defaultValue={searchParams.TuitionmId} onChange={tuitionmInputChangeHandler}>
              <option value="0" disabled>
                Select a medium
              </option>
              {tuitionmList.map((tm) => (
                <option key={tm.id} value={tm.id}>
                  {tm.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row search-input-row  mx-0 mb-1">
          <div className={fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="ClassTypeId">Class</label>
            <select name="ClassTypeId" id="ClassTypeId" className="form-control" onChange={classtypeInputChangeHandler} value={searchParams.ClassTypeId?.toString()}>
              <option value="0" disabled>
                Select a class
              </option>
              {classtypeList.map((ctl) => (
                <option key={ctl.id} value={ctl.id}>
                  {ctl.name}
                </option>
              ))}
            </select>
          </div>
          <div className={fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="SubjectId">Subject</label>
            <select name="SubjectId" id="SubjectId" className="form-control" onChange={inputNumChangeHandler} value={searchParams.SubjectId?.toString()}>
              <option value="0" disabled>
                Select a subject
              </option>
              {subjectList.map((ctl) => (
                <option key={ctl.id} value={ctl.id}>
                  {ctl.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row search-input-row  mx-0 mb-1">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-danger w-fit text-uppercase mx-3s" type="submit">
              Search Tutor
            </button>
          </div>
        </div>
        {/* <div className="row search-input-row  mx-0 mb-3">
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
