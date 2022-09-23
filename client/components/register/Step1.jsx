import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/reducers/userReducer';

function Step1({ inputChangeHandler, nextStepHandler }) {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.currentUser);
  const toggleRole = (tre, role) => {
    tre.preventDefault();
    dispatch(setCurrentUser({ role }));
  };
  return (
    <>
      <div className="row mb-3 mx-0 text-center">
        <div className="buttons">
          <button
            type="button"
            onClick={(e) => toggleRole(e, 'TEACHER')}
            className={
              userInfo.role === 'TEACHER'
                ? 'btn btn-primary'
                : 'btn btn-primary-outline'
            }
          >
            Register as teacher
          </button>
          <button
            type="button"
            className={
              userInfo.role === 'STUDENT'
                ? 'btn btn-primary'
                : 'btn btn-primary-outline'
            }
            onClick={(e) => toggleRole(e, 'STUDENT')}
          >
            Register as student
          </button>
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            id="firstname"
            defaultValue={userInfo.firstname}
            onChange={inputChangeHandler}
            placeholder="firstname"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            id="lastname"
            defaultValue={userInfo.lastname}
            onChange={inputChangeHandler}
            placeholder="lastname"
          />
        </div>
      </div>
      {userInfo.phone === '' && (
        <div className="row mb-3 mx-0">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              id="phone"
              defaultValue={userInfo.phone}
              onChange={inputChangeHandler}
              placeholder="phone"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              id="lastname"
              defaultValue={userInfo.lastname}
              onChange={inputChangeHandler}
              placeholder="lastname"
            />
          </div>
        </div>
      )}
      <div className="row mb-3 mx-0">
        <div className="col-12">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            defaultValue={userInfo.email}
            onChange={inputChangeHandler}
            placeholder="email"
          />
        </div>
      </div>
      <div className="row mb-3 mx-0">
        <div className="col-sm-12 col-md-6">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            defaultValue={userInfo.password}
            onChange={inputChangeHandler}
            placeholder="password"
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="password2"
            id="password2"
            defaultValue={userInfo.password2}
            onChange={inputChangeHandler}
            placeholder="password2"
          />
        </div>
      </div>

      <div className="row mb-3 mx-0">
        <button
          className="btn btn-primary w-fit"
          type="button"
          onClick={nextStepHandler}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Step1;
