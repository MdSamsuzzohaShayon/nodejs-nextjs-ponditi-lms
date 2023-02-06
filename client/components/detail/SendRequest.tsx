/* eslint-disable jsx-a11y/label-has-associated-control */

// React/next
import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';

// Google place API
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

// Redux
import { setInitializeSchedule } from '../../redux/reducers/scheduledclassReducer';
import { setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';
import { useAppSelector, useAppDispatch } from '../../redux/store';

// Components
import Loader from '../elements/Loader';
import Calendar from '../elements/Calendar';

// Config/utils
import { GOOGLE_PLACE_API_KEY, libraries } from '../../config/keys';
import axios from '../../config/axios';

// Types
import { TuitionStyleEnum, TimeAMPMEnum } from '../../types/enums';
import { SlotInterface, FetchedScheduledClassInterface } from '../../types/redux/scheduledclassInterface';
import { ClassTypeInterface } from '../../types/redux/SubjectClassTuitionmInterface';

function SendRequest() {
  const dateInputEl = useRef<HTMLInputElement>(null);
  /**
   * @api for google places
   */
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    googleMapsApiKey: GOOGLE_PLACE_API_KEY,
    libraries,
  });

  // Local state
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedAmpm, setSelectedAmpm] = useState<string | null>(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const dispatch = useAppDispatch();

  // Redux state
  const selectedSearchUser = useAppSelector((state) => state.user.selectedUser);
  const initializeSchedule = useAppSelector((state) => state.scheduledclass.initializeSchedule);
  const slotList = useAppSelector((state) => state.scheduledclass.slotList);
  const acceptedSCOU = useAppSelector((state) => state.scheduledclass.requestedSCOU); // Later make it acceptedSCOU
  const tuitionStyle = useAppSelector((state) => state.scheduledclass.tuitionStyle);
  const classtypeList = useAppSelector((state) => state.classtype.classtypeList);
  const subjectList = useAppSelector((state) => state.subject.subjectList);

  /**
   * SET DEFAUL TODAY DATE
   * =========================================================================================================
   */
  useEffect(() => {
    setTimeout(() => {
      if (dateInputEl.current) {
        dateInputEl.current.valueAsDate = new Date();
      }
    }, 2000);
  }, []);

  /**
   * ON CHANGE EVENTS HANDLER
   * =========================================================================================================
   */
  const inputChangeHandler = (ice: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    ice.preventDefault();
    dispatch(setInitializeSchedule({ [ice.target.name]: ice.target.value }));
  };
  const inputNumChangeHandler = (ince: React.ChangeEvent<HTMLSelectElement>) => {
    ince.preventDefault();
    dispatch(setInitializeSchedule({ [ince.target.name]: parseInt(ince.target.value, 10) }));
  };

  const tuitionStyleChangeHandler = (tsce: React.ChangeEvent<HTMLSelectElement>) => {
    tsce.preventDefault();
    if (tsce.target.value === TuitionStyleEnum.SL) {
      dispatch(setInitializeSchedule({ [tsce.target.name]: tsce.target.value, tuitionlocation: selectedSearchUser.presentaddress }));
    } else {
      dispatch(setInitializeSchedule({ [tsce.target.name]: tsce.target.value }));
    }
  };

  const dateChangeHandler = (sde, detail) => {
    sde.preventDefault();
    // console.log(detail);
    // const tutionDate = new Date(detail.year, detail.month, detail.date);
    // console.log(tutionDate.toISOString());
    dispatch(setInitializeSchedule({ date: `${detail.year}-${detail.month}-${detail.date}` }));
  };

  const selectSlotHandler = (sse: React.SyntheticEvent, slot: number, ampm: string) => {
    sse.preventDefault();
    setSelectedSlot(slot);
    setSelectedAmpm(ampm);
    if (ampm === TimeAMPMEnum.PM) {
      dispatch(setInitializeSchedule({ time: `${slot + 12}:00` }));
    } else {
      dispatch(setInitializeSchedule({ time: `${slot}:00` }));
    }
  };
  const placeChangedHandler = () => {
    try {
      if (autocomplete) {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        const addressdetail = `${autocomplete.getPlace().name}, ${autocomplete.getPlace().formatted_address}, (${lng}, ${lat})`;
        dispatch(setInitializeSchedule({ tuitionlocation: addressdetail }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const startTimeChangeHandler = (ste) => {
  //   ste.preventDefault();
  //   dispatch(
  //     setInitializeSchedule({ start: inputToISOtime(ste.target.value) })
  //   );
  // };

  /**
   * SEND REQUEST / SUBMIT REQUEST
   * =========================================================================================================
   */
  const scheduledClassSubmitHandler = async (isce: React.FormEvent<HTMLFormElement>) => {
    isce.preventDefault();
    console.log(initializeSchedule.date);
    if (!initializeSchedule.time) {
      return dispatch(setErrorList(['You must select a slot']));
    }
    if (!initializeSchedule.tutionplace) {
      return dispatch(setErrorList(['You must select a tution place']));
    }
    // console.log(startDateTime.toISOString());
    // console.log('Send request with current time of client');
    if (!initializeSchedule.receiverId || initializeSchedule.receiverId === 0) {
      return dispatch(setErrorList(['You must have a receiver']));
    }

    if (!initializeSchedule.ClassTypeId || initializeSchedule.ClassTypeId === 0) {
      return dispatch(setErrorList(['You must have a class type']));
    }
    if (!initializeSchedule.SubjectId || initializeSchedule.SubjectId === 0) {
      return dispatch(setErrorList(['You must have a subject']));
    }
    // console.log(initializeSchedule);
    const newObj = { ...initializeSchedule };
    newObj.start = new Date([initializeSchedule.date, initializeSchedule.time]).toISOString();
    // newObj.start = new Date([initializeSchedule.date, initializeSchedule.time]).toISOString();
    delete newObj.date;
    delete newObj.time;
    // console.log(newObj);

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/scheduledclass/initiate', newObj);
      if (response.status === 201) {
        window.localStorage.removeItem('search');
        Router.push('/user/dashboard');
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
      if (error?.response?.status === 401 || error?.response?.status === 405) {
        window.localStorage.removeItem('user');
        dispatch(resetAuthUserInfo());
        Router.push('/user/login');
      }
    } finally {
      // console.log('finally');
      dispatch(toggleLoading(false));
    }
    return null;
  };

  /**
   * LOADING GOOGLE PLACE API
   * =========================================================================================================
   */
  if (!isLoaded) {
    return <Loader />;
  }
  const onLoadHandler = (ace) => {
    setAutocomplete(ace);
  };

  /**
   * DISPLAY ALL SLOTS AVAILABLE
   * =========================================================================================================
   */
  const timeSlotDisplay = (offset: number, timeSlotList: SlotInterface[], slotLimit: number, additionalClasses: string) => {
    const slotItemList = [];
    // acceptedSCOU
    for (let i = offset; i < slotLimit; i += 1) {
      const slotBooked = acceptedSCOU.find((sc: FetchedScheduledClassInterface) => {
        const startedDate = new Date(sc.start).toISOString().substring(0, 10);
        let slotTime = timeSlotList[i].slot;
        if (timeSlotList[i].ampm === TimeAMPMEnum.PM) {
          slotTime += 12;
        }
        if (initializeSchedule.date && initializeSchedule.date === startedDate && new Date(sc.start).getHours() === slotTime) {
          return sc;
        }
        return null;
      });
      let newItem: React.ReactElement | null = null;
      if (slotBooked) {
        newItem = (
          <button type="button" key={timeSlotList[i].id} className="btn mb-2 btn-secondary" disabled>
            {`${timeSlotList[i].slotName} ${timeSlotList[i].ampm}`}
          </button>
        );
      } else {
        newItem = (
          <button
            type="button"
            key={timeSlotList[i].id}
            onClick={(sse) => selectSlotHandler(sse, timeSlotList[i].slot, timeSlotList[i].ampm)}
            className={timeSlotList[i].slot === selectedSlot && timeSlotList[i].ampm === selectedAmpm ? 'btn mb-2 btn-primary' : 'btn mb-2 btn-outline-primary'}
          >
            {`${timeSlotList[i].slotName} ${timeSlotList[i].ampm}`}
          </button>
        );
      }
      slotItemList.push(newItem);
    }

    return <div className={`time-slot d-flex w-full justify-content-md-between align-items-center flex-wrap ${additionalClasses}`}>{slotItemList}</div>;
  };

  return (
    <div className="SendRequest">
      <div className="row mb-3">
        <h1 className="h1">Send Request</h1>
      </div>
      <form onSubmit={scheduledClassSubmitHandler}>
        <div className="row mb-3">
          <div className="my-2 week-calendar col-md-12">
            {/* <Calendar onDateChange={dateChangeHandler} /> */}
            <label htmlFor="date">Date</label>
            <input type="date" ref={dateInputEl} name="date" id="date" className="form-control" defaultValue={initializeSchedule.date} onChange={inputNumChangeHandler} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="slot">Slot</label>
          </div>
          <div className="col-md-12 d-flex justify-content-between flex-md-column">
            {timeSlotDisplay(0, slotList, slotList.length / 2, '')}
            {timeSlotDisplay(slotList.length / 2, slotList, slotList.length, 'justify-content-end')}
          </div>
        </div>
        <div className="row mb-3">
          {(initializeSchedule.ClassTypeId || initializeSchedule.ClassTypeId === 0) && (
            <div className="col-md-12">
              <label htmlFor="classtype">Class Name</label>
              <select className="form-control" name="classtype" id="classtype" defaultValue={initializeSchedule.ClassTypeId} onChange={inputChangeHandler}>
                {[{ id: 0, name: 'Select a class' }, ...classtypeList].map((ct) => (
                  <option value={ct.id} key={ct.id}>
                    {ct.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {(initializeSchedule.SubjectId || initializeSchedule.SubjectId === 0) && (
            <div className="col-md-12">
              <label htmlFor="classtype">Subject Name</label>
              <select className="form-control" name="classtype" id="classtype" defaultValue={initializeSchedule.SubjectId} onChange={inputNumChangeHandler}>
                {[{ id: 0, name: 'Select a subject' }, ...subjectList].map((sb) => (
                  <option value={sb.id} key={sb.id}>
                    {sb.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="tutionplace">Tuition Style</label>
            <select name="tutionplace" id="tutionplace" className="form-control" onChange={tuitionStyleChangeHandler}>
              {tuitionStyle.map((ts) => (
                <option value={ts.value} key={ts.id}>
                  {ts.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        {initializeSchedule.tutionplace === TuitionStyleEnum.SL && (
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="tuitionlocation">Address</label>
              <Autocomplete onLoad={onLoadHandler} onPlaceChanged={placeChangedHandler} className="form-control p-0">
                <input
                  name="tuitionlocation"
                  id="tuitionlocation"
                  className="form-control"
                  defaultValue={initializeSchedule?.tuitionlocation}
                  onChange={inputChangeHandler}
                />
              </Autocomplete>
            </div>
          </div>
        )}

        <div className="row mb-3 ">
          <div className="col-md-12">
            <label htmlFor="desc">Note</label>
            <textarea name="desc" id="desc" className="form-control" rows={2} defaultValue={initializeSchedule.desc} onChange={inputChangeHandler} />
          </div>
        </div>
        {/* <div className="row mb-3 mx-0">
          <div className="col-md-6">
            <h3 htmlFor="rate">Hourly Rate {selectedSearchUser.ol_rate}</h3>
          </div>
        </div> */}
        <hr />
        <div className="row mb-3 mx-0">
          {/* <div className="col-md-12">
            <h5>Estimated bill </h5>
            <span>{initializeSchedule.hours * selectedSearchUser.rate} TK</span>
          </div> */}
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-fit">
              Submit Request
            </button>
            <button type="button" className="btn btn-danger w-fit">
              <Link href="/">Cancel</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendRequest;
