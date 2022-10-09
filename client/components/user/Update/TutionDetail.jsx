/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import { setSubjectList } from '../../../redux/reducers/subjectReducer';

function TutionDetail(props) {
  const isMounted = true;
  const dispatch = useDispatch();
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const currentUser = useSelector((state) => state.user.currentUser);
  const updateUser = useSelector((state) => state.user.updateUser);
  const tutionPlaces = useSelector((state) => state.search.searchTypeList);
  // const [available, setAvailable] = useState(currentUser.isAvailable);

  const classtypeInputChangeHandler = (iche) => {
    const val = parseInt(iche.target.value, 10);
    // console.log({val});
    // ClassTypeId
    dispatch(setUpdateUser({ ClassTypeId: [val] }));
    const newSubjectList = classtypeList.find((ctl) => ctl.id === val).Subjects;
    if (newSubjectList.length === 1) {
      dispatch(setUpdateUser({ SubjectId: [newSubjectList[0].id] }));
      dispatch(setSubjectList(newSubjectList));
    } else {
      dispatch(setSubjectList(newSubjectList));
    }
  };
  const subjectInputChangeHandler = (iche) => {
    const val = parseInt(iche.target.value, 10);
    // ClassTypeId
    dispatch(setUpdateUser({ SubjectId: [val] }));
  };
  // Set default values with use effect
  // useEffect(() => {
  //   dispatch(
  //     setUpdateUser({
  //       firstname: currentUser?.firstname,
  //       lastname: currentUser?.lastname,
  //       email: currentUser?.email,
  //       district: currentUser?.district,
  //       presentaddress: currentUser?.presentaddress,
  //     })
  //   );
  // }, []);

  const availablityChangeHandler = (ace, isAvailable) => {
    // console.log(ace.target.checked);
    dispatch(setUpdateUser({ isAvailable }));
  };

  return (
    <div className="TutionDetail">
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="rate">Per Hour Rate (TK)</label>
          <input
            type="number"
            className="form-control"
            name="rate"
            id="rate"
            defaultValue={currentUser?.rate}
            onChange={props.inputChangeHandler}
            placeholder="E.G. 300"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="isAvailable">Available Status</label>
          <div className="toggle d-flex">
            <div className="form-check w-fit">
              <input
                className="form-check-input"
                type="radio"
                name="available"
                id="available"
                onChange={(ace) => availablityChangeHandler(ace, true)}
                checked={!!updateUser.isAvailable}
              />
              <label className="form-check-label" htmlFor="available">
                Available
              </label>
            </div>
            <div className="form-check w-fit mx-4">
              <input
                className="form-check-input"
                type="radio"
                name="notavailable"
                id="notavailable"
                checked={!updateUser.isAvailable}
                onChange={(ace) => availablityChangeHandler(ace, false)}
              />
              <label className="form-check-label" htmlFor="notavailable">
                N/A
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="tutionplace">Tution Place</label>
          <select
            name="tutionplace"
            id="tutionplace"
            className="form-control"
            defaultValue={currentUser?.tutionplace}
            onChange={props.inputChangeHandler}
          >
            {tutionPlaces
              .filter((tp) => tp.id !== 0)
              .map((tpm) => (
                <option value={tpm.type}>{tpm.text}</option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TutionDetail;
