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
import { setErrorList } from '../../redux/reducers/elementsSlice';
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

const { ANY } = types;

function SearchForm(props) {
  const defaultTuitionStyle = { id: 0, type: ANY, text: 'Any Style' };
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
  const constSubjectList = useSelector((state) => state.subject.constSubjectList);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const constClasstypeList = useSelector((state) => state.classtype.constClasstypeList);

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
        dispatch(resetSearchUserList());
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
      dispatch(setClasstypeList([defaultClass, ...constClasstypeList]));
      dispatch(setSubjectList([defaultSubject, ...constSubjectList]));
    } else {
      const classTypeOfOneTuitionm = tuitionmList.find((ctl) => ctl.id === val)?.ClassTypes;
      // console.log(newClassTypeList);
      const classtypeIdList = classTypeOfOneTuitionm.map((c) => c.id);
      const selectedClassTypes = constClasstypeList.filter((ctl) => classtypeIdList.includes(ctl.id));
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
          const newSubjectList = constSubjectList.filter((sl) => uniqueSubjectIdList.includes(sl.id));
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
      dispatch(setSubjectList([defaultSubject, ...constSubjectList]));
      // Need to work here
    } else {
      const selectedSubjects = constClasstypeList.find((ctl) => ctl.id === val)?.Subjects;
      const newSubjectIdList = [];
      for (let i = 0; i < selectedSubjects.length; i += 1) {
        newSubjectIdList.push(selectedSubjects[i].id);
      }
      if (newSubjectIdList.length > 0) {
        const uniqueSubjectIdList = [...new Set(newSubjectIdList)];
        const newSubjectList = constSubjectList.filter((sl) => uniqueSubjectIdList.includes(sl.id));
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
    <div className="SearchForm shadow">
      {/* <Script src='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=YOUR_API_KEY' /> */}
      <form className="py-4" onSubmit={searchSubmitHandler}>
        <div className="row search-input-row  mx-0 mb-1">
          {/* google places api start  */}
          <div className={props.fromHome ? 'col-md-12' : 'col-md-4'}>
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
          <div className={props.fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="tutionplace">Tuition style</label>
            <select name="tutionplace" id="tutionplace" className="form-control" defaultValue={searchParams.tutionplace} onChange={inputChangeHandler}>
              {[defaultTuitionStyle, ...searchTypeList].map((ctl) => (
                <option key={ctl.id} value={ctl.type}>
                  {ctl.text}
                </option>
              ))}
            </select>
          </div>
          <div className={props.fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="TuitionmId">Tuition Medium</label>
            <select name="TuitionmId" id="TuitionmId" className="form-control" defaultValue={searchParams.TuitionmId} onChange={tuitionmInputChangeHandler}>
              {tuitionmList.map((tm) => (
                <option key={tm.id} value={tm.id}>
                  {tm.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row search-input-row  mx-0 mb-1">
          <div className={props.fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="ClassTypeId">Class</label>
            <select name="ClassTypeId" id="ClassTypeId" className="form-control" onChange={classtypeInputChangeHandler} defaultValue={searchParams.ClassTypeId}>
              {classtypeList.map((ctl) => (
                <option key={ctl.id} value={ctl.id}>
                  {ctl.name}
                </option>
              ))}
            </select>
          </div>
          <div className={props.fromHome ? 'col-md-12' : 'col-md-4'}>
            <label htmlFor="SubjectId">Subject</label>
            <select name="SubjectId" id="SubjectId" className="form-control" onChange={inputChangeHandler} defaultValue={searchParams.SubjectId}>
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
            <button className="btn btn-danger w-fit text-uppercase mx-3s" role="button" onClick={searchTeacherHandler}>
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
