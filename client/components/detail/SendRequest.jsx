import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { showRequest, setInitializeSchedule } from '../../redux/reducers/scheduledclassReducer';
import { setErrorList, toggleLoading } from '../../redux/reducers/elementsSlice';
import axios from '../../config/axios';
import { types, GOOGLE_PLACE_API_KEY, libraries } from '../../config/keys';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';
import Loader from '../elements/Loader';

import Calendar from '../elements/Calendar';

const { ANY, ONLINE, TL, SL } = types;

function SendRequest() {
  /**
   * @api for google places
   */
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    googleMapsApiKey: GOOGLE_PLACE_API_KEY,
    libraries,
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedAmpm, setSelectedAmpm] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const dispatch = useDispatch();

  const selectedSearchUser = useSelector((state) => state.scheduledclass.selectedSearchUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const initializeSchedule = useSelector((state) => state.scheduledclass.initializeSchedule);
  const slotList = useSelector((state) => state.scheduledclass.slotList);

  useEffect(() => {
    // selectedSearchUser.presentaddress
    if (currentUser.id) {
      if (initializeSchedule.tutionplace === ONLINE || initializeSchedule.tutionplace === ANY) {
        dispatch(setInitializeSchedule({ tuitionlocation: ONLINE }));
      } else if (initializeSchedule.tutionplace === TL) {
        dispatch(
          setInitializeSchedule({
            tuitionlocation: selectedSearchUser.presentaddress,
          })
        );
      } else if (initializeSchedule.tutionplace === SL) {
        let placeWithoutLngLat = currentUser.presentaddress;
        if (placeWithoutLngLat.includes('(')) {
          // eslint-disable-next-line prefer-destructuring
          placeWithoutLngLat = placeWithoutLngLat.split('(')[0];
        }
        dispatch(
          setInitializeSchedule({
            tuitionlocation: placeWithoutLngLat,
          })
        );
      }
      // console.log(currentUser);
    }
  }, [currentUser]);

  const cancelRequesthandler = (cre) => {
    cre.preventDefault();
    dispatch(showRequest(false));
  };

  // set default value
  const inputChangeHandler = (ice) => {
    ice.preventDefault();
    dispatch(setInitializeSchedule({ [ice.target.name]: ice.target.value }));
  };

  // const startTimeChangeHandler = (ste) => {
  //   ste.preventDefault();
  //   dispatch(
  //     setInitializeSchedule({ start: inputToISOtime(ste.target.value) })
  //   );
  // };

  const initializeScheduledClassHandler = async (isce) => {
    isce.preventDefault();
    // console.log(initializeSchedule);
    if (!initializeSchedule.time) {
      return dispatch(setErrorList(['You must select a slot']));
    }
    if (!initializeSchedule.tutionplace) {
      return dispatch(setErrorList(['You must select a tution place']));
    }
    const startDateTime = new Date([initializeSchedule.date, initializeSchedule.time]);
    // console.log(startDateTime);
    // console.log(startDateTime.toISOString());
    // console.log('Send request with current time of client');
    if (!initializeSchedule.receverId) {
      return dispatch(setErrorList(['You must have a recever']));
    }

    if (!initializeSchedule.ClassTypeId) {
      return dispatch(setErrorList(['You must have a class type']));
    }
    if (!initializeSchedule.SubjectId) {
      return dispatch(setErrorList(['You must have a subject']));
    }
    // console.log(initializeSchedule);
    const newObj = { ...initializeSchedule };
    delete newObj.date;
    delete newObj.time;
    newObj.start = startDateTime.toISOString();
    // console.log(newObj);

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post('/scheduledclass/initiate', newObj);
      if (response.status === 201) {
        window.localStorage.removeItem('search');
        Router.push('/user/dashboard');
      }
    } catch (error) {
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
  };

  const dateChangeHandler = (sde, detail) => {
    sde.preventDefault();
    // console.log(detail);
    // const tutionDate = new Date(detail.year, detail.month, detail.date);
    // console.log(tutionDate.toISOString());
    dispatch(
      setInitializeSchedule({
        date: `${detail.year}-${detail.month}-${detail.date}`,
      })
    );
  };

  const selectSlotHandler = (sse, slot, ampm) => {
    sse.preventDefault();
    setSelectedSlot(slot);
    setSelectedAmpm(ampm);
    if (ampm === 'PM') {
      dispatch(setInitializeSchedule({ time: `${slot + 12}:00` }));
    } else {
      dispatch(setInitializeSchedule({ time: `${slot}:00` }));
    }
  };

  if (!isLoaded) {
    return <Loader />;
  }
  const onLoadHandler = (ace) => {
    setAutocomplete(ace);
  };

  const placeChangedHandler = () => {
    try {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      const addressdetail = `${autocomplete.getPlace().name}, ${autocomplete.getPlace().formatted_address}, (${lng}, ${lat})`;
      dispatch(setInitializeSchedule({ tuitionlocation: addressdetail }));
    } catch (error) {
      console.log(error);
    }
  };

  const timeSlotDisplay = (offset, timeSlotList, slotLimit, additionalClasses) => {
    const slotItemList = [];
    for (let i = offset; i < slotLimit; i += 1) {
      const newItem = (
        <button
          type="button"
          key={timeSlotList[i].id}
          onClick={(sse) => selectSlotHandler(sse, timeSlotList[i].slot, timeSlotList[i].ampm)}
          className={timeSlotList[i].slot === selectedSlot && timeSlotList[i].ampm === selectedAmpm ? 'btn mb-2 btn-primary' : 'btn mb-2 btn-outline-primary'}
        >
          {`${timeSlotList[i].slotName} ${timeSlotList[i].ampm}`}{' '}
        </button>
      );
      slotItemList.push(newItem);
    }

    return <div className={`time-slot d-flex w-full justify-content-md-between align-items-center flex-wrap ${additionalClasses}`}>{slotItemList}</div>;
  };

  return (
    <div className="SendRequest">
      <div className="row mx-0 mb-3">
        <h1 className="h1">Send Request</h1>
      </div>
      <form onSubmit={initializeScheduledClassHandler}>
        <div className="row mb-3 mx-0">
          <div className="my-2 week-calendar col-md-12">
            <Calendar onDateChange={dateChangeHandler} />
          </div>
          <div className="col-md-12 d-flex justify-content-between flex-md-column">
            {timeSlotDisplay(0, slotList, slotList.length / 2, '')}
            {timeSlotDisplay(slotList.length / 2, slotList, slotList.length, 'justify-content-end')}
          </div>
        </div>
        <div className="row mb-3 mx-0">
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
        <div className="row mb-3 mx-0">
          <div className="col-md-12">
            <label htmlFor="desc">Description</label>
            <textarea name="desc" id="desc" className="form-control" rows="2" defaultValue={initializeSchedule.desc} onChange={inputChangeHandler} />
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-md-6">
            <h3 htmlFor="rate">Hourly Rate {selectedSearchUser?.rate}</h3>
          </div>
        </div>
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
            <button type="button" className="btn btn-danger w-fit" onClick={cancelRequesthandler}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendRequest;
