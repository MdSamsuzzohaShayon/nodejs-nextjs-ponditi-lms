/* eslint-disable react/destructuring-assignment */
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTuitionm } from '../../redux/reducers/tuitionmReducer';
import { setSelectedClasstype } from '../../redux/reducers/classtypeReducer';

function ClassSubjectStudentForm(props) {
  const dispatch = useDispatch();

  const tuitionmList = useSelector((state) => state.tuitionm.tuitionmList);
  const classtypeList = useSelector((state) => state.classtype.classtypeList);



  return (
    <div className="row ClassSubjectStudentForm">
      <div className="col-md-6 mb-3">
        <label htmlFor="tutionm">Medium</label>
        <select className="form-control" name="tutionm" id="tutionm" defaultValue={props.selectedMedium} onChange={props.tuitionmChangeHandler}>
          {[{ id: 0, name: 'Select a medium' }, ...tuitionmList].map((tm) => (
            <option value={tm.id} key={tm.id}>
              {tm.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="classtype">Class Name</label>
        <select className="form-control" name="classtype" id="classtype" defaultValue={props.selectedClassType} onChange={props.classtypeChangeHandler}>
          {[{ id: 0, name: 'Select a class' }, ...classtypeList].map((ct) => (
            <option value={ct.id} key={ct.id}>
              {ct.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ClassSubjectStudentForm;
