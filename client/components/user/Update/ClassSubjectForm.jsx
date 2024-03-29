/* eslint-disable react/no-array-index-key */
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUpdateUser } from '../../../redux/reducers/userReducer';
import { setDisplayClassType, setSelectedClasstype } from '../../../redux/reducers/classtypeReducer';
import { setDisplaySubject, setSelectedSubject } from '../../../redux/reducers/subjectReducer';
import { setSelectedTuitionm } from '../../../redux/reducers/tuitionmReducer';

function ClassSubjectForm(props) {
  const [userTuitionmIdList, setUserTuitionmIdList] = useState([]);
  const [userClassTypeIdList, setUserClassTypeIdList] = useState([]);
  const [userSubjectIdList, setUserSubjectIdList] = useState([]);

  const dispatch = useDispatch();
  const tuitionmList = useSelector((state) => state.tuitionm.tuitionmList);
  const selectedTuitionmList = useSelector((state) => state.tuitionm.selectedTuitionmList);

  const classtypeList = useSelector((state) => state.classtype.classtypeList);
  const displayClassType = useSelector((state) => state.classtype.displayClassType);
  const subjectList = useSelector((state) => state.subject.subjectList);
  const displaySubject = useSelector((state) => state.subject.displaySubject);

  const selectedClasstypeList = useSelector((state) => state.classtype.selectedClasstypeList);
  const selectedSubjectList = useSelector((state) => state.subject.selectedSubjectList);

  const userSubjects = useSelector((state) => state.user.userSubjects);
  const userTuitionmList = useSelector((state) => state.user.userTuitionmList);
  const userClassTypes = useSelector((state) => state.user.userClassTypes);

  // console.log(userExamList, userTuitionmList, userClassTypes);

  // eslint-disable-next-line arrow-body-style
  const selectDefaultCheckbox = (userCTEList, itemId) => {
    try {
      const foundClass = userCTEList.find((uct) => uct.id === itemId);
      // console.log({ foundClass });
      if (foundClass) return true;
      return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const rearrangeSubjectList = (selectedClassTypeList) => {
    const subjectsList = selectedClassTypeList.map((sct) => sct.Subjects);
    const newSubjectIdList = [];
    for (let i = 0; i < subjectsList.length; i += 1) {
      const currentSubject = subjectsList[i];
      for (let j = 0; j < currentSubject.length; j += 1) {
        newSubjectIdList.push(currentSubject[j].id);
      }
    }
    const uniqueSubjectIds = [...new Set(newSubjectIdList)];
    setUserSubjectIdList(uniqueSubjectIds);
    return uniqueSubjectIds;
  };

  // Not working properly
  const removeHiddenCTFromSelection = (uniqueClassTypeIds) => {
    if (selectedClasstypeList.length > 0) {
      const ClassTypeId = selectedClasstypeList.filter((ucti) => uniqueClassTypeIds.includes(ucti)); // not working
      const uniqueClassTypeId = [...new Set(ClassTypeId)];
      dispatch(setUpdateUser({ ClassTypeId: uniqueClassTypeId }));
      dispatch(setSelectedClasstype(uniqueClassTypeId));
    }
  };

  // Not working properly
  const removeHiddenSubFromSelection = (uniqueSubjectIds) => {
    if (selectedSubjectList.length > 0) {
      const SubjectId = selectedSubjectList.filter((ss) => uniqueSubjectIds.includes(ss));
      const uniqueSubjectId = [...new Set(SubjectId)];
      dispatch(setUpdateUser({ SubjectId: uniqueSubjectId }));
      dispatch(setSelectedSubject(uniqueSubjectId));
    }
  };

  const tuitionmChangeHandler = (mce, tuitionmId) => {
    let newTuitionmIds = [];
    if (mce.target.checked === true) {
      // add to subject list
      newTuitionmIds = [...selectedTuitionmList, tuitionmId];
    } else {
      // remove from subject list
      newTuitionmIds = userTuitionmIdList.filter((umid) => umid !== tuitionmId);
    }
    const selectedTuitionm = tuitionmList.filter((tm) => newTuitionmIds.includes(tm.id));
    dispatch(setUpdateUser({ TuitionmId: newTuitionmIds }));
    dispatch(setSelectedTuitionm(newTuitionmIds));
    setUserTuitionmIdList(newTuitionmIds);

    // Setting new list of classtype
    const classTypesArr = selectedTuitionm.map((cta) => cta.ClassTypes);
    const newClassTypeIdList = [];
    for (let i = 0; i < classTypesArr.length; i += 1) {
      const currentClassList = classTypesArr[i];
      for (let j = 0; j < currentClassList.length; j += 1) {
        newClassTypeIdList.push(currentClassList[j].id);
      }
    }
    const uniqueClassTypeIds = [...new Set(newClassTypeIdList)];
    setUserClassTypeIdList(uniqueClassTypeIds);

    // Any Class type that is not inside selected will be removed
    removeHiddenCTFromSelection(uniqueClassTypeIds);

    // Setting new list of subject
    const selectedClassTypeList = classtypeList.filter((ct) => uniqueClassTypeIds.includes(ct.id));
    const uniqueSubjectIds = rearrangeSubjectList(selectedClassTypeList);

    // Any Subject that is not inside selected will be removed
    removeHiddenSubFromSelection(uniqueSubjectIds);

    if (uniqueClassTypeIds.length > 0) {
      dispatch(setDisplayClassType(true));
    } else {
      dispatch(setDisplayClassType(false));
      dispatch(setDisplaySubject(false));
    }
  };

  const classtypeChangeHandler = (cce, classTypeId) => {
    let newClassTypeIds = [];
    if (cce.target.checked === true) {
      // add to subject list
      newClassTypeIds = [...selectedClasstypeList, classTypeId];
    } else {
      // remove from subject list
      newClassTypeIds = selectedClasstypeList.filter((umid) => umid !== classTypeId);
    }
    // console.log(selectedClasstypeList);
    dispatch(setUpdateUser({ ClassTypeId: newClassTypeIds }));
    dispatch(setSelectedClasstype(newClassTypeIds));

    // Setting new list of subject
    const selectedClassTypeList = classtypeList.filter((tm) => newClassTypeIds.includes(tm.id));
    const uniqueSubjectIds = rearrangeSubjectList(selectedClassTypeList);

    // Any Subject that is not inside selected will be removed
    removeHiddenSubFromSelection(uniqueSubjectIds);

    if (newClassTypeIds.length > 0) {
      dispatch(setDisplaySubject(true));
    } else {
      dispatch(setDisplaySubject(false));
    }
  };

  const subjectChangeHandler = (sce, subjectId) => {
    let subjectIds = [];
    if (sce.target.checked === true) {
      // add to subject list
      subjectIds = [...selectedSubjectList, subjectId];
    } else {
      // remove from subject list
      subjectIds = selectedSubjectList.filter((ucid) => ucid !== subjectId);
    }
    dispatch(setUpdateUser({ SubjectId: subjectIds }));
    dispatch(setSelectedSubject(subjectIds));
  };

  const vlsiableClassTypeList = () => {
    const newClassTypeList = [];

    for (let i = 0; i < classtypeList.length; i += 1) {
      const foundClassType = userClassTypeIdList.includes(classtypeList[i].id);
      // console.log(foundClassType);
      if (foundClassType) {
        newClassTypeList.push(classtypeList[i]);
      }
    }
    // console.log(newClassTypeList, userSubjectIdList);
    if (newClassTypeList.length === 0) return classtypeList;

    return newClassTypeList;
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
      {/* Class medium input start  */}
      <div className="row mx-0 mb-3">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Preffered Tuition Medium</h4>
            <div className="row py-3">
              {tuitionmList.map((tm, idx) => (
                <div className="col-md-3 d-flex justify-content-end align-items-center flex-row-reverse" key={idx}>
                  <label className="fs-6 fw-light" htmlFor={tm.id}>
                    {tm.name.substring(0, 1).toUpperCase() + tm.name.substring(1).toLowerCase()}
                  </label>
                  <input
                    name={tm.id}
                    type="checkbox"
                    className="class-subject-checkbox mx-2"
                    onChange={(cce) => tuitionmChangeHandler(cce, tm.id)}
                    defaultChecked={selectDefaultCheckbox(userTuitionmList, tm.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {displayClassType && (
        <div className="row mx-0 mb-3">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Preffered Classes</h4>
              <div className="row my-3">
                {vlsiableClassTypeList().map((ctl, idx) => (
                  <div className="col-md-3 d-flex justify-content-end align-items-center flex-row-reverse" key={idx}>
                    <label className="fs-6 fw-light" htmlFor={ctl.id}>
                      {ctl.name.substring(0, 1).toUpperCase() + ctl.name.substring(1).toLowerCase()}
                    </label>
                    <input
                      name={ctl.id}
                      type="checkbox"
                      className="class-subject-checkbox mx-2"
                      onChange={(cce) => classtypeChangeHandler(cce, ctl.id)}
                      defaultChecked={selectDefaultCheckbox(userClassTypes, ctl.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Class medium input end  */}
      {displaySubject && (
        <div className="row mx-0 mb-3">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Preffered Subjects</h4>
              <div className="row py-3">
                {vlsiableSubjectList().map((sub, idx) => (
                  <div className="col-md-3 d-flex justify-content-end align-items-center flex-row-reverse" key={idx}>
                    <label className="fs-6 fw-light" htmlFor={sub.id}>
                      {sub.name.substring(0, 1).toUpperCase() + sub.name.substring(1).toLowerCase()}
                    </label>
                    <input
                      name={sub.id}
                      type="checkbox"
                      className="class-subject-checkbox mx-2"
                      onChange={(cce) => subjectChangeHandler(cce, sub.id)}
                      defaultChecked={selectDefaultCheckbox(userSubjects, sub.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassSubjectForm;
