/* eslint-disable react/destructuring-assignment */

function UserDetailInput(props) {
    console.log(props);
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
        <div className="col-12">
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
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" name="location" id="location" defaultValue={props.userInfo?.location} onChange={props.inputChangeHandler} />
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
            defaultValue={props.userInfo?.passing_year}
            onChange={props.inputChangeHandler}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="cgpa">CGPA</label>
          <input type="text" className="form-control" name="cgpa" id="cgpa" defaultValue={props.userInfo?.cgpa} onChange={props.inputChangeHandler} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 d-flex flex-row-reverse justify-content-end">
          <label htmlFor="running_study">Currently running study</label>
          <input type="checkbox" name="running_study" className="mx-2" id="running_study" onChange={props.inputRSChangeHandler} />
        </div>
      </div>
    </div>
  );
}

export default UserDetailInput;
