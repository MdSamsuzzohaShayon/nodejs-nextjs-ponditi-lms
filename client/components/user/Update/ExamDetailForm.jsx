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

  useEffect(() => {
    if (userExamList.length > 0) {
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
    // console.log({ event: euice, examId }, educationObj);
  };

  const euInputRunningStudyHandler = (euirse, examId) => {
    const educationItem = educationUpdateList.find((eui) => eui.id === examId);
    const educationObj = { ...educationItem };
    educationObj[euirse.target.name] = euirse.target.checked;

    const educationItemIndex = educationUpdateList.findIndex((eui) => eui.id === examId);
    const updateableEducationList = [...educationUpdateList];
    updateableEducationList.splice(educationItemIndex, 1, educationObj);

    dispatch(setEducationUpdate(updateableEducationList));
    // console.log({ event: euirse, examId }, educationObj);
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
            <div className="col-md-6">
              <label htmlFor="level">Exam title</label>
              <input type="text" name="level" className="form-control" defaultValue={eu.level} onChange={(e) => euInputChangeHandler(e, eu.id)} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="major">Major</label>
              <input type="text" name="major" className="form-control" defaultValue={eu.major} onChange={(e) => euInputChangeHandler(e, eu.id)} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="passing_year">Passing Year</label>
              <input type="number" className="form-control" name="passing_year" defaultValue={eu.passing_year} onChange={(e) => euInputChangeHandler(e, eu.id)} />
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center flex-row-reverse">
              <label htmlFor="running_study" className='mx-2'>Currently Studying</label>
              <input type="checkbox" name="running_study" defaultChecked={eu.running_study} onChange={(e) => euInputRunningStudyHandler(e, eu.id)} />
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
