import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const { TEACHER } = roles;

function SendRequest() {
  const dispatch = useDispatch();

  const authUserInfo = useSelector((state) => state.user.authUserInfo);
  const selectedClassTypesSU = useSelector(
    (state) => state.scheduledclass.selectedClassTypesSU
  );
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const subjectList = useSelector((state) => state.subject.subjectList);
  const selectedSubjectsSU = useSelector(
    (state) => state.scheduledclass.selectedSubjectsSU
  );
  const selectedSearchUser = useSelector(
    (state) => state.scheduledclass.selectedSearchUser
  );
  const initializeSchedule = useSelector(
    (state) => state.scheduledclass.initializeSchedule
  );

  const cancelRequesthandler = (cre) => {
    cre.preventDefault();
    dispatch(showRequest(false));
  };

  // set default value
  const inputChangeHandler = (ice) => {
    ice.preventDefault();
    dispatch(setInitializeSchedule({ [ice.target.name]: ice.target.value }));
  };

  const startTimeChangeHandler = (ste) => {
    ste.preventDefault();
    dispatch(
      setInitializeSchedule({ start: inputToISOtime(ste.target.value) })
    );
  };

  const initializeScheduledClassHandler = async (isce) => {
    isce.preventDefault();
    console.log('Send request with current time of client');
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

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post(
        '/scheduledclass/initiate',
        initializeSchedule
      );
      if (response.status === 201) {
        Router.push('/user/dashboard');
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.msg) {
        dispatch(setErrorList([error.response.data.msg]));
      }
    } finally {
      // console.log('finally');
      dispatch(toggleLoading(false));
    }
  };

  useEffect(() => {
    if (authUserInfo.role === TEACHER) {
      Router.push('/user/dashboard');
    }
  }, []);

  return (
    <div className="SendRequest">
      <form onSubmit={initializeScheduledClassHandler}>
        <div className="row mb-3 mx-0">
          <div className="col-md-6">
            <label htmlFor="ClassTypeId">Available Classes</label>
            <select
              className="form-control"
              name="ClassTypeId"
              id="ClassTypeId"
              defaultValue={initializeSchedule.ClassTypeId}
              onChange={inputChangeHandler}
            >
              {selectedClassTypesSU.length > 0
                ? selectedClassTypesSU.map((sct) => (
                    <option value={sct.id} key={sct.id}>
                      {sct.name}
                    </option>
                  ))
                : classtypeList.map((sct) => (
                    <option value={sct.id} key={sct.id}>
                      {sct.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="SubjectId">Available Sujects</label>
            <select
              className="form-control"
              name="SubjectId"
              id="SubjectId"
              defaultValue={initializeSchedule.SubjectId}
              onChange={inputChangeHandler}
            >
              {selectedSubjectsSU.length > 0
                ? selectedSubjectsSU.map((ss) => (
                    <option value={ss.id} key={ss.id}>
                      {ss.name}
                    </option>
                  ))
                : subjectList.map((ss) => (
                    <option value={ss.id} key={ss.id}>
                      {ss.name}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-md-6">
            <label htmlFor="start">Start at</label>
            <input
              className="form-control"
              type="datetime-local"
              name="start"
              onChange={startTimeChangeHandler}
              defaultValue={initializeSchedule.start}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="end">Durations (hours)</label>
            <input
              className="form-control"
              type="number"
              name="hours"
              onChange={inputChangeHandler}
              defaultValue={initializeSchedule.hours}
            />
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
        <hr />
        <div className="row mb-3 mx-0">
          <div className="col-md-12">
            <h5>Estimated bill </h5>
            <span>{initializeSchedule.hours * selectedSearchUser.rate} TK</span>
          </div>
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
