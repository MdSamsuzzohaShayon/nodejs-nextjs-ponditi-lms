import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Router from 'next/router';
import {
  showRequest,
  setInitializeSchedule,
} from '../../redux/reducers/scheduledclassReducer';
import {
  setErrorList,
  toggleLoading,
} from '../../redux/reducers/elementsSlice';
import axios from '../../config/axios';
import { inputToISOtime } from '../../utils/timeFunction';
import { roles } from '../../config/keys';
import { resetAuthUserInfo } from '../../redux/reducers/userReducer';

import Calendar from '../elements/Calendar';

const { TEACHER } = roles;

function SendRequest() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedAmpm, setSelectedAmpm] = useState(null);
  const dispatch = useDispatch();

  const selectedSearchUser = useSelector(
    (state) => state.scheduledclass.selectedSearchUser
  );
  const initializeSchedule = useSelector(
    (state) => state.scheduledclass.initializeSchedule
  );
  const slotList = useSelector((state) => state.scheduledclass.slotList);

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
    const startDateTime = new Date([
      initializeSchedule.date,
      initializeSchedule.time,
    ]);
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
          <div className="col-md-12">
            <div className="time-slot d-flex w-full justify-content-between align-items-start flex-wrap">
              {slotList.map((sl) => (
                <button
                  className={
                    sl.slot === selectedSlot && sl.ampm === selectedAmpm
                      ? 'btn btn-primary'
                      : 'btn btn-outline-primary'
                  }
                  type="button"
                  key={sl.id}
                  onClick={(sse) => selectSlotHandler(sse, sl.slot, sl.ampm)}
                >
                  {`${sl.slotName} ${sl.ampm}`}{' '}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-md-12">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              className="form-control"
              rows="2"
              defaultValue={initializeSchedule.desc}
              onChange={inputChangeHandler}
            />
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
            <button
              type="button"
              className="btn btn-danger w-fit"
              onClick={cancelRequesthandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendRequest;
