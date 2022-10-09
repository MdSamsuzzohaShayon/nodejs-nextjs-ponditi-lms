/* eslint-disable react/destructuring-assignment */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import { setSubjectList } from '../../../redux/reducers/subjectReducer';

function PersonalInformationForm(props) {
  const isMounted = true;
  const dispatch = useDispatch();
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const currentUser = useSelector((state) => state.user.currentUser);
  const updateUser = useSelector((state) => state.user.updateUser);
  const subjectList = useSelector((state) => state.subject.subjectList);

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
  return (
    <div className="PersonalInformationForm">
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            id="firstname"
            defaultValue={currentUser?.firstname}
            onChange={props.inputChangeHandler}
            placeholder="E.G. Cristiano"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            id="lastname"
            defaultValue={currentUser?.lastname}
            onChange={props.inputChangeHandler}
            placeholder="E.G. Ronaldo"
          />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            defaultValue={currentUser?.email}
            onChange={props.inputChangeHandler}
            placeholder="E.G. ronal@gmail.com"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="district">District</label>
          <input
            type="text"
            className="form-control"
            name="district"
            id="district"
            defaultValue={currentUser?.district}
            onChange={props.inputChangeHandler}
            placeholder="E.G. Dhaka"
          />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="presentaddress">Present Address</label>
          <input
            type="text"
            className="form-control"
            name="presentaddress"
            id="presentaddress"
            defaultValue={updateUser?.presentaddress}
            onChange={props.inputChangeHandler}
            placeholder="E.G. 27-2, Dhanmondi, Dhaka, Bangladesh"
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalInformationForm;
