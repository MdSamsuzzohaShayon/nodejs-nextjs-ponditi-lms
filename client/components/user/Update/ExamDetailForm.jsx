/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdateUserExam } from '../../../redux/reducers/userReducer';

function ExamDetailForm(props) {
  const dispatch = useDispatch();
  const groupList = useSelector((state) => state.user.groupList);
  const userExamList = useSelector((state) => state.user.userExamList);

  const [sscOLevel, setSscOLevel] = useState({
    level: 'SSC',
    group: 'SCIENCE',
  });
  const [hscALevel, setHscALevel] = useState({
    level: 'HSC',
    group: 'SCIENCE',
  });
  const [deplomaLevel, setDeplomaLevel] = useState({
    level: 'Deploma',
    group: 'SCIENCE',
  });
  const [degreeLevel, setDegreeLevel] = useState({
    level: 'Degree',
    group: 'SCIENCE',
  });
  const [honoursLevel, setHonoursLevel] = useState({
    level: 'Honours',
    group: 'SCIENCE',
  });
  const [mastersLevel, setMastersLevel] = useState({
    level: 'Masters',
    group: 'SCIENCE',
  });

  useEffect(() => {
    if (userExamList.length > 0) {
      for (let i = 0; i < userExamList.length; i += 1) {
        if (userExamList[i].level === 'SSC') {
          setSscOLevel(userExamList[i]);
        }
        if (userExamList[i].level === 'HSC') {
          setHscALevel(userExamList[i]);
        }
        if (userExamList[i].level === 'Deploma') {
          setDeplomaLevel(userExamList[i]);
        }
        if (userExamList[i].level === 'Degree') {
          setDegreeLevel(userExamList[i]);
        }
        if (userExamList[i].level === 'Honours') {
          setHonoursLevel(userExamList[i]);
        }
        if (userExamList[i].level === 'Masters') {
          setMastersLevel(userExamList[i]);
        }
      }
    }
  }, [userExamList]);

  const sscInputChangeHandler = (ice) => {
    ice.preventDefault();
    setSscOLevel((prevState) => ({
      ...prevState,
      [ice.target.name]: ice.target.value,
    }));
    const newObj = { ...sscOLevel, [ice.target.name]: ice.target.value };
    dispatch(setUpdateUserExam(newObj));
  };

  const hscInputChangeHandler = (ice) => {
    ice.preventDefault();
    setHscALevel((prevState) => ({
      ...prevState,
      [ice.target.name]: ice.target.value,
    }));
    const newObj = { ...hscALevel, [ice.target.name]: ice.target.value };
    dispatch(setUpdateUserExam(newObj));
  };

  const deplomaInputChangeHandler = (ice) => {
    ice.preventDefault();
    setDeplomaLevel((prevState) => ({
      ...prevState,
      [ice.target.name]: ice.target.value,
    }));
    const newObj = { ...deplomaLevel, [ice.target.name]: ice.target.value };
    dispatch(setUpdateUserExam(newObj));
  };

  const degreeInputChangeHandler = (ice) => {
    ice.preventDefault();
    setDegreeLevel((prevState) => ({
      ...prevState,
      [ice.target.name]: ice.target.value,
    }));
    const newObj = { ...degreeLevel, [ice.target.name]: ice.target.value };
    dispatch(setUpdateUserExam(newObj));
  };

  const honoursInputChangeHandler = (ice) => {
    ice.preventDefault();
    setHonoursLevel((prevState) => ({
      ...prevState,
      [ice.target.name]: ice.target.value,
    }));
    const newObj = { ...honoursLevel, [ice.target.name]: ice.target.value };
    dispatch(setUpdateUserExam(newObj));
  };
  const mastersInputChangeHandler = (ice) => {
    ice.preventDefault();
    setMastersLevel((prevState) => ({
      ...prevState,
      [ice.target.name]: ice.target.value,
    }));
    const newObj = { ...mastersLevel, [ice.target.name]: ice.target.value };
    dispatch(setUpdateUserExam(newObj));
  };

  return (
    <div className="ExamDetailForm row mx-0 mb-3">
      {/* SSC start  */}
      <div className="col-md-6 ssc-o-level shadow p-3 mb-5 bg-body">
        <div className="row mb-3 mx-0">
          <h4>SSC / O-Level</h4>
          <hr />
          <div className="col-sm-12 col-md-6">
            <input type="hidden" defaultValue={sscOLevel.level} />
          </div>
        </div>

        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="group">Group</label>
            <select
              name="group"
              id="group"
              className="form-control"
              defaultValue={sscOLevel?.group}
              onChange={sscInputChangeHandler}
            >
              {groupList.map((tpm, i) => (
                <option value={tpm} key={i}>
                  {tpm}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="cgpa">Result</label>
            <input
              type="number"
              className="form-control"
              name="cgpa"
              id="cgpa"
              defaultValue={sscOLevel?.cgpa}
              onChange={sscInputChangeHandler}
              placeholder="E.G. 3.80"
            />
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              className="form-control"
              name="grade"
              id="grade"
              defaultValue={sscOLevel?.grade}
              onChange={sscInputChangeHandler}
              placeholder="E.G. A"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="passing_year">Passing Year</label>
            <input
              type="number"
              className="form-control"
              name="passing_year"
              id="passing_year"
              defaultValue={sscOLevel?.passing_year}
              onChange={sscInputChangeHandler}
              placeholder="E.G. 2020"
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
              defaultValue={sscOLevel?.institution}
              onChange={sscInputChangeHandler}
              placeholder="E.G. Daffodil International University"
            />
          </div>
        </div>
      </div>
      {/* SSC end  */}

      {/* HSC start  */}
      <div className="col-md-6 hsc-a-level shadow p-3 mb-5 bg-body">
        <div className="row mb-3 mx-0">
          <h4>HSC / A-Level</h4>
          <hr />
          <div className="col-sm-12 col-md-6">
            <input type="hidden" defaultValue={hscALevel.level} />
          </div>
        </div>

        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="group">Group</label>
            <select
              name="group"
              id="group"
              className="form-control"
              defaultValue={hscALevel?.group}
              onChange={hscInputChangeHandler}
            >
              {groupList.map((tpm, i) => (
                <option value={tpm} key={i}>
                  {tpm}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="cgpa">Result</label>
            <input
              type="number"
              className="form-control"
              name="cgpa"
              id="cgpa"
              defaultValue={hscALevel?.cgpa}
              onChange={hscInputChangeHandler}
              placeholder="E.G. 3.80"
            />
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              className="form-control"
              name="grade"
              id="grade"
              defaultValue={hscALevel?.grade}
              onChange={hscInputChangeHandler}
              placeholder="E.G. A"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="passing_year">Passing Year</label>
            <input
              type="number"
              className="form-control"
              name="passing_year"
              id="passing_year"
              defaultValue={hscALevel?.passing_year}
              onChange={hscInputChangeHandler}
              placeholder="E.G. 2020"
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
              defaultValue={hscALevel?.institution}
              onChange={hscInputChangeHandler}
              placeholder="E.G. Daffodil International University"
            />
          </div>
        </div>
      </div>
      {/* HSC end  */}

      {/* Deploma Start  */}
      <div className="col-md-6 deploma-level shadow p-3 mb-5 bg-body">
        <div className="row mb-3 mx-0">
          <h4>Deploma</h4>
          <hr />
          <div className="col-sm-12 col-md-6">
            <input type="hidden" defaultValue={deplomaLevel.level} />
          </div>
        </div>

        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="group">Group</label>
            <select
              name="group"
              id="group"
              className="form-control"
              defaultValue={deplomaLevel?.group}
              onChange={deplomaInputChangeHandler}
            >
              {groupList.map((tpm, i) => (
                <option value={tpm} key={i}>
                  {tpm}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="cgpa">Result</label>
            <input
              type="number"
              className="form-control"
              name="cgpa"
              id="cgpa"
              defaultValue={deplomaLevel?.cgpa}
              onChange={deplomaInputChangeHandler}
              placeholder="E.G. 3.80"
            />
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              className="form-control"
              name="grade"
              id="grade"
              defaultValue={deplomaLevel?.grade}
              onChange={deplomaInputChangeHandler}
              placeholder="E.G. A"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="passing_year">Passing Year</label>
            <input
              type="number"
              className="form-control"
              name="passing_year"
              id="passing_year"
              defaultValue={deplomaLevel?.passing_year}
              onChange={deplomaInputChangeHandler}
              placeholder="E.G. 2020"
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
              defaultValue={deplomaLevel?.institution}
              onChange={deplomaInputChangeHandler}
              placeholder="E.G. Daffodil International University"
            />
          </div>
        </div>
      </div>
      {/* Deploma End  */}

      {/* Degree start  */}
      <div className="col-md-6 degree-level shadow p-3 mb-5 bg-body">
        <div className="row mb-3 mx-0">
          <h4>Degree</h4>
          <hr />
          <div className="col-sm-12 col-md-6">
            <input type="hidden" defaultValue={degreeLevel.level} />
          </div>
        </div>

        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="group">Group</label>
            <select
              name="group"
              id="group"
              className="form-control"
              defaultValue={degreeLevel?.group}
              onChange={degreeInputChangeHandler}
            >
              {groupList.map((tpm, i) => (
                <option value={tpm} key={i}>
                  {tpm}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="cgpa">Result</label>
            <input
              type="number"
              className="form-control"
              name="cgpa"
              id="cgpa"
              defaultValue={degreeLevel?.cgpa}
              onChange={degreeInputChangeHandler}
              placeholder="E.G. 3.80"
            />
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              className="form-control"
              name="grade"
              id="grade"
              defaultValue={degreeLevel?.grade}
              onChange={degreeInputChangeHandler}
              placeholder="E.G. A"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="passing_year">Passing Year</label>
            <input
              type="number"
              className="form-control"
              name="passing_year"
              id="passing_year"
              defaultValue={degreeLevel?.passing_year}
              onChange={degreeInputChangeHandler}
              placeholder="E.G. 2020"
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
              defaultValue={degreeLevel?.institution}
              onChange={degreeInputChangeHandler}
              placeholder="E.G. Daffodil International University"
            />
          </div>
        </div>
      </div>
      {/* Degree end  */}

      {/* honours start  */}
      <div className="col-md-6 honours-level shadow p-3 mb-5 bg-body">
        <div className="row mb-3 mx-0">
          <h4>Honours</h4>
          <hr />
          <div className="col-sm-12 col-md-6">
            <input type="hidden" defaultValue={honoursLevel.level} />
          </div>
        </div>

        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="group">Group</label>
            <select
              name="group"
              id="group"
              className="form-control"
              defaultValue={honoursLevel?.group}
              onChange={honoursInputChangeHandler}
            >
              {groupList.map((tpm, i) => (
                <option value={tpm} key={i}>
                  {tpm}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="cgpa">Result</label>
            <input
              type="number"
              className="form-control"
              name="cgpa"
              id="cgpa"
              defaultValue={honoursLevel?.cgpa}
              onChange={honoursInputChangeHandler}
              placeholder="E.G. 3.80"
            />
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              className="form-control"
              name="grade"
              id="grade"
              defaultValue={honoursLevel?.grade}
              onChange={honoursInputChangeHandler}
              placeholder="E.G. A"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="passing_year">Passing Year</label>
            <input
              type="number"
              className="form-control"
              name="passing_year"
              id="passing_year"
              defaultValue={honoursLevel?.passing_year}
              onChange={honoursInputChangeHandler}
              placeholder="E.G. 2020"
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
              defaultValue={honoursLevel?.institution}
              onChange={honoursInputChangeHandler}
              placeholder="E.G. Daffodil International University"
            />
          </div>
        </div>
      </div>
      {/* honours end  */}

      {/* Masters start  */}
      <div className="col-md-6 masters-level shadow p-3 mb-5 bg-body">
        <div className="row mb-3 mx-0">
          <h4>Masters</h4>
          <hr />
          <div className="col-sm-12 col-md-6">
            <input type="hidden" defaultValue={mastersLevel.level} />
          </div>
        </div>

        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="group">Group</label>
            <select
              name="group"
              id="group"
              className="form-control"
              defaultValue={mastersLevel?.group}
              onChange={mastersInputChangeHandler}
            >
              {groupList.map((tpm, i) => (
                <option value={tpm} key={i}>
                  {tpm}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="cgpa">Result</label>
            <input
              type="number"
              className="form-control"
              name="cgpa"
              id="cgpa"
              defaultValue={mastersLevel?.cgpa}
              onChange={mastersInputChangeHandler}
              placeholder="E.G. 3.80"
            />
          </div>
        </div>
        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              className="form-control"
              name="grade"
              id="grade"
              defaultValue={mastersLevel?.grade}
              onChange={mastersInputChangeHandler}
              placeholder="E.G. A"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="passing_year">Passing Year</label>
            <input
              type="number"
              className="form-control"
              name="passing_year"
              id="passing_year"
              defaultValue={mastersLevel?.passing_year}
              onChange={mastersInputChangeHandler}
              placeholder="E.G. 2020"
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
              defaultValue={mastersLevel?.institution}
              onChange={mastersInputChangeHandler}
              placeholder="E.G. Daffodil International University"
            />
          </div>
        </div>
      </div>
      {/* Masters end  */}
    </div>
  );
}

export default ExamDetailForm;
