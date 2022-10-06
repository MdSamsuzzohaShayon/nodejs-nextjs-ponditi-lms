import { useSelector } from 'react-redux';

function Step3({ inputChangeHandler, update }) {
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
            placeholder="E.G. BBA"
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
            placeholder="E.G. Finance"
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
            placeholder="E.G. 2020"
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
            placeholder="E.G. 3.50"
          />
        </div>
      </div>

      <div className="row mb-3 mx-0 d-flex w-full justify-content-end">
        <button className="btn btn-primary w-fit mx-3" type="submit">
          {update ? 'Update' : 'Register'}
        </button>
      </div>
    </>
  );
}

export default Step3;
