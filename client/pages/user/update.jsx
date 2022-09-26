import React from 'react';

function update() {
  return (
    <div>
      <div className="col-12">
        <label htmlFor="subjects">
          Preffered Subjects (Comma seperated list)
        </label>
        <input
          type="text"
          className="form-control"
          name="subjects"
          id="subjects"
          // defaultValue={userInfo.subjects}
          // onChange={inputChangeHandler}
          placeholder="subjects"
        />
      </div>
      <div className="col-12">
        <label htmlFor="subjects">
          Preffered Classes (Comma seperated list)
        </label>
        <input
          type="text"
          className="form-control"
          name="subjects"
          id="subjects"
          // defaultValue={userInfo.subjects}
          // onChange={inputChangeHandler}
          placeholder="subjects"
        />
      </div>
    </div>
  );
}

export default update;
