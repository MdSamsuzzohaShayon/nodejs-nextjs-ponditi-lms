/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import { useRef } from 'react';

function UserDetailInput(props) {
  const pyInputEl = useRef(null);

  const currentlyStudyHandler = (cse) => {
    // cse.preventDefault();
    props.inputRSChangeHandler(cse);
    if (cse.target.checked) {
      pyInputEl.current.disabled = true;
    } else {
      pyInputEl.current.disabled = false;
    }
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="firstname">Name</label>
          <input type="text" className="form-control" name="name" id="name" defaultValue={props.userInfo?.name} onChange={props.inputChangeHandler} />
        </div>
        <div className="col-md-6">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" id="email" defaultValue={props.userInfo?.email} onChange={props.inputChangeHandler} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="profession">Profession</label>
          <input
            type="profession"
            className="form-control"
            name="profession"
            id="profession"
            defaultValue={props.userInfo?.profession}
            onChange={props.inputChangeHandler}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="institution">Institution</label>
          <input
            type="institution"
            className="form-control"
            name="institution"
            id="institution"
            defaultValue={props.userInfo?.institution}
            onChange={props.inputChangeHandler}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="experience">Experience(years)</label>
          <input type="number" className="form-control" name="experience" id="experience" defaultValue={props.userInfo?.experience} onChange={props.inputChangeHandler} />
        </div>
        <div className="col-md-6">
          {/* Replace this with present address and use google map api  */}
          <label htmlFor="district">Location</label>
          <input type="text" className="form-control" name="district" id="district" defaultValue={props.userInfo?.district} onChange={props.inputChangeHandler} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="firstname">Degree / Education</label>
          <input type="text" className="form-control" name="degree" id="degree" defaultValue={props.userInfo?.degree} onChange={props.inputChangeHandler} />
        </div>
        <div className="col-md-6">
          <label htmlFor="major">Major</label>
          <input type="text" className="form-control" name="major" id="major" defaultValue={props.userInfo?.major} onChange={props.inputChangeHandler} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="passing_year">Passing Year</label>
          <input
            type="number"
            className="form-control"
            name="passing_year"
            id="passing_year"
            ref={pyInputEl}
            defaultValue={props.userInfo?.passing_year}
            onChange={props.inputChangeHandler}
          />
        </div>
        <div className="col-md-6 d-flex flex-row-reverse justify-content-end align-items-center">
          <label htmlFor="running_study">Currently running study</label>
          <input type="checkbox" name="running_study" className="mx-2" id="running_study" onChange={currentlyStudyHandler} />
        </div>
      </div>
    </div>
  );
}

export default UserDetailInput;
