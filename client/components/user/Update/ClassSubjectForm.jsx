/* eslint-disable react/no-array-index-key */
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUpdateUser } from '../../../redux/reducers/userReducer';

function ClassSubjectForm(props) {
  const [userClassTypeIds, setUserClassTypeIds] = useState([]);
  const [userSubjectIds, setUserSubjectIds] = useState([]);
  const [userSubjectIdList, setUserSubjectIdList] = useState([]);

  const dispatch = useDispatch();
  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const subjectList = useSelector((state) => state.subject.subjectList);

  // eslint-disable-next-line arrow-body-style
  const selectClasstypeDefaultCheckbox = (classTypeId) => {
    return false;
  };
  // eslint-disable-next-line arrow-body-style
  const selectDefaultSubjectCheckbox = (subjectId) => {
    return false;
  };

  const classtypeChangeHandler = (cce, classTypeId) => {
    // cce.preventDefault();
    // console.log(cce.target.checked);
    // console.log(classTypeId);
    if (cce.target.checked === true) {
      // add to subject list
      setUserClassTypeIds((prevState) => [...prevState, classTypeId]);
      dispatch(
        setUpdateUser({ ClassTypeId: [...userClassTypeIds, classTypeId] })
      );
      const newSubjectList = classtypeList.find(
        (ctl) => ctl.id === classTypeId
      ).Subjects;
      const newSubjectIds = newSubjectList.map((sub) => sub.id);
      const subjectIds = [...userSubjectIdList, ...newSubjectIds];
      setUserSubjectIdList(subjectIds);
    } else {
      // remove from subject list
      const newClassTypeList = userClassTypeIds.filter(
        (ucid) => ucid !== classTypeId
      );
      setUserClassTypeIds(newClassTypeList);
      dispatch(setUpdateUser({ ClassTypeId: newClassTypeList }));
      const newSubjectList = classtypeList.find(
        (ctl) => ctl.id === classTypeId
      ).Subjects;
      const newSubjectIds = newSubjectList.map((sub) => sub.id);
      const updatedSubjectIds = [];
      for (let i = 0; i < userSubjectIdList.length; i += 1) {
        const hasSubjectId = newSubjectIds.includes(userSubjectIdList[i]);
        if (!hasSubjectId) {
          updatedSubjectIds.push(userSubjectIdList[i]);
        }
      }
      setUserSubjectIdList(updatedSubjectIds);
    }
  };
  const subjectChangeHandler = (sce, subjectId) => {
    // sce.preventDefault();
    // console.log(sce.target.checked, subjectId);
    if (sce.target.checked === true) {
      // add to subject list
      setUserSubjectIds((prevState) => [...prevState, subjectId]);
      dispatch(setUpdateUser({ SubjectId: [...userSubjectIds, subjectId] }));
    } else {
      // remove from subject list
      const newSubjectList = userSubjectIds.filter(
        (ucid) => ucid !== subjectId
      );
      setUserSubjectIds(newSubjectList);
      dispatch(setUpdateUser({ SubjectId: newSubjectList }));
    }
  };

  const vlsiableSubjectList = () => {
    const newSubjectList = [];

    for (let i = 0; i < subjectList.length; i += 1) {
      const foundSubject = userSubjectIdList.includes(subjectList[i].id);
      // console.log(foundSubject);
      if (foundSubject) {
        newSubjectList.push(subjectList[i]);
      }
    }
    // console.log(newSubjectList, userSubjectIdList);
    if (newSubjectList.length === 0) return subjectList;

    return newSubjectList;
  };
  // Set default values with use effect
  return (
    <div className="ClassSubjectForm">
      <div className="row mx-0 mb-3">
        <div className="col">
          <h4 className="h4">Preffered Classes</h4>
        </div>
      </div>
      <div className="row mx-0 mb-3">
        {classtypeList.map((ctl, idx) => (
          <div
            className="col-md-3 d-flex justify-content-start align-items-center"
            key={idx}
          >
            <label htmlFor={ctl.id}>{ctl.name}</label>
            <input
              name={ctl.id}
              type="checkbox"
              className="class-subject-checkbox mx-2"
              onChange={(cce) => classtypeChangeHandler(cce, ctl.id)}
              defaultChecked={selectClasstypeDefaultCheckbox(ctl.id)}
            />
          </div>
        ))}
      </div>
      <div className="row mx-0 mb-3">
        <div className="col">
          <h4 className="h4">Preffered Subjects</h4>
        </div>
      </div>
      <div className="row mx-0 mb-3">
        {vlsiableSubjectList().map((sub, idx) => (
          <div
            className="col-md-3 d-flex justify-content-start align-items-center"
            key={idx}
          >
            <label htmlFor={sub.id}>{sub.name}</label>
            <input
              name={sub.id}
              type="checkbox"
              className="class-subject-checkbox mx-2"
              onChange={(cce) => subjectChangeHandler(cce, sub.id)}
              defaultChecked={selectDefaultSubjectCheckbox(sub.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassSubjectForm;
