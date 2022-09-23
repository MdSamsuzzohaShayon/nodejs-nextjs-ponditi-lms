import { useSelector } from 'react-redux';

function Step3({ inputChangeHandler }) {
  const userInfo = useSelector((state) => state.user.currentUser);
  return (
    <>
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="firstname">Degree / Education</label>
          <input
            type="text"
            className="form-control"
            name="degree"
            id="degree"
            defaultValue={userInfo.degree}
            onChange={inputChangeHandler}
            placeholder="degree"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="major">Major</label>
          <input
            type="text"
            className="form-control"
            name="major"
            id="major"
            defaultValue={userInfo.major}
            onChange={inputChangeHandler}
            placeholder="major"
          />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="passing_year">Passing Year</label>
          <input
            type="number"
            className="form-control"
            name="passing_year"
            id="passing_year"
            defaultValue={userInfo.passing_year}
            onChange={inputChangeHandler}
            placeholder="passing_year"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="cgpa">CGPA</label>
          <input
            type="text"
            className="form-control"
            name="cgpa"
            id="cgpa"
            defaultValue={userInfo.cgpa}
            onChange={inputChangeHandler}
            placeholder="cgpa"
          />
        </div>
      </div>

      <div className="row mb-3 mx-0">
        <button className="btn btn-primary w-fit" type="submit">
          Register
        </button>
      </div>
    </>
  );
}

export default Step3;
