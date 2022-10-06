import { useSelector } from 'react-redux';

function Step2({ inputChangeHandler, nextStepHandler, update }) {
  const userInfo = useSelector((state) => state.user.currentUser);
  return (
    <>
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="firstname">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            id="age"
            defaultValue={userInfo.age}
            onChange={inputChangeHandler}
            placeholder="E.G. 25"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            className="form-control"
            name="profession"
            id="profession"
            defaultValue={userInfo.profession}
            onChange={inputChangeHandler}
            placeholder="E.G. Footballer"
          />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="institution">Institution</label>
          <input
            type="institution"
            className="form-control"
            name="institution"
            id="institution"
            defaultValue={userInfo.institution}
            onChange={inputChangeHandler}
            placeholder="E.G. UEFA"
          />
        </div>
      </div>

      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="experience">Experience(years)</label>
          <input
            type="number"
            className="form-control"
            name="experience"
            id="experience"
            defaultValue={userInfo.experience}
            onChange={inputChangeHandler}
            placeholder="E.G. 20"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            id="location"
            defaultValue={userInfo.location}
            onChange={inputChangeHandler}
            placeholder="E.G. Dhaka, Bangladesh"
          />
        </div>
      </div>

      {update === false && (
      <div className="row mb-3 mx-0 d-flex w-full justify-content-end">
        <button
          className="btn btn-primary w-fit"
          type="button"
          onClick={nextStepHandler}
        >
          Next
        </button>
      </div>
      )}
    </>
  );
}

export default Step2;
