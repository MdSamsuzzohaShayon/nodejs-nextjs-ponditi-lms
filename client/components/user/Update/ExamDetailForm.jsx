/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import { setSubjectList } from '../../../redux/reducers/subjectReducer';

function ExamDetailForm(props) {
  const isMounted = true;
  const dispatch = useDispatch();
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const currentUser = useSelector((state) => state.user.currentUser);
  const degreeList = useSelector((state) => state.user.degreeList);
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
    <div className="ExamDetailForm">
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="degree">Exam Name</label>
          <select
            name="degree"
            id="degree"
            className="form-control"
            onChange={props.inputChangeHandler}
            defaultValue={currentUser?.degree}
          >
            {degreeList.map((dl) => (
              <option value={dl.name}>{dl.name}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="passing_year">Passing Year</label>
          <input
            type="number"
            className="form-control"
            name="passing_year"
            id="passing_year"
            defaultValue={currentUser?.passing_year}
            onChange={props.inputChangeHandler}
            placeholder="E.G. Daffodil International University"
          />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="group">Group</label>
          <select
            name="group"
            id="group"
            className="form-control"
            defaultValue={currentUser?.group}
            onChange={props.inputChangeHandler}
          >
            {['SCIENCE', 'ARTS', 'COMMERCE', 'OTHERS'].map((tpm) => (
              <option value={tpm}>{tpm}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="cgpa">Result</label>
          <input
            type="text"
            className="form-control"
            name="cgpa"
            id="cgpa"
            defaultValue={currentUser?.cgpa}
            onChange={props.inputChangeHandler}
            placeholder="E.G. 3.80"
          />
        </div>
      </div>
      <div className="row mb-3 mx-0">
      <div className="col-12">
          <label htmlFor="institution">Institution</label>
          <input
            type="text"
            className="form-control"
            name="institution"
            id="institution"
            defaultValue={currentUser?.institution}
            onChange={props.inputChangeHandler}
            placeholder="E.G. Daffodil International University"
          />
        </div>
      </div>
    </div>
  );
}

export default ExamDetailForm;
