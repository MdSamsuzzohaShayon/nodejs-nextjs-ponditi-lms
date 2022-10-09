import { useSelector, useDispatch } from 'react-redux';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import { setSubjectList } from '../../../redux/reducers/subjectReducer';


function ClassSubjectForm(props) {
  const dispatch = useDispatch();
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
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
  return (
    <div className="row mx-0 mb-3 ClassSubjectForm">
      <div className="col-md-6">
        <label htmlFor="name">Preferred Classes</label>
        <select
          name="ClassTypeId"
          id="ClassTypeId"
          className="form-control"
          onChange={classtypeInputChangeHandler}
        >
          {/* <option value=""></option> */}
          {classtypeList.map((ctl) => (
            <option value={ctl.id} key={ctl.id}>
              {ctl.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="name">Preferred Subjects</label>
        <select
          name="SubjectId"
          id="SubjectId"
          className="form-control"
          onChange={subjectInputChangeHandler}
        >
          {/* <option value=""></option> */}
          {subjectList.map((sl) => (
            <option value={sl.id} key={sl.id}>
              {sl.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ClassSubjectForm;
