/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEducationUpdate, resetEducationUpdate } from '../../../redux/reducers/educationReducer';

function ExamDetailForm(props) {
  const dispatch = useDispatch();

  const userExamList = useSelector((state) => state.user.userExamList);
  const educationUpdateList = useSelector((state) => state.education.educationUpdateList);
  const educationSingleExam = useSelector((state) => state.education.educationSingleExam);
  const educationGroupList = useSelector((state) => state.education.educationGroupList);

  useEffect(() => {
    if (userExamList.length > 0) {
      // for (let i = 0; i < userExamList.length; i += 1) {
      //   if (userExamList[i].level === 'SSC') {
      //     setSscOLevel(userExamList[i]);
      //   }
      //   if (userExamList[i].level === 'HSC') {
      //     setHscALevel(userExamList[i]);
      //   }
      //   if (userExamList[i].level === 'Deploma') {
      //     setDeplomaLevel(userExamList[i]);
      //   }
      //   if (userExamList[i].level === 'Degree') {
      //     setDegreeLevel(userExamList[i]);
      //   }
      //   if (userExamList[i].level === 'Honours') {
      //     setHonoursLevel(userExamList[i]);
      //   }
      //   if (userExamList[i].level === 'Masters') {
      //     setMastersLevel(userExamList[i]);
      //   }
      // }
      dispatch(setEducationUpdate([...userExamList]));
    }
  }, [userExamList]);

  const addNewExamHandler = (anee) => {
    anee.preventDefault();
    const newExam = { ...educationSingleExam };
    const lastElemId = educationUpdateList[educationUpdateList.length - 1] ? educationUpdateList[educationUpdateList.length - 1].id + 1 : 1;
    newExam.id = lastElemId;
    dispatch(setEducationUpdate([...educationUpdateList, newExam]));
  };

  const euInputChangeHandler = (euice, examId) => {
    const educationItem = educationUpdateList.find((eui) => eui.id === examId);
    const educationObj = { ...educationItem };
    educationObj[euice.target.name] = euice.target.value;

    // const newEducationList = educationUpdateList.filter((eui) => eui.id !== examId);
    // dispatch(setEducationUpdate([educationObj, ...newEducationList]));

    const educationItemIndex = educationUpdateList.findIndex((eui) => eui.id === examId);
    const updateableEducationList = [...educationUpdateList];
    updateableEducationList.splice(educationItemIndex, 1, educationObj);

    dispatch(setEducationUpdate(updateableEducationList));
    console.log({ event: euice, examId }, educationObj);
  };

  const euItemCloseHandler = (euice, examId) => {
    euice.preventDefault();
    const newEducationList = educationUpdateList.filter((eui) => eui.id !== examId);
    dispatch(setEducationUpdate(newEducationList));
  };

  return (
    <div className="ExamDetailForm row mb-3">
      {educationUpdateList.map((eu) => (
        <div className="col-md-6 ssc-o-level shadow p-3 mb-5 bg-body" key={eu.id}>
          <div className="d-flex justify-content-end w-full mb-3">
            <img src="/icons/close.svg" alt="" role="button" onClick={(e) => euItemCloseHandler(e, eu.id)} />
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="level">Level</label>
              <input type="text" name="level" className="form-control" defaultValue={eu.level} onChange={(e) => euInputChangeHandler(e, eu.id)} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="group">Group</label>
              <select name="group" className="form-control" defaultValue={eu.group} onChange={(e) => euInputChangeHandler(e, eu.id)} required>
                {educationGroupList.map((tpm, i) => (
                  <option value={tpm.name} key={tpm.id}>
                    {tpm.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="cgpa">Result</label>
              <input type="text" className="form-control" name="cgpa" defaultValue={eu.cgpa} onChange={(e) => euInputChangeHandler(e, eu.id)} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="grade">Grade</label>
              <input type="text" className="form-control" name="grade" defaultValue={eu.grade} onChange={(e) => euInputChangeHandler(e, eu.id)} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="passing_year">Passing Year</label>
              <input
                type="number"
                className="form-control"
                name="passing_year"
                defaultValue={eu.passing_year}
                onChange={(e) => euInputChangeHandler(e, eu.id)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="institution">Institution</label>
              <input type="text" className="form-control" name="institution" defaultValue={eu.institution} onChange={(e) => euInputChangeHandler(e, eu.id)} required />
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-primary w-fit h-fit" type="button" onClick={addNewExamHandler}>
        Add new
      </button>
    </div>
  );
}

export default ExamDetailForm;
